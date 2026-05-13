import { FaEdit, FaTrash } from "react-icons/fa";

/* =========================
   MASTER CONFIG
========================= */

const KAIH_ITEMS = [
    {
        id: "bangun_pagi",
        options: [
            { value: 5, label: "Pukul 04.00" },
            { value: 3, label: "Pukul 05.00" },
            { value: 1, label: "Pukul 05.30" },
            { value: 0, label: "Pukul 06.00 atau lebih" },
        ],
    },
    {
        id: "berolahraga", // ✅ FIX: sebelumnya tidak ada
        options: [
            { value: 5, label: "Olahraga" },
            { value: 0, label: "Tidak olahraga" },
        ],
    }
];

const BERIBADAH_NON_MUSLIM = [
    { key: "protestan", label: "Ibadah Protestan", point: 5 },
    { key: "katolik", label: "Ibadah Katolik", point: 5 },
    { key: "tidak", label: "Tidak beribadah", point: 0 },
];

const MAKAN_SEHAT_OPTIONS = [
    { value: 5, label: "Makan sehat bergizi" },
    { value: 3, label: "Makan seadanya" },
    { value: 0, label: "Makanan tidak sehat" },
];

const GEMAR_BELAJAR_OPTIONS = [
    { key: "membaca", label: "Membaca buku", point: 5 },
    { key: "menulis", label: "Menulis", point: 5 },
    { key: "berhitung", label: "Berhitung", point: 5 },
    { key: "lainnya", label: "Lainnya", point: 5 },
    { key: "tidak", label: "Tidak Belajar", point: 0 },
];

const BERMASYARAKAT_OPTIONS = [
    { key: "membantu_ibu", label: "Membantu ibu", point: 5 },
    { key: "piket_kelas", label: "Piket kelas", point: 5 },
    { key: "menghormati_orang_tua", label: "Menghormati orang tua", point: 5 },
    { key: "lainnya", label: "Lainnya", point: 5 },
    { key: "bermain_saja", label: "Bermain saja", point: 0 },
];

const TIDUR_CEPAT_OPTIONS = [
    { key: "before2030", label: "Sebelum 20.30", point: 5 },
    { key: "between21_22", label: "Pukul 21.00–22.00", point: 3 },
    { key: "after2200", label: "Di atas 22.00", point: 0 },
];

/* =========================
   HELPER (BIAR CLEAN)
========================= */

// ambil label + value
const getLabelWithValue = (items, id, value) => {
    const option = items
        .find(item => item.id === id)
        ?.options.find(opt => opt.value === value);

    return option ? `${option.label} (${value})` : "-";
};

// ambil label + point
const getLabelWithPoint = (options, key) => {
    const option = options.find(opt => opt.key === key);
    return (
        <p className="min-w-fit">
            {option ? `${option.label} (${option.point})` : "-"}
        </p>
    )
};

/* =========================
   COLUMNS
========================= */

export const jurnalColumns = (onEdit, onDelete) => [
    { header: "Nama", accessor: "nama" },
    { header: "Tanggal", accessor: "tanggal" },

    {
        header: "Bangun Pagi",
        render: (row) =>
            getLabelWithValue(KAIH_ITEMS, "bangun_pagi", row.kebiasaan.bangun_pagi)
    },

    {
        header: "Ibadah",
        render: (row) => {
            const ibadah = row.kebiasaan.beribadah; // ✅ FIX DI SINI

            // handle non muslim
            if (ibadah.mode === "nonMuslim") {
                const option = BERIBADAH_NON_MUSLIM.find(
                    opt => opt.key === ibadah.nonMuslim
                );

                return (
                    <div className="min-w-[200px]">
                        <div className="">
                            {option ? option.label : "-"} ({option?.point ?? 0})
                        </div>
                    </div>
                );
            }

            // muslim
            const wajibList = Object.entries(ibadah.wajib)
                .filter(([_, val]) => val)
                .map(([key]) => key);

            return (
                <div className="min-w-[220px]">
                    <div className="">
                        Sholat {wajibList.length}/5 ({wajibList.length})
                    </div>
                    <div className="text-xs text-gray-500">
                        {wajibList.join(", ")}
                    </div>
                </div>
            );
        }
    },

    {
        header: "Olahraga",
        render: (row) =>
            getLabelWithValue(KAIH_ITEMS, "berolahraga", row.kebiasaan.olahraga)
    },

    {
        header: "Makan",
        render: (row) => {
            const m = row.kebiasaan.makan;

            return (
                <div className="min-w-[200px]">
                    <div className="">
                        Total ({m.sarapan + m.siang + m.malam})
                    </div>
                    <div className="text-xs text-gray-500">
                        Sarapan: {m.sarapan}, Siang: {m.siang}, Malam: {m.malam}
                    </div>
                </div>
            );
        }
    },

    {
        header: "Belajar",
        render: (row) => {
            const b = row.kebiasaan.belajar;
            const option = GEMAR_BELAJAR_OPTIONS.find(opt => opt.key === b.activity);

            return (
                <div className="min-w-[200px]">
                    <div className="">
                        {option ? option.label : "-"} ({b.point})
                    </div>
                    <div className="text-xs text-gray-500">
                        {b.start} - {b.end}
                    </div>
                </div>
            );
        }
    },

    {
        header: "Bermasyarakat",
        render: (row) => {
            const b = row.kebiasaan.bermasyarakat;
            const option = BERMASYARAKAT_OPTIONS.find(opt => opt.key === b.activity);

            return (
                <div className="min-w-[200px]">
                    <div className="">
                        {option ? option.label : "-"} ({b.point})
                    </div>
                    <div className="text-xs text-gray-500">
                        Dengan: {b.pendamping}
                    </div>
                </div>
            );
        }
    },

    {
        header: "Tidur",
        render: (row) => {
            const value = row.kebiasaan.tidur;
            const option = TIDUR_CEPAT_OPTIONS.find(opt => opt.point === value);

            return (
                <div className="min-w-[180px]">
                    <div className="">
                        {option ? option.label : "-"} ({value})
                    </div>
                    <div className="text-xs text-gray-500">
                        Jam: {row.kebiasaan.tidur_time}
                    </div>
                </div>
            );
        }
    },

    {
        header: "Aksi",
        render: (row) => (
            <div className="flex gap-2">
                {/* <button className="btn btn-sm btn-warning" onClick={() => onEdit(row)}>
                    <FaEdit />
                </button> */}
                <button className="btn btn-sm btn-error" onClick={() => onDelete(row)}>
                    <FaTrash />
                </button>
            </div>
        )
    }
];