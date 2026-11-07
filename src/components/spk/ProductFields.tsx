import { useState, type ChangeEvent } from 'react';
import { VARIATIONS } from '@/lib/constants';
import { formatRupiah } from '@/lib/format';
import { CUSTOM_OPTION, type SpkFormState } from '@/lib/spk';
import type { CatalogItem, ColorItem, Fabric } from '@/lib/schema';
import type { Selection } from '@/store/context';
import Field, { inputClass } from '@/components/ui/Field';
import Modal from '@/components/ui/Modal';
import { Upload, X, Image as ImageIcon, Sparkles, ChevronDown, Check, Palette, Shirt, Layers } from 'lucide-react';

interface ProductFieldsProps {
  values: SpkFormState;
  catalogItems: CatalogItem[];
  productFabrics: Fabric[];
  colorList: ColorItem[];
  onSelection: (patch: Partial<Selection>) => void;
  onChange: (patch: Partial<SpkFormState>) => void;
}

export default function ProductFields({
  values,
  catalogItems,
  productFabrics,
  colorList,
  onSelection,
  onChange,
}: ProductFieldsProps) {
  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [fabricModalOpen, setFabricModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);

  const isCustomCatalog = values.catalogId === CUSTOM_OPTION;
  const isCustomFabric = values.fabricId === CUSTOM_OPTION;
  const isCustomColor = values.colorId === CUSTOM_OPTION;

  const selectedCatalog = catalogItems.find((item) => item.id === values.catalogId);
  const selectedFabric = productFabrics.find((f) => f.id === values.fabricId);
  const selectedColor = colorList.find((c) => c.id === values.colorId);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('Ukuran file foto maksimal 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ customPhotoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* 1. Model Pakaian (Modern Picker Trigger) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Shirt className="h-4 w-4 text-emerald-700" />
            1. Model Pakaian
          </span>
          {isCustomCatalog && (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Mode Custom
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setModelModalOpen(true)}
          className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition active:scale-[0.99] ${
            isCustomCatalog
              ? 'border-amber-400 bg-amber-50/50'
              : 'border-slate-300 bg-white hover:border-emerald-600 hover:bg-slate-50/80 shadow-xs'
          }`}
        >
          <div className="min-w-0 pr-2">
            <p className="text-xs font-bold text-slate-900 truncate">
              {isCustomCatalog
                ? values.customProduct || 'Model Khusus / Custom Desain Sendiri'
                : selectedCatalog?.name || 'Pilih Model Pakaian'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isCustomCatalog
                ? 'Klik untuk ganti model dari katalog'
                : selectedCatalog
                  ? `Mulai ${formatRupiah(selectedCatalog.basePrice)} • Min ${selectedCatalog.minOrder} pcs`
                  : 'Sentuh untuk melihat pilihan katalog'}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg shrink-0">
            <span>Pilih</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </button>

        {isCustomCatalog && (
          <input
            className={inputClass}
            value={values.customProduct || ''}
            onChange={(e) => onChange({ customProduct: e.target.value })}
            placeholder="Tulis nama model baju, misal: Jubah Salaf Kancing Kayu / Rompi Santri"
            autoFocus
          />
        )}
      </div>

      {/* 2. Pilihan Bahan Kain (Modern Picker Trigger) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-emerald-700" />
            2. Pilihan Bahan Kain
          </span>
          {isCustomFabric && (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Kain Custom
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFabricModalOpen(true)}
          className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition active:scale-[0.99] ${
            isCustomFabric
              ? 'border-amber-400 bg-amber-50/50'
              : 'border-slate-300 bg-white hover:border-emerald-600 hover:bg-slate-50/80 shadow-xs'
          }`}
        >
          <div className="min-w-0 pr-2">
            <p className="text-xs font-bold text-slate-900 truncate">
              {isCustomFabric
                ? values.customFabric || 'Bawa Kain Sendiri / Request Khusus'
                : selectedFabric
                  ? `${selectedFabric.name} (${selectedFabric.gsm} gsm)`
                  : 'Pilih Bahan Kain'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isCustomFabric
                ? 'Klik untuk memilih kain rekomendasi'
                : selectedFabric
                  ? selectedFabric.addOnPerPcs > 0
                    ? `+${formatRupiah(selectedFabric.addOnPerPcs)}/pcs • ${selectedFabric.note}`
                    : `Termasuk harga standar • ${selectedFabric.note}`
                  : 'Sentuh untuk melihat pilihan kain'}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg shrink-0">
            <span>Pilih</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </button>

        {isCustomFabric && (
          <input
            className={inputClass}
            value={values.customFabric}
            onChange={(e) => onChange({ customFabric: e.target.value })}
            placeholder="Tulis jenis kain, misal: Katun Toyobo Fodu, Drill Verlando, Oxford"
            autoFocus
          />
        )}
      </div>

      {/* 3. Pilihan Warna Kain (Modern Picker Trigger) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Palette className="h-4 w-4 text-emerald-700" />
            3. Warna Kain
          </span>
          {isCustomColor && (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Warna Khusus
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setColorModalOpen(true)}
          className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition active:scale-[0.99] ${
            isCustomColor
              ? 'border-amber-400 bg-amber-50/50'
              : 'border-slate-300 bg-white hover:border-emerald-600 hover:bg-slate-50/80 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            {!isCustomColor && selectedColor && (
              <span
                className="h-5 w-5 rounded-full border border-slate-300 shadow-xs shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {isCustomColor
                  ? values.customColor || 'Kombinasi / Request Warna Sendiri'
                  : selectedColor
                    ? `${selectedColor.name} (${selectedColor.code})`
                    : 'Pilih Warna'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isCustomColor ? 'Sentuh untuk pilih palet standar' : 'Sentuh untuk melihat katalog warna'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg shrink-0">
            <span>Pilih</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </button>

        {isCustomColor && (
          <input
            className={inputClass}
            value={values.customColor}
            onChange={(e) => onChange({ customColor: e.target.value })}
            placeholder="Tulis nama warna, misal: Hijau Sage Tua / Navy Kombinasi Putih"
            autoFocus
          />
        )}
      </div>

      {/* 4. Variasi Sablon / Bordir Komputer (Pill Selector) */}
      <Field label="4. Variasi Sablon / Bordir Komputer">
        <div className="grid grid-cols-2 gap-2">
          {VARIATIONS.map((variation) => {
            const isSelected = values.variation === variation;
            return (
              <button
                key={variation}
                type="button"
                onClick={() => onChange({ variation })}
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-2.5 py-2.5 text-center text-xs font-bold transition active:scale-95 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && <Check className="mr-1 h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                <span className="truncate">{variation}</span>
              </button>
            );
          })}
        </div>
      </Field>

      {/* MODAL 1: MODEL PAKAIAN PICKER */}
      <Modal open={modelModalOpen} title="Pilih Model Pakaian" onClose={() => setModelModalOpen(false)}>
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            Pilih model busana syar'i atau seragam yang ingin Anda jahit di ADAM COLLECTION:
          </p>

          <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
            {catalogItems.map((item) => {
              const isSelected = values.catalogId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelection({ catalogId: item.id, fabricId: item.fabricIds[0] ?? '' });
                    onChange({ customProduct: '' });
                    setModelModalOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border p-3 text-left transition active:scale-[0.99] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{item.name}</span>
                      {isSelected && (
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          <Check className="h-3 w-3" /> Dipilih
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                    <p className="text-xs font-bold text-emerald-700 mt-1">
                      Mulai {formatRupiah(item.basePrice)}{' '}
                      <span className="text-[11px] font-normal text-slate-500">/ pcs (Min {item.minOrder} pcs)</span>
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Custom Option Button */}
            <button
              type="button"
              onClick={() => {
                onSelection({ catalogId: CUSTOM_OPTION, fabricId: CUSTOM_OPTION });
                setModelModalOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed p-3.5 text-left transition active:scale-[0.99] ${
                isCustomCatalog
                  ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400/30'
                  : 'border-amber-300 bg-amber-50/40 hover:bg-amber-50'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-amber-900">+ Model Khusus / Bawa Desain Sendiri</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Punya sketsa atau foto seragam sendiri? Ketik nama model &amp; lampirkan fotonya.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                Pilih Custom
              </span>
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: BAHAN KAIN PICKER */}
      <Modal open={fabricModalOpen} title="Pilih Bahan Kain" onClose={() => setFabricModalOpen(false)}>
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            Kain original standar butik &amp; garmen berkualitas pilihan penjahit ADAM COLLECTION:
          </p>

          <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
            {productFabrics.map((fabric) => {
              const isSelected = !isCustomFabric && values.fabricId === fabric.id;
              return (
                <button
                  key={fabric.id}
                  type="button"
                  onClick={() => {
                    onSelection({ fabricId: fabric.id });
                    setFabricModalOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border p-3 text-left transition active:scale-[0.99] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{fabric.name}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {fabric.gsm} GSM
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          <Check className="h-3 w-3" /> Dipilih
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{fabric.note}</p>
                    <p className="text-xs font-bold text-emerald-700 mt-1">
                      {fabric.addOnPerPcs > 0 ? `+${formatRupiah(fabric.addOnPerPcs)} / pcs` : 'Termasuk Paket Standar'}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Custom Fabric Button */}
            <button
              type="button"
              onClick={() => {
                onSelection({ fabricId: CUSTOM_OPTION });
                setFabricModalOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed p-3.5 text-left transition active:scale-[0.99] ${
                isCustomFabric
                  ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400/30'
                  : 'border-amber-300 bg-amber-50/40 hover:bg-amber-50'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-amber-900">+ Request Kain Lain / Bawa Bahan Sendiri</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Misal: Katun Madinah, Balotelli, Drill Jepang, Oxford, dll.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                Pilih Custom
              </span>
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL 3: WARNA KAIN PICKER */}
      <Modal open={colorModalOpen} title="Pilih Warna Kain" onClose={() => setColorModalOpen(false)}>
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            Pilih warna dasar pakaian yang diinginkan dari palet warna favorit:
          </p>

          <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {colorList.map((color) => {
                const isSelected = !isCustomColor && values.colorId === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => {
                      onSelection({ colorId: color.id });
                      setColorModalOpen(false);
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-2.5 text-left transition active:scale-[0.98] ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className="h-8 w-8 rounded-xl border border-slate-300 shadow-xs shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{color.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{color.code}</p>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Color Button */}
            <button
              type="button"
              onClick={() => {
                onSelection({ colorId: CUSTOM_OPTION });
                setColorModalOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed p-3.5 text-left transition active:scale-[0.99] mt-2 ${
                isCustomColor
                  ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400/30'
                  : 'border-amber-300 bg-amber-50/40 hover:bg-amber-50'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-amber-900">+ Warna Khusus / Kombinasi 2 Warna</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Tulis nama warna pesanan Anda (contoh: Sage Green, Terracotta, Kombinasi Hitam-Emas).
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shrink-0 ml-2">
                Pilih Custom
              </span>
            </button>
          </div>
        </div>
      </Modal>

      {/* 5. Detail Spesifikasi Bordir / Kantong / Kancing */}
      <Field 
        label="5. Detail Spesifikasi Bordir, Kantong &amp; Kancing" 
        className="sm:col-span-2" 
        hint="Tulis letak logo bordir (misal dada kiri 7cm), posisi kantong, kancing, atau puring."
      >
        <textarea
          rows={3}
          className={inputClass}
          value={values.variationDetail}
          onChange={(e) => onChange({ variationDetail: e.target.value })}
          placeholder="Contoh: Bordir logo pesantren di dada kiri 7x7 cm, saku samping kanan-kiri, kancing kerah shanghai tersembunyi"
        />
      </Field>

      {/* 6. UPLOAD FOTO CONTOH DESAIN / SKETSA SENDIRI (Fitur Unggulan Pembeli) */}
      <div className="sm:col-span-2 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
              <ImageIcon className="h-4 w-4 text-amber-600" />
              Upload Foto / Sketsa Desain Anda Sendiri
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Punya contoh baju sendiri? Foto dan upload langsung dari galeri HP Anda (JPG/PNG).
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-95 shrink-0">
            <Upload className="h-4 w-4 text-amber-400" />
            <span>Pilih Foto dari HP</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        {/* Live Image Preview if uploaded */}
        {values.customPhotoUrl && (
          <div className="mt-4 flex items-center gap-4 rounded-xl border border-amber-200 bg-white p-3 shadow-xs">
            <img
              src={values.customPhotoUrl}
              alt="Preview Desain Pembeli"
              className="h-16 w-16 rounded-lg object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Foto Desain Berhasil Dilampirkan!
              </p>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                Foto ini akan otomatis tercatat di nota SPK digital Anda.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange({ customPhotoUrl: '' })}
              className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600"
              title="Hapus foto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* 7. Link Video / Google Drive / File Desain Besar */}
      <Field 
        label="7. Link Video / Google Drive Desain (Opsional)" 
        className="sm:col-span-2"
        hint="Jika punya video detail pakaian atau file desain besar di Google Drive / Canva, tempel linknya di sini."
      >
        <div className="relative">
          <input
            className={inputClass}
            value={values.designLink}
            onChange={(e) => onChange({ designLink: e.target.value })}
            placeholder="https://drive.google.com/... atau https://canva.com/..."
          />
        </div>
      </Field>
    </div>
  );
}