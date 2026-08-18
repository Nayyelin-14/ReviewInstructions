import { useState, useRef, useEffect, type ReactNode } from "react"
import {
  Search, Eye, EyeOff, ChevronDown, ChevronRight, ChevronLeft, Check,
  X, Plus, Upload, FileText, Building2, Briefcase, User, Bell, Settings,
  LayoutDashboard, BarChart2, ListFilter, SlidersHorizontal, Bookmark,
  Star, MapPin, Clock, DollarSign, Users, TrendingUp, Zap, Shield,
  AlertCircle, AlertTriangle, Info, CheckCircle, Loader2, MoreHorizontal,
  ArrowUpRight, ExternalLink, Download, Edit2, Trash2, LogOut, Moon, Sun,
  Home, ChevronUp, Circle, Minus, GripVertical, Copy, Hash, Activity,
  Target, Sparkles, Brain, FileSearch, Award, BookOpen, MessageSquare
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell
} from "recharts"

// ─── Types ───────────────────────────────────────────────────────────────────
type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "success"
type Size = "xs" | "sm" | "md" | "lg"
type StatusColor = "blue" | "amber" | "green" | "red" | "purple" | "gray"

// ─── Utility ─────────────────────────────────────────────────────────────────
const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(" ")

// ─── BUTTON ──────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
  children?: ReactNode
}

function Button({
  variant = "primary", size = "md", loading, icon, iconRight, children, className, disabled, ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
  const variants: Record<Variant, string> = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 active:scale-[0.98]",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--border)] border border-[var(--border)] active:scale-[0.98]",
    ghost: "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] active:scale-[0.98]",
    outline: "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] active:scale-[0.98]",
    danger: "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90 active:scale-[0.98]",
    success: "bg-[var(--success)] text-white hover:bg-[var(--success)]/90 active:scale-[0.98]",
  }
  const sizes: Record<Size, string> = {
    xs: "h-6 px-2 text-xs rounded-[4px]",
    sm: "h-7 px-3 text-sm rounded-[5px]",
    md: "h-8 px-4 text-sm rounded-[6px]",
    lg: "h-10 px-5 text-base rounded-[7px]",
  }
  return (
    <button
      className={cx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={14} /> : icon}
      {children}
      {iconRight}
    </button>
  )
}

function IconButton({ variant = "ghost", size = "md", icon, className, ...props }: Omit<ButtonProps, "children" | "iconRight"> & { icon: ReactNode }) {
  const base = "inline-flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 cursor-pointer"
  const variants: Record<Variant, string> = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 rounded-[6px]",
    secondary: "bg-[var(--secondary)] border border-[var(--border)] hover:bg-[var(--border)] rounded-[6px]",
    ghost: "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] rounded-[6px]",
    outline: "border border-[var(--border)] hover:bg-[var(--muted)] rounded-[6px]",
    danger: "text-[var(--danger)] hover:bg-[var(--danger-bg)] rounded-[6px]",
    success: "text-[var(--success)] hover:bg-[var(--success-bg)] rounded-[6px]",
  }
  const sizes: Record<Size, string> = {
    xs: "w-5 h-5",
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }
  return (
    <button className={cx(base, variants[variant], sizes[size], className)} {...props}>
      <span className="flex items-center justify-center">{icon}</span>
    </button>
  )
}

// ─── BADGE ───────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: ReactNode
  variant?: "default" | "outline" | "success" | "warning" | "danger" | "info" | "purple" | "gray"
  size?: "sm" | "md"
  dot?: boolean
  className?: string
}

function Badge({ children, variant = "default", size = "sm", dot, className }: BadgeProps) {
  const base = "inline-flex items-center gap-1 font-medium font-mono tracking-tight"
  const variants: Record<string, string> = {
    default: "bg-[var(--muted)] text-[var(--muted-foreground)]",
    outline: "border border-[var(--border)] text-[var(--muted-foreground)]",
    success: "bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success-border)]",
    warning: "bg-[var(--warning-bg)] text-[var(--warning)] border border-[var(--warning-border)]",
    danger: "bg-[var(--danger-bg)] text-[var(--danger)] border border-[var(--danger-border)]",
    info: "bg-[var(--info-bg)] text-[var(--info)] border border-[var(--info-border)]",
    purple: "bg-[var(--accent)] text-[var(--accent-foreground)] border border-[var(--accent-foreground)]/10",
    gray: "bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)]",
  }
  const sizes = { sm: "text-[10px] px-1.5 py-0.5 rounded-[4px]", md: "text-xs px-2 py-1 rounded-[5px]" }
  const dotColors: Record<string, string> = {
    default: "bg-[var(--muted-foreground)]", success: "bg-[var(--success)]",
    warning: "bg-[var(--warning)]", danger: "bg-[var(--danger)]",
    info: "bg-[var(--info)]", purple: "bg-[var(--primary)]",
    gray: "bg-[var(--muted-foreground)]", outline: "bg-[var(--muted-foreground)]",
  }
  return (
    <span className={cx(base, variants[variant], sizes[size], className)}>
      {dot && <span className={cx("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColors[variant])} />}
      {children}
    </span>
  )
}

function ApplicationStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeProps["variant"]; label: string }> = {
    Submitted: { variant: "info", label: "Submitted" },
    Applied: { variant: "warning", label: "Applied" },
    Hired: { variant: "success", label: "Hired" },
    Rejected: { variant: "danger", label: "Rejected" },
  }
  const config = map[status] ?? { variant: "gray", label: status }
  return <Badge variant={config.variant} dot>{config.label}</Badge>
}

function JobStatusBadge({ active }: { active: boolean }) {
  return active
    ? <Badge variant="success" dot>Active</Badge>
    : <Badge variant="gray" dot>Paused</Badge>
}

// ─── INPUT ───────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: ReactNode
  iconRight?: ReactNode
}

function Input({ label, error, hint, icon, iconRight, className, ...props }: InputProps) {
  const base = "w-full h-8 px-3 text-sm bg-[var(--background)] border border-[var(--border)] rounded-[6px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 focus:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed"
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[var(--foreground)]">{label}</label>}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-2.5 text-[var(--muted-foreground)] pointer-events-none">{icon}</span>}
        <input className={cx(base, icon ? "pl-8" : "", iconRight ? "pr-8" : "", error ? "border-[var(--danger)] focus:ring-[var(--danger)]" : "", className)} {...props} />
        {iconRight && <span className="absolute right-2.5 text-[var(--muted-foreground)]">{iconRight}</span>}
      </div>
      {error && <p className="text-[11px] text-[var(--danger)] flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
      {hint && !error && <p className="text-[11px] text-[var(--muted-foreground)]">{hint}</p>}
    </div>
  )
}

function SearchInput({ placeholder = "Search…", className, ...props }: InputProps) {
  return (
    <Input
      icon={<Search size={14} />}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  )
}

function PasswordInput({ label, error, hint, ...props }: InputProps) {
  const [show, setShow] = useState(false)
  return (
    <Input
      label={label} error={error} hint={hint}
      type={show ? "text" : "password"}
      iconRight={
        <button onClick={() => setShow(s => !s)} className="cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" tabIndex={-1}>
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      }
      {...props}
    />
  )
}

