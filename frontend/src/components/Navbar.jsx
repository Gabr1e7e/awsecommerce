import { Sun, Moon, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';


export default function Navbar() {
    const {isDark, toggleTheme} = useTheme()
    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <ShoppingBag className="text-indigo-600 dark:text-indigo-400" size={24} />
                    <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        AWS<span className="text-indigo-600 dark:text-indigo-400">shop</span>
                    </span>
                </Link>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    {isDark
                        ? <Sun size={20} className="text-yellow-400" />
                        : <Moon size={20} className="text-gray-600" />
                    }
                </button>

            </div>
        </nav>
    )
}