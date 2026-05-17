import { useEffect, useState } from 'react'
import { getProducts } from '../api/product'
import ProductCard from '../components/ProductPage'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(null)

      try {
        const response = await getProducts()
        setProducts(response.data)
      } catch (err) {
        setError('Impossibile caricare i prodotti. Riprovare più tardi.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cognac-500">Nuovi arrivi</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">I prodotti più richiesti</h1>

        </div>
      </div>

      {loading && (
        <div className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-12 text-center text-gray-600 dark:text-gray-300">
          Caricamento prodotti...
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 px-6 py-5 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-12 text-center text-gray-600 dark:text-gray-300">
              Nessun prodotto trovato.
            </div>
          )}
        </div>
      )}
    </section>
  )
}
