import React, { useState, useRef } from "react";
import { Select } from "../CommonInput";
import { FaFileExcel } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import AccountDataModal from "../../Modal/AccountData/AccountDataModal";
import { MdAdd } from 'react-icons/md';
import { AiOutlineSetting } from 'react-icons/ai';
import { DownloadTableExcel } from "react-export-table-to-excel";

const DataTable = ({ columns, data}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const tableRef = useRef(null);
  // ...
  const [itemPerPage, setItemPerPage] = useState(10);

  // ...

  const handleItemPerPageChange = (e) => {
    const newItemPerPage = parseInt(e.target.value, 10);
    setItemPerPage(newItemPerPage);
    setCurrentPage(0);
  };

  // ...

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

  const handleFilterChange = (columnKey, filterValue) => {
    setColumnFilters({
      ...columnFilters,
      [columnKey]: filterValue,
    });
    setCurrentPage(0);
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
  
    const startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);
  
    return Array.from({ length: pageCount }).map((_, index) => {
      const isCurrentPage = index === currentPage;
      const isEllipsisBefore = index === startPage - 1 && startPage > ellipsisThreshold;
      const isEllipsisAfter = index === endPage + 1 && endPage < pageCount - 1 - ellipsisThreshold;
  
      if (pageCount <= maxVisiblePages || index === 0 || index === pageCount - 1 || (index >= startPage && index <= endPage)) {
        const buttonClass = `py-0.5 px-2.5 font-semibold border rounded-full ${isCurrentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`;
        return (
          <button className={buttonClass} key={index} onClick={() => handlePageChange(index)}>
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
                        <button
            className="w-1/2 mt-4 mb-2 px-3 py-2 font-semibold tracking-wider bg-blue-600 text-white rounded-md"
                type="button"
              >
                <span className=" flex">
               <MdAdd className=" mt-1 mr-2"/> Tambah data
               </span>
              </button>
        </div>
      </div>

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
        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
          {columns.map((column) => (
             <td
             key={column.key}
             className="p-2 text-center"
             onClick={() => handleRowClick(row)}
           >
             {row[column.key].toString().length > 13
               ? `${row[column.key].toString().slice(0, 13)}...`
               : row[column.key]}
           </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>

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
        <tr key={rowIndex}>
          {columns.map((column) => (
             <td
             key={column.key}
             className="p-2 text-center"
           >
             {row[column.key]}
           </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>

  <div className="flex justify-between items-center mt-4">
  <DownloadTableExcel
    filename="dataPengguna"
    sheet="dataPengguna"
    currentTableRef={tableRef.current} 
  >
    <button className="p-2 bg-green-600 text-white rounded-md tracking-wider">
    <span className=" flex">
               <FaFileExcel className=" mt-1 mr-2"/>  Ekspor ke Excel
               </span>
    </button>
  </DownloadTableExcel>

  <div className="flex space-x-4 items-center tracking-wider">
    <button className="p-2 font-semibold bg-gray-100 border text-gray-800 rounded-md tracking-wider" onClick={handlePrevPage} disabled={currentPage === 0}>
      Sebelumnya
    </button>
    {renderPaginationButtons()}
    <button className="p-2 bg-gray-100 font-semibold border text-gray-800 rounded-md tracking-wider" onClick={handleNextPage} disabled={currentPage === pageCount - 1}>
      Selanjutnya
    </button>
  </div>
</div>

<AnimatePresence mode="wait">
  {isModalVisible && (
    <center>
        <AccountDataModal rowData={selectedRowData} closeModal={closeModal} />
        </center>
      )}
      </AnimatePresence>

    </div>
  );
};

export default DataTable;
