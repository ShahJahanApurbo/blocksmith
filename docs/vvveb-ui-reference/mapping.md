# Vvveb (Bootstrap) → Tailwind Mapping

> Pre-built translation table for reimplementing Vvveb's UI in Tailwind + shadcn. Values in the **Exact token** column come from `tokens.json` (measured from Vvveb SCSS). Apache-2.0 source: [VvvebJs](https://github.com/givanz/VvvebJs).

## Layout & structure

| Vvveb / Bootstrap | Tailwind / shadcn equivalent | Exact token (1440×900) |
| --- | --- | --- |
| `#vvveb-builder` fixed layout | `h-screen overflow-hidden flex flex-col` | — |
| `#top-panel` | `h-[35px] border-b flex justify-between` | `layout.topbarHeight` |
| `#left-panel` / `#right-panel` | `fixed top-[35px] w-[300px] h-[calc(100vh-35px)]` | `layout.leftPanelWidth` |
| `#canvas` | `fixed top-[35px] left-[300px] right-[300px] bg-[#e9ecef]` | `layout.canvasBgLight` |
| `#bottom-panel` | `fixed bottom-0 h-[35px] left-[300px] right-[300px] border-t` | `layout.bottomPanelHeight` |
| `.row` / `.col-*` | `grid grid-cols-12` / `col-span-*` | — |
| `.d-flex` / `.flex-column` | `flex flex-col` | — |
| `.float-start` / `.float-end` | `float-left` / `float-right` or `ml-auto` | — |
| `.nav-tabs` / `.nav-link` | shadcn `<Tabs>` | `styleManager.navTabPadding` |
| `.nav-fill` | `grid grid-cols-N w-full` | — |
| `.breadcrumb` | shadcn `<Breadcrumb>` | `typography.breadcrumbFontSize` |

## Buttons & actions

