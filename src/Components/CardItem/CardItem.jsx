import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";


const ItemsPerPage = 6;

const Carditem = ({ filter }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/barang-card"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = filter
  ? data.reduce((uniqueItems, currentItem) => {
      if (
        currentItem.kategori.kategori === filter &&
        !uniqueItems.some((item) => item.nama_barang === currentItem.nama_barang)
      ) {
        uniqueItems.push(currentItem);
      }
      return uniqueItems;
    }, [])
  : data.reduce((uniqueItems, currentItem) => {
    if (
      !uniqueItems.some((item) => item.nama_barang === currentItem.nama_barang)
    ) {
      uniqueItems.push(currentItem);
    }
    return uniqueItems;
  }, []);

  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / ItemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const maxVisiblePages = 5;
    const ellipsisThreshold = 2;

    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    return Array.from({ length: totalPages }).map((_, index) => {
      const isCurrentPage = index + 1 === currentPage;
      const isEllipsisBefore =
        index + 1 === startPage - 1 && startPage > ellipsisThreshold;
      const isEllipsisAfter =
        index + 1 === endPage + 1 && endPage < totalPages - ellipsisThreshold;

      if (
        totalPages <= maxVisiblePages ||
        index + 1 === 1 ||
        index + 1 === totalPages ||
        (index + 1 >= startPage && index + 1 <= endPage)
      ) {
        const buttonClass = `px-4 py-2 rounded-md font-semibold ${
          isCurrentPage
            ? "border-blue-700 border-2 bg-gray-100 text-gray-600"
            : "bg-gray-100 border text-gray-600"
        }`;
        return (
          <button
            className={buttonClass}
            key={index}
            onClick={() => handlePageChange(index + 1)}
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
    <div className="container mx-auto mt-4">
      <div className="flex space-x-12 px-8">
        {currentItems.length > 0 ? (
          currentItems.slice(0, 3).map((item,index) => (
            <motion.div
            key={item.id_barang}
            className={`animated-card bg-white p-4 rounded-md shadow-md`}
            style={{ maxWidth: "255px" }}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}

            >
              <img
                src={`http://127.0.0.1:8000/storage/${item.gambar_barang}`}
                alt={item.gambar_barang}
                style={{ minWidth: "225px", minHeight: "175px", maxWidth: "225px", maxHeight: "175px" }}
                className=" rounded-lg"
              />
              <center>
              <h2 className=" text-xs bg-blue-700 rounded-lg text-white p-2 font-bold mt-2">{item.nama_barang}</h2>
              </center>
            </motion.div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      {currentItems.length > 3 && (
        <div className="flex space-x-12 px-8 mt-8">
          {currentItems.slice(3).map((item, index) => (
            <motion.div
            key={item.id_barang}
            className={`animated-card bg-white p-4 rounded-md shadow-md`}
            style={{ maxWidth: "255px" }}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}

            >
              <img
                src={`http://127.0.0.1:8000/storage/${item.gambar_barang}`}
                alt={item.gambar_barang}
                style={{ minWidth: "225px", minHeight: "175px", maxWidth: "225px", maxHeight: "175px" }}
                className=" rounded-lg"
              />
              <center>
              <h2 className="text-xs bg-blue-700 rounded-lg text-white p-2 font-bold mt-2">{item.nama_barang}</h2>
              </center>
            </motion.div>
          ))}
        </div>
      )}

      {filteredData.length > ItemsPerPage && (
        <div className="flex space-x-8 px-8 mt-8 text-lg ">
          <button
            className="p-2 rounded-md font-semibold bg-gray-100 border text-gray-600"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </button>
          {renderPaginationButtons()}
          <button
            className=" p-2 rounded-md  font-semibold bg-gray-100 border text-gray-600"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
};

export default Carditem;
