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
            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" /> Jahitan Halus Standar Butik &amp; Garmen
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" /> Pilihan Bahan Asli (Toyobo, Madinah, Drill)
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" /> Akad Syar&apos;i Amanah &amp; Garansi Retur
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
            href={buildWaLink(waNumber, `Halo Layanan Pelanggan ${shopName}, saya ingin konsultasi pesanan dan spesifikasi pakaian.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-emerald-600/25 transition hover:bg-emerald-500 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi WhatsApp Layanan Pelanggan
          </a>
        </div>
      </div>

      {/* Stats Ticker */}
      <div className="mt-10 sm:mt-12">
        <StatsTicker />
      </div>
    </section>
  );
}