import React, { useState } from "react";
import { Select } from "../CommonInput";
import { FaSlidersH } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import AccountDataModal from "../../Modal/AccountData/AccountDataModal";

const DataTable = ({ columns, data, filtersData }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className=" flex">
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

        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Mencari Sesuatu?"
            className="w-full mt-4 px-3 py-2 text-base border border-gray-300 rounded-md"
          />
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

  <AnimatePresence mode="wait">
  {isModalVisible && (
    <center>
        <AccountDataModal rowData={selectedRowData} closeModal={closeModal} />
        </center>
      )}
      </AnimatePresence>

      <div className="pagination">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
