// Button.jsx
// Uso: <Button variant="primary" size="md" leftIcon={<Plus />} onClick={fn}>Testo</Button>
//
// variant: "primary" | "secondary" | "ghost" | "danger" | "outline"
// size:    "xs" | "sm" | "md" | "lg"

const VARIANTS = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    danger: "btn-error",
    outline: "btn-outline",
}

const SIZES = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    loading = false,
    disabled = false,
    fullWidth = false,
    onClick,
    type = "button",
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        btn gap-2
        ${VARIANTS[variant] ?? VARIANTS.primary}
        ${SIZES[size] ?? ""}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
        >
            {loading
                ? <span className="loading loading-spinner" />
                : leftIcon}
            {children}
            {!loading && rightIcon}
        </button>
    )
}