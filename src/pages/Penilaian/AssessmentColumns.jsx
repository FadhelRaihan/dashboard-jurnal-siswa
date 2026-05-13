import { FaSave } from "react-icons/fa";

export const columns = [
    {
      header: "Nama Siswa",
      accessor: "nama"
    },
    {
      header: "UH 1",
      render: (row) => (
        <input
          type="number"
          defaultValue={row.uh1}
          className="input input-secondary rounded-lg border border-secondary input-sm w-20 text-center"
        />
      )
    },
    {
      header: "UH 2",
      render: (row) => (
        <input
          type="number"
          defaultValue={row.uh2}
          className="input input-secondary rounded-lg border border-secondary input-sm w-20 text-center"
        />
      )
    },
    {
      header: "UH 3",
      render: (row) => (
        <input
          type="number"
          defaultValue={row.uh3}
          className="input input-secondary rounded-lg border border-secondary input-sm w-20 text-center"
        />
      )
    },
    {
      header: "UTS",
      render: (row) => (
        <input
          type="number"
          defaultValue={row.uts}
          className="input input-secondary rounded-lg border border-secondary input-sm w-20 text-center"
        />
      )
    },
    {
      header: "UAS",
      render: (row) => (
        <input
          type="number"
          defaultValue={row.uas}
          className="input input-secondary rounded-lg border border-secondary input-sm w-20 text-center"
        />
      )
    },
    {
      header: "Rata-rata",
      render: (row) => {
        const avg =
          ((row.uh1 || 0) +
            (row.uh2 || 0) +
            (row.uh3 || 0) +
            (row.uts || 0) +
            (row.uas || 0)) / 5;
  
        return (
          <span
            className={`badge px-2 font-semibold ${
              avg >= 80
                ? "badge-success"
                : avg >= 70
                ? "badge-warning"
                : "badge-error"
            }`}
          >
            {avg.toFixed(1)}
          </span>
        );
      }
    },
    {
      header: "Aksi",
      render: () => (
        <button className="btn btn-sm btn-secondary text-white flex items-center">
          <FaSave/> Simpan
        </button>
      )
    }
  ];