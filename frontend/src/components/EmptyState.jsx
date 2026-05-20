// EmptyState.jsx
// Uso: <EmptyState icon={<SearchX />} title="Nessun risultato" description="..." action={<Button>Riprova</Button>} />

import { PackageSearch } from "lucide-react"

export default function EmptyState({
    icon,
    title = "Nessun risultato",
    description,
    action,
    className = "",
}) {
    return (
        <div className={`
      flex flex-col items-center justify-center text-center
      rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700
      bg-gray-50 dark:bg-gray-900/50
      px-6 py-16 gap-4
      ${className}
    `}>
            <div className="text-gray-300 dark:text-gray-600">
                {icon ?? <PackageSearch size={48} strokeWidth={1} />}
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-gray-400 max-w-xs">
                        {description}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}