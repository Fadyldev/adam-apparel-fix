import { ShieldCheck, Scale, CheckCircle2, HandCoins, Scissors, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    icon: Scissors,
    title: 'Bahan Baku Murni & Asli',
    desc: 'Kain Toyobo Fodu, Madinah, Combed, & Drill 100% original sesuai sampel tanpa manipulasi kualitas.',
    badge: 'Garansi Asli',
  },
  {
    icon: HandCoins,
    title: 'DP 50% Amanah Belanja Bahan',
    desc: 'Uang muka khusus dibelanjakan untuk roll kain pesanan Anda seketika setelah spesifikasi disetujui.',
    badge: 'Transparan',
  },
  {
    icon: Scale,
    title: '100% Bebas Riba & Denda',
    desc: 'Akad Istishna’ yang sah dan mengikat. Harga transparan sejak awal tanpa denda keterlambatan sepeserpun.',
    badge: 'Akad Syar’i',
  },
  {
    icon: ShieldCheck,
    title: 'Garansi Bebas Cacat Mutu',
    desc: 'Inspeksi QC setiap helai pakaian. Bebas klaim perbaikan atau ganti baru jika ditemukan cacat jahitan.',
    badge: 'Jaminan QC',
  },
];

export default function SyariahCommitment() {
  return (
    <section id="komitmen" className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6 py-6 sm:py-8">
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 p-5 sm:p-7 shadow-sm">
        {/* Compact Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-amber-100/90 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-xs shrink-0">
              <Scale className="h-5 w-5" />
            </span>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800">
                <Sparkles className="h-3 w-3 text-amber-600" />
                Asas Kejujuran &amp; Keberkahan Muamalah
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Komitmen Akad Syar&apos;i Adam Collection
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-emerald-200/80 px-3 py-1 text-xs font-bold text-emerald-800 shadow-xs self-start sm:self-auto">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>DP 50% Langsung Jadi Roll Kain Pesanan</span>
          </div>
        </div>

        {/* 4 Compact Pillars (2 cols on mobile, 4 on desktop) */}
        <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col rounded-2xl border border-slate-200/70 bg-white/90 p-3.5 shadow-2xs transition hover:border-amber-400 hover:shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100/80 text-amber-900 shrink-0">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h4 className="mt-2.5 text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}