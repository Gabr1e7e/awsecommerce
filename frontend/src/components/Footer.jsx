import { Mail, Phone, MapPin, ShoppingCart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AWS Ecommerce</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Il tuo shop online per prodotti scelti con cura. Spedizioni rapide, assistenza sempre disponibile e offerte esclusive.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <span>Shopping semplice e veloce</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">Link utili</h3>
          <div className="grid gap-2 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="transition hover:text-gray-900 dark:hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-gray-900 dark:hover:text-white">Termini</a>
            <a href="#" className="transition hover:text-gray-900 dark:hover:text-white">Contatti</a>
            <a href="#" className="transition hover:text-gray-900 dark:hover:text-white">Supporto</a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">Contattaci</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
                <Mail className="h-4 w-4" />
              </span>
              <span>info@awsecommerce.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
                <Phone className="h-4 w-4" />
              </span>
              <span>+39 012 345 6789</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
                <MapPin className="h-4 w-4" />
              </span>
              <span>Via Web 12, Milano, IT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