function Textarea({ label, error, hint, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[var(--foreground)]">{label}</label>}
      <textarea
        className={cx("w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-[6px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)] resize-none disabled:opacity-50", error ? "border-[var(--danger)]" : "", className)}
        {...props}
      />
      {error && <p className="text-[11px] text-[var(--danger)] flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
      {hint && !error && <p className="text-[11px] text-[var(--muted-foreground)]">{hint}</p>}
    </div>
  )
}

function SelectField({ label, error, hint, options, className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string; hint?: string; options: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[var(--foreground)]">{label}</label>}
      <div className="relative">
        <select
          className={cx("w-full h-8 pl-3 pr-8 text-sm appearance-none bg-[var(--background)] border border-[var(--border)] rounded-[6px] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)] cursor-pointer", error ? "border-[var(--danger)]" : "", className)}
          {...props}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none" />
      </div>
      {error && <p className="text-[11px] text-[var(--danger)] flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
      {hint && !error && <p className="text-[11px] text-[var(--muted-foreground)]">{hint}</p>}
    </div>
  )
}

function Checkbox({ label, checked, onChange, disabled }: { label?: string; checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label className={cx("flex items-center gap-2 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed")}>
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        className={cx("w-4 h-4 rounded-[4px] border flex-shrink-0 flex items-center justify-center transition-colors", checked ? "bg-[var(--primary)] border-[var(--primary)]" : "border-[var(--border)] bg-[var(--background)]")}
      >
        {checked && <Check size={10} strokeWidth={3} className="text-white" />}
      </div>
      {label && <span className="text-sm text-[var(--foreground)]">{label}</span>}
    </label>
  )
}

function Switch({ checked, onChange, label, disabled }: { checked?: boolean; onChange?: (v: boolean) => void; label?: string; disabled?: boolean }) {
  return (
    <label className={cx("flex items-center gap-2 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed")}>
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        className={cx("relative w-9 h-5 rounded-full transition-colors", checked ? "bg-[var(--primary)]" : "bg-[var(--border)]")}
      >
        <div className={cx("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform", checked ? "translate-x-4" : "translate-x-0.5")} />
      </div>
      {label && <span className="text-sm text-[var(--foreground)]">{label}</span>}
    </label>
  )
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ children, className, padding = "md" }: { children: ReactNode; className?: string; padding?: "none" | "sm" | "md" | "lg" }) {
  const paddings = { none: "", sm: "p-3", md: "p-4", lg: "p-6" }
  return (
    <div className={cx("bg-[var(--card)] border border-[var(--border)] rounded-[10px]", paddings[padding], className)}>
      {children}
    </div>
  )
}

function StatCard({ label, value, delta, icon, color = "primary" }: { label: string; value: string; delta?: string; icon: ReactNode; color?: "primary" | "success" | "warning" | "danger" | "info" }) {
  const colors: Record<string, string> = {
    primary: "bg-[var(--accent)] text-[var(--primary)]",
    success: "bg-[var(--success-bg)] text-[var(--success)]",
    warning: "bg-[var(--warning-bg)] text-[var(--warning)]",
    danger: "bg-[var(--danger-bg)] text-[var(--danger)]",
    info: "bg-[var(--info-bg)] text-[var(--info)]",
  }
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--muted-foreground)] font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-[var(--foreground)] mt-1 font-serif" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{value}</p>
          {delta && <p className="text-xs text-[var(--success)] flex items-center gap-0.5 mt-1"><TrendingUp size={10} />{delta}</p>}
        </div>
        <div className={cx("w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0", colors[color])}>
          {icon}
        </div>
      </div>
    </Card>
  )
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string; count?: number }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-[var(--muted)] rounded-[8px] w-fit">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cx("h-7 px-3 text-sm rounded-[6px] font-medium transition-all flex items-center gap-1.5 cursor-pointer", active === tab.id ? "bg-[var(--background)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]")}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cx("text-[10px] px-1.5 py-0.5 rounded-full font-mono", active === tab.id ? "bg-[var(--muted)] text-[var(--muted-foreground)]" : "text-[var(--muted-foreground)]")}>{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── EMPTY / ERROR / LOADING STATES ──────────────────────────────────────────
function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-[12px] bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)]">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
        {description && <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-xs">{description}</p>}
      </div>
      {action}
    </div>
  )
}

function ErrorState({ title = "Something went wrong", description, onRetry }: { title?: string; description?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-[12px] bg-[var(--danger-bg)] flex items-center justify-center text-[var(--danger)]"><AlertCircle size={20} /></div>
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
        {description && <p className="text-xs text-[var(--muted-foreground)] mt-1">{description}</p>}
      </div>
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try again</Button>}
    </div>
  )
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cx("bg-[var(--muted)] rounded-[6px] animate-pulse", className)} />
}

function LoadingSpinner({ size = 16 }: { size?: number }) {
  return <Loader2 className="animate-spin text-[var(--muted-foreground)]" size={size} />
}

// ─── ALERT ───────────────────────────────────────────────────────────────────
function Alert({ variant = "info", title, children }: { variant?: "info" | "success" | "warning" | "danger"; title?: string; children: ReactNode }) {
  const configs: Record<string, { icon: ReactNode; cls: string }> = {
    info: { icon: <Info size={14} />, cls: "bg-[var(--info-bg)] border-[var(--info-border)] text-[var(--info)]" },
    success: { icon: <CheckCircle size={14} />, cls: "bg-[var(--success-bg)] border-[var(--success-border)] text-[var(--success)]" },
    warning: { icon: <AlertTriangle size={14} />, cls: "bg-[var(--warning-bg)] border-[var(--warning-border)] text-[var(--warning)]" },
    danger: { icon: <AlertCircle size={14} />, cls: "bg-[var(--danger-bg)] border-[var(--danger-border)] text-[var(--danger)]" },
  }
  const { icon, cls } = configs[variant]
  return (
    <div className={cx("flex gap-2.5 p-3 rounded-[8px] border text-sm", cls)}>
      <span className="mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <p className={cx("opacity-90", title ? "text-xs mt-0.5" : "")}>{children}</p>
      </div>
    </div>
  )
}

// ─── AVATAR ───────────────────────────────────────────────────────────────────
function Avatar({ src, name, size = "md", className }: { src?: string; name?: string; size?: "xs" | "sm" | "md" | "lg" | "xl"; className?: string }) {
  const sizes = { xs: "w-5 h-5 text-[9px]", sm: "w-7 h-7 text-xs", md: "w-8 h-8 text-sm", lg: "w-10 h-10 text-base", xl: "w-14 h-14 text-xl" }
  const initials = name?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() ?? "?"
  const colors = ["bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700"]
  const colorIdx = name ? name.charCodeAt(0) % colors.length : 0
  return src ? (
    <img src={src} alt={name} className={cx("rounded-full object-cover flex-shrink-0", sizes[size], className)} />
  ) : (
    <div className={cx("rounded-full flex items-center justify-center font-semibold flex-shrink-0", sizes[size], colors[colorIdx], className)}>{initials}</div>
  )
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────
function Pagination({ page, total, perPage = 10, onChange }: { page: number; total: number; perPage?: number; onChange: (p: number) => void }) {
  const pages = Math.ceil(total / perPage)
  return (
    <div className="flex items-center gap-1">
      <IconButton icon={<ChevronLeft size={14} />} size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)} />
      {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onChange(p)} className={cx("w-7 h-7 text-xs rounded-[5px] font-medium transition-colors cursor-pointer", p === page ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]")}>{p}</button>
      ))}
      {pages > 5 && <span className="text-xs text-[var(--muted-foreground)] px-1">…</span>}
      <IconButton icon={<ChevronRight size={14} />} size="sm" disabled={page >= pages} onClick={() => onChange(page + 1)} />
    </div>
  )
}

// ─── BREADCRUMB ───────────────────────────────────────────────────────────────
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={11} className="text-[var(--border)]" />}
          {item.href && i < items.length - 1 ? (
            <a href={item.href} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">{item.label}</a>
          ) : (
            <span className={i === items.length - 1 ? "text-[var(--foreground)] font-medium" : "text-[var(--muted-foreground)]"}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; footer?: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-[12px] shadow-2xl">
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">{title}</h2>
            <IconButton icon={<X size={14} />} size="sm" onClick={onClose} />
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border)]">{footer}</div>}
      </div>
    </div>
  )
}

