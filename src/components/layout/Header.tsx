import React from 'react';
import { Link } from 'react-router-dom';
import { Store, LogOut, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span className="text-xl font-bold">Wekpo</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
            <Link to="/inventory" className="hover:text-indigo-200">Inventory</Link>
            <Link to="/sales" className="hover:text-indigo-200">Sales</Link>
            <Link to="/suppliers" className="hover:text-indigo-200">Suppliers</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/profile" className="hover:text-indigo-200">
              <UserIcon className="h-5 w-5" />
            </Link>
            <button
              onClick={logout}
              className="hover:text-indigo-200"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}