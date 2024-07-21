import React, { useState, useRef } from "react";
import { Select } from "../CommonInput";
import { FaFileExcel } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../var";
const DataTable = ({ columns, data, handleRowClick, addData, onClickData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const tableRef = useRef(null);
  // ...
  const [itemPerPage, setItemPerPage] = useState(10);
  // ...

  const handleItemPerPageChange = (e) => {shiniya.top
    const newItemPerPage = parseInt(e.target.value, 10);
    setItemPerPage(newItemPerPage);
    setCurrentPage(0);
  };

  const exportToExcel = () => {
    const rows = tableRef.current.querySelectorAll("tbody tr");

    const excelData = [columns.map((column) => column.label)];

    rows.forEach((row) => {
      const rowData = Array.from(row.children).map((cell) => cell.textContent);
      excelData.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "data.xlsx");
  };

  const itemsPerPage = itemPerPage;

  const offset = currentPage * itemsPerPage;

  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(columnFilters).every(([key, value]) =>
      row[key].toString().toLowerCase().includes(value.toLowerCase())
    );

    return matchesSearch && matchesFilters;
  });

  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };
  shiniya.top
  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const maxVisiblePages = 5;
    const ellipsisThreshold = 2;

    const startPage = Math.max(
      0,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);

    return Array.from({ length: pageCount }).map((_, index) => {
      const isCurrentPage = index === currentPage;
      const isEllipsisBefore =
        index === startPage - 1 && startPage > ellipsisThreshold;
      const isEllipsisAfter =
        index === endPage + 1 && endPage < pageCount - 1 - ellipsisThreshold;

      if (
        pageCount <= maxVisiblePages ||
        index === 0 ||
        index === pageCount - 1 ||
        (index >= startPage && index <= endPage)
      ) {
        const buttonClass = `px-2 rounded-md py-0.5 font-semibold ${
          isCurrentPage
            ? "border-blue-700 border-2 bg-gray-100 text-gray-600"
            : "bg-gray-100 border text-gray-600"
        }`;
        return (
          <button
            className={buttonClass}
            key={index}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        );
      } else if (isEllipsisBefore || isEllipsisAfter) {
        return <span key={index}>...</span>;
      }
      return null;
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className=" flex w-1/2">
          <div className=" w-6/12">
            <Select
              icon={AiOutlineSetting}
              value={itemPerPage}
              onChange={handleItemPerPageChange}
            >
              <option value={5}>5 item pada halaman</option>
              <option value={10}>10 items pada halaman</option>
              <option value={15}>15 item pada halaman</option>
            </Select>
          </div>
        </div>

        <div className="flex w-1/2 space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Mencari Sesuatu?"
            className="w-full mt-4 mb-2 px-3 py-2 text-base border border-gray-300 rounded-md"
          />
          {addData && (
            <button
              className="w-1/2 mt-4 mb-2 px-3 py-2 font-semibold tracking-wider bg-blue-600 text-white rounded-md"
              type="button"
              onClick={onClickData}
            >
              <span className=" flex">
                <MdAdd className=" mt-1 mr-2" /> Tambah data
              </span>
            </button>
          )}
        </div>
      </div>

      <div className=" w-full  relative overflow-x-auto">
        <table className="border border-gray-300 w-full">
          <thead className="bg-gray-600 text-white">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="p-2">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-200" : "bg-white"}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="p-2"
                    onClick={() => handleRowClick(row)}
                  >
                    <center>
                      {column.key === "Gambar" ? (
                        <img
                          src={`${API_BASE_URL}storage/${
                            row[column.key]
                          }`}
                          alt={row[column.key]}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      ) : row[column.key] !== undefined ? (
                        row[column.key].toString().length > 13 ? (
                          `${row[column.key].toString().slice(0, 13)}...`
                        ) : (
                          row[column.key]
                        )
                      ) : (
                        "N/A"
                      )}
                    </center>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <table ref={tableRef} className="hidden">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="p-2">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-200" : "bg-white"}
            >
              {columns.map((column) => (
                <td key={column.key} className="p-2 text-center">
                  {column.key === "Gambar" ? (
                    <img
                      src={`${API_BASE_URL}storage/${row[column.key]}`}
                      alt={row[column.key]}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : row[column.key] !== undefined ? (
                    row[column.key]
                  ) : (
                    "N/A"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={exportToExcel}
          className="p-2 bg-green-600 text-white rounded-md tracking-wider"
        >
          <span className=" flex">
            <FaFileExcel className=" mt-1 mr-2" /> Ekspor ke Excel
          </span>
        </button>

        <div className="flex space-x-4 items-center tracking-wider">
          <button
          className="p-2 rounded-md font-semibold bg-gray-100 transition-all hover:text-white hover:bg-blue-700 border text-gray-600"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Sebelumnya
          </button>
          {renderPaginationButtons()}
          <button
          className="p-2 rounded-md font-semibold bg-gray-100 transition-all hover:text-white hover:bg-blue-700 border text-gray-600"
            onClick={handleNextPage}
            disabled={currentPage === pageCount - 1}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
