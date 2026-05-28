import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, CheckCircle2 } from 'lucide-react';
import { View } from '../types';

interface AuthViewProps {
  onNavigate: (view: View) => void;
}

export default function AuthView({ onNavigate }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    const endpoint =
      mode === 'login'
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama,
        email,
        password
      })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan');
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    onNavigate('home');
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex">
      {/* Visual Side */}
      <div className="hidden lg:block w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]"></div>
        <img 
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200" 
          alt="Food" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 grayscale group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-16 xl:px-32 text-white">
          <button 
            onClick={() => onNavigate('home')}
            className="text-4xl font-black mb-12 hover:scale-105 transition-transform w-fit"
          >
            GrabMakan
          </button>
          <div className="space-y-12">
            <h1 className="text-5xl xl:text-7xl font-black leading-tight drop-shadow-2xl">Lapar? Pesan Sekarang & Nikmati!</h1>
            <p className="text-xl text-white/80 max-w-lg leading-relaxed">
              Ribuan restoran pilihan, jutaan menu lezat, diantar langsung ke depan pintu Anda dalam hitungan menit.
            </p>
            <div className="flex flex-col gap-6">
              {[
                'Gratis Ongkir hingga Rp 20rb',
                'Pembayaran Aman & Cepat',
                'Lacak Pesanan Real-time'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-primary transition-all shadow-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-16 text-white/40 text-xs font-semibold tracking-widest uppercase">
          GrabMakan x Premium Delivery Service
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 h-screen flex flex-col bg-white overflow-y-auto">
        <div className="max-w-[480px] w-full mx-auto px-6 py-12 md:py-24 flex-1 flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-4">
              {mode === 'login' ? 'Selamat Datang!' : 'Gabung Bersama Kami'}
            </h2>
            <p className="text-slate-500 text-base font-medium">
              {mode === 'login' ? 'Masuk ke akun GrabMakan Anda untuk melanjutkan pesanan lezat Anda.' : 'Nikmati kemudahan layanan pesan antar makanan terbaik di Indonesia.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="group">
                <label className="block text-sm font-black text-slate-800 mb-2 transition-colors group-focus-within:text-primary">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-primary" />
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-medium transition-all focus:ring-0"
                  />
                </div>
              </div>
            )}

            <div className="group">
              <label className="block text-sm font-black text-slate-800 mb-2 transition-colors group-focus-within:text-primary">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-primary" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-medium transition-all focus:ring-0"
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-black text-slate-800 transition-colors group-focus-within:text-primary">Kata Sandi</label>
                {mode === 'login' && <button type="button" className="text-xs font-bold text-primary hover:underline underline-offset-4">Lupa sandi?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-primary" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl py-4 pl-12 pr-6 text-sm font-medium transition-all focus:ring-0"
                />
              </div>
            </div>
              {error && (
                <div className="bg-red-100 text-red-500 text-sm font-semibold p-4 rounded-2xl">
                  {error}
                </div>
              )}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'Masuk' : 'Daftar Akun'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12">
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase font-black"><span className="bg-white px-6 text-slate-400 tracking-widest leading-none">Atau masuk dengan</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 hover:border-slate-100 rounded-2xl text-sm font-bold transition-all group active:scale-95 cursor-pointer">
                <Chrome className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 hover:border-slate-100 rounded-2xl text-sm font-bold transition-all group active:scale-95 cursor-pointer">
                <Github className="w-5 h-5 text-slate-400 group-hover:text-black transition-colors" /> GitHub
              </button>
            </div>
          </div>

          <p className="mt-12 text-center text-slate-500 font-medium">
            {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="ml-2 text-primary font-black hover:underline underline-offset-4"
            >
              {mode === 'login' ? 'Daftar Sekarang' : 'Masuk Sekarang'}
            </button>
          </p>
        </div>
        
        <div className="p-8 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest mt-auto">
          GrabMakan Secure Authentication • GrabMakan
        </div>
      </div>
    </div>
  );
}
