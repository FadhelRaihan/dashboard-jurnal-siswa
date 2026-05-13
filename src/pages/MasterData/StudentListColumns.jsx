import { FaTrash } from "react-icons/fa";
import CustomButton from "../../components/atoms/CustomButton";

export const studentColumns = (schools, onDelete, role) => [
  {
    header: "Nama Siswa",
    render: (row) => (
      <div className="font-semibold text-primary">
        {row.nama || row.namaLengkap} 
      </div>
    )
  },
  ...(role === 'admin' ? [{
      header: "NISN",
      render: (row) => row.nisn || row.NISN  
    ,
  }] : []),
  {
    header: "Sekolah",
    render: (row) => {
      return row.namaSekolah || '-';
    }
  },
  {
    header: "Kelas",
    render: (row) => {
      return row.detailKelas ? (
        <div>
          <span className="badge badge-primary px-2">Kelas {row.detailKelas}</span>
          <div className="text-xs text-gray-500 mt-1">
            {row.namaWaliKelas}
          </div>
        </div>
      ) : '-';
    }
  },
  {
    header: "Tahun Ajaran",
    render: (row) => {
      return row.tahunAjaran || '-';
    }
  },
  {
    header: "Aksi",
    render: (row) => (
      <div className="flex gap-2">
        <CustomButton type={'accent'} onClick={() => onDelete(row.NISN)} >
          <FaTrash />
        </CustomButton>
      </div>
    )
  }
];