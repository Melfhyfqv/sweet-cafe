// Carrinho de pedidos: monta o pedido e envia pelo WhatsApp da Sweet.
(function () {
  const KEY = "sweet-cart-v1";
  const DELIVERY_FEE = 25;
  const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const qtyFmt = (q, kg) => (kg ? `${String(q).replace(".", ",")} kg` : `${q}x`);
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  let items = {};
  try { items = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { items = {}; }
  // Cheesecakes guardados em versões antigas tinham preço estimado: descarta para não exibir valor errado.
  Object.keys(items).forEach(id => { if (/-s\d$/.test(id) && !items[id].ref) delete items[id]; });
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} };

  // Interface
  const root = document.createElement("div");
  root.innerHTML = `
    <button class="cart-fab" type="button" aria-label="Abrir meu pedido">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></svg>
      <span class="cart-count" hidden>0</span>
    </button>
    <div class="cart-overlay" hidden></div>
    <aside class="cart" role="dialog" aria-modal="true" aria-label="Meu pedido" aria-hidden="true">
      <header class="cart-head"><h3>Meu pedido</h3><button type="button" class="cart-close" aria-label="Fechar">×</button></header>
      <div class="cart-body">
        <ul class="cart-list"></ul>
        <p class="cart-empty">Seu pedido está vazio. Adicione itens pelo cardápio.</p>
        <form class="cart-form" novalidate>
          <label>Nome<input name="nome" autocomplete="name" required></label>
          <label>Telefone / WhatsApp<input name="tel" type="tel" autocomplete="tel" placeholder="(67) 99999-9999" required></label>
          <fieldset>
            <legend>Como prefere receber?</legend>
            <label class="radio"><input type="radio" name="tipo" value="Retirada na loja" checked> Retirar na loja</label>
            <label class="radio"><input type="radio" name="tipo" value="Entrega"> Entrega (taxa ${brl(DELIVERY_FEE)})</label>
          </fieldset>
          <label class="addr" hidden>Endereço de entrega<input name="end" autocomplete="street-address"></label>
          <div class="row">
            <label>Data desejada<input name="data" type="date"></label>
            <label>Horário<input name="hora" type="time"></label>
          </div>
          <label>Observações<textarea name="obs" rows="2" placeholder="Ex.: mensagem no bolo, restrições, alergias"></textarea></label>
        </form>
      </div>
      <footer class="cart-foot">
        <div class="cart-total"><span>Total estimado</span><strong>R$ 0,00</strong></div>
        <p class="cart-dest" hidden></p>
        <p class="cart-pending" hidden>Este total não inclui os itens com “valor a confirmar” (cheesecakes). A Sweet informa o valor deles pelo WhatsApp.</p>
        <p class="cart-note">Itens vendidos por kg têm valor estimado e podem variar na pesagem. A Sweet confirma disponibilidade, prazo e o pagamento (Pix ou link de cartão) pelo WhatsApp.</p>
        <p class="cart-err" role="alert"></p>
        <button type="button" class="btn btn-gold cart-send">Enviar pedido pelo WhatsApp</button>
        <button type="button" class="cart-clear">Limpar pedido</button>
      </footer>
    </aside>`;
  document.body.appendChild(root);

  const $ = s => root.querySelector(s);
  const fab = $(".cart-fab"), count = $(".cart-count"), overlay = $(".cart-overlay"), panel = $(".cart");
  const list = $(".cart-list"), empty = $(".cart-empty"), form = $(".cart-form"), err = $(".cart-err");
  const totalEl = $(".cart-total strong"), addr = $(".addr"), pendingEl = $(".cart-pending"), destEl = $(".cart-dest"), sendBtn = $(".cart-send");
  let lastFocus = null;

  function subtotal() {
    return Object.values(items).reduce((s, i) => s + (i.ref ? 0 : i.price * i.qty), 0);
  }
  const pendingCount = () => Object.values(items).filter(i => i.ref).length;
  const subtotalOf = ids => ids.reduce((s, id) => s + (items[id].ref ? 0 : items[id].price * items[id].qty), 0);
  // Horário de atendimento de cada WhatsApp (horário de Campo Grande). Feriados não são considerados.
  const SERVICE_HOURS = {
    enc:    { days: [1, 2, 3, 4, 5, 6], from: 8, to: 16 },                  // seg a sáb, 8h às 16h
    balcao: { days: [1, 2, 3, 4, 5, 6], from: 8, to: 20, sun: [8, 15] },    // seg a sáb 8h às 20h; dom 8h às 15h
  };
  function isOpen(to) {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Campo_Grande" }));
    const h = now.getHours() + now.getMinutes() / 60, d = now.getDay(), s = SERVICE_HOURS[to];
    if (d === 0) return !!s.sun && h >= s.sun[0] && h < s.sun[1];
    return s.days.includes(d) && h >= s.from && h < s.to;
  }
  // Separa os itens por atendimento (o id começa com a categoria do cardápio)
  function destinations() {
    const enc = [], balcao = [];
    Object.keys(items).forEach(id => (ENC_CATS.includes(id.split("-")[0]) ? enc : balcao).push(id));
    return { enc, balcao };
  }
  function total() {
    const delivery = form.elements.tipo.value === "Entrega" ? DELIVERY_FEE : 0;
    return subtotal() + delivery;
  }

  // Botões do cardápio sempre refletem o que está no carrinho:
  // sem o item mostram "+ Adicionar"; com o item mostram um contador (− qtd +).
  function syncButtons() {
    document.querySelectorAll(".add-btn[data-id]").forEach(b => {
      if (!b.dataset.label) b.dataset.label = b.textContent;
      let st = b.nextElementSibling;
      if (!st || !st.classList.contains("stepper")) {
        st = document.createElement("div");
        st.className = "stepper" + (b.classList.contains("big") ? " big" : "");
        st.dataset.sid = b.dataset.id;
        st.innerHTML = `<button type="button" data-step="-1" aria-label="Remover uma unidade">−</button><output aria-live="polite"></output><button type="button" data-step="1" aria-label="Adicionar mais uma unidade">+</button>`;
        b.after(st);
      }
      const it = items[b.dataset.id];
      b.hidden = !!it;
      st.hidden = !it;
      if (it) st.querySelector("output").textContent = qtyFmt(it.qty, it.kg);
    });
  }

  // Aumenta ou diminui pelo contador; abaixo do mínimo remove o item.
  function change(id, dir) {
    const it = items[id];
    if (!it) return;
    const step = it.kg ? 0.5 : 1;
    it.qty += dir * step;
    if (it.qty < 1) delete items[id];
    save(); render();
  }

  function render() {
    syncButtons();
    const arr = Object.entries(items);
    list.innerHTML = arr.map(([id, i]) => `
      <li data-id="${esc(id)}">
        ${i.img
          ? `<img class="ci-img" src="${esc(i.img)}" alt="${esc(i.name)}" loading="lazy">`
          : `<span class="ci-img ci-ph" aria-hidden="true"><img src="img/logo.png" alt=""></span>`}
        <div class="ci-info"><b>${esc(i.name)}</b><span>${i.ref ? `${brl(i.ref)} o kg · valor a confirmar` : `${brl(i.price)}${i.kg ? " / kg" : ""}`}</span></div>
        <div class="ci-qty">
          <button type="button" data-act="dec" aria-label="Diminuir">−</button>
          <output>${qtyFmt(i.qty, i.kg)}</output>
          <button type="button" data-act="inc" aria-label="Aumentar">+</button>
        </div>
        <strong class="ci-sub${i.ref ? " pending" : ""}">${i.ref ? "a confirmar" : brl(i.price * i.qty)}</strong>
        <button type="button" class="ci-del" data-act="del" aria-label="Remover">×</button>
      </li>`).join("");
    const n = arr.length;
    empty.hidden = n > 0;
    form.hidden = n === 0;
    $(".cart-foot").classList.toggle("is-empty", n === 0);
    count.hidden = n === 0;
    count.textContent = n;
    totalEl.textContent = brl(total());
    pendingEl.hidden = !pendingCount();
    const d = destinations();
    const mixedNow = d.enc.length > 0 && d.balcao.length > 0;
    destEl.hidden = n === 0;
    destEl.textContent = mixedNow
      ? "Seu pedido tem itens de dois atendimentos. Vamos enviar primeiro as encomendas (cestas e bolos) para o WhatsApp de encomendas, e depois o restante para o balcão."
      : d.enc.length
        ? "Será enviado ao WhatsApp de encomendas (seg a sáb, 8h às 16h)."
        : "Será enviado ao WhatsApp do balcão (seg a sáb, 8h às 20h; dom e feriados, 8h às 15h).";
    const firstTo = d.enc.length ? "enc" : "balcao";
    if (n > 0 && !isOpen(firstTo)) {
      destEl.textContent += " Agora estamos fora do horário de atendimento: você pode enviar o pedido mesmo assim, e respondemos assim que abrirmos.";
    }
    sendBtn.textContent = mixedNow ? "Enviar encomendas pelo WhatsApp" : "Enviar pedido pelo WhatsApp";
  }

  function open() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $(".cart-close").focus();
  }
  function close() {
    overlay.hidden = true;
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  function add(id, name, price, kg, img, ref) {
    if (items[id]) items[id].qty += 1;
    else items[id] = { name, price, kg, qty: 1, img: img || "", ref: ref || 0 };
    save(); render();
    fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump");
  }

  window.SweetCart = { add, open, sync: syncButtons };

  // Eventos
  document.addEventListener("click", e => {
    const s = e.target.closest(".stepper button");
    if (s) { change(s.closest(".stepper").dataset.sid, +s.dataset.step); return; }
    const b = e.target.closest(".add-btn");
    if (!b) return;
    add(b.dataset.id, b.dataset.name, parseFloat(b.dataset.price), b.dataset.kg === "1", b.dataset.img, parseFloat(b.dataset.ref) || 0);
  });

  fab.addEventListener("click", open);
  overlay.addEventListener("click", close);
  $(".cart-close").addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && panel.classList.contains("open")) close(); });

  list.addEventListener("click", e => {
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const id = b.closest("li").dataset.id;
    if (!items[id]) return;
    if (b.dataset.act === "inc") change(id, 1);
    if (b.dataset.act === "dec") change(id, -1); // abaixo do mínimo remove o item
    if (b.dataset.act === "del") { delete items[id]; save(); render(); }
  });

  $(".cart-clear").addEventListener("click", () => {
    items = {}; save(); render();
  });

  form.addEventListener("change", e => {
    if (e.target.name === "tipo") {
      addr.hidden = e.target.value !== "Entrega";
      render();
    }
  });
  const today = new Date().toISOString().slice(0, 10);
  form.elements.data.min = today;

  $(".cart-send").addEventListener("click", () => {
    err.textContent = "";
    ["nome", "tel", "end"].forEach(n => form.elements[n].classList.remove("invalid"));
    const f = form.elements;
    const nome = f.nome.value.trim(), tel = f.tel.value.trim();
    const entrega = f.tipo.value === "Entrega";
    const bad = [];
    if (nome.length < 2) bad.push("nome");
    if (tel.replace(/\D/g, "").length < 10) bad.push("tel");
    if (entrega && f.end.value.trim().length < 5) bad.push("end");
    if (!Object.keys(items).length) { err.textContent = "Adicione ao menos um item ao pedido."; return; }
    if (bad.length) {
      bad.forEach(n => f[n].classList.add("invalid"));
      err.textContent = entrega ? "Preencha nome, telefone válido e endereço de entrega." : "Preencha nome e telefone válido.";
      return;
    }
    // Para qual WhatsApp vai: bolos/cestas = encomendas; o resto = balcão. Se misturar, envia primeiro as encomendas.
    const dest = destinations();
    const to = dest.enc.length ? "enc" : "balcao";
    const sendIds = dest[to];
    const mixed = dest.enc.length > 0 && dest.balcao.length > 0;
    const linhas = sendIds.map(id => items[id]).map(i => i.ref
      ? `• ${qtyFmt(i.qty, i.kg)} ${i.name}: valor a confirmar (${brl(i.ref)} o kg)`
      : `• ${qtyFmt(i.qty, i.kg)} ${i.name}: ${brl(i.price * i.qty)}`);
    const pend = sendIds.some(id => items[id].ref);
    const quando = [f.data.value && f.data.value.split("-").reverse().join("/"), f.hora.value].filter(Boolean).join(" às ");
    const texto = [
      "*Novo pedido pelo site Sweet Café*",
      "",
      `Nome: ${nome}`,
      `Telefone: ${tel}`,
      `Recebimento: ${f.tipo.value}`,
      entrega ? `Endereço: ${f.end.value.trim()}` : null,
      quando ? `Data/hora desejada: ${quando}` : null,
      "",
      "*Itens*",
      ...linhas,
      "",
      `Subtotal: ${brl(subtotalOf(sendIds))}`,
      entrega ? `Taxa de entrega: ${brl(DELIVERY_FEE)}` : null,
      `*Total estimado${pend ? " (sem os itens a confirmar)" : ""}: ${brl(subtotalOf(sendIds) + (entrega ? DELIVERY_FEE : 0))}*`,
      f.obs.value.trim() ? `\nObservações: ${f.obs.value.trim()}` : null,
    ].filter(l => l !== null).join("\n");
    window.open(waLink(texto, to), "_blank", "noopener");
    err.textContent = "";
    if (mixed) {
      // Remove o que já foi enviado; o restante segue no carrinho para o segundo envio
      sendIds.forEach(id => delete items[id]);
      save(); render();
      err.textContent = "Itens de encomendas enviados. Agora envie o restante do pedido ao balcão.";
      return;
    }
    close();
  });

  render();
})();
