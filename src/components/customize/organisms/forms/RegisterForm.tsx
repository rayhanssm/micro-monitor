import React from "react";
import TextField from "../../molecules/input-field/TextField";
import CheckboxField from "../../molecules/input-field/CheckboxField";
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
        <>
          <p className="text-sm">
            Pilih fitur-fitur berikut yang sesuai dengan kebutuhan UMKM Anda!
          </p>
          <CheckboxField
            label="Produk"
            description="Manajemen harga dan stok produk"
            name="flagProduct"
          />
          <CheckboxField
            label="Pengeluaran"
            description="Pencatatan pengeluaran"
            name="flagExpense"
          />
          <CheckboxField
            label="Target"
            description="Penetapan target per bulan"
            name="flagTarget"
          />
        </>
      )}
    </form>
  );
}

export default RegisterForm;
