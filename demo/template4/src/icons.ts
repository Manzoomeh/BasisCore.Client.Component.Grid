const icons = {
  AlertCircle: 'warning', ArrowDown: 'arrow-down', ArrowUp: 'arrow-up', Check: 'checkmark',
  CheckCircle2: 'checkmark-circle', ChevronDown: 'chevron-down', ChevronLeft: 'chevron-left',
  ChevronRight: 'chevron-right', CircleDot: 'radio-button', Copy: 'files', Download: 'download',
  FileJson: 'code-alt', Filter: 'funnel', Grid2X2: 'grid-alt', LayoutList: 'list',
  ListFilter: 'funnel', MoreVertical: 'more-alt', Moon: 'night', Plus: 'plus',
  RefreshCw: 'reload', Search: 'search', Settings2: 'cog', SlidersHorizontal: 'equalizer',
  Sparkles: 'magic-wand', Smartphone: 'mobile', Sun: 'sun', Table2: 'layout',
  Trash2: 'trash', Upload: 'upload', X: 'close',
} as const;

export type IconName = keyof typeof icons;
export function icon(name: IconName, size = 18): string {
  return `<i class="lni lni-${icons[name]}" style="font-size:${size}px" aria-hidden="true"></i>`;
}
