// Janela de detalhes do produto: abre ao clicar na galeria ou em um item do cardápio.
(function () {
  const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const parse = p => parseFloat(String(p).replace("+", "").replace(/\./g, "").replace(",", "."));

  function itemsOf(cat, gi) {
    const g = cat.groups[gi];
    const kg = /por kg|o kg/i.test(g.t);
    return g.items.map(([name, desc, p, sz], ii) => {
      const id = `${cat.id}-${gi}-${ii}`;
      return { id, name, desc, price: parse(p), kg, sizes: buildOptions(id, name, p, sz) };
    });
  }
  const imgFor = (name, group) => imgForItem(name, group);
  function byIndex(c, g, i) {
    const cat = MENU.find(x => x.id === c);
    if (!cat) return null;
    const grp = cat.groups[g];
    const all = itemsOf(cat, g);
    return { cat, group: grp.t, items: [all[i]], note: grp.note, img: imgFor(all[i].name, grp.t) };
  }
  function findByName(name) {
    for (const cat of MENU) for (let gi = 0; gi < cat.groups.length; gi++) {
      const all = itemsOf(cat, gi);
      const i = all.findIndex(x => x.name.toLowerCase() === name.toLowerCase());
      if (i >= 0) return byIndex(cat.id, gi, i);
    }
    return null;
  }
  function findGroup(prefix) {
    for (const cat of MENU) for (let gi = 0; gi < cat.groups.length; gi++) {
      const g = cat.groups[gi];
      if (g.t.toLowerCase().startsWith(prefix.toLowerCase())) {
        return { cat, group: g.t, items: itemsOf(cat, gi), note: g.note, img: imgFor("", g.t), title: g.t.split("·")[0].trim() };
      }
    }
    return null;
  }

  // Estrutura
  const root = document.createElement("div");
  root.className = "pm";
  root.hidden = true;
  root.innerHTML = `
    <div class="pm-overlay"></div>
    <div class="pm-box" role="dialog" aria-modal="true" aria-labelledby="pmTitle">
      <button type="button" class="pm-x" aria-label="Fechar">×</button>
      <div class="pm-img"><img alt=""></div>
      <div class="pm-body">
        <p class="pm-kicker"></p>
        <h3 id="pmTitle"></h3>
        <div class="pm-selos"></div>
        <p class="pm-price"></p>
        <p class="pm-desc"></p>
        <ul class="pm-list"></ul>
        <p class="pm-note"></p>
        <div class="pm-actions"></div>
      </div>
    </div>`;
  document.body.appendChild(root);
  const $ = s => root.querySelector(s);
  let lastFocus = null;

  function open(ctx) {
    if (!ctx) return;
    const multi = ctx.items.length > 1;
    const one = ctx.items[0];
    const title = multi ? (ctx.title || ctx.group) : one.name;
    $("#pmTitle").textContent = title;
    const selos = (ITEM_SELOS[one.name] || []).concat(multi ? [] : (GROUP_SELOS[ctx.group] || []));
    $(".pm-selos").innerHTML = selosHTML(selos);
    $(".pm-selos").hidden = !selos.length;
    $(".pm-kicker").textContent = ctx.cat.label;
    const imgBox = $(".pm-img");
    imgBox.hidden = !ctx.img;
    root.classList.toggle("no-img", !ctx.img);
    root.classList.toggle("wide", /cheesecake|pudim/.test(ctx.img));
    if (ctx.img) { $(".pm-img img").src = ctx.img; $(".pm-img img").alt = title; }

    const priceEl = $(".pm-price"), descEl = $(".pm-desc"), list = $(".pm-list"), note = $(".pm-note"), actions = $(".pm-actions");
    list.innerHTML = "";
    note.textContent = "";
    actions.innerHTML = "";
    const kgNote = "Preço por kg. O valor final depende do peso do produto.";

    if (!multi) {
      priceEl.hidden = !(one.price > 0);
      priceEl.textContent = one.price > 0 ? `${brl(one.price)}${one.kg || one.sizes ? " o kg" : ""}` : "";
      descEl.hidden = !one.desc;
      descEl.textContent = one.desc || "";
      note.textContent = [ctx.note, one.kg ? kgNote : ""].filter(Boolean).join(" ");
      if (one.sizes && one.sizes[0].ref) note.textContent = [ctx.note, "O valor final do pedido é confirmado pela Sweet pelo WhatsApp."].filter(Boolean).join(" ");
      if (one.sizes) {
        list.innerHTML = `<li class="has-sizes">${sizeRowsHTML(one.sizes)}</li>`;
      } else if (one.price > 0) {
        const b = document.createElement("button");
        b.type = "button"; b.className = "btn btn-dark add-btn big"; b.textContent = "+ Adicionar ao pedido";
        b.dataset.id = one.id; b.dataset.name = one.name; b.dataset.price = one.price; b.dataset.kg = one.kg ? 1 : 0; b.dataset.img = ctx.img || "";
        actions.appendChild(b);
      }
    } else {
      priceEl.hidden = true;
      descEl.hidden = !ctx.note;
      descEl.textContent = ctx.note || "";
      const kg = ctx.items[0].kg;
      note.textContent = kg ? kgNote : (ctx.items[0].sizes ? "O valor final do pedido é confirmado pela Sweet pelo WhatsApp." : "");
      list.innerHTML = ctx.items.map(it => it.sizes ? `
        <li class="has-sizes"><span>${esc(it.name)}</span><b>${brl(it.price)} /kg</b>${sizeRowsHTML(it.sizes)}</li>` : `
        <li><span>${esc(it.name)}</span><b>${brl(it.price)}${it.kg ? " /kg" : ""}</b>
        <button type="button" class="add-btn" data-id="${esc(it.id)}" data-name="${esc(it.name)}" data-price="${it.price}" data-kg="${it.kg ? 1 : 0}" data-img="${esc(ctx.img || "")}">+ Adicionar</button></li>`).join("");
    }
    const wa = document.createElement("a");
    wa.className = "btn btn-ghost"; wa.target = "_blank"; wa.rel = "noopener";
    const daily = /sabores do dia/.test(one.desc || "");
    wa.href = waLink(daily ? `Olá! Quais são os sabores disponíveis hoje para: ${title}?` : `Olá! Quero saber mais sobre: ${title}.`, waFor(ctx.cat.id));
    wa.textContent = daily ? "Consultar sabores do dia" : "Perguntar no WhatsApp";
    actions.appendChild(wa);

    if (window.SweetCart) SweetCart.sync();
    lastFocus = document.activeElement;
    root.hidden = false;
    document.body.classList.add("no-scroll");
    $(".pm-x").focus();
  }
  function close() {
    root.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  $(".pm-overlay").addEventListener("click", close);
  $(".pm-x").addEventListener("click", close);
  document.addEventListener("keydown", e => {
    if (root.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") {
      const f = [...root.querySelectorAll("button,a[href]")].filter(x => !x.hidden && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Galeria
  document.querySelectorAll(".g[data-open], .g[data-group]").forEach(fig => {
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    const go = () => open(fig.dataset.open ? findByName(fig.dataset.open) : findGroup(fig.dataset.group));
    fig.addEventListener("click", go);
    fig.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  // Itens do cardápio
  const body = document.getElementById("menuBody");
  const fromLi = li => byIndex(li.dataset.c, +li.dataset.g, +li.dataset.i);
  body.addEventListener("click", e => {
    if (e.target.closest(".add-btn, .stepper")) return;
    const li = e.target.closest(".menu-items li[data-c]");
    if (li) open(fromLi(li));
  });
  body.addEventListener("keydown", e => {
    if (e.key !== "Enter" || e.target.closest(".add-btn, .stepper")) return;
    const li = e.target.closest(".menu-items li[data-c]");
    if (li) open(fromLi(li));
  });
})();
