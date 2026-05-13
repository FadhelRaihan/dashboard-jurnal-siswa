export const dummyDataSekolah = [
  {
    id: 1,
    sekolah: {
      nama_sekolah: 'SD Maju Jaya 04',
      npsn: '45454545',
      nss: '010101010101',
      alamat: 'Jalan Jalak Mungil No. 12',
      desa_kelurahan: 'Tabing',
      kecamatan: 'Luwukwaru',
      kabupaten_kota: 'Malang',
      provinsi: 'Jawa Timur',
      kode_pos: '28453',
      website: 'https://sdmajujaya.sch.id',
      email: 'info@sdmajujaya.sch.id',
      nama_kepala_sekolah: 'Sujiwo, M.Pd',
      nip_kepala_sekolah: '1234567'
    },
    kelas_list: [
      {
        id: 1,
        nama_wali_kelas: 'Maulana Fajar Wandhiro',
        nip_wali_kelas: '111222333',
        kelas: '4',
        fase: 'B',
        semester: 'II',
        tahun_ajaran: '2025/2026',
        tempat_tanggal_rapor: 'Malang, 14 Juli 2025'
      },
      {
        id: 2,
        nama_wali_kelas: 'Siti Aminah',
        nip_wali_kelas: '999888777',
        kelas: '5',
        fase: 'C',
        semester: 'I',
        tahun_ajaran: '2025/2026',
        tempat_tanggal_rapor: 'Malang, 14 Juli 2025'
      }
    ]
  },
  {
    id: 2,
    sekolah: {
      nama_sekolah: 'SD Nusantara 01',
      npsn: '98765432',
      nss: '020202020202',
      alamat: 'Jl. Merdeka No. 45',
      desa_kelurahan: 'Sukamaju',
      kecamatan: 'Lowokwaru',
      kabupaten_kota: 'Malang',
      provinsi: 'Jawa Timur',
      kode_pos: '65141',
      website: '',
      email: '',
      nama_kepala_sekolah: 'Budi Santoso, S.Pd',
      nip_kepala_sekolah: '7654321'
    },
    kelas_list: [
      {
        id: 1,
        nama_wali_kelas: 'Dewi Lestari',
        nip_wali_kelas: '222333444',
        kelas: '6',
        fase: 'C',
        semester: 'II',
        tahun_ajaran: '2025/2026',
        tempat_tanggal_rapor: 'Malang, 20 Juni 2025'
      }
    ]
  }
];


export const dataSiswa = [
  {
    id: 1,
    nama: 'Ahmad Fauzan',
    nisn: '0011223344',
    sekolah_id: 1,
    kelas_id: 1,
  },
  {
    id: 2,
    nama: 'Siti Rahma',
    nisn: '0055667788',
    sekolah_id: 1,
    kelas_id: 2,
  },
  {
    id: 3,
    nama: 'Budi Hartono',
    nisn: '0099887766',
    sekolah_id: 2,
    kelas_id: 1,
  },
  {
    id: 4,
    nama: 'Dewi Anggraini',
    nisn: '0022446688',
    sekolah_id: 2,
    kelas_id: 1,
  }
];

