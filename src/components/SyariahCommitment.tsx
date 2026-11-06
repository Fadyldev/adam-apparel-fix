import { ShieldCheck, Scale, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function SyariahCommitment() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/60 p-6 sm:p-8 shadow-sm backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-amber-100 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Scale className="h-3.5 w-3.5 text-amber-700" />
              Keberkahan Muamalah &amp; Garansi Syar&apos;i
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
              Komitmen Akad Syar&apos;i Adam Apparel
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Dikelola langsung oleh Ustadz pemilik konveksi dengan mengedepankan asas kejujuran, ketelitian mutu, dan keterbukaan tanpa riba.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white/90 border border-amber-200 px-4 py-3 shadow-xs shrink-0">
            <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-slate-900">100% Bebas Riba &amp; Denda</p>
              <p className="text-[11px] text-slate-500">Akad Istishna&apos; / Salam Terpercaya</p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Bahan Baku Murni &amp; Asli</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Kain Toyobo, Madinah, Combed, &amp; Drill 100% original sesuai gramasi standar pabrik tanpa manipulasi.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>DP 50% Amanah Pengerjaan</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Uang muka khusus dialokasikan untuk roll bahan kain pesanan Anda, bukan diputar untuk urusan lain.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Garansi Bebas Cacat 100%</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Klaim perbaikan atau ganti baru langsung jika terdapat cacat jahit, sablon miring, atau salah ukuran.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <HeartHandshake className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Musyawarah &amp; Transparan</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Progress produksi diupdate transparan via WhatsApp, konsultasi ramah bersama Ustadz dan Mas El.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
