import { useEffect, useState } from 'react'
import { getProducts, getCategories } from '../api/product'
import ProductCard from './ProductPage'

const LIMIT = 15

export default function HomePage() {
  const [products, setProducts]         = useState([])
  const [categories, setCategories]     = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [page, setPage]                 = useState(1)

  // ─── Carica categorie una volta sola ────────────────────────────────────────
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getCategories()
        setCategories(res.data)
      } catch (err) {
        console.error('Errore categorie:', err)
      }
    }
    fetchCategories()
  }, [])

  // ─── Carica prodotti quando cambia categoria o pagina ───────────────────────
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        const params = {
          skip: (page - 1) * LIMIT,
          limit: LIMIT,
          ...(activeCategory && { category: activeCategory }),
        }
        const res = await getProducts(params)
        setProducts(res.data)
      } catch (err) {
        const status = err?.response?.status
        if (status === 403)        setError('403')
        else if (!navigator.onLine) setError('network')
        else                        setError('500')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [activeCategory, page])

  // ─── Cambio categoria ────────────────────────────────────────────────────────
  function handleCategoryChange(cat) {
    setActiveCategory(cat)
    setPage(1)
  }

  // ─── Errore ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 px-6 py-5 text-red-700 dark:text-red-300">
        Errore: {error}
      </div>
    )
  }

  return (
    <section className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="text-sm uppercase tracking-[0.3em] text-cognac-500">Nuovi arrivi</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {activeCategory || 'I prodotti più richiesti'}
        </h1>
      </div>

      {/* Tab categorie */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border
              ${!activeCategory
                ? 'bg-cognac-500 text-white border-cognac-500'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-cognac-300'
              }`}
          >
            Tutti
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border
                ${activeCategory === cat
                  ? 'bg-cognac-500 text-white border-cognac-500'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-cognac-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Skeleton loading */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse aspect-[3/4]" />
          ))}
        </div>
      )}

      {/* Griglia prodotti */}
      {!loading && (
        <>
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-12 text-center text-gray-600 dark:text-gray-300">
              Nessun prodotto trovato.
            </div>
          )}

          {/* Paginazione */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={page === 1}
              className="btn btn-ghost btn-sm disabled:opacity-30"
            >
              ← Precedente
            </button>
            <span className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
              Pagina {page}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={products.length < LIMIT}
              className="btn btn-ghost btn-sm disabled:opacity-30"
            >
              Successiva →
            </button>
          </div>
        </>
      )}

    </section>
  )
}