export const dataJurnalSiswa = [
  {
    id: 1,
    id_siswa: 1,
    nama: "Ahmad Fauzan",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 5,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: true, dzuhur: true, ashar: true, maghrib: true, isya: true },
        sunah: { dhuha: true, tahajud: true },
        mengaji: true
      },
      olahraga: 5,
      makan: { sarapan: 5, siang: 5, malam: 5 },
      belajar: { start: "15:00", end: "16:00", point: 5, activity: "membaca", lainnyaText: "" },
      bermasyarakat: { pendamping: "ibu", point: 5, activity: "membantu_ibu", lainnyaText: "" },
      tidur: 5,
      tidur_time: "20:15"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 2,
    id_siswa: 2,
    nama: "Siti Rahma",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 3,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: true, dzuhur: true, ashar: false, maghrib: true, isya: true },
        sunah: { dhuha: false, tahajud: false },
        mengaji: true
      },
      olahraga: 0,
      makan: { sarapan: 3, siang: 5, malam: 5 },
      belajar: { start: "16:00", end: "17:00", point: 5, activity: "menulis", lainnyaText: "" },
      bermasyarakat: { pendamping: "ayah", point: 5, activity: "menghormati_orang_tua", lainnyaText: "" },
      tidur: 3,
      tidur_time: "21:15"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 3,
    id_siswa: 3,
    nama: "Budi Hartono",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 1,
      beribadah: {
        mode: "nonMuslim",
        nonMuslim: "protestan",
        wajib: {},
        sunah: {},
        mengaji: false
      },
      olahraga: 5,
      makan: { sarapan: 5, siang: 3, malam: 3 },
      belajar: { start: "14:00", end: "15:00", point: 5, activity: "berhitung", lainnyaText: "" },
      bermasyarakat: { pendamping: "teman", point: 5, activity: "piket_kelas", lainnyaText: "" },
      tidur: 5,
      tidur_time: "20:00"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 4,
    id_siswa: 4,
    nama: "Dewi Anggraini",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 0,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: false, dzuhur: true, ashar: true, maghrib: true, isya: false },
        sunah: { dhuha: false, tahajud: false },
        mengaji: false
      },
      olahraga: 0,
      makan: { sarapan: 0, siang: 3, malam: 5 },
      belajar: { start: "19:00", end: "20:00", point: 0, activity: "tidak", lainnyaText: "" },
      bermasyarakat: { pendamping: "ibu", point: 0, activity: "bermain_saja", lainnyaText: "" },
      tidur: 0,
      tidur_time: "23:00"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 5,
    id_siswa: 5,
    nama: "Rizky Pratama",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 5,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: true, dzuhur: true, ashar: true, maghrib: true, isya: true },
        sunah: { dhuha: true, tahajud: false },
        mengaji: true
      },
      olahraga: 5,
      makan: { sarapan: 5, siang: 5, malam: 3 },
      belajar: { start: "15:30", end: "16:30", point: 5, activity: "membaca", lainnyaText: "" },
      bermasyarakat: { pendamping: "ayah", point: 5, activity: "membantu_ibu", lainnyaText: "" },
      tidur: 5,
      tidur_time: "20:30"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 6,
    id_siswa: 6,
    nama: "Andi Saputra",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 3,
      beribadah: {
        mode: "nonMuslim",
        nonMuslim: "katolik",
        wajib: {},
        sunah: {},
        mengaji: false
      },
      olahraga: 5,
      makan: { sarapan: 3, siang: 3, malam: 3 },
      belajar: { start: "17:00", end: "18:00", point: 5, activity: "lainnya", lainnyaText: "coding" },
      bermasyarakat: { pendamping: "teman", point: 5, activity: "piket_kelas", lainnyaText: "" },
      tidur: 3,
      tidur_time: "21:30"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 7,
    id_siswa: 7,
    nama: "Nabila Putri",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 5,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: true, dzuhur: true, ashar: true, maghrib: true, isya: true },
        sunah: { dhuha: true, tahajud: true },
        mengaji: true
      },
      olahraga: 0,
      makan: { sarapan: 5, siang: 5, malam: 5 },
      belajar: { start: "14:00", end: "15:00", point: 5, activity: "menulis", lainnyaText: "" },
      bermasyarakat: { pendamping: "ibu", point: 5, activity: "menghormati_orang_tua", lainnyaText: "" },
      tidur: 5,
      tidur_time: "20:00"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 8,
    id_siswa: 8,
    nama: "Fajar Nugroho",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 1,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: false, dzuhur: true, ashar: false, maghrib: true, isya: true },
        sunah: { dhuha: false, tahajud: false },
        mengaji: false
      },
      olahraga: 5,
      makan: { sarapan: 3, siang: 3, malam: 0 },
      belajar: { start: "18:00", end: "19:00", point: 5, activity: "berhitung", lainnyaText: "" },
      bermasyarakat: { pendamping: "teman", point: 5, activity: "piket_kelas", lainnyaText: "" },
      tidur: 3,
      tidur_time: "21:45"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 9,
    id_siswa: 9,
    nama: "Putra Mahardika",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 0,
      beribadah: {
        mode: "nonMuslim",
        nonMuslim: "tidak",
        wajib: {},
        sunah: {},
        mengaji: false
      },
      olahraga: 0,
      makan: { sarapan: 0, siang: 3, malam: 3 },
      belajar: { start: "20:00", end: "21:00", point: 0, activity: "tidak", lainnyaText: "" },
      bermasyarakat: { pendamping: "teman", point: 0, activity: "bermain_saja", lainnyaText: "" },
      tidur: 0,
      tidur_time: "23:30"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 10,
    id_siswa: 10,
    nama: "Aisyah Zahra",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 5,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: true, dzuhur: true, ashar: true, maghrib: true, isya: true },
        sunah: { dhuha: true, tahajud: false },
        mengaji: true
      },
      olahraga: 5,
      makan: { sarapan: 5, siang: 5, malam: 5 },
      belajar: { start: "13:00", end: "14:00", point: 5, activity: "membaca", lainnyaText: "" },
      bermasyarakat: { pendamping: "ibu", point: 5, activity: "membantu_ibu", lainnyaText: "" },
      tidur: 5,
      tidur_time: "20:10"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  },

  {
    id: 11,
    id_siswa: 11,
    nama: "Ilham Maulana",
    tanggal: "2026-03-26",
    kebiasaan: {
      bangun_pagi: 3,
      beribadah: {
        mode: "muslim",
        nonMuslim: null,
        wajib: { subuh: true, dzuhur: true, ashar: true, maghrib: false, isya: true },
        sunah: { dhuha: false, tahajud: false },
        mengaji: true
      },
      olahraga: 5,
      makan: { sarapan: 3, siang: 5, malam: 5 },
      belajar: { start: "16:00", end: "17:00", point: 5, activity: "menulis", lainnyaText: "" },
      bermasyarakat: { pendamping: "ayah", point: 5, activity: "menghormati_orang_tua", lainnyaText: "" },
      tidur: 3,
      tidur_time: "21:20"
    },
    created_at: "2026-03-26T10:30:00",
    updated_at: "2026-03-26T10:30:00"
  }
];