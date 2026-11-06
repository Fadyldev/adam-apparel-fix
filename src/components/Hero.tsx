import { useDb } from '@/store/useDb';
import { buildWaLink } from '@/lib/spk';
import { ArrowRight, MessageCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import StatsTicker from '@/components/StatsTicker';

export default function Hero() {
  const { db } = useDb();
  const { shopName, tagline, sinceYear, waNumber } = db.shopSettings;

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-16 pt-28 sm:pt-34">
      {/* 1. Centered Header Section */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Konveksi &amp; Garment Resmi Sejak {sinceYear}
        </div>

        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {shopName}
          <span className="block text-amber-600 sm:inline"> — {tagline}</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {db.shopSettings.description}
        </p>

        {/* Quality Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" /> Jahitan Rantai Distro
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" /> Sablon &amp; Bordir Komputer
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" /> Garansi Bebas Cacat
          </span>
        </div>

        {/* Action CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#spk"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800 active:scale-95"
          >
            Buat SPK &amp; Hitung Estimasi
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={buildWaLink(waNumber, `Halo Admin ${shopName}, saya ingin konsultasi desain baju.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-emerald-600/25 transition hover:bg-emerald-500 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi WhatsApp Mas El / Admin
          </a>
        </div>
      </div>

        {/* Visual Garment & Workshop Showcase Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {/* Card 1 */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-md hover:shadow-xl transition-all">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
                alt="Kemeja PDH dan Seragam Kantor"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 bg-white/95 backdrop-blur-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Kemeja PDH &amp; PDL</p>
                <p className="text-[11px] text-slate-500">American &amp; Japan Drill</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Paling Laris
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-md hover:shadow-xl transition-all">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                alt="Kaos Komunitas & Seragam Santri"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 bg-white/95 backdrop-blur-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Kaos Cotton Combed</p>
                <p className="text-[11px] text-slate-500">Sablon DTF &amp; Plastisol</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Jahitan Rantai
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-md hover:shadow-xl transition-all">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                alt="Lini Produksi Jahit & QC Workshop"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 bg-white/95 backdrop-blur-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Workshop Produksi</p>
                <p className="text-[11px] text-slate-500">Kapasitas 10.000 Pcs/Bln</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                QC Ketat
              </span>
            </div>
          </div>
        </div>

        {/* Stats Ticker */}
        <div className="mt-10 sm:mt-12">
          <StatsTicker />
        </div>
    </section>
  );
}
