import type {Column, Dataset} from './datasets';
import {icon} from './icons';

export const escapeHTML = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]!));

export function formatValue(value: unknown, column: Column, dataset: Dataset): string {
  const english = dataset.direction === 'ltr';
  const text = escapeHTML(value ?? '—');
  const image = column.valueIcons?.[String(value)];
  const iconClass = image?.match(/^icon:([a-z0-9-]+)$/i)?.[1];
  if (iconClass) return `<span class="cell-with-icon" dir="ltr"><i class="lni lni-${iconClass}" aria-hidden="true"></i><span>${text}</span></span>`;
  if (image && /^(\/(?!\/)|https?:\/\/)/i.test(image)) return `<span class="cell-with-icon" dir="ltr"><img src="${escapeHTML(image)}" alt="" width="28" height="28" loading="lazy"><span>${text}</span></span>`;
  if (column.type === 'status') {
    const status = dataset.statusMap?.[String(value)] ?? {label: String(value ?? (english ? 'No status' : 'بدون وضعیت')), color: 'neutral'};
    const color = ['success', 'warning', 'neutral', 'info'].includes(status.color) ? status.color : 'neutral';
    return `<span class="status-pill status-${color}"><span class="status-dot"></span>${escapeHTML(status.label)}</span>`;
  }
  if (column.type === 'boolean') return `<span class="${value ? 'boolean-yes' : 'boolean-no'}">${icon(value ? 'CheckCircle2' : 'X', 17)}</span>`;
  if (column.type === 'image') return typeof value === 'string' && /^https?:\/\//i.test(value)
    ? `<img class="thumbnail" src="${text}" alt="" loading="lazy">` : `<span class="avatar-fallback">${escapeHTML(String(value ?? '؟').slice(0,1))}</span>`;
  if (column.type === 'date') {
    const date = new Date(String(value));
    if (Number.isNaN(date.valueOf())) return '—';
    if (english) return `<time datetime="${escapeHTML(value)}">${new Intl.DateTimeFormat('en-US', {year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(date)}</time>`;
    const parts = new Intl.DateTimeFormat('fa-IR', {year:'numeric', month:'long', day:'numeric', timeZone:'UTC'}).formatToParts(date);
    const label = ['day','month','year'].map(type => parts.find(part => part.type === type)?.value).join(' ');
    return `<time datetime="${escapeHTML(value)}">${label}</time>`;
  }
  if (column.type === 'number' || column.type === 'currency') return `<span dir="ltr">${new Intl.NumberFormat(english ? 'en-US' : 'fa-IR').format(Number(value) || 0)}${column.type === 'currency' ? english ? ' Toman' : ' تومان' : ''}</span>`;
  return text;
}
