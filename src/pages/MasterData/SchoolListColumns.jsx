// src/pages/SchoolListColumns.jsx
import { FaEdit, FaTrash, FaBook } from "react-icons/fa";
import CustomButton from "../../components/atoms/CustomButton";

export const columns = (onEdit, onDelete, onManageKelas, role) => [
  {
    header: "Nama Sekolah",
    render: (row) => (
      <div className="font-semibold text-primary">
        {row.namaSekolah}
      </div>
    )
  },
  {
    header: "NPSN",
    render: (row) => row.NPSN
  },
  ...(role === 'admin' ? [{
    header: "NSS",
    render: (row) => row.NSS
  }] : []),
  {
    header: "Alamat",
    render: (row) => (
      <div className="text-sm max-w-xs truncate">
        {row.alamatSekolah}
      </div>
    )
  },
  {
    header: "Kepala Sekolah",
    render: (row) => row.kepalaSekolah
  },
  {
    header: "Jumlah Kelas",
    render: (row) => (
      <span className="badge badge-primary px-2">
        {row.kelas?.length || 0} Kelas
      </span>
    )
  },
  {
    header: "Aksi",
    render: (row) => (
      <div className="flex gap-2">
        <CustomButton type={'primary'} onClick={() => onEdit(row)} >
          <FaEdit />
        </CustomButton>
        <CustomButton type={'info'} onClick={() => onManageKelas(row)} >
          <FaBook />
        </CustomButton>
        <CustomButton type={'accent'} onClick={() => onDelete(row)} >
          <FaTrash />
        </CustomButton>
      </div>
    )
  }
];