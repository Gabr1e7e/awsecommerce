import { Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const INR_TO_EUR = 0.011

function convertPrice(inrString) {
  if (!inrString) return null
  const numeric = parseFloat(inrString.replace(/[₹,]/g, ''))
  if (isNaN(numeric)) return null
  const euros = numeric * INR_TO_EUR
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(euros)
}

function formatCategory(category) {
  if (!category) return ''
  return category.split('|')[0].replace(/&/g, ' & ')
}

export default function ProductCard({ product }) {
  const discountedEur = convertPrice(product.discounted_price)
  const actualEur     = convertPrice(product.actual_price)
  const category      = formatCategory(product.category)

  return (
    <Link to={`/product/${product.product_id}`} className="group block">
      <div className="
        relative flex flex-col h-full
        bg-white dark:bg-gray-900
        rounded-2xl overflow-hidden
        border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-xl
        transition-all duration-300 hover:-translate-y-1
      ">

        {/* Badge sconto */}
        {product.discount_percentage && (
          <div className="absolute top-3 left-3 z-10 bg-cognac-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            {product.discount_percentage} off
          </div>
        )}

        {/* Immagine */}
        <div className="relative bg-gray-50 dark:bg-gray-800 overflow-hidden" style={{ aspectRatio: '1/1' }}>
          <img
            src={product.img_link}
            alt={product.product_name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=No+Image' }}
          />
        </div>

        {/* Contenuto */}
        <div className="flex flex-col flex-1 p-4 gap-2">

          {/* Categoria */}
          <span className="text-xs font-semibold text-cognac-500 uppercase tracking-wider truncate">
            {category}
          </span>

          {/* Nome */}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug flex-1">
            {product.product_name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.round(parseFloat(product.rating) || 0)
                    ? 'text-cognac-400 fill-cognac-400'
                    : 'text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700'
                }
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {product.rating ?? 'N/A'}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              ({product.rating_count})
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-800 mt-1" />

          {/* Prezzi */}
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                {discountedEur ?? product.discounted_price}
              </span>
              <span className="text-xs text-gray-400 line-through mt-0.5">
                {actualEur ?? product.actual_price}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-cognac-50 dark:bg-cognac-900/20 text-cognac-500 group-hover:bg-cognac-500 group-hover:text-white transition-colors duration-200">
              <ShoppingCart size={16} />
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}