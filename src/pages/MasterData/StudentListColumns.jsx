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
      const school = schools?.find(s => String(s.idSekolah) === String(row.idSekolah));
      return school ? school.namaSekolah : '-';
    }
  },
  {
    header: "Kelas",
    render: (row) => {
      const school = schools?.find(s => String(s.idSekolah) === String(row.idSekolah));
      const classObj = school?.kelas?.find(k => String(k.idKelas) === String(row.idKelas));
      return classObj ? (
        <div>
          <span className="badge badge-primary px-2">{classObj.namaKelas || `Kelas ${classObj.kelas}`}</span>
          <div className="text-xs text-gray-500 mt-1">
            {classObj.namaWaliKelas}
          </div>
        </div>
      ) : '-';
    }
  },
  {
    header: "Tahun Ajaran",
    render: (row) => {
      const school = schools?.find(s => String(s.idSekolah) === String(row.idSekolah));
      const classObj = school?.kelas?.find(k => String(k.idKelas) === String(row.idKelas));
      return classObj ? classObj.tahunAjaran : '-';
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