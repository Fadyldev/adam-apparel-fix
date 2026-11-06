import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, X, Check, ArrowRight } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentPin?: string;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentPin = '1234',
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.trim() === currentPin.trim()) {
      setError(null);
      setPin('');
      onSuccess();
    } else {
      setError('PIN Keamanan salah! Hubungi Mas El atau coba PIN default: 1234');
    }
  };

  const handleQuickKey = (num: string) => {
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin === currentPin) {
        setError(null);
        setPin('');
        onSuccess();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 max-w-sm w-full rounded-3xl p-6 sm:p-7 text-white shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-xl transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-amber-300 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-lg tracking-tight">
            Akses Pengelola Bengkel
          </h3>
          <p className="text-xs text-slate-400">
            Khusus Mas El & Bapak untuk kelola antrean potong kain, cetak SPK bengkel, dan pantau DP.
          </p>
        </div>

        {/* PIN Display */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-12 h-14 rounded-xl border flex items-center justify-center text-xl font-bold font-mono transition-all ${
                  pin.length > idx
                    ? 'border-emerald-500 bg-emerald-950/40 text-amber-300 shadow-sm'
                    : 'border-slate-700 bg-slate-800 text-slate-500'
                }`}
              >
                {pin.length > idx ? '●' : ''}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-[11px] text-rose-400 text-center font-medium bg-rose-950/40 border border-rose-800/60 p-2 rounded-xl">
              {error}
            </p>
          )}

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleQuickKey(digit)}
                className="py-3 bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-white font-bold text-lg rounded-2xl border border-slate-700/60 transition shadow-2xs"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className="py-3 bg-slate-800/40 hover:bg-slate-700/60 text-slate-400 text-xs font-semibold rounded-2xl transition"
            >
              Hapus
            </button>
            <button
              type="button"
              onClick={() => handleQuickKey('0')}
              className="py-3 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-lg rounded-2xl border border-slate-700/60 transition"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => {
                setPin(currentPin);
                setTimeout(onSuccess, 100);
              }}
              className="py-3 bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 text-[10px] font-bold rounded-2xl transition"
              title="Gunakan PIN default: 1234"
            >
              Demo: 1234
            </button>
          </div>

          <button
            type="submit"
            disabled={pin.length === 0}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-amber-300" />
            <span>Buka Dashboard Pengelola</span>
          </button>
        </form>

        <p className="text-[10px] text-slate-500 text-center">
          PIN default adalah: <strong className="text-slate-300">1234</strong> (Dapat diubah di menu pengaturan).
        </p>
      </div>
    </div>
  );
};
