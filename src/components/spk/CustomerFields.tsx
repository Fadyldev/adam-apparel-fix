import { COURIERS } from '@/lib/constants';
import { todayIso } from '@/lib/format';
import type { SpkCustomer } from '@/lib/schema';
import Field, { inputClass } from '@/components/ui/Field';

interface CustomerFieldsProps {
  customer: SpkCustomer;
  onChange: (patch: Partial<SpkCustomer>) => void;
}

export default function CustomerFields({ customer, onChange }: CustomerFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Nama Pemesan / PIC">
        <input className={inputClass} value={customer.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Nama lengkap" autoComplete="name" />
      </Field>
      <Field label="Nama Instansi / Komunitas / Brand">
        <input className={inputClass} value={customer.instansi} onChange={(e) => onChange({ instansi: e.target.value })} placeholder="Opsional" />
      </Field>
      <Field label="Nomor WhatsApp Aktif" hint="Format 08xx atau 628xx">
        <input
          type="tel"
          inputMode="tel"
          className={inputClass}
          value={customer.wa}
          onChange={(e) => onChange({ wa: e.target.value })}
          placeholder="08123456789"
          autoComplete="tel"
        />
      </Field>
      <Field label="Ekspedisi / Pengambilan">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COURIERS.map((courier) => {
            const isSelected = customer.courier === courier;
            return (
              <button
                key={courier}
                type="button"
                onClick={() => onChange({ courier })}
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-xs font-bold transition active:scale-95 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && <span className="mr-1 text-emerald-600 font-black">✓</span>}
                <span className="truncate">{courier}</span>
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Alamat Lengkap Pengiriman (Kota/Kabupaten)" className="sm:col-span-2">
        <textarea
          rows={2}
          className={inputClass}
          value={customer.alamat}
          onChange={(e) => onChange({ alamat: e.target.value })}
          placeholder="Jalan, kelurahan, kecamatan, kota/kabupaten tujuan pengiriman"
        />
      </Field>

      <Field 
        label="Target Tanggal Jadi (Deadline Acara)" 
        className="sm:col-span-2"
        hint="Pilih estimasi cepat atau tentukan tanggal pasti acara Anda"
      >
        <div className="space-y-2.5">
          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: '⚡ Kilat 14 Hari', days: 14 },
              { label: '📅 Reguler 30 Hari', days: 30 },
              { label: '⏳ Santai 45 Hari', days: 45 },
            ].map((preset) => {
              const d = new Date();
              d.setDate(d.getDate() + preset.days);
              const dateVal = d.toISOString().split('T')[0];
              const isSelected = customer.deadline === dateVal;

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onChange({ deadline: dateVal })}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              type="date"
              min={todayIso()}
              className={`${inputClass} flex-1`}
              value={customer.deadline}
              onChange={(e) => onChange({ deadline: e.target.value })}
            />
            {customer.deadline && (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200/80 whitespace-nowrap">
                ✓ Target: {new Date(customer.deadline).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </Field>

      <Field label="Catatan Khusus Pengerjaan" className="sm:col-span-2">
        <input
          className={inputClass}
          value={customer.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Contoh: Tolong packing per plastik satu persatu, bordir nama di kerah"
        />
      </Field>
    </div>
  );
}