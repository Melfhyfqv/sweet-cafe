// WhatsApps da Sweet (DDI + DDD + número, só dígitos).
//  enc    = encomendas: cestas, presentes, bolos, doces e salgados para eventos (seg a sáb, 8h às 16h)
//  balcao = balcão: reservas e pedidos de delivery do cardápio (seg a sáb 8h às 20h; dom e feriados 8h às 15h)
const WHATSAPP_NUMBERS = { enc: "5567996750606", balcao: "556733494441" };

const waLink = (text, to = "enc") => `https://wa.me/${WHATSAPP_NUMBERS[to] || WHATSAPP_NUMBERS.enc}?text=${encodeURIComponent(text)}`;

// Categorias do cardápio que são atendidas pelo WhatsApp de encomendas
const ENC_CATS = ["bolos", "cestas"];
const waFor = catId => (ENC_CATS.includes(catId) ? "enc" : "balcao");

// Links de WhatsApp (use data-wa-to="balcao" para o número do balcão)
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waLink(a.dataset.wa, a.dataset.waTo || "enc");
});

// Se alguma foto não carregar, esconde a imagem quebrada (fica o fundo do cartão)
document.addEventListener("error", e => {
  if (e.target.tagName === "IMG") e.target.classList.add("img-broken");
}, true);
document.querySelectorAll("img").forEach(img => {
  if (img.complete && img.naturalWidth === 0 && img.currentSrc) img.classList.add("img-broken");
});

// Menu mobile
const btn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
btn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
  document.getElementById("top").classList.toggle("open", open);
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", false);
    document.getElementById("top").classList.remove("open");
  }
});

// Status "aberto agora" (horário de Campo Grande, UTC-4)
const HOURS = { 0: [8, 15], 1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20], 6: [8, 20] };
function updateStatus() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Campo_Grande" }));
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const [open, close] = HOURS[day];
  const isOpen = h >= open && h < close;
  const badge = document.getElementById("statusBadge");
  badge.textContent = isOpen
    ? `Aberto agora · fecha às ${close}:00`
    : "Fechado agora · confira nossos horários";
  badge.classList.add(isOpen ? "open" : "closed");
  const today = document.querySelector(`#hours li[data-d="${day}"]`);
  if (today) today.classList.add("today");
}
updateStatus();

// Formulário -> WhatsApp
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(form);
  let valid = true;
  ["nome", "tel", "msg"].forEach(n => {
    const el = form.elements[n];
    const ok = el.value.trim().length > 1;
    el.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  const digits = (d.get("tel") || "").replace(/\D/g, "");
  if (valid && digits.length < 10) {
    form.elements.tel.classList.add("invalid");
    valid = false;
  }
  msg.className = "form-msg";
  if (!valid) {
    msg.textContent = "Preencha nome, telefone válido e mensagem.";
    return;
  }
  const text = `Olá! Sou ${d.get("nome").trim()}.\nAssunto: ${d.get("assunto")}\nTelefone: ${d.get("tel").trim()}\n\n${d.get("msg").trim()}`;
  // Encomendas e cestas vão ao WhatsApp de encomendas; reservas, pedidos e dúvidas, ao balcão
  const to = /encomenda|cestas/i.test(d.get("assunto")) ? "enc" : "balcao";
  window.open(waLink(text, to), "_blank", "noopener");
  msg.className = "form-msg ok";
  msg.textContent = `Abrindo o WhatsApp ${to === "enc" ? "de encomendas" : "do balcão"} para enviar sua mensagem…`;
  form.reset();
});

// Animação de entrada
const targets = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));
} else {
  targets.forEach(t => t.classList.add("in"));
}

document.getElementById("year").textContent = new Date().getFullYear();

// Cabeçalho sólido ao rolar
const header = document.getElementById("top");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
