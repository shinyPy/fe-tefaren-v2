import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigation } from "../../Utils/Navigation";
import { useModal } from "../../Utils/ModalUtils";

const DesktopNotAuth = () => {
  const navigate = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isLoginOpen, setIsLoginOpen] = useModal("login", false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const [isRegisterOpen, setIsRegisterOpen] = useModal("register", false);

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const allResults = [
    {
      id: 1,
      nama: "Beranda",
      alias: "Home",
      alias2: "Halaman Utama",
      alias3: "Rumah",
      path: "/",
    },
    {
      id: 2,
      nama: "Register",
      alias: "Daftarkan Akun",
      alias2: "Pendaftaran",
      alias3: "Sign Up",
      path: "/",
      modal: true,
      open: openRegister,
    },
    {
      id: 3,
      nama: "Login",
      alias: "Masuk",
      alias2: "Log In",
      alias3: "Sign In",
      path: "/",
      modal: true,
      open: openLogin,
    },
  ];

  function escapeRegExp(string) {
    return string
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\s+/g, "\\s*");
  }

  const handleSearch = (value) => {
    const escapedValue = escapeRegExp(value);
    const regex = new RegExp(escapedValue, "i");
    const matchedResults = allResults.filter((result) => {
      const aliases = [
        result.nama,
        result.alias,
        result.alias2,
        result.alias3,
      ].map((alias) => alias.replace(/\s+/g, ""));
      return aliases.some((alias) => regex.test(alias));
    });
    setSearchResults(matchedResults);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length >= 1) {
      handleSearch(value);
    } else {
      setSearchResults([]);
    }
  };

  const navigateWithConfirmation = (path, modal, open) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin pindah ke halaman ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(path);
        if (modal) {
          open();
        }
      }
    });
  };

  return (
    <div className="flex items-center h-screen p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-red-600">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-gray-700">
            Maaf, anda tidak memiliki otoritas untuk halaman ini
          </p>
          <div className="mt-8 relative w-full">
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Mencari Sesuatu?"
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-md"
            />
            {searchValue.length >= 1 && (
              <div className="absolute mt-1 z-10 bg-white border border-gray-300 shadow-md max-h-32 overflow-y-auto w-full rounded-md">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((result) => (
                      <li key={result.id} className="px-3 py-2">
                        <motion.button
                          onClick={() =>
                            navigateWithConfirmation(
                              result.path,
                              result.modal,
                              result.open
                            )
                          }
                          initial={{ y: 50 }}
                          animate={{ y: 0 }}
                          className="hover:bg-red-600 py-1 hover:text-white transition-all w-full rounded-md"
                        >
                          Mungkin Anda Mencari "{result.nama}"
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
                    <p className="px-3 py-2">Tidak Di Temukan</p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              className="text-blue-700 hover:underline transition-all"
              onClick={() => navigateWithConfirmation("/")}
            >
              Kembali Ke Beranda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNotAuth;
