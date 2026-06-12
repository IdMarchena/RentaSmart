import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

export const Sidebar = () => {
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const menuItems = [
        { path: "/admin", label: "Dashboard", icon: "🏠" },
        { path: "/admin/publications", label: "Publicaciones", icon: "📋" },
        { path: "/admin/contracts", label: "Contratos", icon: "📄" },
        { path: "/admin/messages", label: "Mensajes", icon: "💬" },
        { path: "/admin/services", label: "Servicios", icon: "🔧" },
        { path: "/admin/user", label: "Usuarios", icon: "👥" },
        { path: "/admin/servicesAdmin", label: "Admin Servicios", icon: "⚙️" },
        { path: "/admin/favorites", label: "Favoritos", icon: "❤️" }
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#393939] text-white h-screen transition-all duration-300 flex flex-col`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <h2 className="text-xl font-bold">RentaSmart</h2>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded hover:bg-gray-700 transition-colors"
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center p-3 rounded-lg transition-colors ${
                                    isActive(item.path)
                                        ? 'bg-[#EB8369] text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {!isCollapsed && (
                                    <span className="ml-3">{item.label}</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                {!isCollapsed && (
                    <div className="text-sm text-gray-400">
                        Panel Admin
                    </div>
                )}
            </div>
        </div>
    )
}
