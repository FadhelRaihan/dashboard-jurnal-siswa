import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CustomTable({ 
  columns = [], 
  data = [], 
  loading = false, 
  pagination = null, 
  onPageChange = () => {},
  onLimitChange = () => {}
}) {
  
  const currentPage = parseInt(pagination?.currentPage || 1, 10);
  const totalPages = parseInt(pagination?.totalPages || 0, 10);
  const limit = parseInt(pagination?.limit || 10, 10);
  const totalData = parseInt(pagination?.totalData || 0, 10);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
       start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all active:scale-90 ${
            currentPage === i ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-base-200 text-base-content/60 hover:bg-base-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="w-full bg-base-100 border-2 border-base-200 shadow-md rounded-[2rem] overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra-zebra w-full">
          <thead className="bg-primary text-white border-b border-primary-focus font-black text-sm uppercase tracking-wider">
            <tr>
              <th className="w-16 text-center py-5 px-4 border-none">No</th>
              {columns.map((col, i) => (
                <th key={i} className="py-5 border-none text-left whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-base-content font-medium">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-20 bg-base-100">
                   <div className="flex flex-col items-center gap-3">
                      <span className="loading loading-infinity loading-lg text-primary"></span>
                      <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Memuat Data</span>
                   </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-primary/5 transition-colors border-b border-base-200 group">
                  <td className="text-center font-black text-base-content/60 py-4 px-4 group-hover:text-primary transition-colors">
                    {(currentPage - 1) * limit + (rowIndex + 1)}
                  </td>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-4 align-middle">
                      <div className="transition-all group-hover:translate-x-0.5 duration-200">
                         {col.render ? col.render(row) : row[col.accessor]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-16 bg-base-100">
                   <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="text-4xl">📭</div>
                      <span className="font-black text-xs uppercase tracking-wider">Tidak Ada Data</span>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Premium Pagination Footer */}
      {pagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center p-5 bg-base-200/50 border-t-2 border-base-200 gap-4 w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
               <select 
                 className="select select-bordered select-sm font-black border-2 border-base-300 focus:border-primary focus:outline-none rounded-xl text-xs pr-8 bg-base-100 appearance-none"
                 value={limit} 
                 onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
               >
                 {[10, 25, 50, 100].map(val => (
                   <option key={val} value={val}>{val} Baris</option>
                 ))}
               </select>
            </div>
            <span className="text-xs font-bold text-base-content/50">
               Tampil <span className="text-base-content font-black">{data.length}</span> dari <span className="text-base-content font-black">{totalData}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-base-100 p-1.5 border-2 border-base-300 rounded-full shadow-sm">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-base-200 text-base-content/60 hover:bg-base-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              disabled={currentPage <= 1} 
              onClick={() => onPageChange(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
            
            <div className="flex items-center gap-1 px-1">
               {renderPageNumbers()}
            </div>

            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-base-200 text-base-content/60 hover:bg-base-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              disabled={currentPage >= totalPages} 
              onClick={() => onPageChange(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}