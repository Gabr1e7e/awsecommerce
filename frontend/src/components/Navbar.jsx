import { Sun, Moon, ShoppingCart, User, Search, Shirt, Cable, HouseHeart, Volleyball, Gamepad2, Tally4, Book } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-cognac-100 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <img src="/logo.png" alt="" className="h-12" />
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Shop<span className="text-cognac-500">pio</span>
                    </span>
                </Link>

                {/* Barra ricerca */}
                <div className="flex-1 max-w-sm relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
                    <input
                        type="text"
                        placeholder="Cerca prodotti..."
                        className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-400 text-sm text-gray-900 dark:text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-cognac-300 transition"
                    />
                </div>

                {/* Icone destra */}
                <div className="flex items-center gap-2 shrink-0">

                    {/* Toggle tema */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isDark
                            ? <Sun size={20} className="text-cognac-300" />
                            : <Moon size={20} className="text-gray-500" />
                        }
                    </button>

                    {/* Profilo */}
                    <Link
                        to="/login"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <User size={20} className="text-gray-500 dark:text-gray-400" />
                    </Link>

                    {/* Carrello */}
                    <Link
                        to="/cart"
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <ShoppingCart size={20} className="text-gray-500 dark:text-gray-400" />
                        <span className="absolute top-1 right-1 w-4 h-4 bg-cognac-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            0
                        </span>
                    </Link>

                </div>
            </div>
            <div>
                <div className="flex justify-center w-fit mx-auto  text-gray-900 dark:text-gray-400 rounded-full ">
                    <h2 className="p-2 rounded-full w-auto text-xl">
                        Categorie
                    </h2>
                </div>
                <div className="flex items-center gap-2 shrink-0 justify-center gap-10 mt-2 mb-2">

                    {/* all category*/}
                    <Link
                        to="/all"
                        title="Tutte le categorie"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Tally4 size={25} className="text-gray-800 dark:text-gray-400" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Tutte le categorie
                        </span>
                    </Link>
                    {/* abbigliamento*/}
                    <Link
                        to="/abbigliamento"
                        title="Abigliamento"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Shirt size={25} className="text-gray-800 dark:text-gray-400" />
                    </Link>

                    {/* ellettronica */}
                    <Link
                        to="/elettronica"
                        title="Elettronica"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Cable size={25} className="text-gray-800 dark:text-gray-400" />
                    </Link>

                    {/* casa  */}
                    <Link
                        to="/casa"
                        title="Casa"
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <HouseHeart size={25} className="text-gray-800 dark:text-gray-400" />
                    </Link>

                    {/* sport  */}
                    <Link
                        to="/sport"
                        title="Sport"
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Volleyball size={25} className="text-gray-800 dark:text-gray-400" />
                    </Link>
                    {/* libri  */}
                    <Link
                        to="/books"
                        title="Libri"
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Book size={25} className="text-gray-800 dark:text-gray-400" />
                    </Link>
                    {/* giochi  */}
                    <Link
                        to="/games"
                        title="Giochi"
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Gamepad2 size={25} className="text-gray-800 dark:text-gray-400" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}