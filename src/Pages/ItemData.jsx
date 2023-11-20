import React, { useState, useEffect } from "react";
import Homepreload from "../Components/HomePreload";
import Preload from "../Components/Preload";
import PageTitle from "../Utils/PageTitle";

import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

import ItemDataDesktop from "../Layouts/ItemData/Desktop";
import ItemDataMobile from "../Layouts/ItemData/Mobile";

function ItemData() {
  const isMobile = useMediaQuery({ maxWidth: 400 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloadState, setPreloadState] = useState(1);

  useEffect(() => {
    // Periksa apakah ada nilai "preloadState" yang disimpan di localStorage
    const storedPreloadState = localStorage.getItem("preloadState");

    if (storedPreloadState) {
      setPreloadState(parseInt(storedPreloadState, 10));
    }

    const delay = preloadState === 1 ? 2000 : 8000;

    // Simulasikan waktu tunggu selama 8 detik sebelum menandai bahwa komponen telah dimuat.
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [preloadState]);

  useEffect(() => {
    const delay = preloadState === 1 ? 2000 : 8000;

    // Tambahkan penanganan waktu tunggu 5 detik sebelum mengubah preloadState
    const timer = setTimeout(() => {
      if (preloadState === 2) {
        setPreloadState(1);
        localStorage.setItem("preloadState", "1");
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [preloadState]);

  return (
    <div>
      <PageTitle title="Data Pengguna" />
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }} // Atur opacity awal menjadi 0
        animate={{ opacity: 1 }} // Animasikan opacity menjadi 1
        exit={{ opacity: 0 }} // Atur opacity ketika keluar
      >
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              key="preload"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {preloadState === 2 ? <Homepreload /> : <Preload />}
            </motion.div>
          )}
        </AnimatePresence>
        {isLoaded && (
          <AnimatePresence>
            {isMobile ? (
              <motion.div
                key="mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ItemDataMobile />
              </motion.div>
            ) : (
              <motion.div
                key="desktop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ItemDataDesktop />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}

export default ItemData;
