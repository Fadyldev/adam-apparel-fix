import { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Printer, 
  Search, 
  Share2, 
  CreditCard, 
  Check, 
  Sparkles
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { formatRupiah } from '@/lib/format';
import { buildWaLink } from '@/lib/spk';
import type { SpkRecord, ShopSettings } from '@/lib/schema';

interface SpkSuccessModalProps {
  spk: SpkRecord;
  settings: ShopSettings;
  onClose: () => void;
  onOpenPrint: () => void;
  onTrackNow?: (spkId: string) => void;
}

export default function SpkSuccessModal({
  spk,
  settings,
  onClose,
  onOpenPrint,
  onTrackNow,
}: SpkSuccessModalProps) {
  const [copiedId, setCopiedId] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(spk.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSendWa = () => {
    const waText = `Halo ${settings.shopName}, saya sudah input pesanan baru:\n*Nomor SPK:* ${spk.id}\n*Pemesan:* ${spk.customer.name} (${spk.customer.instansi})\n*Item:* ${spk.item.productName} (${spk.item.fabricName})\n*Total:* ${spk.item.totalPcs} pcs - ${formatRupiah(spk.item.total)}\n*DP (50%):* ${formatRupiah(spk.item.dp)}\n\nMohon konfirmasi dan info nomor rekening untuk pelunasan DP. Terima kasih!`;
    const link = buildWaLink(settings.waNumber, waText);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal open={true} title="✓ Pesanan Resmi Terdeteksi di Sistem Web" onClose={onClose}>
      <div className="space-y-5">
        {/* Success Header banner */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400/80 p-4 flex items-center gap-3.5 shadow-sm">
          <div className="rounded-xl bg-emerald-600 text-white p-2.5 shadow-md shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-600 text-[10px] font-black uppercase tracking-wider text-white">
              <Sparkles className="h-3 w-3" />
              Status: Terdaftar di Server Web
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-emerald-950 mt-1">
              SPK Resmi Berhasil Diterbitkan!
            </h4>
            <p className="text-xs text-emerald-800 leading-snug">
              Surat Perintah Kerja Anda sudah terdeteksi dan tersimpan aman di database antrean produksi ADAM COLLECTION.
            </p>
          </div>
        </div>

        {/* SPK ID Card */}
        <div className="rounded-2xl bg-slate-900 text-white p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold tracking-wider text-[11px] text-slate-300">NOMOR REGISTRASI SPK RESMI</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
              ● TERCATAT DI SISTEM
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 tracking-wider">
              {spk.id}
            </span>
            <button
              type="button"
              onClick={copyId}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition active:scale-95 border border-slate-700 text-slate-200"
            >
              {copiedId ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Salin ID SPK</span>
                </>
              )}
            </button>
          </div>
          <div className="text-xs text-slate-300 pt-1.5 border-t border-slate-800 flex justify-between">
            <span>{spk.customer.name} — {spk.customer.instansi || 'Pesanan Pribadi/Instansi'}</span>
            <span className="font-bold text-amber-300">{spk.item.totalPcs} Pcs ({spk.item.productName})</span>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Total Nilai Pesanan:</span>
            <span className="font-bold text-slate-900">{formatRupiah(spk.item.total)}</span>
          </div>
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Kewajiban DP (50% untuk kain):</span>
            <span className="font-bold text-emerald-800">{formatRupiah(spk.item.dp)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Sisa Pelunasan Saat Baju Selesai:</span>
            <span className="font-semibold text-slate-800">{formatRupiah(spk.item.remaining)}</span>
          </div>
        </div>

        {/* Bank Account Info */}
        {settings.accounts && settings.accounts.length > 0 && (
          <div className="rounded-2xl border border-slate-200 p-4 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              <span>Rekening Resmi Pembayaran DP (Akad Syar'i)</span>
            </div>
            <div className="space-y-1.5">
              {settings.accounts.slice(0, 2).map((acc, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-800">{acc.bank}</span>
                    <span className="text-slate-500 block text-[11px]">a.n. {acc.owner}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 select-all bg-white px-2 py-1 rounded border border-slate-200">{acc.number}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OBLIGATORY FINAL STEP: WHATSAPP ACTIVATION */}
        <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-4 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
              !
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                Langkah Terakhir (Wajib Dilakukan)
              </p>
              <p className="text-[11px] text-amber-800">
                Kirim data SPK yang baru dibuat ini ke WhatsApp Admin untuk mengunci jadwal potong kain.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendWa}
            className="group relative flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 px-4 py-3.5 text-center text-white shadow-lg shadow-emerald-600/30 transition hover:brightness-105 active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
              <Share2 className="h-4 w-4 shrink-0" />
              <span>Kirim Bukti SPK ke WhatsApp Admin Sekarang</span>
            </div>
            <span className="text-[10px] text-emerald-100 font-medium">
              (Format SPK sudah otomatis tersusun rapi)
            </span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={onOpenPrint}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-md active:scale-98"
          >
            <Printer className="h-4 w-4" />
            Cetak SPK / Simpan PDF
          </button>

          {onTrackNow && (
            <button
              type="button"
              onClick={() => onTrackNow(spk.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition active:scale-98"
            >
              <Search className="h-3.5 w-3.5 text-emerald-600" />
              Lacak Status Jahitan Ini
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}