import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../var";

const ItemsPerPage = 3;

const Carditem = ({ filter, search }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/barang-card`);
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
        (!search || currentItem.nama_barang.toLowerCase().includes(search.toLowerCase())) &&
        !uniqueItems.some((item) => item.nama_barang === currentItem.nama_barang)
      ) {
        uniqueItems.push(currentItem);
      }
      return uniqueItems;
    }, [])
  : data.reduce((uniqueItems, currentItem) => {
      if (
        (!search || currentItem.nama_barang.toLowerCase().includes(search.toLowerCase())) &&
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
    <div className="flex space-x-8 px-8">
      {currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <motion.div
            key={index}
            className="animated-card rounded-md shadow-md"
            style={{ maxWidth: "270px" }}
            whileHover={{ y: -15, transition: { duration: 0.35 } }}
          >
<div
  style={{
    minWidth: "280px",
    minHeight: "440px",
    maxWidth: "280px",
    maxHeight: "440px",
    objectFit: "cover",
    backgroundImage: `url(${API_BASE_URL}storage/${item.gambar_barang})`,    
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }}
  className=" rounded-lg"
>
<div class="absolute p-4 rounded-b-lg bottom-0 bg-black backdrop-blur-sm bg-opacity-50 w-full">
  <h2 class="text-white font-semibold">{item.nama_barang}</h2>
  <div class="w-1/3 h-1 mt-1 rounded-lg bg-red-500"></div>
</div>

</div>

          </motion.div>
        ))
      ) : (
        <p>Barang Tidak di temukan</p>
      )}
    </div>

    {filteredData.length > ItemsPerPage && (
      <div className="flex space-x-4 px-8 mt-8 text-lg">
        <button
          className="p-2 rounded-md font-semibold bg-gray-100 transition-all hover:text-white hover:bg-blue-700 border text-gray-600"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </button>
        {renderPaginationButtons()}
        <button
          className="p-2 rounded-md font-semibold bg-gray-100 transition-all hover:text-white hover:bg-blue-700 border text-gray-600"
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