| Vvveb / Bootstrap | Tailwind / shadcn equivalent | Exact token |
| --- | --- | --- |
| `.btn .btn-primary` | shadcn `<Button>` default variant | `colors.primaryButtonOverride` (#0030C0) |
| `.btn .btn-light` | shadcn `<Button variant="ghost">` | `topbar.btnLightPadding` |
| `.btn .btn-outline-secondary` | shadcn `<Button variant="outline">` | border via `--bs-border-color` |
| `.btn-icon` | `<Button size="icon">` + lucide icon | shadow stack in SCSS |
| `.btn-sm` / `.btn-xs` | `<Button size="sm">` | `0.8rem` / `0.75rem` |
| `.btn-group` | `inline-flex rounded-md shadow-sm` | — |
| `.save-btn` | `<Button>` + split dropdown | `topbar.saveBtnFontSize` |
| `#select-actions a` | `inline-flex h-6 items-center px-1.5 text-white bg-primary rounded-t` | `canvas.toolbarBg` |
| `.add-section-btn` | `rounded-full w-8 h-8 bg-primary text-white` | `canvas.addSectionBtnSize` |

## Forms & inputs (Style Manager)

| Vvveb / Bootstrap | Tailwind / shadcn equivalent | Exact token |
| --- | --- | --- |
| `.form-control` | shadcn `<Input>` | `controls.fontSize` (12px) |
| `.form-select` | shadcn `<Select>` | custom arrow 10×12px |
| `.form-check` / `.form-switch` | shadcn `<Checkbox>` / `<Switch>` | — |
| `.form-check-input` | shadcn checkbox | inset shadow |
| `.input-group` | `flex` + shadcn Input + Select | — |
| `.input-group.css-unit` | number input + unit `<Select>` | `CssUnitInput` pattern |
| `input[type="color"]` | native color input or shadcn + popover | `24px` square |
| `.toggle` / `.toggle-checkbox` | shadcn `<Switch>` | 65×20px custom toggle |
| `.search .form-control` | shadcn `<Input>` borderless | `12px` font |
| `.percent input` | `<Input type="number">` with `%` suffix | zoom control |
| `label.header` | collapsible `<CollapsibleTrigger>` | `11px` / `font-medium` |
| `.header-arrow` | lucide `ChevronDown` / `ChevronRight` | — |
| `.mb-2.row` property row | `grid grid-cols-12 gap-2 items-center mb-2` | — |
| property `label` | `text-[11px] font-medium text-muted-foreground` | `controls.labelFontSize` |

## Panels & chrome

| Vvveb / Bootstrap | Tailwind / shadcn equivalent | Exact token |
| --- | --- | --- |
| `.bg-light` / panel bg | `bg-background` | `#ffffff` light |
| `.text-muted` | `text-muted-foreground` | `#6c757d` |
| `.border` | `border border-border` | `#dfdfdf` light |
| `.card` | shadcn `<Card>` | `rounded-lg border shadow-sm` |
| `.card-header` | `border-b px-4 py-3 font-semibold` | — |
| `.modal` / `.offcanvas` | shadcn `<Dialog>` / `<Sheet>` | modal `0.875rem` font |
| `.dropdown-menu` | shadcn `<DropdownMenu>` | viewport switcher |
| `.alert-light` | shadcn `<Alert variant="default">` | — |
| `.hint` tooltip | shadcn `<Tooltip>` | 12px, dark bg |
| panel label `11px` | `text-[11px]` (chrome only) | `controls.labelFontSize` |
| panel width `300px` | `w-[300px]` or theme `spacing.panel` | `layout.leftPanelWidth` |
| scrollbar | `scrollbar-thin` plugin or custom CSS | `0.5rem` width |

## Palette components

| Vvveb / Bootstrap | Tailwind / shadcn equivalent | Exact token |
| --- | --- | --- |
| `li[data-type]` component tile | `w-[44%] min-w-[80px] h-20 text-[11px] border rounded-sm cursor-grab` | `palette.componentTileHeight` |
| `.blocks-list li` | `w-[42%] min-h-[100px] border cursor-grab` | `palette.blockTileWidth` |
| `.sections-list li` | grid tile with preview image | — |
| `#elements-tabs .nav-link` | icon tab button | `1.4rem` icon container |
| `.drag-elements-sidepane` | `flex-1 overflow-hidden` | scroll on hover |
| `.block-preview` | absolute flyout preview panel | right of list |

## Canvas overlays

| Vvveb / Bootstrap | Tailwind / shadcn equivalent | Exact token |
| --- | --- | --- |
| `#highlight-box` | absolute div `border border-primary pointer-events-none` | `1px solid #0d6efd` |
| `#select-box` | absolute div `border border-primary bg-primary/10` | `canvas.selectOutline` |
| `#select-box.text-edit` | `border-dashed border-black/20` | inline edit state |
| `#drop-highlight-box` | `border-2 border-primary rounded` | `2px`, `4px` radius |
| `#highlight-name` | `absolute -top-5 left-0 bg-primary text-white text-xs px-1 rounded-t` | — |
| `#wysiwyg-editor` | floating toolbar `bg-background border shadow` | above selection |
| `.resize > div` | 8 resize handles `w-2.5 h-2.5 border-2 border-primary` | — |
| `.is-dragged` | `opacity-15 pointer-events-none` | drag source ghost |
| `#dragElement-clone` | floating drag preview | `64×64` icon clone |

## Layers & sections

| Vvveb / Bootstrap | Tailwind / shadcn equivalent | Exact token |
| --- | --- | --- |
| `#tree-list` | shadcn `<ScrollArea>` in floating `Card` | `250×500px` default |
| `#tree-list label.active` | `border border-primary/15 bg-primary/5` | — |
| `.section-item` | draggable row with handle | `border-radius: 3px` |
| `.section-item.drag-over` | `border-2 border-dashed border-primary` | drop target |
| `.sections-container .handle` | `cursor-grab` grip dots | — |
| `.breadcrumb-navigator a` | pill chips per ancestor | `12px` font |

## Colors (Bootstrap CSS vars → Tailwind theme)

| Bootstrap variable | Hex (light) | Tailwind theme key |
| --- | --- | --- |
| `--bs-primary` | `#0d6efd` | `--primary` |
| `--bs-body-bg` | `#ffffff` | `--background` |
| `--bs-body-color` | `#212529` | `--foreground` |
| `--bs-secondary-color` | `#6c757d` | `--muted-foreground` |
| `--bs-secondary-bg` | `#e9ecef` | `--muted` (canvas bg) |
| `--bs-border-color` | `#dfdfdf` | `--border` |
| `--bs-link-color` | `#0d6efd` | `--primary` |
| `--bs-body-bg` (dark) | `#212529` | dark `--background` |
| `--bs-border-color` (dark) | `#444444` | dark `--border` |

## Spacing scale notes

| Bootstrap | Value | Tailwind note |
| --- | --- | --- |
| `.p-3` | 1rem (16px) | `p-4` in default Tailwind scale |
| `.mb-3` | 1rem | `mb-4` |
| `.px-1` | 0.25rem | `px-1` |
| `.me-3` | 1rem margin-end | `me-4` |
| Vvveb `0.3rem` tab padding | ~4.8px | `py-1` or `py-[0.3rem]` |
| Vvveb `0.5rem` group padding | 8px | `p-2` |

## Icons

| Vvveb | Blocksmith equivalent |
| --- | --- |
| Line Awesome (`la la-*`) | lucide-react icons (per-action mapping in component spec) |
| Ionicons (`icon-*-outline`) | lucide-react equivalents |
| Custom SVG layout icons | lucide `PanelLeft`, `PanelRight`, `Layers`, etc. |

## Notes

- Editor **chrome** (panels, toolbars, overlays) should use exact pixel values from `tokens.json` — e.g. `text-[11px]`, `w-[300px]`, `h-[35px]`.
- Generated **page content** inside the canvas iframe must use token-scale Tailwind only (see [prompt-token.md](../prompt-token.md)).
- Vvveb primary button overrides Bootstrap to `#0030C0`; selection/highlight uses stock Bootstrap primary `#0d6efd`. Preserve both roles in Blocksmith theme if matching exactly.
- Apache-2.0: CSS value extraction permitted with attribution in NOTICE.
