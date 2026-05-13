import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import CustomButton from "../../../components/atoms/CustomButton";
import { generateId } from "../../../utils/helper";

export default function CreateUpdateSchoolModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing,
  loading = false,
  form,
  setForm,
  role
}) {
  // 1. Sesuaikan emptyForm dengan initialFormData yang baru (Flat Structure)
  const emptyForm = {
    idSekolah: generateId('SKL'),
    namaSekolah: "",
    NPSN: "",
    NSS: "",
    alamatSekolah: "",
    desa: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    kodePos: "",
    website: "",
    email: "",
    kepalaSekolah: "",
    NIPKepalaSekolah: "",
    kelas: []
  };
  // 2. Gunakan idSekolah sebagai pengecekan validitas data
  useEffect(() => {
    if (form && (form.idSekolah || isEditing)) {
      setForm(form);
    } else {
      setForm(emptyForm);
    }
  }, [form, isOpen]);

  if (!isOpen) return null;

  // 3. Sederhanakan handleChange karena struktur data sekarang Flat
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // console.log(form);
    onSave(form);
    // Note: onClose biasanya dipanggil di parent setelah API sukses, 
    // tapi jika ingin langsung tutup bisa dibiarkan di sini.
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-5xl bg-white p-0 rounded-2xl overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="font-bold text-xl">
            {isEditing ? "Edit Sekolah" : "Tambah Sekolah"}
          </h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <FaTimes />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-4 max-h-[calc(80vh-140px)] overflow-y-auto">
          <div className="alert alert-warning text-white font-semibold mb-6">
            <span className="text-sm">
              ⚠️ Untuk mengelola kelas, silakan simpan data sekolah terlebih dahulu,
              lalu klik tombol buku 📚 pada tabel di halaman utama.
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-lg border-l-4 border-primary pl-3">Data Identitas Sekolah</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nama Sekolah *</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="namaSekolah"
                defaultValue={form.namaSekolah}
                onChange={handleChange}
                placeholder="Contoh: SMK UPI Cibiru"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">NPSN</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="NPSN"
                defaultValue={form.NPSN}
                onChange={handleChange}
                placeholder="Nomor Pokok Sekolah Nasional"
              />
            </div>

            <div className={`form-control ${role !== 'admin' ? "hidden" :''}`}>
              <label className="label">
                <span className="label-text font-medium">NSS</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="NSS"
                defaultValue={form.NSS}
                onChange={handleChange}
                placeholder="Nomor Statistik Sekolah"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Kode Pos</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="kodePos"
                defaultValue={form.kodePos}
                onChange={handleChange}
                placeholder="Kode Pos"
              />
            </div>

            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Alamat Lengkap</span>
              </label>
              <textarea
                className="textarea textarea-primary border border-secondary focus:border-none w-full"
                name="alamatSekolah"
                defaultValue={form.alamatSekolah}
                onChange={handleChange}
                placeholder="Jalan, No. Bangunan, RT/RW"
                rows="2"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Desa / Kelurahan</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="desa"
                defaultValue={form.desa}
                onChange={handleChange}
                placeholder="Desa / Kelurahan"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Kecamatan</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="kecamatan"
                defaultValue={form.kecamatan}
                onChange={handleChange}
                placeholder="Kecamatan"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Kabupaten / Kota</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="kabupaten"
                defaultValue={form.kabupaten}
                onChange={handleChange}
                placeholder="Kabupaten / Kota"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Provinsi</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="provinsi"
                defaultValue={form.provinsi}
                onChange={handleChange}
                placeholder="Provinsi"
              />
            </div>
          </div>

          <h3 className="font-semibold mb-4 text-lg border-l-4 border-primary pl-3">Kontak & Pimpinan</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Website</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="website"
                defaultValue={form.website}
                onChange={handleChange}
                placeholder="https://sekolah.sch.id"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">E-mail Resmi</span>
              </label>
              <input
                type="email"
                className="input input-primary border border-secondary focus:border-none w-full"
                name="email"
                defaultValue={form.email}
                onChange={handleChange}
                placeholder="admin@sekolah.sch.id"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nama Kepala Sekolah</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="kepalaSekolah"
                defaultValue={form.kepalaSekolah}
                onChange={handleChange}
                placeholder="Nama Lengkap & Gelar"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">NIP Kepala Sekolah</span>
              </label>
              <input
                className="input input-primary border border-secondary focus:border-none w-full"
                name="NIPKepalaSekolah"
                defaultValue={form.NIPKepalaSekolah}
                onChange={handleChange}
                placeholder="NIP / Identitas Pegawai"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3 z-10">
          <CustomButton type="accent" onClick={onClose}>
            Batal
          </CustomButton>
          <CustomButton loading={loading} type="primary" onClick={handleSave}>
            {isEditing ? "Perbarui Data" : "Simpan Sekolah"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}