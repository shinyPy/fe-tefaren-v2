import React, { useState } from "react";
import { Select } from "../CommonInput";
import { FaSlidersH } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import AccountDataModal from "../../Modal/AccountData/AccountDataModal";
import { MdAdd } from 'react-icons/md';

const DataTable = ({ columns, data, filtersData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [maxItemsPerPage, setMaxItemsPerPage] = useState(8);
  const itemsPerPage = maxItemsPerPage; 

  const handleMaxItemsChange = (value) => {
    setMaxItemsPerPage(value);
    setCurrentPage(0);
  };

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
      if (pageCount <= maxVisiblePages || index === 0 || index === pageCount - 1 || (index >= startPage && index <= endPage)) {
        return (
          <button key={index} onClick={() => handlePageChange(index)}>
            {index + 1}
          </button>
        );
      } else if ((index === startPage - 1 && startPage > ellipsisThreshold) || (index === endPage + 1 && endPage < pageCount - 1 - ellipsisThreshold)) {
        return <span key={index}>...</span>;
      }
      return null;
    });
  };


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className=" flex w-1/2">
          {columns.map((column) => (
            <div key={column.key} className={column.isHidden ? "hidden" : ""} style={{ marginBottom: "10px" }}>
              <Select
                className=" ml-2 py-1 px-3 rounded-md hidden"
                value={columnFilters[column.key] || ""}
                onChange={(e) => handleFilterChange(column.key, e.target.value)}
                icon={FaSlidersH}
              >
                {filtersData[column.key].map((filterOption, index) => (
                  <option
                    key={filterOption}
                    value={index === 0 ? "" : filterOption}
                  >
                    {filterOption.toUpperCase()}
                  </option>
                ))}
              </Select>
            </div>
          ))}
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
             {row[column.key].toString().length > 10
               ? `${row[column.key].toString().slice(0, 10)}...`
               : row[column.key]}
           </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
      
      <div className="flex justify-between items-center">
  <div className="justify-start">
  <Select
            value={maxItemsPerPage}
            onChange={(e) => handleMaxItemsChange(e.target.value)}
            icon={FaSlidersH}
          >
            <option value={5}>5 item pada halaman</option>
            <option value={8}>8 item pada halaman</option>
            <option value={10}>10 items pada halaman</option>
          </Select>
  </div>
  <div className="flex space-x-4 justify-end items-center">
    <button onClick={handlePrevPage} disabled={currentPage === 0}>
      Sebelumnya
    </button>
    {renderPaginationButtons()}
    <button onClick={handleNextPage} disabled={currentPage === pageCount - 1}>
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
