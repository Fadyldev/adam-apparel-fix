import { Printer } from 'lucide-react';

export type PrintVariant = 'thermal' | 'a4';

export interface SpkNotice {
  tone: 'success' | 'error';
  text: string;
}

interface SpkActionsProps {
  shopName: string;
  errors: string[];
  notice: SpkNotice | null;
  onSend: () => void;
  onPrint: (variant: PrintVariant) => void;
}

export default function SpkActions({ errors, notice, onSend, onPrint }: SpkActionsProps) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onSend}
        className="group relative flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 px-5 py-4 text-center text-white shadow-xl shadow-emerald-700/25 transition hover:brightness-105 active:scale-[0.99]"
      >
        <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold tracking-wide">
          <span className="text-amber-300 font-black">✓</span>
          <span>Terbitkan SPK &amp; Kunci Antrean Sistem Web</span>
        </div>
        <span className="text-[11px] font-medium text-emerald-100/90">
          Otomatis terdaftar di database kasir &amp; menghasilkan No. SPK resmi
        </span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onPrint('thermal')}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-amber-400 active:scale-95"
        >
          <Printer className="h-4 w-4" />
          Cetak Thermal
        </button>
        <button
          type="button"
          onClick={() => onPrint('a4')}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-amber-400 active:scale-95"
        >
          <Printer className="h-4 w-4" />
          Preview PDF
        </button>
      </div>

      {errors.length > 0 && (
        <ul role="alert" className="space-y-1.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {errors.map((error) => (
            <li key={error}>- {error}</li>
          ))}
        </ul>
      )}

      {notice && (
        <p
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
            notice.tone === 'success'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
              : 'border-amber-300 bg-amber-50 text-amber-900'
          }`}
        >
          {notice.text}
        </p>
      )}
    </div>
  );
}