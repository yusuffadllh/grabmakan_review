import { MapPin, Wallet, CreditCard, Banknote, ShieldCheck, ChevronRight } from 'lucide-react';
import { View } from '../types';

interface CheckoutViewProps {
  onNavigate: (view: View) => void;
  cartItems: any[];

}

export default function CheckoutView({ onNavigate, cartItems }: CheckoutViewProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl font-black mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Delivery Address */}
          <section className="bg-white rounded-3xl p-8 shadow-soft">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Alamat Pengiriman</h2>
              </div>
              <button className="text-primary font-bold hover:underline cursor-pointer">Edit</button>
            </div>
            
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-sm">Rumah</span>
                <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider">Utama</span>
              </div>
              <p className="text-lg font-bold mb-1">Park Jinyoung (+62 812-3456-7890)</p>
              <p className="text-sm text-slate-500 leading-relaxed">Jl. Jenderal Sudirman No. 123, SCBD, Kebayoran Baru, Jakarta Selatan, 12190</p>
              <div className="mt-4 flex items-center gap-2 text-primary font-bold text-xs bg-primary/5 w-fit px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 fill-primary text-white" />
                <span>Pin lokasi sudah sesuai</span>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-3xl p-8 shadow-soft">
            <div className="flex items-center gap-3 mb-8">
              <Wallet className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Metode Pembayaran</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="relative border-2 border-primary bg-primary/5 p-6 rounded-2xl flex items-center gap-4 text-left transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">E-Wallet (OVO/Gopay)</p>
                  <p className="text-primary font-bold text-sm">Saldo: Rp 250.000</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
              </button>

              <button className="border border-outline-variant hover:border-primary p-6 rounded-2xl flex items-center gap-4 text-left transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary/10 group-hover:text-primary">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Transfer Bank</p>
                  <p className="text-xs text-slate-400">Virtual Account</p>
                </div>
              </button>

              <button className="border border-outline-variant hover:border-primary p-6 rounded-2xl flex items-center gap-4 text-left transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary/10 group-hover:text-primary">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Kartu Kredit</p>
                  <p className="text-xs text-slate-400">Visa / Mastercard</p>
                </div>
              </button>

              <button className="border border-outline-variant hover:border-primary p-6 rounded-2xl flex items-center gap-4 text-left transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary/10 group-hover:text-primary">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Bayar di Tempat (COD)</p>
                  <p className="text-xs text-slate-400">Bayar tunai ke kurir</p>
                </div>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <section className="bg-white rounded-3xl p-8 shadow-soft border border-slate-50">
            <h2 className="text-xl font-bold mb-8">Ringkasan Pesanan</h2>
            
            {/* Restaurant Info */}
            <div className="flex items-center gap-4 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=100" 
                className="w-14 h-14 rounded-2xl object-cover"
                alt="Restaurant"
              />
              <div>
                <p className="font-bold text-base">Pizza Hut - Sudirman</p>
                <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                  <MapPin className="w-3 h-3" /> 1.2 km
                </div>
              </div>
            </div>

            {/* Item List */}
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <span className="font-bold text-primary">1x</span>
                  <div>
                    <p className="text-sm font-bold">Meat Lovers Pizza (Large)</p>
                    <p className="text-[10px] text-slate-400 mt-1">Pinggiran Stuffed Crust, Extra Cheese</p>
                  </div>
                </div>
                <span className="text-sm font-bold whitespace-nowrap">Rp 145.000</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <span className="font-bold text-primary">2x</span>
                  <div>
                    <p className="text-sm font-bold">Lemon Tea (Regular)</p>
                  </div>
                </div>
                <span className="text-sm font-bold whitespace-nowrap">Rp 36.000</span>
              </div>
            </div>

            <div className="border-t border-dashed border-outline-variant my-8"></div>

            {/* Pricing */}
            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>Rp 181.000</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Ongkos Kirim</span>
                <span>Rp 12.000</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Biaya Layanan</span>
                <span>Rp 3.000</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-sm">
                <span className="flex items-center gap-2 underline decoration-dashed transition-opacity hover:opacity-80 cursor-pointer">
                  <ShieldCheck className="w-4 h-4" /> Promo GrabFood
                </span>
                <span>-Rp 15.000</span>
              </div>
              <div className="flex justify-between font-black text-2xl pt-6 border-t border-slate-50">
                <span>Total Bayar</span>
                <span className="text-primary font-black">Rp 181.000</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('tracking')}
              className="w-full bg-primary-container text-on-primary-container py-5 rounded-3xl font-black text-base shadow-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Buat Pesanan <ChevronRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-center text-slate-400 text-[10px] leading-relaxed">
              Dengan menekan tombol di atas, Anda menyetujui <button className="text-primary font-bold hover:underline">Syarat & Ketentuan</button> GrabMakan.
            </p>
          </section>

          {/* Promo Code Box */}
          <button className="mt-8 w-full bg-surface-container-low rounded-3xl p-5 flex items-center justify-between cursor-pointer border border-primary/10 hover:bg-surface-container shadow-sm group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 fill-primary text-white" />
              </div>
              <span className="font-bold text-sm">Pakai Promo Lebih Hemat!</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        </aside>
      </div>
    </div>
  );
}
