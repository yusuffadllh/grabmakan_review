/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  ShoppingBag, 
  User, 
  History as HistoryIcon, 
  HelpCircle, 
  Tag, 
  Search,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Menu as MenuIcon,
  ArrowLeft
} from 'lucide-react';
import { View } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Views
import HomeView from './views/Home';
import RestaurantDetailView from './views/RestaurantDetail';
import CartView from './views/Cart';
import CheckoutView from './views/Checkout';
import TrackingView from './views/Tracking';
import HistoryView from './views/History';
import ReviewView from './views/Review';
import AuthView from './views/Auth';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cartCount, setCartCount] = useState(2);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

const renderView = () => {
  switch (currentView) {
    case 'home':
      return (
        <HomeView
          onNavigate={setCurrentView}
          setSelectedRestaurant={setSelectedRestaurant}
        />
      );

    case 'restaurant': return <RestaurantDetailView onNavigate={setCurrentView} restaurant={selectedRestaurant} cartItems={cartItems} setCartItems={setCartItems} />

    case 'cart': return <CartView onNavigate={setCurrentView} cartItems={cartItems} />;

    case 'checkout': return <CheckoutView onNavigate={setCurrentView} />;

    case 'tracking': return <TrackingView onNavigate={setCurrentView} />;

    case 'history':return <HistoryView onNavigate={setCurrentView} />;

    case 'review':
      return <ReviewView onNavigate={setCurrentView} />;

    case 'auth':
      return <AuthView onNavigate={setCurrentView} />;

    default:
      return (
        <HomeView
          onNavigate={setCurrentView}
          setSelectedRestaurant={setSelectedRestaurant}
        />
      );
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      {/* Navbar - Only show if not in Auth view */}
      {currentView !== 'auth' && (
        <header className="bg-white/90 border-b border-slate-100 backdrop-blur-md sticky top-0 z-50">
          <div className="flex justify-between items-center h-16 px-4 md:px-8 max-w-[1440px] mx-auto w-full">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-2xl font-black text-primary cursor-pointer"
              >
                GrabMakan
              </button>
              <nav className="hidden lg:flex items-center gap-6">
                <button onClick={() => setCurrentView('home')} className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}>Offers</button>
                <button onClick={() => setCurrentView('history')} className={`text-sm font-medium transition-colors ${currentView === 'history' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}>History</button>
                <button className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Help</button>
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              {currentView === 'home' && (
                <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30 w-64 lg:w-96">
                  <Search className="w-4 h-4 text-outline mr-2" />
                  <input 
                    type="text" 
                    placeholder="Cari restoran atau hidangan..." 
                    className="bg-transparent border-none text-sm focus:ring-0 w-full"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={() => setCurrentView('cart')}
                  className="relative p-2 text-slate-600 hover:text-primary transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setCurrentView('auth')}
                  className="p-2 text-slate-600 hover:text-primary transition-colors cursor-pointer"
                >
                  <User className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setCurrentView('auth')}
                  className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
                >
                  Login/Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      {currentView !== 'auth' && (
        <footer className="bg-white border-t border-slate-100 py-12 px-8">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-2xl font-black text-primary">GrabMakan</span>
              <p className="text-slate-500 text-sm mt-2">Solusi makan enak, cepat, dan terpercaya.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">About Us</a>
              <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Partner</a>
              <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Terms</a>
              <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Privacy</a>
              <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">Contact</a>
            </div>
            <div className="text-slate-400 text-sm">
              © 2026 GrabMakan. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
