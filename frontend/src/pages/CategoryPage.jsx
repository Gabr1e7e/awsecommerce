import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../api/product'
import ProductCard from '../pages/ProductPage'
import { CardSkeletonGrid } from '../components/Skeleton'
import EmptyState from '../components/EmptyState'
import { CATEGORY_MAP, CATEGORY_THEMES, SORT_OPTIONS, DEFAULT_THEME } from '../utils/constants'
import Button from '../components/Button'
import * as Icons from 'lucide-react'

const { MoveLeft, MoveRight, PackageSearch } = Icons

const LIMIT = 15

export default function CategoryPage() {
    const { category } = useParams()
    const theme = CATEGORY_THEMES[category] ?? DEFAULT_THEME
    const categoryName = CATEGORY_MAP[category] || category
    const IconComponent = Icons[theme.iconName] ?? Icons.Package

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('')
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setPage(1)
    }, [category])

    useEffect(() => {
        fetchProducts()
    }, [category, page, sort])

    async function fetchProducts() {
        setLoading(true)
        setError(null)
        try {
            const params = {
                skip: (page - 1) * LIMIT,
                limit: LIMIT,
                category: categoryName,
            }
            const res = await getProducts(params)
            setProducts(res.data)
            setTotal(res.data.length < LIMIT
                ? (page - 1) * LIMIT + res.data.length
                : page * LIMIT + 1
            )
        } catch (err) {
            const status = err?.response?.status
            if (status === 403) setError('403')
            else if (!navigator.onLine) setError('network')
            else setError('500')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">

            {/* ── Hero ───────────────────────────────────────────────────────────── */}
            <div
                className="relative overflow-hidden px-6 py-14 md:px-16 transition-all duration-700"
                style={{ background: theme.bg, color: theme.color }}
            >
                {/* Icona decorativa grande */}
                <div
                    className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ opacity: 0.12 }}
                >
                    <IconComponent size={160} color={theme.color} />
                </div>

                {/* Cerchi ambient */}
                <div
                    className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: theme.color, opacity: 0.06 }}
                />
                <div
                    className="absolute -bottom-20 right-32 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: theme.color, opacity: 0.04 }}
                />

                {/* Contenuto */}
                <div className="relative max-w-7xl mx-auto flex flex-col gap-3">
                    <span
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border w-fit"
                        style={{ borderColor: theme.color, color: theme.color, opacity: 0.8 }}
                    >
                        {categoryName}
                    </span>
                    <h1
                        className="text-4xl md:text-5xl font-bold leading-tight flex items-center gap-3"
                        style={{ color: theme.color }}
                    >
                        <IconComponent size={40} color={theme.color} />
                        {categoryName.split('&')[0].trim()}
                    </h1>
                    {theme.description && (
                        <p className="text-sm opacity-60" style={{ color: theme.color }}>
                            {theme.description}
                        </p>
                    )}
                    {total > 0 && (
                        <p className="text-xs opacity-50" style={{ color: theme.color }}>
                            {total}+ prodotti disponibili
                        </p>
                    )}
                </div>
            </div>

            {/* ── Toolbar sort ───────────────────────────────────────────────────── */}
            <div className="sticky top-16 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto">
                    <span className="text-xs text-gray-400 shrink-0">Ordina per:</span>
                    {SORT_OPTIONS.map(opt => (
                        <Button
                            key={opt.value}
                            onClick={() => { setSort(opt.value); setPage(1) }}
                            variant={sort === opt.value ? 'primary' : 'ghost'}
                            size="sm"
                        >
                            {opt.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* ── Prodotti ───────────────────────────────────────────────────────── */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">

                {loading && <CardSkeletonGrid count={LIMIT} />}

                {!loading && error && (
                    <EmptyState
                        title="Errore nel caricamento"
                        description="Non è stato possibile caricare i prodotti. Riprova."
                        action={
                            <Button onClick={fetchProducts} variant="primary" size="sm">
                                Riprova
                            </Button>
                        }
                    />
                )}

                {!loading && !error && products.length === 0 && (
                    <EmptyState
                        icon={<PackageSearch size={48} strokeWidth={1} />}
                        title="Nessun prodotto trovato"
                        description={`Non ci sono prodotti nella categoria ${categoryName}.`}
                    />
                )}

                {!loading && !error && products.length > 0 && (
                    <>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map(product => (
                                <ProductCard key={product.product_id} product={product} />
                            ))}
                        </div>

                        {/* Paginazione */}
                        <div className="flex items-center justify-center gap-3 mt-10">
                            <Button
                                onClick={() => setPage(p => p - 1)}
                                disabled={page === 1}
                                variant="ghost"
                                size="sm"
                            >
                                <MoveLeft size={18} />
                            </Button>
                            <span className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Pagina {page}
                            </span>
                            <Button
                                onClick={() => setPage(p => p + 1)}
                                disabled={products.length < LIMIT}
                                variant="ghost"
                                size="sm"
                            >
                                <MoveRight size={18} />
                            </Button>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}