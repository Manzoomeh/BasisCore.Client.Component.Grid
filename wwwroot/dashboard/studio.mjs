import { groups, templates, selectedExample } from "./samples.mjs";
import { icons } from "./icons.mjs";

let frame = document.querySelector("#example-frame");
const select = document.querySelector("#example-select");
const title = document.querySelector("#example-title");
const name = document.querySelector("#example-name");
const pathLink = document.querySelector("#example-path");
const openLink = document.querySelector("#open-example");
const status = document.querySelector("#page-status");
const stage = document.querySelector("#preview-stage");
const size = document.querySelector("#viewport-size");
const sizeObserver = new ResizeObserver(() => { size.textContent = `${frame.clientWidth} px`; });

document.querySelector("#template-gallery").innerHTML = templates.map(([id, label, path], index) => `
  <a class="template-card" href="${id === "template4" ? `/${path}` : `#${id}`}" data-template="${id}">
    <div class="template-art" aria-hidden="true">
      <div class="mini-heading"><span data-icon="${["Table2", "LayoutList", "Rows3", "Table2"][index]}"></span><span>Template ${index + 1}</span><span class="mini-dots"></span></div>
      <div class="mini-rows mini-${id}">${Array.from({ length: 3 }, () => "<i><b></b><span></span><span></span></i>").join("")}</div>
    </div>
    <div class="template-copy"><h2>${label}</h2><code>${id}</code></div>
    <div class="template-open"><span>${id === "template4" ? "باز کردن داشبورد" : "باز کردن پیش‌نمایش"}</span><span data-icon="${id === "template4" ? "ExternalLink" : "ChevronLeft"}"></span></div>
  </a>`).join("");

document.querySelectorAll("[data-icon]").forEach(element => {
  element.innerHTML = icons[element.dataset.icon];
});

groups.forEach(group => {
  const options = document.createElement("optgroup");
  options.label = group.title;
  group.examples.forEach(([id, label]) => options.appendChild(new Option(label, id)));
  select.appendChild(options);
});

function loadExample(url) {
  status.textContent = "در حال بارگذاری صفحه";
  // A fresh frame avoids adding a second browser-history entry per sample change.
  const next = frame.cloneNode(false);
  next.src = url;
  next.addEventListener("load", () => { status.textContent = "صفحه بارگذاری شد"; });
  sizeObserver.unobserve(frame);
  frame.replaceWith(next);
  frame = next;
  sizeObserver.observe(frame);
}

function showExample() {
  const [id, label, path] = selectedExample(window.location.hash);
  const url = `/${path}`;
  select.value = id;
  title.textContent = label;
  name.textContent = id;
  frame.title = `پیش‌نمایش ${label}`;
  openLink.href = url;
  pathLink.href = url;
  pathLink.textContent = path;
  document.title = `${label} · BasisPanel List Studio`;
  document.querySelectorAll("[data-template]").forEach(card => {
    if (card.dataset.template === id) card.setAttribute("aria-current", "page");
    else card.removeAttribute("aria-current");
  });
  if (frame.getAttribute("src") !== url) {
    loadExample(url);
  }
}

select.addEventListener("change", () => { window.location.hash = select.value; });
window.addEventListener("hashchange", showExample);
document.querySelector("#reload-example").addEventListener("click", () => {
  loadExample(frame.getAttribute("src"));
});
document.querySelector(".skip-link").addEventListener("click", event => {
  event.preventDefault();
  const workspace = document.querySelector("#workspace");
  workspace.focus();
  workspace.scrollIntoView();
});

document.querySelectorAll("button[data-viewport]").forEach(button => {
  button.addEventListener("click", () => {
    stage.dataset.viewport = button.dataset.viewport;
    document.querySelectorAll("button[data-viewport]").forEach(control => {
      control.setAttribute("aria-pressed", String(control === button));
    });
  });
});

showExample();
