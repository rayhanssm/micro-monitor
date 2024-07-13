import React from "react";
import TextField from "../../molecules/input-field/TextField";
import CheckboxField from "../../molecules/input-field/CheckboxField";
import Checkbox from "../../atoms/Checkbox";
import RecommendationPill from "../../atoms/RecommendationPill";
import { Info } from "lucide-react";
type IProps = {
  onSubmit: () => void;
  step: number;
};

function RegisterForm({ onSubmit, step }: IProps) {
  return (
    <form className="space-y-3 mb-[30px]" onSubmit={onSubmit}>
      {step === 1 ? (
        <>
          <TextField label="Nama UMKM" name="storeName" />
          <TextField label="Username" name="userName" />
          <TextField label="Kata Sandi" name="password" type="password" />
          <TextField
            label="Konfirmasi Kata Sandi"
            name="confirmPassword"
            type="password"
          />
        </>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="text-sm">
            Pilih fitur tambahan berikut yang sesuai dengan jenis UMKM Anda!
          </p>
          <div className="flex flex-col gap-6 lg:grid grid-cols-2 lg:gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 items-center">
                <Info size={16} color="#3B82F6" />
                <p className="font-bold text-xs">Informasi jenis UMKM</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <RecommendationPill
                    text="Mikro"
                    bgColor="bg-amber-200"
                    textColor="text-amber-700"
                  />
                  <p className="text-xs text-slate-700">
                    Usaha individual dengan skala yang paling kecil <br />
                    Contoh: Warung kecil, pedagang kaki lima
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <RecommendationPill
                    text="Kecil"
                    bgColor="bg-blue-200"
                    textColor="text-blue-700"
                  />
                  <p className="text-xs text-slate-700">
                    Usaha dengan skala yang lebih besar dari mikro <br />
                    Contoh: Rumah makan sederhana, toko kue
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <RecommendationPill
                    text="Menengah"
                    bgColor="bg-purple-200"
                    textColor="text-purple-700"
                  />
                  <p className="text-xs text-slate-700">
                    Usaha dengan skala yang lebih besar dari usaha kecil <br />
                    Contoh: Restoran, kafe
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Checkbox
                label="Dashboard"
                description="Rekapan informasi penjualan"
                checked={true}
                onChange={() => {}}
                disabled={true}
                recommendation={
                  <div>
                    <div className="flex gap-2">
                      <RecommendationPill
                        text="Mikro"
                        bgColor="bg-amber-200"
                        textColor="text-amber-700"
                      />
                      <RecommendationPill
                        text="Kecil"
                        bgColor="bg-blue-200"
                        textColor="text-blue-700"
                      />
                      <RecommendationPill
                        text="Menengah"
                        bgColor="bg-purple-200"
                        textColor="text-purple-700"
                      />
                    </div>
                  </div>
                }
              />
              <Checkbox
                label="Transaksi"
                description="Pencatatan transaksi penjualan"
                checked={true}
                onChange={() => {}}
                disabled={true}
                recommendation={
                  <div>
                    <div className="flex gap-2">
                      <RecommendationPill
                        text="Mikro"
                        bgColor="bg-amber-200"
                        textColor="text-amber-700"
                      />
                      <RecommendationPill
                        text="Kecil"
                        bgColor="bg-blue-200"
                        textColor="text-blue-700"
                      />
                      <RecommendationPill
                        text="Menengah"
                        bgColor="bg-purple-200"
                        textColor="text-purple-700"
                      />
                    </div>
                  </div>
                }
              />
              <CheckboxField
                label="Produk"
                description="Manajemen stok dan harga produk"
                name="flagProduct"
                recommendation={
                  <div>
                    <p className="text-[8px] mb-1 text-slate-600">
                      Rekomendasi:
                    </p>
                    <div className="flex gap-2">
                      <RecommendationPill
                        text="Kecil"
                        bgColor="bg-blue-200"
                        textColor="text-blue-700"
                      />
                      <RecommendationPill
                        text="Menengah"
                        bgColor="bg-purple-200"
                        textColor="text-purple-700"
                      />
                    </div>
                  </div>
                }
              />
              <CheckboxField
                label="Pengeluaran"
                description="Pencatatan pengeluaran"
                name="flagExpense"
                recommendation={
                  <div>
                    <p className="text-[8px] mb-1 text-slate-600">
                      Rekomendasi:
                    </p>
                    <div className="flex gap-2">
                      <RecommendationPill
                        text="Kecil"
                        bgColor="bg-blue-200"
                        textColor="text-blue-700"
                      />
                      <RecommendationPill
                        text="Menengah"
                        bgColor="bg-purple-200"
                        textColor="text-purple-700"
                      />
                    </div>
                  </div>
                }
              />
              <CheckboxField
                label="Target"
                description="Penetapan target per bulan"
                name="flagTarget"
                recommendation={
                  <div>
                    <p className="text-[8px] mb-1 text-slate-600">
                      Rekomendasi:
                    </p>
                    <div className="flex gap-2">
                      <RecommendationPill
                        text="Menengah"
                        bgColor="bg-purple-200"
                        textColor="text-purple-700"
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default RegisterForm;
