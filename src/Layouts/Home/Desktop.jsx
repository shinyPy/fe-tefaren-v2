import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarDesktop from "../../Components/Navigation/NavbarDesktop";
import LoginModal from "../../Modal/Home/LoginDesktop";
import RegisterModal from "../../Modal/Home/RegisterDesktop";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useModal } from "../../Utils/ModalUtils";
import vectorImage from "../../Assets/Image/business-team-and-work-process-steps-from-idea-to-target-business-workflow-business-process-efficiency-working-activity-pattern-concept-flat-modern-illustration-vector.jpg";
import logoTelkom from "../../Assets/Image/logo-telkom-schools-horisontal-1024x320.png";
import CardSlider from "../../Components/CardSlider";
import Carditem from "../../Components/CardItem/CardItem";
import Scroll from "../../Components/ScrollButton/Scroll";
import { FaSearch, FaArrowAltCircleRight, FaList } from "react-icons/fa";
import { Pannellum } from "pannellum-react";
import tefa from "../../Assets/Image/360.jpeg";
import Swal from "sweetalert2";
import notFound from "../../Assets/Image/4660894_2456051.jpg";
import SubmissionForm from "../../Components/SubmissionForm";

const HomeDesktop = () => {
  const cleanupLocalStorage = () => {
    // Membersihkan data di localStorage
    const keysToRemove = [
      "user_role",
      "user_nis",
      "user_email",
      "login_success_message",
      "accessToken",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Set preloadState ke "2"
    localStorage.setItem("preloadState", "2");
  };

  const [isLoginOpen, setIsLoginOpen] = useModal("login", false);

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const [isRegisterOpen, setIsRegisterOpen] = useModal("register", false);

  const openRegister = () => {
    setIsRegisterOpen(true);
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);
  };

  const linkToRegister = () => {
    closeLogin();

    // Menunggu selama 0.35 detik sebelum memanggil openRegister
    setTimeout(() => {
      openRegister();
    }, 350); // Waktu dalam milidetik (0.35 detik = 350 milidetik)
  };

  const linkToLogin = () => {
    closeRegister();

    // Menunggu selama 0.35 detik sebelum memanggil openRegister
    setTimeout(() => {
      openLogin();
    }, 350); // Waktu dalam milidetik (0.35 detik = 350 milidetik)
  };

  useEffect(() => {
    const loginSuccessMessage = localStorage.getItem("login_success_message");

    if (loginSuccessMessage) {
      // Menampilkan toast jika ada pesan login sukses
      toast.success(loginSuccessMessage);

      // Hapus pesan dari localStorage agar tidak tampil lagi setelah hard refresh
      localStorage.removeItem("login_success_message");
    }
  }, []);

  const imgStyle = {
    height: "70vh",
    width: "140vh",
    objectFit: "cover",
  };

  const imgStyle2 = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  };

  const imgStyle3 = {
    height: "70vh",
    width: "140vh",
    objectFit: "cover",
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          // Jika token tidak ditemukan, set isAuthenticated menjadi false
          setIsAuthenticated(false);
          return;
        }

        const res = await axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          // Check if localStorage values match the response data before updating
          const localStorageUserRole = localStorage.getItem("user_role");
          const localStorageUserNis = localStorage.getItem("user_nis");
          const localStorageUserEmail = localStorage.getItem("user_email");

          if (
            localStorageUserRole !== res.data.level_pengguna ||
            localStorageUserNis !== res.data.nomorinduk_pengguna ||
            localStorageUserEmail !== res.data.email
          ) {
            // If values don't match, navigate to login
            cleanupLocalStorage();
            openLogin();
            navigate("/login");
            return;
          }

          // Refresh localStorage with the response data
          localStorage.setItem("user_role", res.data.level_pengguna);
          localStorage.setItem("user_nis", res.data.nomorinduk_pengguna);
          localStorage.setItem("user_email", res.data.email);

          setIsAuthenticated(true);

          // If the user level is admin, allow access
          if (res.data.level_pengguna === "admin") {
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        // Jika terjadi error atau token tidak valid, set isAuthenticated menjadi false
        setIsAuthenticated(false);
      }
    };

    // Pertama kali cek otentikasi saat komponen dimount
    checkAuthentication();
  }, [navigate, openLogin]);

  const [showTEFA, setShowTEFA] = useState(true);
  const [showTEFAREN, setShowTEFAREN] = useState(false);

  const [activeButton, setActiveButton] = useState("TEFA");

  const toggleTEFA = () => {
    setShowTEFA(true);
    setShowTEFAREN(false);
    setActiveButton("TEFA");
  };

  const toggleTEFAREN = () => {
    setShowTEFA(false);
    setShowTEFAREN(true);
    setActiveButton("TEFAREN");
  };

  const userRole = localStorage.getItem("user_role");
  const authorizedRoles = ["admin"]; // Add the roles that are authorized

  const isAuthorized =
    isAuthenticated && userRole && authorizedRoles.includes(userRole);

  const authorizedRoles2 = ["admin", "user"]; // Add the roles that are authorized

  const isAuthorized2 =
    isAuthenticated && userRole && authorizedRoles.includes(userRole);

  const items = [
    {
      text: "Beranda",
      display: "display",
      isScroll: true,
      scroll: "elemenHome",
    },
    {
      text: "Barang & Peminjaman",
      display: "display",
      isScroll: true,
      scroll: "elemenBarang",
    },
    {
      text: "Tentang Kami",
      display: "display",
      isScroll: true,
      scroll: "elemenFooter",
    },
    {
      text: "Dashboard",
      display: isAuthorized ? "display" : "none",
      isLink: true,
      link: "/dashboard",
    },
    {
      login: true,
    },
  ];

  const motionVariants = {
    hidden: { x: -250, opacity: 0 }, // Mulai dari luar layar kiri
    visible: { x: 0, opacity: 1, transition: { duration: 1 } }, // Menuju posisi normal dengan transisi 1 detik
  };

  const motionVariants2 = {
    hidden: { y: -250, opacity: 0 }, // Mulai dari luar layar kiri
    visible: { y: 0, opacity: 1, transition: { duration: 1 } }, // Menuju posisi normal dengan transisi 1 detik
  };

  const motionVariants3 = {
    hidden: { y: 500, opacity: 0 }, // Mulai dari luar layar kiri
    visible: { y: 0, opacity: 1, transition: { duration: 1 } }, // Menuju posisi normal dengan transisi 1 detik
  };

  const motionVariants4 = {
    hidden: { opacity: 0 }, // Mulai dari luar layar kiri
    visible: { opacity: 1, transition: { duration: 2 } }, // Menuju posisi normal dengan transisi 1 detik
  };

  const controls = useAnimation();
  const barangRef = useRef(null);
  const footerRef = useRef(null);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      console.log(entry.target.id, entry.isIntersecting);
      if (entry.isIntersecting) {
        controls.start({ opacity: 1, x: 0 }); // Animate opacity and y position
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (barangRef.current) {
      observer.observe(barangRef.current);
    }

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPeminjaman, setSelectedPeminjaman] = useState("");
  const [peminjaman, setPeminjaman] = useState([
    "Pengajuan",
    "Peminjaman",
    "Pengembalian",
  ]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/kategori-values-ps`
        );
        setCategories(response.data); // Assuming the API response is an array of categories
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  // Step 2: Create buttons for each category and update state
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePeminjamanClick = (peminjaman) => {
    setSelectedPeminjaman(peminjaman);
  };

  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("id-ID", options);

  const [pinjam, setPinjam] = useState(true);

  const handlePinjam = () => {
    if (!isAuthorized2) {
      // Menampilkan sweet alert dengan opsi "OK" dan "Batal"
      Swal.fire({
        title: "Peringatan",
        text: "Anda harus login terlebih dahulu!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Login",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          openLogin();
        }
      });
    } else {
      setPinjam((prevPinjam) => !prevPinjam);
    }
  };

  useEffect(() => {
    // Jika isAuthorized2 bernilai false, set pinjam ke false
    if (!isAuthorized2) {
      setPinjam(false);
    }
  }, [isAuthorized2]);

  // ... rest of your component code

  return (
    <div>
      <NavbarDesktop items={items} login={openLogin} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div id="elemenHome" className="min-h-screen min-w-full">
        <div className=" flex">
          <div className=" w-1/2 mt-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={motionVariants}
            >
              <img src={vectorImage} alt="shhd" style={imgStyle} />
            </motion.div>
          </div>
          <div className="w-1/2 flex items-center justify-center text-center relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={motionVariants2}
            >
              <div className=" text-center mt-16">
                <h1 className="text-5xl font-semibold text-red-700">
                  Teaching Factory Resource Empowerment Network
                </h1>
                <CardSlider />
              </div>
            </motion.div>
          </div>
        </div>

        <svg
          className=" absolute bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#b91c1c"
            fill-opacity="1"
            d="M0,128L120,149.3C240,171,480,213,720,202.7C960,192,1200,128,1320,96L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={motionVariants4}
        >
          <div className="flex justify-center items-end">
            <h1 className="animated-text absolute">
              <div className="text-white font-bold">SCROLL</div>
            </h1>
            <div className=" bottom-0 translate-y-20 absolute">
              <div className="loader-line"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div id="elemenBarang" className="min-h-screen min-w-full">
        <div className=" flex">
          <div className=" w-3/12 h-screen mt-16 px-4">
            <motion.div
              ref={barangRef}
              initial={{ opacity: 0, x: -100 }} // Initial animation values
              animate={controls}
              transition={{ duration: 1 }} // Animation duration
            >
              <center>
                <h1 className="text-4xl p-4 tracking-wide border-l-8 border-red-700 text-gray-700">
                  {!pinjam ? "BARANG" : "PEMINJAMAN"}
                </h1>
                <center>
                  <div className=" mt-4 border shadow-lg rounded-lg mb-8">
                    <div className="p-12 text-gray-700 text-xl rounded-t-lg">
                      <img src={logoTelkom} alt="jasjdj" style={imgStyle2} />
                    </div>
                    <div className=" p-2.5 bg-blue-700 rounded-b-lg">
                      {}
                      <button
                        onClick={handlePinjam}
                        className=" text-white font-semibold flex text-lg hover:underline transition-all tracking-widest"
                      >
                        {!pinjam ? "Peminjaman" : "Lihat Barang"}{" "}
                        <FaArrowAltCircleRight className="mt-1 ml-1" />
                      </button>
                    </div>
                  </div>
                </center>
                {!pinjam ? (
                  <div className="px-4 pt-4 text-xl rounded-lg mt-4 bg-white  font-semibold shadow-md border flex flex-col h-72 overflow-y-auto">
                    <button
                      className={`mt-2 mb-6 p-2 tracking-widest rounded-lg ${
                        selectedCategory === ""
                          ? "bg-gray-700 text-white"
                          : "text-gray-700 hover:bg-gray-200 transition-all"
                      }`}
                      onClick={() => handleCategoryClick("")}
                    >
                      Semua Kategori
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`mb-6 p-2 tracking-widest rounded-lg ${
                          selectedCategory === category
                            ? "bg-gray-700 text-white"
                            : "text-gray-700  hover:bg-gray-200 transition-all"
                        }`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        Kategori {category}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 pt-4 text-xl rounded-lg mt-4 bg-white  font-semibold shadow-md border flex flex-col ">
                    {peminjaman.map((peminjaman) => (
                      <button
                        key={peminjaman}
                        className={`mb-6 p-2 tracking-widest rounded-lg ${
                          selectedPeminjaman === peminjaman
                            ? "bg-gray-700 text-white"
                            : "text-gray-700  hover:bg-gray-200 transition-all"
                        }`}
                        onClick={() => handlePeminjamanClick(peminjaman)}
                      >
                        {peminjaman}
                      </button>
                    ))}
                  </div>
                )}
              </center>
            </motion.div>
          </div>
          <div className=" w-9/12 h-screen mt-16">
          <motion.div
              ref={barangRef}
              initial={{ opacity: 0, x: 100 }} // Initial animation values
              animate={controls}
              transition={{ duration: 1 }} // Animation duration
            >
            {!pinjam ? (
              <div>
                <div className="flex items-center py-4 px-8">
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      placeholder="Cari Barang..."
                      className="border p-2 pr-60 focus:outline-none rounded-lg"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                      <FaSearch />
                    </div>
                  </div>

                  <h1 className="px-6 ml-auto text-lg">
                    <span className="p-2 font-bold tracking-widest text-gray-700">
                      {formattedDate}
                    </span>
                  </h1>
                </div>
                <Carditem filter={selectedCategory} search={searchTerm} />
              </div>
            ) : (
              <div>
                <div className="flex items-center py-4 px-8 mt-2">
                  <h1 className="px-6 ml-auto text-lg">
                    <span className="p-2 font-bold tracking-widest text-gray-700">
                      {formattedDate}
                    </span>
                  </h1>
                </div>

                {selectedPeminjaman === "Pengajuan" ? (
                  <div>
                    <SubmissionForm/>
                  </div>
                ) : selectedPeminjaman === "Peminjaman" ? (
                  <div>
                    <center>
                    <img className=" scale-75" src={notFound} alt={notFound} style={imgStyle3} />
                    <h1 className=" text-4xl font-semibold text-gray-700 tracking-widest">Anda tidak meminjam Barang apapun</h1>
                    </center>
                  </div>
                ) : selectedPeminjaman === "Pengembalian" ? (
                  <div>
                    <img className=" scale-75" src={notFound} alt={notFound} style={imgStyle3} />
                    <h1></h1>
                  </div>
                ) : (
                  <div>
                    <div className="pr-6">
                     
                    </div>
                  </div>
                )}
              </div>
            )}
            </motion.div>
          </div>
        </div>
      </div>

      <div
        ref={footerRef}
        id="elemenFooter"
        className="min-h-screen min-w-full"
      >
        <div className="container mx-auto p-4">
          <div className="flex mt-14 flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <div
                className="bg-white border p-4 rounded shadow-lg"
                style={{ minHeight: "75vh" }}
              >
                <div className="flex">
                  <div>
                    <button
                      className={`text-3xl font-semibold mb-2 ${
                        activeButton === "TEFA"
                          ? "text-red-700"
                          : "text-gray-600"
                      }`}
                      onClick={toggleTEFA}
                    >
                      TEFA
                    </button>
                  </div>
                  <h1 className=" font-semibold text-4xl mb-2 mx-2 text-red-700">
                    {" "}
                    /{" "}
                  </h1>
                  <div>
                    <button
                      className={`text-3xl font-semibold mb-2 ${
                        activeButton === "TEFAREN"
                          ? "text-red-700"
                          : "text-gray-600"
                      }`}
                      onClick={toggleTEFAREN}
                    >
                      TEFAREN
                    </button>
                  </div>
                </div>
                {showTEFA && (
                  <div>
                    <p className="text-2xl text-gray-600">
                      Teaching Factory(TEFA) adalah pendeketan belajar yang ada
                      sebagai fasilitas di SMK Telkom Banjarbaru guna memberikan
                      pengalaman praktis kepada siswa untuk mempersiapkan mereka
                      dalam dunia kerja. Tujuannya adalah menggabungkan teori
                      dan praktek, serta mengajarkan keterampilan yang sesuai
                      dengan kebutuhan industri.
                    </p>
                  </div>
                )}

                {showTEFAREN && (
                  <div>
                    <p className="text-2xl text-gray-600">
                      {" "}
                      Teaching Factory Resource Empowerment Network(TEFAREN)
                      adalah web peminjaman barang di TEFA yang akan membantu
                      untuk membukankan peluang bagi para siswa SMK Telkom
                      Banjarbaru menggali potensi dan bakat mereka, ubah gagasan
                      inovatif menjadi kenyataan dengan fasilitas teknologi
                      modern yang ada pada TEFA.
                    </p>
                  </div>
                )}

                <h1 className=" mt-4 text-4xl text-red-700 font-semibold">
                  Kunjungi Media Sosial SMK Telkom Banjarbaru
                </h1>
                <div className=" mt-4">
                  <a
                    href="https://www.facebook.com/TelkomSchoolBanjarbaru/"
                    className="fa fa-facebook px-5 py-2 rounded-lg bg-sky-700 text-white text-2xl mr-3 transition-transform transform hover:scale-110"
                  ></a>
                  <a
                    href="https://www.instagram.com/telkomschool_bjb/?hl=en"
                    className="fa fa-instagram px-4 py-2 rounded-lg bg-pink-800 text-white text-2xl mr-3 transition-transform transform hover:scale-110"
                  ></a>
                  <a
                    href="https://youtu.be/mv-wMfBGf6Y?si=zT3cADymG9G_Rqod"
                    className="fa fa-youtube px-4 py-2 rounded-lg bg-red-700 text-white text-2xl mr-3 transition-transform transform hover:scale-110"
                  ></a>
                </div>
                <a
                  href="https://www.smktelkom-bjb.sch.id/web/"
                  className="block text-xl mt-4 text-blue-600 hover:underline"
                >
                  Kunjungi Web Resmi SMK Telkom Banjarbaru
                </a>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-4">
              <Pannellum
                width="100%"
                height="75vh"
                image={tefa}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                onLoad={() => {
                  console.log("panorama loaded");
                }}
              ></Pannellum>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 bottom-0">
          <div className="container mx-auto flex justify-between items-center px-6">
            <div className="text-gray-600 text-xl font-medium">
              &copy; {new Date().getFullYear()} Teaching Factory Resource
              Empowerment Network
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isLoginOpen && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={closeLogin}
            onLink={linkToRegister}
          />
        )}
        {isRegisterOpen && (
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={closeRegister}
            onLink={linkToLogin}
          />
        )}
      </AnimatePresence>
      <Scroll />
    </div>
  );
};

export default HomeDesktop;
