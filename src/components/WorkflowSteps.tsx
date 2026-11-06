import { motion } from 'framer-motion';
import { ClipboardList, Factory, PackageCheck, Ruler, Truck, ChevronRight, Scissors } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardList,
    title: '1. Isi SPK Digital',
    desc: 'Pilih model, kain, & rincian ukuran di form kalkulator.',
  },
  {
    icon: Ruler,
    title: '2. ACC Desain & DP 50%',
    desc: 'Konfirmasi DP 50% untuk langsung belanjakan bahan kain.',
  },
  {
    icon: Factory,
    title: '3. Cutting & Jahit Halus',
    desc: 'Pola presisi, jahit halus butik, & bordir komputer.',
  },
  {
    icon: PackageCheck,
    title: '4. QC & Pelunasan',
    desc: 'Inspeksi fisik bebas cacat, lalu konfirmasi pelunasan.',
  },
  {
    icon: Truck,
    title: '5. Ekspedisi Bergaransi',
    desc: 'Kirim via kargo aman dengan garansi retur/perbaikan.',
  },
];

export default function WorkflowSteps() {
  return (
    <section id="alur-spk" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Scissors className="h-3.5 w-3.5 text-amber-600 -rotate-45" />
            SOP Standar Produksi Terstruktur
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            5 Langkah Mudah dari Form SPK Sampai Busana Siap Kirim
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/90 px-3 py-1 rounded-full self-start sm:self-auto shrink-0 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Alur Terstandarisasi Garmen &amp; Butik
        </div>
      </div>

      {/* Stepper Grid Container */}
      <div className="relative mt-6 sm:mt-8">
        {/* Animated Stitch Line (Connecting Desktop Grid) */}
        <div className="hidden lg:block absolute top-[36px] inset-x-8 h-0.5 z-0 overflow-hidden pointer-events-none">
          <div className="w-full h-full border-t-2 border-dashed border-amber-300/70" />
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-amber-500 to-transparent blur-[1px]"
          />
        </div>

        <ol className="relative z-10 flex items-stretch gap-2.5 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;
            return (
              <li
                key={step.title}
                className="group relative flex w-[190px] xs:w-[210px] shrink-0 snap-center flex-col rounded-2xl border border-slate-200 bg-white/95 p-3.5 shadow-2xs transition-all duration-200 hover:border-amber-400 hover:shadow-md sm:w-auto"
              >
                {/* Step Top Header */}
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-400 shadow-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-200/80 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
                    Tahap {index + 1}
                  </span>
                </div>

                <h3 className="mt-3 text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                  {step.desc}
                </p>

                {/* Arrow Connector on desktop */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 h-5 w-5 items-center justify-center rounded-full bg-white border border-amber-300 shadow-xs text-amber-600">
                    <ChevronRight className="h-3 w-3 stroke-[2.5]" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}