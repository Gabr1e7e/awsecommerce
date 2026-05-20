

function SkeletonBox({ className }) {
    return (
        <div className={`skeleton ${className}`} />
    )
}

// Skeleton testo (una riga)
function TextSkeleton({ width = "w-full", height = "h-4" }) {
    return <SkeletonBox className={`${width} ${height} rounded-lg`} />
}

// Skeleton card prodotto
function CardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <SkeletonBox className="w-full aspect-square" />
            <div className="p-4 flex flex-col gap-3">
                <SkeletonBox className="w-1/3 h-3 rounded-full" />
                <SkeletonBox className="w-full h-4 rounded-lg" />
                <SkeletonBox className="w-3/4 h-4 rounded-lg" />
                <SkeletonBox className="w-1/2 h-3 rounded-full" />
                <div className="flex justify-between items-center mt-1">
                    <SkeletonBox className="w-1/3 h-6 rounded-lg" />
                    <SkeletonBox className="w-8 h-8 rounded-xl" />
                </div>
            </div>
        </div>
    )
}

// Skeleton avatar
function AvatarSkeleton({ size = "w-10 h-10" }) {
    return <SkeletonBox className={`${size} rounded-full`} />
}

// Skeleton immagine
function ImageSkeleton({ className = "w-full h-48 rounded-2xl" }) {
    return <SkeletonBox className={className} />
}

// Griglia di card skeleton (utile per loading liste prodotti)
export function CardSkeletonGrid({ count = 6 }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    )
}

export default function Skeleton({
    variant = "text",
    width,
    height,
    className = "",
}) {
    if (variant === "card") return <CardSkeleton />
    if (variant === "avatar") return <AvatarSkeleton size={className} />
    if (variant === "image") return <ImageSkeleton className={className} />

    return <TextSkeleton width={width} height={height} />
}