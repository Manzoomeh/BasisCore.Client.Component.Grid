import { GridGuideConfig, GuideTargets, isGuideConfig, parseGuideActionTarget } from "./GuideConfig";
import "../../asset/guide.css";
import lineIcon from "./LineIcon";

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export default class GridGuide {
  private dialog: HTMLDialogElement | null = null;
  private panel: HTMLElement;
  private ring: HTMLElement;
  private arrow: HTMLElement;
  private counter: HTMLElement;
  private title: HTMLElement;
  private description: HTMLElement;
  private notice: HTMLElement;
  private progress: HTMLElement;
  private previous: HTMLButtonElement;
  private next: HTMLButtonElement;
  private index = 0;
  private steps: GridGuideConfig["steps"] = [];
  private target: HTMLElement[] = [];
  private returnFocus: HTMLElement | null = null;
  private frame = 0;
  private mutation: MutationObserver | null = null;
  private resize: ResizeObserver | null = null;
  private actionSource: HTMLElement | null = null;
  private actionPreview: HTMLElement | null = null;
  private actionItem: HTMLElement | null = null;

  constructor(private container: HTMLElement, private config: GridGuideConfig, private targets: GuideTargets) {}

  static visible(target: HTMLElement | null): target is HTMLElement {
    return target instanceof HTMLElement && target.isConnected && !target.closest('[hidden], [inert]') &&
      getComputedStyle(target).visibility !== "hidden" && target.getBoundingClientRect().width > 0 && target.getBoundingClientRect().height > 0;
  }

  private resolve(name: string): HTMLElement[] {
    if (parseGuideActionTarget(name)) {
      const item = this.resolveAction(name);
      // The preview is intentionally inert, so its own geometry (not live-target focusability) applies.
      return item && item.getBoundingClientRect().width > 0 && item.getBoundingClientRect().height > 0 &&
        getComputedStyle(item).visibility !== "hidden" ? [item] : [];
    }
    if (!Object.prototype.hasOwnProperty.call(this.targets, name)) return [];
    try {
      const target = this.targets[name]();
      return Array.from(new Set(Array.isArray(target) ? target : [target])).filter(GridGuide.visible);
    } catch {
      return [];
    }
  }

  private findAction(name: string) {
    const target = parseGuideActionTarget(name);
    if (!target) return null;
    const area = target.scope === "row"
      ? Array.from(this.container.querySelectorAll<HTMLElement>("tbody tr[data-sys-tr], .mobile-row, .list-item, .data-card")).find(GridGuide.visible)
      : this.container;
    if (!area) return null;
    for (const group of Array.from(area.querySelectorAll<HTMLElement>("[data-grid-actions]"))) {
      if (group.dataset.gridActions !== target.scope) continue;
      const trigger = Array.from(group.querySelectorAll<HTMLElement>("[data-grid-action-trigger]"))
        .find(node => node.dataset.gridActionTrigger === target.scope) || null;
      const menu = group.querySelector<HTMLElement>("[data-grid-action-menu]");
      if (!GridGuide.visible(trigger) || !menu) continue;
      const item = Array.from(menu.querySelectorAll<HTMLElement>("[data-grid-action]"))
        .find(node => node.dataset.gridAction === target.key);
      if (!item) continue;
      // Ignore permission-hidden items, but do not mistake the closed menu for a missing action.
      let hidden = false;
      for (let node: HTMLElement | null = item; node && node !== menu; node = node.parentElement) {
        if (node.hidden || node.getAttribute("aria-hidden") === "true" || getComputedStyle(node).display === "none") hidden = true;
      }
      if (!hidden) return { group, trigger, menu, item };
    }
    return null;
  }

  private available(name: string) {
    return parseGuideActionTarget(name) ? Boolean(this.findAction(name)) : this.resolve(name).length > 0;
  }

  private clearActionPreview() {
    this.actionPreview?.remove();
    this.actionPreview = this.actionSource = this.actionItem = null;
  }

  private resolveAction(name: string): HTMLElement | null {
    const source = this.findAction(name);
    if (!this.dialog || !source) { this.clearActionPreview(); return null; }
    if (this.actionSource !== source.item) {
      this.clearActionPreview();
      const shell = source.group.cloneNode(false) as HTMLElement;
      const menu = source.menu.cloneNode(true) as HTMLElement;
      const originals = Array.from(source.menu.querySelectorAll<HTMLElement>("[data-grid-action]"));
      menu.querySelectorAll<HTMLElement>("[data-grid-action]").forEach((item, index) => {
        for (let node: HTMLElement | null = originals[index]; node && node !== source.menu; node = node.parentElement) {
          if (node.hidden || node.getAttribute("aria-hidden") === "true" || getComputedStyle(node).display === "none") item.hidden = true;
        }
      });
      shell.append(menu);
      shell.classList.add("show");
      // Preview only: never click a source trigger, move live nodes, or copy executable handlers.
      shell.querySelectorAll("script, iframe, object, embed, link, style, base, meta").forEach(node => node.remove());
      [shell, ...Array.from(shell.querySelectorAll<HTMLElement>("*"))].forEach(node => {
        Array.from(node.attributes).forEach(attribute => {
          if (/^on/i.test(attribute.name) || /^(id|name|for|href|srcdoc|autofocus|form|formaction|popover|popovertarget|aria-controls|aria-labelledby|aria-describedby)$/i.test(attribute.name)) node.removeAttribute(attribute.name);
        });
        node.tabIndex = -1;
      });
      menu.hidden = false;
      const preview = element("div", "bc-guide-action-preview");
      preview.setAttribute("inert", "");
      preview.setAttribute("aria-hidden", "true");
      preview.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); }, true);
      preview.append(shell);
      this.dialog.prepend(preview);
      this.actionSource = source.item;
      this.actionPreview = preview;
      this.actionItem = Array.from(menu.querySelectorAll<HTMLElement>("[data-grid-action]"))
        .find(node => node.dataset.gridAction === source.item.dataset.gridAction) || null;
    }
    const viewport = window.visualViewport;
    const left = viewport?.offsetLeft || 0, top = viewport?.offsetTop || 0;
    const width = viewport?.width || innerWidth, height = viewport?.height || innerHeight;
    const grid = this.container.getBoundingClientRect();
    const inPreview = this.mobile() && width > 480;
    const laneLeft = inPreview ? Math.max(left, grid.left) : left;
    const laneRight = inPreview ? Math.min(left + width, grid.right) : left + width;
    const preview = this.actionPreview!;
    preview.style.width = `${Math.min(240, Math.max(0, laneRight - laneLeft - 24))}px`;
    preview.style.maxHeight = `${Math.max(44, height - 48)}px`;
    const bounds = preview.getBoundingClientRect(), anchor = source.trigger.getBoundingClientRect();
    preview.style.left = `${Math.max(laneLeft + 12, Math.min(anchor.right - bounds.width, laneRight - bounds.width - 12))}px`;
    preview.style.top = `${Math.max(top + 12, Math.min(anchor.bottom + 8, top + height - bounds.height - 12))}px`;
    this.actionItem?.scrollIntoView({block: "nearest", inline: "nearest", behavior: "instant" as ScrollBehavior});
    return this.actionItem;
  }

  start(trigger?: HTMLElement, config: GridGuideConfig = this.config) {
    if (!isGuideConfig(config) || this.dialog) return;
    this.config = config;
    this.steps = this.config.steps.filter(step => !step.optional || this.available(step.target));
    if (!this.steps.length) return;
    // Only one active guide owns focus, even when multiple grids share a page.
    document.dispatchEvent(new Event("basiscore:guide-start"));
    document.addEventListener("basiscore:guide-start", this.close);
    this.returnFocus = trigger || document.activeElement as HTMLElement;
    this.index = 0;
    this.dialog = element("dialog", "bc-guide");
    this.dialog.dir = this.container.getAttribute("data-bc-grid-direction") || "rtl";
    this.dialog.setAttribute("aria-label", this.config.title);
    this.ring = element("div", "bc-guide-ring");
    this.ring.setAttribute("aria-hidden", "true");
    this.arrow = element("div", "bc-guide-arrow");
    this.arrow.setAttribute("aria-hidden", "true");
    this.arrow.hidden = true;
    this.panel = element("section", "bc-guide-panel");
    this.panel.tabIndex = -1;
    const top = element("div", "bc-guide-top");
    this.counter = element("span", "bc-guide-counter");
    this.counter.setAttribute("role", "status");
    this.counter.setAttribute("aria-live", "polite");
    const close = this.button("بستن راهنما", "bc-guide-close", this.close, "closeIcon");
    top.append(this.counter, close);
    this.title = element("h2", "bc-guide-title");
    this.description = element("p", "bc-guide-description");
    this.notice = element("p", "bc-guide-notice");
    this.progress = element("div", "bc-guide-progress");
    this.progress.setAttribute("aria-hidden", "true");
    const footer = element("div", "bc-guide-footer");
    this.previous = this.button("قبلی", "bc-guide-button", () => this.move(-1));
    const skip = this.button("رد کردن", "bc-guide-button bc-guide-skip", this.close);
    this.next = this.button("بعدی", "bc-guide-button bc-guide-next", () => this.move(1));
    footer.append(this.previous, skip, this.next);
    const content = element("div", "bc-guide-content");
    content.setAttribute("aria-live", "polite");
    content.setAttribute("aria-atomic", "true");
    content.append(this.title, this.description, this.notice);
    this.panel.append(top, content, this.progress, footer);
    this.dialog.append(this.ring, this.arrow, this.panel);
    this.dialog.addEventListener("cancel", event => { event.preventDefault(); this.close(); });
    this.dialog.addEventListener("keydown", event => {
      if (event.key !== "Tab") return;
      const controls = Array.from(this.panel.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === this.panel)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
    document.body.append(this.dialog);
    this.dialog.showModal();
    this.resize = new ResizeObserver(this.schedule);
    this.resize.observe(this.panel);
    this.mutation = new MutationObserver(this.schedule);
    this.mutation.observe(this.container, { childList: true, subtree: true, attributes: true });
    window.addEventListener("scroll", this.schedule, { capture: true, passive: true });
    window.addEventListener("resize", this.schedule, { passive: true });
    window.visualViewport?.addEventListener("resize", this.schedule);
    window.visualViewport?.addEventListener("scroll", this.schedule);
    this.show();
    this.panel.focus({ preventScroll: true });
  }

  private button(label: string, className: string, action: () => void, icon?: string) {
    const button = element("button", className);
    button.type = "button";
    if (icon) {
      button.append(lineIcon(icon, icon === "closeIcon" ? 18 : undefined));
      button.setAttribute("aria-label", label);
      button.title = label;
    } else button.textContent = label;
    button.addEventListener("click", action);
    return button;
  }

  private move(direction: number) {
    let next = this.index + direction;
    while (next >= 0 && next < this.steps.length && this.steps[next].optional && !this.available(this.steps[next].target)) next += direction;
    if (next >= this.steps.length) { this.close(); return; }
    if (next < 0) return;
    this.index = next;
    this.show();
  }

  private show() {
    const step = this.steps[this.index];
    this.clearActionPreview();
    this.counter.textContent = `مرحله ${this.number(this.index + 1)} از ${this.number(this.steps.length)}`;
    this.title.textContent = step.title;
    this.description.textContent = step.description;
    this.panel.setAttribute("aria-label", step.title);
    const previousFocused = document.activeElement === this.previous;
    this.previous.disabled = this.index === 0;
    if (previousFocused && this.previous.disabled) this.next.focus({ preventScroll: true });
    this.next.textContent = this.index === this.steps.length - 1 ? "پایان راهنما" : "بعدی";
    this.progress.replaceChildren(...this.steps.map((_, index) => {
      const dot = element("span", "bc-guide-dot");
      dot.dataset.state = index === this.index ? "current" : index < this.index ? "done" : "upcoming";
      return dot;
    }));
    const action = this.findAction(step.target);
    const target = action ? [action.trigger] : this.resolve(step.target);
    target[0]?.scrollIntoView({ block: this.mobile() ? "start" : "center", inline: "nearest", behavior: "instant" as ScrollBehavior });
    if (target.length && this.mobile()) window.scrollBy({ top: -12, behavior: "instant" as ScrollBehavior });
    this.schedule();
  }

  private number(value: number) { return value.toLocaleString("fa-IR"); }

  private mobile() {
    return (window.visualViewport?.width || window.innerWidth) <= 480 ||
      (this.container.dataset.view === "mobile" && this.container.getBoundingClientRect().width <= 480);
  }

  private schedule = () => {
    if (!this.dialog || this.frame) return;
    this.frame = requestAnimationFrame(() => { this.frame = 0; this.position(); });
  };

  private position() {
    if (!this.container.isConnected) { this.close(); return; }
    const target = this.resolve(this.steps[this.index].target);
    this.target.filter(node => !target.includes(node)).forEach(node => this.resize?.unobserve(node));
    target.filter(node => !this.target.includes(node)).forEach(node => this.resize?.observe(node));
    this.target = target;
    this.notice.hidden = target.length > 0;
    this.notice.textContent = target.length ? "" : "این بخش در نمای فعلی در دسترس نیست؛ می‌توانید به مرحله بعد بروید.";
    this.ring.hidden = !target.length;
    const viewport = window.visualViewport;
    const width = viewport?.width || window.innerWidth;
    const height = viewport?.height || window.innerHeight;
    const left = viewport?.offsetLeft || 0;
    const top = viewport?.offsetTop || 0;
    const gap = 12;
    const mobile = this.mobile();
    const padding = mobile ? 10 : 5;
    const targetGap = gap + (mobile ? padding : 0);
    this.dialog?.classList.toggle("bc-guide-mobile", mobile);
    const grid = this.container.getBoundingClientRect();
    const inPreview = mobile && width > 480 && target.length > 0 &&
      (Boolean(this.actionPreview) || target.every(node => this.container.contains(node)));
    const laneLeft = inPreview ? Math.max(left, grid.left) : left;
    const laneRight = inPreview ? Math.min(left + width, grid.right) : left + width;
    this.panel.style.width = `${Math.min(368, Math.max(0, laneRight - laneLeft - gap * 2))}px`;
    this.panel.style.maxHeight = `${height - gap * 2}px`;
    const rects = target.map(node => node.getBoundingClientRect());
    const rect = rects.length ? DOMRect.fromRect({
      x: Math.min(...rects.map(rect => rect.left)),
      y: Math.min(...rects.map(rect => rect.top)),
      width: Math.max(...rects.map(rect => rect.right)) - Math.min(...rects.map(rect => rect.left)),
      height: Math.max(...rects.map(rect => rect.bottom)) - Math.min(...rects.map(rect => rect.top)),
    }) : null;
    let panel = this.panel.getBoundingClientRect();
    let x = laneLeft + (laneRight - laneLeft - panel.width) / 2;
    let y = top + (height - panel.height) / 2;
    const placement = this.actionPreview?.getBoundingClientRect() || rect;
    if (placement) {
      if (!mobile || (!inPreview && width > 480)) x = placement.right - panel.width;
      if (placement.bottom + targetGap + panel.height <= top + height - gap) y = placement.bottom + targetGap;
      else if (placement.top - targetGap - panel.height >= top + gap) y = placement.top - targetGap - panel.height;
      else if (!mobile && placement.left - gap - panel.width >= left + gap) { x = placement.left - gap - panel.width; y = placement.top; }
      else {
        if (mobile) {
          // Leave part of a tall target visible; only the guide copy scrolls on short screens.
          this.panel.style.maxHeight = `${Math.min(height - gap * 2, height * .6)}px`;
          panel = this.panel.getBoundingClientRect();
        }
        y = top + height - panel.height - gap;
      }
    }
    x = Math.max(laneLeft + gap, Math.min(x, laneRight - panel.width - gap));
    y = Math.max(top + gap, Math.min(y, top + height - panel.height - gap));
    Object.assign(this.panel.style, {
      left: `${x}px`, top: `${y}px`,
    });
    this.arrow.hidden = true;
    if (rect) {
      const ringLeft = Math.max(left + 5, rect.left - padding);
      let ringTop = Math.max(top + 5, rect.top - padding);
      let ringBottom = Math.min(top + height - 5, rect.bottom + padding);
      if (mobile && y < ringBottom && y + panel.height > ringTop) {
        if (y > ringTop) ringBottom = Math.min(ringBottom, y - gap);
        else ringTop = Math.max(ringTop, y + panel.height + gap);
      }
      Object.assign(this.ring.style, { left: `${ringLeft}px`, top: `${ringTop}px`,
        width: `${Math.max(0, Math.min(left + width - 5, rect.right + padding) - ringLeft)}px`,
        height: `${Math.max(0, ringBottom - ringTop)}px` });
      const below = y >= rect.bottom + gap;
      const above = y + panel.height <= rect.top - gap;
      const arrowX = Math.max(x + 28, Math.min(rect.left + rect.width / 2, x + panel.width - 28));
      if (mobile && (below || above) && arrowX >= rect.left - 5 && arrowX <= rect.right + 5) {
        this.arrow.hidden = false;
        this.arrow.dataset.side = below ? "below" : "above";
        Object.assign(this.arrow.style, { left: `${arrowX - 6}px`, top: `${below ? y - 6 : y + panel.height - 6}px` });
      }
    }
    this.dialog?.classList.toggle("bc-guide-unavailable", !target.length);
  }

  close = () => {
    if (!this.dialog) return;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.mutation?.disconnect();
    this.resize?.disconnect();
    window.removeEventListener("scroll", this.schedule, true);
    window.removeEventListener("resize", this.schedule);
    window.visualViewport?.removeEventListener("resize", this.schedule);
    window.visualViewport?.removeEventListener("scroll", this.schedule);
    document.removeEventListener("basiscore:guide-start", this.close);
    this.dialog.close();
    this.dialog.remove();
    this.dialog = null;
    this.clearActionPreview();
    this.target = [];
    if (this.returnFocus?.isConnected) this.returnFocus.focus({ preventScroll: true });
  };
}
