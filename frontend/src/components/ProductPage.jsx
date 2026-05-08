import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    return (
        <Link to={`/product/${product.product_id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-cognac-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">

                <div className="aspect-square bg-cognac-50 dark:bg-gray-700 overflow-hidden">
                    <img
                        src={product.img_link}
                        alt={product.product_name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=No+Image' }}
                    />
                </div>

                <div className="p-4">
                    <p className="text-xs text-cognac-500 font-medium mb-1 truncate">
                        {product.category.split('|')[0]}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 leading-snug">
                        {product.product_name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                        <Star size={14} className="text-cognac-400 fill-cognac-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {product.rating ?? 'N/A'}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">
                            ({product.rating_count})
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {product.discounted_price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            {product.actual_price}
                        </span>
                        <span className="ml-auto text-xs font-semibold text-cognac-600 bg-cognac-50 dark:bg-cognac-900/30 px-2 py-0.5 rounded-full">
                            {product.discount_percentage} off
                        </span>
                    </div>
                </div>

            </div>
        </Link>
    )
}