// ─── JOB CARD ─────────────────────────────────────────────────────────────────
interface JobCardProps {
  title: string
  company: string
  companyLogo?: string
  location: string
  type: string
  workMode: string
  salary?: string
  postedAt: string
  applicants?: number
  tags?: string[]
  featured?: boolean
  applied?: boolean
  onApply?: () => void
}

function JobCard({ title, company, location, type, workMode, salary, postedAt, applicants, tags, featured, applied, onApply }: JobCardProps) {
  const [saved, setSaved] = useState(false)
  return (
    <Card className={cx("hover:border-[var(--primary)]/30 transition-all duration-200 cursor-pointer group", featured && "ring-1 ring-[var(--primary)]/20")}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-[8px] bg-[var(--muted)] flex items-center justify-center flex-shrink-0 text-[var(--muted-foreground)]">
          <Building2 size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">{title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{company}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {featured && <Badge variant="purple" size="sm">Featured</Badge>}
              <IconButton icon={saved ? <Bookmark size={13} fill="currentColor" /> : <Bookmark size={13} />} size="xs" variant={saved ? "primary" : "ghost"} onClick={(e) => { e.stopPropagation(); setSaved(s => !s) }} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]"><MapPin size={9} />{location}</span>
            <span className="w-px h-3 bg-[var(--border)]" />
            <Badge variant="gray" size="sm">{type}</Badge>
            <Badge variant="outline" size="sm">{workMode}</Badge>
            {salary && <span className="text-[10px] font-mono text-[var(--muted-foreground)] flex items-center gap-0.5"><DollarSign size={9} />{salary}</span>}
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map(tag => <Badge key={tag} variant="outline" size="sm">{tag}</Badge>)}
            </div>
          )}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[var(--border)]">
            <span className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]"><Clock size={9} />{postedAt}</span>
            <div className="flex items-center gap-1.5">
              {applicants !== undefined && <span className="text-[10px] text-[var(--muted-foreground)]">{applicants} applicants</span>}
              {applied ? (
                <Badge variant="success" size="sm"><Check size={9} />Applied</Badge>
              ) : (
                <Button variant="primary" size="xs" onClick={(e) => { e.stopPropagation(); onApply?.() }}>Apply</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── COMPANY CARD ─────────────────────────────────────────────────────────────
function CompanyCard({ name, industry, location, size: companySize, openRoles }: { name: string; industry: string; location: string; size: string; openRoles: number }) {
  return (
    <Card className="hover:border-[var(--primary)]/30 transition-all duration-200 cursor-pointer group">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-[10px] bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)]">
          <Building2 size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{name}</h3>
          <p className="text-xs text-[var(--muted-foreground)]">{industry}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 text-[10px] text-[var(--muted-foreground)]">
        <span className="flex items-center gap-1"><MapPin size={9} />{location}</span>
        <span className="flex items-center gap-1"><Users size={9} />{companySize}</span>
      </div>
      <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--foreground)]">{openRoles} open roles</span>
        <Button variant="ghost" size="xs" iconRight={<ArrowUpRight size={11} />}>View</Button>
      </div>
    </Card>
  )
}

// ─── APPLICATION CARD ─────────────────────────────────────────────────────────
function ApplicationCard({ title, company, status, appliedAt, salary }: { title: string; company: string; status: string; appliedAt: string; salary?: string }) {
  const barColors: Record<string, string> = {
    Submitted: "bg-[var(--info)]",
    Applied: "bg-[var(--warning)]",
    Hired: "bg-[var(--success)]",
    Rejected: "bg-[var(--danger)]",
  }
  return (
    <Card padding="none" className="overflow-hidden hover:border-[var(--primary)]/20 transition-colors">
      <div className={cx("h-0.5", barColors[status] ?? "bg-[var(--border)]")} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">{title}</h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{company}</p>
          </div>
          <ApplicationStatusBadge status={status} />
        </div>
        <div className="flex items-center gap-3 mt-3 text-[10px] text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1"><Clock size={9} />{appliedAt}</span>
          {salary && <span className="flex items-center gap-1"><DollarSign size={9} />{salary}</span>}
        </div>
      </div>
    </Card>
  )
}

// ─── CANDIDATE CARD ───────────────────────────────────────────────────────────
function CandidateCard({ name, email, score, status, bio, premium }: { name: string; email: string; score: number; status: string; bio?: string; premium?: boolean }) {
  const scoreColor = score >= 75 ? "text-[var(--success)]" : score >= 50 ? "text-[var(--warning)]" : "text-[var(--danger)]"
  return (
    <Card className="hover:border-[var(--primary)]/20 transition-colors">
      <div className="flex items-start gap-3">
        <Avatar name={name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[var(--foreground)]">{name}</span>
              {premium && <Star size={10} className="text-amber-500 fill-amber-500" />}
            </div>
            <div className="flex items-center gap-2">
              <span className={cx("text-xs font-mono font-semibold", scoreColor)}>{score}%</span>
              <ApplicationStatusBadge status={status} />
            </div>
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{email}</p>
          {bio && <p className="text-xs text-[var(--muted-foreground)] mt-1.5 line-clamp-2">{bio}</p>}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[var(--border)]">
        <Button variant="outline" size="xs" icon={<FileText size={11} />}>Resume</Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="xs">Reject</Button>
          <Button variant="success" size="xs">Hire</Button>
        </div>
      </div>
    </Card>
  )
}

// ─── AI STREAMING CONTAINER ───────────────────────────────────────────────────
function AIStreamingContainer({ stage }: { stage: "idle" | "progress" | "done" }) {
  const stages = ["Downloading resume…", "Parsing PDF…", "Analyzing match…", "Generating insights…"]
  const [stageIdx, setStageIdx] = useState(0)
  useEffect(() => {
    if (stage !== "progress") return
    const t = setInterval(() => setStageIdx(i => (i + 1) % stages.length), 900)
    return () => clearInterval(t)
  }, [stage])

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-[8px] bg-[var(--accent)] flex items-center justify-center text-[var(--primary)]"><Brain size={14} /></div>
        <span className="text-sm font-semibold text-[var(--foreground)]">AI Match Analysis</span>
        {stage === "progress" && <Badge variant="purple" dot>Analyzing</Badge>}
        {stage === "done" && <Badge variant="success" dot>Complete</Badge>}
      </div>
      {stage === "idle" && <div className="flex flex-col items-center py-6 gap-2"><Brain size={28} className="text-[var(--muted-foreground)]" /><p className="text-xs text-[var(--muted-foreground)]">Run analysis to see match score</p><Button variant="primary" size="sm" icon={<Sparkles size={13} />}>Analyze Match</Button></div>}
      {stage === "progress" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]"><Loader2 size={12} className="animate-spin text-[var(--primary)]" />{stages[stageIdx]}</div>
          <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden"><div className="h-full bg-[var(--primary)] rounded-full animate-pulse w-2/3" /></div>
          <div className="space-y-1.5">{[40, 65, 80].map((w, i) => <Skeleton key={i} className={`h-3`} style={{ width: `${w}%` }} />)}</div>
        </div>
      )}
      {stage === "done" && (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <AIScoreRing score={82} size={80} />
            <div>
              <Badge variant="success" size="md">Strong Match</Badge>
              <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-[200px]">Your profile aligns well with this role's requirements</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide mb-1">Strengths</p>{["React", "TypeScript", "REST APIs"].map(s => <div key={s} className="flex items-center gap-1 text-xs text-[var(--success)] mb-0.5"><Check size={9} />{s}</div>)}</div>
            <div><p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide mb-1">Gaps</p>{["GraphQL", "AWS"].map(s => <div key={s} className="flex items-center gap-1 text-xs text-[var(--warning)] mb-0.5"><Minus size={9} />{s}</div>)}</div>
          </div>
        </div>
      )}
    </Card>
  )
}

function AIScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const r = size * 0.36
  const c = 2 * Math.PI * r
  const filled = (score / 100) * c
  const color = score >= 75 ? "var(--success)" : score >= 50 ? "var(--warning)" : "var(--danger)"
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={size * 0.08} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={size * 0.08} strokeDasharray={`${filled} ${c - filled}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-[var(--foreground)]" style={{ fontFamily: "'Fraunces', serif" }}>{score}</span>
        <span className="text-[8px] text-[var(--muted-foreground)] uppercase tracking-wide">match</span>
      </div>
    </div>
  )
}

// ─── PIPELINE FUNNEL ──────────────────────────────────────────────────────────
function HiringPipeline() {
  const stages = [
    { label: "Submitted", count: 124, pct: 100 },
    { label: "Applied", count: 87, pct: 70 },
    { label: "Hired", count: 23, pct: 18 },
  ]
  const colors = ["bg-[var(--info)]", "bg-[var(--warning)]", "bg-[var(--success)]"]
  return (
    <div className="space-y-2">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="text-xs text-[var(--muted-foreground)] w-16 text-right flex-shrink-0">{s.label}</span>
          <div className="flex-1 h-5 bg-[var(--muted)] rounded-[4px] overflow-hidden">
            <div className={cx("h-full rounded-[4px] flex items-center px-2", colors[i])} style={{ width: `${s.pct}%` }}>
              <span className="text-[10px] font-mono text-white">{s.count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── STRENGTH METER ───────────────────────────────────────────────────────────
function PasswordStrengthMeter({ strength }: { strength: 0 | 1 | 2 | 3 | 4 }) {
  const labels = ["", "Weak", "Fair", "Good", "Strong"]
  const colors = ["", "bg-[var(--danger)]", "bg-[var(--warning)]", "bg-amber-400", "bg-[var(--success)]"]
  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={cx("h-1 flex-1 rounded-full transition-all duration-300", i <= strength ? colors[strength] : "bg-[var(--muted)]")} />
        ))}
      </div>
      {strength > 0 && <p className="text-[10px] text-[var(--muted-foreground)]">{labels[strength]}</p>}
    </div>
  )
}

// ─── FILTER BAR ───────────────────────────────────────────────────────────────
function FilterBar() {
  const [jobType, setJobType] = useState<string[]>([])
  const [workMode, setWorkMode] = useState<string | null>(null)
  const toggleJobType = (t: string) => setJobType(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-[var(--muted-foreground)] flex items-center gap-1"><ListFilter size={12} />Filter:</span>
      {["Full-time", "Part-time", "Contract"].map(t => (
        <button key={t} onClick={() => toggleJobType(t)} className={cx("h-6 px-2.5 text-xs rounded-full border transition-all cursor-pointer font-medium", jobType.includes(t) ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/50 hover:text-[var(--foreground)]")}>{t}</button>
      ))}
      <span className="w-px h-4 bg-[var(--border)]" />
      {["Remote", "Hybrid", "On-site"].map(m => (
        <button key={m} onClick={() => setWorkMode(p => p === m ? null : m)} className={cx("h-6 px-2.5 text-xs rounded-full border transition-all cursor-pointer font-medium", workMode === m ? "bg-[var(--accent)] text-[var(--primary)] border-[var(--primary)]/30" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]")}>{m}</button>
      ))}
      {(jobType.length > 0 || workMode) && (
        <button onClick={() => { setJobType([]); setWorkMode(null) }} className="h-6 px-2 text-xs text-[var(--danger)] hover:bg-[var(--danger-bg)] rounded-full flex items-center gap-1 transition-colors cursor-pointer"><X size={10} />Clear</button>
      )}
    </div>
  )
}

// ─── DATA TABLE ───────────────────────────────────────────────────────────────
const tableData = [
  { title: "Senior Frontend Engineer", location: "Remote", status: true, applicants: 34, posted: "2d ago" },
  { title: "Product Designer", location: "New York, NY", status: true, applicants: 18, posted: "5d ago" },
  { title: "Backend Engineer", location: "San Francisco, CA", status: false, applicants: 52, posted: "1w ago" },
  { title: "DevOps Engineer", location: "Hybrid – Austin, TX", status: true, applicants: 9, posted: "3d ago" },
]

function DataTable() {
  return (
    <div className="overflow-auto rounded-[8px] border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
            {["Job Title", "Location", "Status", "Applicants", "Posted", ""].map(h => (
              <th key={h} className="text-left text-[10px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide px-3 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50 transition-colors">
              <td className="px-3 py-2.5 font-medium text-[var(--foreground)]">{row.title}</td>
              <td className="px-3 py-2.5 text-xs text-[var(--muted-foreground)]">{row.location}</td>
              <td className="px-3 py-2.5"><JobStatusBadge active={row.status} /></td>
              <td className="px-3 py-2.5 text-xs font-mono text-[var(--foreground)]">{row.applicants}</td>
              <td className="px-3 py-2.5 text-xs text-[var(--muted-foreground)]">{row.posted}</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1">
                  <IconButton icon={<Edit2 size={12} />} size="xs" />
                  <IconButton icon={<MoreHorizontal size={12} />} size="xs" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function ToastDemo() {
  const [toasts, setToasts] = useState<{ id: number; variant: string; message: string }[]>([])
  const add = (variant: string, message: string) => {
    const id = Date.now()
    setToasts(p => [...p, { id, variant, message }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000)
  }
  const icons: Record<string, ReactNode> = { success: <CheckCircle size={14} />, error: <AlertCircle size={14} />, warning: <AlertTriangle size={14} />, info: <Info size={14} /> }
  const colors: Record<string, string> = { success: "text-[var(--success)]", error: "text-[var(--danger)]", warning: "text-[var(--warning)]", info: "text-[var(--info)]" }
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="success" size="sm" onClick={() => add("success", "Application submitted successfully.")}>Success toast</Button>
        <Button variant="danger" size="sm" onClick={() => add("error", "Failed to upload resume. Try again.")}>Error toast</Button>
        <Button variant="secondary" size="sm" onClick={() => add("warning", "Resume not uploaded. Apply may be blocked.")}>Warning toast</Button>
        <Button variant="outline" size="sm" onClick={() => add("info", "New application received for Frontend Engineer.")}>Info toast</Button>
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={cx("flex items-center gap-2.5 px-3 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-[8px] shadow-lg text-sm max-w-xs animate-in slide-in-from-right-2 fade-in")}>
            <span className={colors[t.variant]}>{icons[t.variant]}</span>
            <span className="text-[var(--foreground)] flex-1">{t.message}</span>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"><X size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SIDEBAR NAV (preview) ────────────────────────────────────────────────────
function SidebarPreview({ role }: { role: "jobseeker" | "recruiter" }) {
  const [active, setActive] = useState("dashboard")
  const seekerNav = [
    { id: "dashboard", icon: <LayoutDashboard size={15} />, label: "Dashboard" },
    { id: "applications", icon: <Briefcase size={15} />, label: "Applications", badge: "3" },
    { id: "skills", icon: <Zap size={15} />, label: "Skills" },
    { id: "resume", icon: <FileText size={15} />, label: "Resume" },
    { id: "profile", icon: <User size={15} />, label: "Profile" },
    { id: "settings", icon: <Settings size={15} />, label: "Settings" },
  ]
  const recruiterNav = [
    { id: "dashboard", icon: <LayoutDashboard size={15} />, label: "Dashboard" },
    { id: "analytics", icon: <BarChart2 size={15} />, label: "Analytics" },
    { id: "companies", icon: <Building2 size={15} />, label: "Companies" },
    { id: "jobs", icon: <Briefcase size={15} />, label: "Jobs", badge: "12" },
    { id: "post", icon: <Plus size={15} />, label: "Post a Job" },
    { id: "profile", icon: <User size={15} />, label: "Profile" },
    { id: "settings", icon: <Settings size={15} />, label: "Settings" },
  ]
  const nav = role === "jobseeker" ? seekerNav : recruiterNav
  return (
    <div className="w-52 bg-[var(--sidebar-bg)] border border-[var(--border)] rounded-[10px] overflow-hidden">
      <div className="px-3 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-[var(--primary)] flex items-center justify-center"><Briefcase size={11} className="text-white" /></div>
          <span className="text-sm font-semibold text-[var(--foreground)]">J-Track</span>
        </div>
      </div>
      <div className="p-1.5 space-y-0.5">
        {nav.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} className={cx("w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-xs font-medium transition-colors text-left cursor-pointer", active === item.id ? "bg-[var(--accent)] text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]")}>
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--primary)] text-white font-mono">{item.badge}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── TOP HEADER ───────────────────────────────────────────────────────────────
function TopHeaderPreview() {
  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-[10px] px-4 py-3 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-[6px] bg-[var(--primary)] flex items-center justify-center"><Briefcase size={11} className="text-white" /></div>
        <span className="text-sm font-semibold text-[var(--foreground)]">J-Track</span>
      </div>
      <div className="flex items-center gap-1 hidden sm:flex">
        {["Jobs", "Companies", "Pricing"].map(item => (
          <button key={item} className="px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-[6px] transition-colors cursor-pointer">{item}</button>
        ))}
      </div>
      <div className="flex-1" />
      <SearchInput placeholder="Search jobs…" className="max-w-[180px] h-7 text-xs" />
      <IconButton icon={<Bell size={14} />} size="sm" />
      <Avatar name="Alex Johnson" size="sm" />
    </div>
  )
}

// ─── CHART DATA ───────────────────────────────────────────────────────────────
const chartData = [
  { day: "Mon", views: 42, applications: 8 },
  { day: "Tue", views: 68, applications: 14 },
  { day: "Wed", views: 55, applications: 11 },
  { day: "Thu", views: 89, applications: 19 },
  { day: "Fri", views: 72, applications: 15 },
  { day: "Sat", views: 34, applications: 6 },
  { day: "Sun", views: 21, applications: 4 },
]

const statusData = [
  { status: "Submitted", count: 124, fill: "var(--info)" },
  { status: "Applied", count: 87, fill: "var(--warning)" },
  { status: "Hired", count: 23, fill: "var(--success)" },
  { status: "Rejected", count: 48, fill: "var(--danger)" },
]

// ─── SKILL CHIP ───────────────────────────────────────────────────────────────
function SkillChip({ label, onRemove }: { label: string; onRemove?: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--accent)] text-[var(--primary)] text-xs font-medium rounded-full border border-[var(--primary)]/20 transition-all">
      {label}
      {onRemove && hover && <button onClick={onRemove} className="cursor-pointer text-[var(--primary)]/60 hover:text-[var(--primary)]"><X size={10} /></button>}
    </span>
  )
}

// ─── FILE UPLOAD ──────────────────────────────────────────────────────────────
function FileUploadZone({ label = "Drop PDF here or click to upload", accept = ".pdf", hint }: { label?: string; accept?: string; hint?: string }) {
  const [drag, setDrag] = useState(false)
  const [file, setFile] = useState<string | null>(null)
  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) setFile(f.name) }}
      className={cx("border-2 border-dashed rounded-[10px] p-6 text-center transition-all cursor-pointer", drag ? "border-[var(--primary)] bg-[var(--accent)]" : "border-[var(--border)] hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]")}
    >
      {file ? (
        <div className="flex flex-col items-center gap-2">
          <FileText size={24} className="text-[var(--primary)]" />
          <p className="text-sm font-medium text-[var(--foreground)]">{file}</p>
          <button onClick={() => setFile(null)} className="text-xs text-[var(--muted-foreground)] hover:text-[var(--danger)] transition-colors cursor-pointer">Remove</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload size={20} className={drag ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"} />
          <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
          {hint && <p className="text-[10px] text-[var(--muted-foreground)]">{hint}</p>}
        </div>
      )}
    </div>
  )
}

// ─── ACTIVITY FEED ────────────────────────────────────────────────────────────
const activities = [
  { name: "Sarah Chen", action: "applied for", role: "Senior Frontend Engineer", time: "2m ago", status: "Submitted" },
  { name: "Marcus Webb", action: "was hired for", role: "Product Designer", time: "1h ago", status: "Hired" },
  { name: "Priya Sharma", action: "applied for", role: "Backend Engineer", time: "3h ago", status: "Submitted" },
  { name: "James Park", action: "was rejected for", role: "DevOps Engineer", time: "5h ago", status: "Rejected" },
]

function ActivityFeed() {
  return (
    <div className="space-y-0">
      {activities.map((a, i) => (
        <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
          <Avatar name={a.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--foreground)]">
              <span className="font-semibold">{a.name}</span>
              <span className="text-[var(--muted-foreground)]"> {a.action} </span>
              <span className="font-medium">{a.role}</span>
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-[var(--muted-foreground)]">{a.time}</span>
              <ApplicationStatusBadge status={a.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-[var(--foreground)]">{title}</h2>
        {description && <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("flex flex-wrap items-start gap-3", className)}>{children}</div>
}

// ─── PLAYGROUND SECTIONS ──────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "tokens", label: "Foundation", icon: <Hash size={13} /> },
  { id: "typography", label: "Typography", icon: <BookOpen size={13} /> },
  { id: "buttons", label: "Buttons & Controls", icon: <Circle size={13} /> },
  { id: "forms", label: "Forms", icon: <Edit2 size={13} /> },
  { id: "surfaces", label: "Cards & Surfaces", icon: <GripVertical size={13} /> },
  { id: "badges", label: "Badges & Status", icon: <Award size={13} /> },
  { id: "navigation", label: "Navigation", icon: <LayoutDashboard size={13} /> },
  { id: "feedback", label: "Feedback States", icon: <MessageSquare size={13} /> },
  { id: "overlays", label: "Overlays", icon: <Layers size={13} /> },
  { id: "job", label: "Job Components", icon: <Briefcase size={13} /> },
  { id: "ai", label: "AI Components", icon: <Brain size={13} /> },
  { id: "charts", label: "Analytics & Charts", icon: <BarChart2 size={13} /> },
]

function Layers({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

// ─── COLOR SWATCH ─────────────────────────────────────────────────────────────
function Swatch({ name, token, fg = "#fff" }: { name: string; token: string; fg?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="h-10 rounded-[6px] border border-[var(--border)]" style={{ background: `var(${token})` }} />
      <p className="text-[10px] font-mono text-[var(--muted-foreground)]">{name}</p>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("tokens")
  const [dark, setDark] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState("all")
  const [aiStage, setAiStage] = useState<"idle" | "progress" | "done">("idle")
  const [strength, setStrength] = useState<0 | 1 | 2 | 3 | 4>(2)
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "PostgreSQL"])
  const [navRole, setNavRole] = useState<"jobseeker" | "recruiter">("jobseeker")
  const [applied, setApplied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const scrollToSection = (id: string) => {
    setActive(id)
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const currentSection = active

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] flex items-center gap-3 px-4 h-11">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-[var(--primary)] flex items-center justify-center"><Briefcase size={11} className="text-white" /></div>
          <span className="text-sm font-semibold text-[var(--foreground)]">J-Track</span>
          <Badge variant="purple" size="sm">Design System</Badge>
        </div>
        <div className="flex-1" />
        <span className="text-xs text-[var(--muted-foreground)] hidden md:block">Phase 0 — Foundation</span>
        <IconButton
          icon={dark ? <Sun size={14} /> : <Moon size={14} />}
          size="sm"
          onClick={() => setDark(d => !d)}
        />
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-48 shrink-0 sticky top-11 self-start h-[calc(100vh-44px)] border-r border-[var(--border)] bg-[var(--sidebar-bg)] overflow-y-auto">
          <nav className="p-2 space-y-0.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cx("w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] text-xs font-medium transition-colors text-left cursor-pointer", active === item.id ? "bg-[var(--accent)] text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]")}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main ref={contentRef} className="flex-1 overflow-auto px-4 md:px-8 py-8 max-w-4xl space-y-16">

          {/* ── FOUNDATION ── */}
          <div id="section-tokens">
            <Section title="Foundation — Tokens & Color" description="The complete token set for light and dark mode.">
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Surfaces</p>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
                  <Swatch name="background" token="--background" />
                  <Swatch name="card" token="--card" />
                  <Swatch name="muted" token="--muted" />
                  <Swatch name="secondary" token="--secondary" />
                  <Swatch name="accent" token="--accent" />
                  <Swatch name="border" token="--border" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Interactive</p>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
                  <Swatch name="primary" token="--primary" />
                  <Swatch name="success" token="--success" />
                  <Swatch name="warning" token="--warning" />
                  <Swatch name="danger" token="--danger" />
                  <Swatch name="info" token="--info" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Semantic Backgrounds</p>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
                  <Swatch name="success-bg" token="--success-bg" />
                  <Swatch name="warning-bg" token="--warning-bg" />
                  <Swatch name="danger-bg" token="--danger-bg" />
                  <Swatch name="info-bg" token="--info-bg" />
                  <Swatch name="sidebar" token="--sidebar-bg" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Radius Tokens</p>
                <div className="flex flex-wrap gap-3">
                  {[{ name: "sm / 4px", r: "4px" }, { name: "md / 6px", r: "6px" }, { name: "lg / 10px", r: "10px" }, { name: "xl / 16px", r: "16px" }, { name: "pill", r: "9999px" }].map(({ name, r }) => (
                    <div key={name} className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-[var(--accent)] border border-[var(--primary)]/20" style={{ borderRadius: r }} />
                      <p className="text-[10px] font-mono text-[var(--muted-foreground)] text-center">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Spacing Scale</p>
                <div className="flex items-end gap-2">
                  {[1, 2, 3, 4, 6, 8, 10, 12, 16].map(n => (
                    <div key={n} className="flex flex-col items-center gap-1">
                      <div className="bg-[var(--primary)]/30 rounded-[2px]" style={{ width: n * 4, height: n * 4, minWidth: n * 4 }} />
                      <span className="text-[9px] font-mono text-[var(--muted-foreground)]">{n * 4}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {/* ── TYPOGRAPHY ── */}
          <div id="section-typography">
            <Section title="Typography" description="Fraunces (serif display) + Instrument Sans (body) + JetBrains Mono (data).">
              <div className="space-y-5">
                {[
                  { name: "Display", style: { fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }, text: "Find Your Next Career Move" },
                  { name: "Page Title", style: { fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, lineHeight: 1.2 }, text: "Browse Open Positions" },
                  { name: "Section Title", style: { fontSize: 18, fontWeight: 600, lineHeight: 1.3 }, text: "Your Applications" },
                  { name: "Card Title", style: { fontSize: 14, fontWeight: 600, lineHeight: 1.4 }, text: "Senior Frontend Engineer" },
                  { name: "Body", style: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 }, text: "We're looking for an experienced engineer to join our product team. You'll work on core systems that serve millions of users daily." },
                  { name: "Small", style: { fontSize: 12, fontWeight: 400, lineHeight: 1.5 }, text: "Acme Corp · Remote · Full-time · Posted 2 days ago" },
                  { name: "Caption", style: { fontSize: 11, fontWeight: 400, lineHeight: 1.4 }, text: "34 applicants · Last updated Aug 18, 2026" },
                  { name: "Label", style: { fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" as const }, text: "Job Type" },
                  { name: "Metric / KPI", style: { fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 700, lineHeight: 1 }, text: "2,847" },
                  { name: "Mono / Data", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, lineHeight: 1.4 }, text: "$120,000 – $160,000 / yr  ·  82% match" },
                ].map(({ name, style, text }) => (
                  <div key={name} className="flex items-baseline gap-4 py-2 border-b border-[var(--border)] last:border-0">
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)] w-24 shrink-0">{name}</span>
                    <p style={style} className="text-[var(--foreground)] flex-1">{text}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* ── BUTTONS ── */}
          <div id="section-buttons">
            <Section title="Buttons & Controls" description="All button variants, sizes, states, and icon buttons.">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Variants</p>
                  <Row>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="success">Success</Button>
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Sizes</p>
                  <Row className="items-center">
                    <Button variant="primary" size="xs">Extra Small</Button>
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">With Icons & States</p>
                  <Row>
                    <Button variant="primary" icon={<Plus size={13} />}>Post a Job</Button>
                    <Button variant="primary" icon={<Upload size={13} />}>Upload Resume</Button>
                    <Button variant="outline" iconRight={<ChevronDown size={13} />}>Filters</Button>
                    <Button variant="primary" loading>Submitting…</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                    <Button variant="success" icon={<Check size={13} />}>Applied</Button>
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Icon Buttons</p>
                  <Row className="items-center">
                    <IconButton icon={<Plus size={14} />} variant="primary" size="md" />
                    <IconButton icon={<Search size={14} />} variant="secondary" size="md" />
                    <IconButton icon={<Edit2 size={14} />} variant="outline" size="md" />
                    <IconButton icon={<Trash2 size={14} />} variant="danger" size="md" />
                    <IconButton icon={<Download size={14} />} variant="ghost" size="md" />
                    <IconButton icon={<Bell size={14} />} variant="ghost" size="md" />
                    <IconButton icon={<MoreHorizontal size={14} />} variant="ghost" size="md" />
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Toggles</p>
                  <Row className="items-center">
                    <Switch checked label="Active" onChange={() => {}} />
                    <Switch checked={false} label="Inactive" onChange={() => {}} />
                    <Switch checked label="Notifications" onChange={() => {}} />
                    <Switch checked={false} disabled label="Disabled" onChange={() => {}} />
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Checkboxes</p>
                  <Row>
                    <Checkbox label="Full-time" checked onChange={() => {}} />
                    <Checkbox label="Part-time" onChange={() => {}} />
                    <Checkbox label="Contract" checked onChange={() => {}} />
                    <Checkbox label="Internship" disabled onChange={() => {}} />
                  </Row>
                </div>
              </div>
            </Section>
          </div>

          {/* ── FORMS ── */}
          <div id="section-forms">
            <Section title="Form System" description="All input variants, states, validation, and selection controls.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full name" placeholder="Alex Johnson" />
                <Input label="Email address" placeholder="alex@company.com" type="email" />
                <Input label="Phone number" placeholder="+1 (555) 000-0000" type="tel" />
                <Input label="Job title" placeholder="Senior Engineer" />
                <Input label="With icon" placeholder="Search jobs…" icon={<Search size={13} />} />
                <Input label="Location" placeholder="San Francisco, CA" icon={<MapPin size={13} />} />
                <Input label="Error state" placeholder="user@example" defaultValue="bad-email" error="Please enter a valid email address." />
                <Input label="With hint" placeholder="yourapp.com" hint="Include https:// for external links." />
                <PasswordInput label="Password" placeholder="Enter password" />
                <SelectField
                  label="Employment type"
                  options={[
                    { value: "", label: "Select type…" },
                    { value: "full-time", label: "Full-time" },
                    { value: "part-time", label: "Part-time" },
                    { value: "contract", label: "Contract" },
                    { value: "internship", label: "Internship" },
                  ]}
                />
                <div className="sm:col-span-2">
                  <Textarea label="Job description" placeholder="Describe the role, responsibilities, and ideal candidate…" rows={4} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--foreground)] mb-1.5">Password strength</p>
                  <div className="space-y-2">
                    <PasswordInput placeholder="Try typing a password" onChange={e => setStrength(Math.min(4, Math.floor(e.target.value.length / 3)) as 0 | 1 | 2 | 3 | 4)} />
                    <PasswordStrengthMeter strength={strength} />
                  </div>
                </div>
                <div>
                  <FileUploadZone hint="PDF only · max 5MB" />
                </div>
              </div>
            </Section>
          </div>

          {/* ── SURFACES ── */}
          <div id="section-surfaces">
            <Section title="Cards & Surfaces" description="Card, StatCard, and elevation hierarchy.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard label="New Applications" value="124" delta="+18% this week" icon={<Briefcase size={16} />} color="primary" />
                <StatCard label="Active Postings" value="12" icon={<Activity size={16} />} color="success" />
                <StatCard label="Total Hires" value="23" delta="+4 this month" icon={<CheckCircle size={16} />} color="info" />
                <StatCard label="Avg. Match Score" value="74%" icon={<Target size={16} />} color="warning" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card padding="sm"><p className="text-xs font-mono text-[var(--muted-foreground)]">padding sm</p><p className="text-sm font-medium mt-1 text-[var(--foreground)]">Compact card</p></Card>
                <Card padding="md"><p className="text-xs font-mono text-[var(--muted-foreground)]">padding md</p><p className="text-sm font-medium mt-1 text-[var(--foreground)]">Default card</p></Card>
                <Card padding="lg"><p className="text-xs font-mono text-[var(--muted-foreground)]">padding lg</p><p className="text-sm font-medium mt-1 text-[var(--foreground)]">Spacious card</p></Card>
              </div>
            </Section>
          </div>

          {/* ── BADGES ── */}
          <div id="section-badges">
            <Section title="Badges & Status" description="All badge variants, application statuses, and job status indicators.">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Badge variants</p>
                  <Row>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="purple">Purple</Badge>
                    <Badge variant="gray">Gray</Badge>
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">With dot indicator</p>
                  <Row>
                    <Badge variant="success" dot>Active</Badge>
                    <Badge variant="warning" dot>Pending</Badge>
                    <Badge variant="danger" dot>Rejected</Badge>
                    <Badge variant="info" dot>Submitted</Badge>
                    <Badge variant="gray" dot>Paused</Badge>
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Sizes</p>
                  <Row className="items-center">
                    <Badge variant="primary" size="sm">Small badge</Badge>
                    <Badge variant="primary" size="md">Medium badge</Badge>
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Application status badges</p>
                  <Row>
                    <ApplicationStatusBadge status="Submitted" />
                    <ApplicationStatusBadge status="Applied" />
                    <ApplicationStatusBadge status="Hired" />
                    <ApplicationStatusBadge status="Rejected" />
                  </Row>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Job status badges</p>
                  <Row>
                    <JobStatusBadge active={true} />
                    <JobStatusBadge active={false} />
                  </Row>
                </div>
              </div>
            </Section>
          </div>

          {/* ── NAVIGATION ── */}
          <div id="section-navigation">
            <Section title="Navigation" description="Tabs, breadcrumb, pagination, sidebar, and top header previews.">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Tabs</p>
                  <Tabs
                    active={tab}
                    onChange={setTab}
                    tabs={[
                      { id: "all", label: "All Jobs", count: 87 },
                      { id: "active", label: "Active", count: 54 },
                      { id: "paused", label: "Paused", count: 33 },
                    ]}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Breadcrumb</p>
                  <Breadcrumb items={[{ label: "Dashboard", href: "#" }, { label: "Jobs", href: "#" }, { label: "Senior Frontend Engineer" }]} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Pagination</p>
                  <Pagination page={page} total={87} perPage={10} onChange={setPage} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Site Header</p>
                  <TopHeaderPreview />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Dashboard Sidebar</p>
                  <div className="flex gap-3">
                    <div>
                      <p className="text-[10px] text-[var(--muted-foreground)] mb-1.5">Jobseeker</p>
                      <SidebarPreview role="jobseeker" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--muted-foreground)] mb-1.5">Recruiter</p>
                      <SidebarPreview role="recruiter" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Filter Bar</p>
                  <FilterBar />
                </div>
              </div>
            </Section>
          </div>

          {/* ── FEEDBACK ── */}
          <div id="section-feedback">
            <Section title="Feedback States" description="Alerts, toasts, empty states, error states, loading, and skeletons.">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Alerts</p>
                  <div className="space-y-2">
                    <Alert variant="info" title="New Feature">AI Match Analysis is now available for all job listings.</Alert>
                    <Alert variant="success" title="Application Submitted">Your application for Senior Frontend Engineer has been received.</Alert>
                    <Alert variant="warning" title="Resume Required">Upload your resume before applying. Recruiters expect one.</Alert>
                    <Alert variant="danger" title="Upload Failed">The file exceeds the 5MB limit. Please compress and try again.</Alert>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Toast System</p>
                  <ToastDemo />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card>
                    <EmptyState
                      icon={<Briefcase size={18} />}
                      title="No applications yet"
                      description="Start applying to jobs to see your applications here."
                      action={<Button variant="primary" size="sm">Browse Jobs</Button>}
                    />
                  </Card>
                  <Card>
                    <ErrorState
                      title="Failed to load jobs"
                      description="Check your connection and try again."
                      onRetry={() => {}}
                    />
                  </Card>
                  <Card>
                    <div className="py-4 flex flex-col items-center gap-3">
                      <LoadingSpinner size={20} />
                      <p className="text-xs text-[var(--muted-foreground)]">Loading candidates…</p>
                    </div>
                  </Card>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Skeleton Loading</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-2.5 w-48" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2.5 w-40" />
                      </div>
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-2.5 w-36" />
                      </div>
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* ── OVERLAYS ── */}
          <div id="section-overlays">
            <Section title="Overlays" description="Modal, AlertDialog, and confirmation patterns.">
              <Row>
                <Button variant="outline" onClick={() => setModalOpen(true)}>Open Modal</Button>
                <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete Company</Button>
              </Row>
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Post a New Job"
                footer={
                  <>
                    <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>Create Job</Button>
                  </>
                }
              >
                <div className="space-y-3">
                  <Input label="Job title" placeholder="e.g. Senior Frontend Engineer" />
                  <SelectField
                    label="Employment type"
                    options={[
                      { value: "full-time", label: "Full-time" },
                      { value: "part-time", label: "Part-time" },
                      { value: "contract", label: "Contract" },
                    ]}
                  />
                  <Input label="Location" placeholder="Remote, San Francisco…" icon={<MapPin size={13} />} />
                </div>
              </Modal>
              <Modal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title="Delete Company"
                footer={
                  <>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button variant="danger" size="sm" onClick={() => setConfirmOpen(false)}>Delete permanently</Button>
                  </>
                }
              >
                <div className="space-y-3">
                  <Alert variant="danger">This will delete Acme Corp and all 12 associated job listings. This action cannot be undone.</Alert>
                  <p className="text-sm text-[var(--foreground)]">Are you sure you want to delete <strong>Acme Corp</strong>?</p>
                </div>
              </Modal>
            </Section>
          </div>

          {/* ── JOB COMPONENTS ── */}
          <div id="section-job">
            <Section title="Job Components" description="JobCard, CompanyCard, ApplicationCard, CandidateCard, DataTable, and activity feed.">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Job Cards</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <JobCard
                      title="Senior Frontend Engineer"
                      company="Acme Corp"
                      location="Remote"
                      type="Full-time"
                      workMode="Remote"
                      salary="$140k–$180k"
                      postedAt="2d ago"
                      applicants={34}
                      tags={["React", "TypeScript", "GraphQL"]}
                      featured
                      applied={applied}
                      onApply={() => setApplied(true)}
                    />
                    <JobCard
                      title="Product Designer"
                      company="Basecamp Ltd."
                      location="New York, NY"
                      type="Full-time"
                      workMode="Hybrid"
                      salary="$110k–$140k"
                      postedAt="5d ago"
                      applicants={18}
                      tags={["Figma", "Design Systems"]}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Company Cards</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <CompanyCard name="Acme Corp" industry="Software · SaaS" location="San Francisco, CA" size="201–500" openRoles={7} />
                    <CompanyCard name="Basecamp Ltd." industry="Productivity" location="Chicago, IL" size="51–200" openRoles={3} />
                    <CompanyCard name="Nimbus Health" industry="HealthTech" location="Boston, MA" size="11–50" openRoles={12} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Application Cards</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ApplicationCard title="Senior Frontend Engineer" company="Acme Corp" status="Submitted" appliedAt="2d ago" salary="$140k–$180k" />
                    <ApplicationCard title="Product Designer" company="Basecamp Ltd." status="Applied" appliedAt="5d ago" />
                    <ApplicationCard title="Backend Engineer" company="Nimbus Health" status="Hired" appliedAt="3w ago" salary="$130k–$160k" />
                    <ApplicationCard title="DevOps Engineer" company="Cloudify" status="Rejected" appliedAt="1mo ago" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Candidate Cards</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <CandidateCard name="Sarah Chen" email="sarah@example.com" score={87} status="Applied" bio="5 years experience with React, TypeScript, and distributed systems. Open source contributor." premium />
                    <CandidateCard name="Marcus Webb" email="marcus@example.com" score={54} status="Submitted" bio="Full-stack background with Node.js and PostgreSQL. Recently transitioned from backend to product." />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Data Table</p>
                  <DataTable />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Activity Feed</p>
                  <Card><ActivityFeed /></Card>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Skill Chips</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(s => <SkillChip key={s} label={s} onRemove={() => setSkills(p => p.filter(x => x !== s))} />)}
                    <button onClick={() => setSkills(p => [...p, "GraphQL"])} className="inline-flex items-center gap-1 px-2.5 py-1 border border-dashed border-[var(--border)] text-xs text-[var(--muted-foreground)] rounded-full hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors cursor-pointer"><Plus size={10} />Add skill</button>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Hiring Pipeline</p>
                  <Card><HiringPipeline /></Card>
                </div>
              </div>
            </Section>
          </div>

          {/* ── AI COMPONENTS ── */}
          <div id="section-ai">
            <Section title="AI Components" description="Streaming containers, score rings, progress states, and resume analysis.">
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Idle</p>
                    <AIStreamingContainer stage="idle" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Analyzing</p>
                    <AIStreamingContainer stage="progress" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Complete</p>
                    <AIStreamingContainer stage="done" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Score Rings</p>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-1"><AIScoreRing score={82} size={80} /><p className="text-[10px] text-[var(--muted-foreground)]">Strong</p></div>
                    <div className="flex flex-col items-center gap-1"><AIScoreRing score={61} size={80} /><p className="text-[10px] text-[var(--muted-foreground)]">Moderate</p></div>
                    <div className="flex flex-col items-center gap-1"><AIScoreRing score={38} size={80} /><p className="text-[10px] text-[var(--muted-foreground)]">Weak</p></div>
                    <div className="flex flex-col items-center gap-1"><AIScoreRing score={94} size={100} /><p className="text-[10px] text-[var(--muted-foreground)]">Large ring</p></div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">ATS Score Breakdown (Resume Analysis)</p>
                  <Card>
                    <div className="flex items-center gap-3 mb-4">
                      <AIScoreRing score={78} size={72} />
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">ATS Score: 78/100</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Your resume is well-optimized for applicant tracking systems.</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { category: "Formatting", score: 18, max: 20 },
                        { category: "Keywords", score: 19, max: 25 },
                        { category: "Experience", score: 22, max: 25 },
                        { category: "Education", score: 9, max: 10 },
                        { category: "Skills", score: 8, max: 10 },
                        { category: "Achievements", score: 6, max: 10 },
                      ].map(({ category, score, max }) => (
                        <div key={category}>
                          <div className="flex justify-between text-[10px] mb-0.5">
                            <span className="text-[var(--muted-foreground)]">{category}</span>
                            <span className="font-mono text-[var(--foreground)]">{score}/{max}</span>
                          </div>
                          <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${(score / max) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted-foreground)] mb-2">Demo Controls</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setAiStage("idle")}>Reset</Button>
                    <Button size="sm" variant="primary" icon={<Sparkles size={12} />} onClick={() => { setAiStage("progress"); setTimeout(() => setAiStage("done"), 3200) }}>Run Analysis</Button>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* ── CHARTS ── */}
          <div id="section-charts">
            <Section title="Analytics & Charts" description="Recharts-based bar, area, and status charts used in recruiter dashboards.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <p className="text-xs font-semibold text-[var(--foreground)] mb-3">Daily Views & Applications</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={chartData} barSize={8} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <RTooltip
                        contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }}
                        labelStyle={{ color: "var(--foreground)" }}
                        itemStyle={{ color: "var(--muted-foreground)" }}
                      />
                      <Bar dataKey="views" fill="var(--primary)" radius={[2, 2, 0, 0]} opacity={0.7} />
                      <Bar dataKey="applications" fill="var(--success)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]"><span className="w-2 h-2 rounded-sm bg-[var(--primary)] opacity-70" />Views</span>
                    <span className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]"><span className="w-2 h-2 rounded-sm bg-[var(--success)]" />Applications</span>
                  </div>
                </Card>
                <Card>
                  <p className="text-xs font-semibold text-[var(--foreground)] mb-3">Application Trend</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <RTooltip
                        contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }}
                        labelStyle={{ color: "var(--foreground)" }}
                      />
                      <Area type="monotone" dataKey="applications" stroke="var(--primary)" strokeWidth={2} fill="url(#appGrad)" dot={{ r: 2, fill: "var(--primary)" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
                <Card>
                  <p className="text-xs font-semibold text-[var(--foreground)] mb-3">Applications by Status</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={statusData} layout="vertical" barSize={12}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="status" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={60} />
                      <RTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} />
                      <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                        {statusData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
                <Card>
                  <p className="text-xs font-semibold text-[var(--foreground)] mb-3">Hiring Pipeline</p>
                  <HiringPipeline />
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[var(--border)]">
                    {[{ label: "Submitted", value: "124", color: "var(--info)" }, { label: "Applied", value: "87", color: "var(--warning)" }, { label: "Hired", value: "23", color: "var(--success)" }].map(s => (
                      <div key={s.label} className="text-center">
                        <p className="text-lg font-bold text-[var(--foreground)]" style={{ fontFamily: "'Fraunces', serif", color: s.color }}>{s.value}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Section>
          </div>

          <div className="h-16" />
        </main>
      </div>
    </div>
  )
}
