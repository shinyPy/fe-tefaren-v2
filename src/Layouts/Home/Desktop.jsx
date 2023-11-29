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
import logoTelkom from "../../Assets/Image/logo-telkom-schools-horisontal-1024x320.png"
import CardSlider from "../../Components/CardSlider";
import Carditem from "../../Components/CardItem/CardItem";
import Scroll from "../../Components/ScrollButton/Scroll";

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

    // Set interval untuk melakukan pengecekan token setiap 5 detik (sesuaikan dengan kebutuhan)
    const intervalId = setInterval(checkAuthentication, 5000);

    // Membersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, [navigate, openLogin]);

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
      text: "Barang",
      display: "display",
      isScroll: true,
      scroll: "elemenBarang",
    },
    {
      text: "Tentang Kami",
      display: "display",
    },
    {
      text: "Peminjaman",
      subnav: [
        {
          text: "Ajukan Peminjaman",
        },
        {
          text: "Surat Peminjaman",
        },
        {
          text: "Pengembalian",
        },
      ],
      isSub: true,
      display: isAuthorized2 ? "display" : "none",
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

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
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

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kategori-values`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data); // Assuming the API response is an array of categories
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  // Step 2: Create buttons for each category and update state
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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
          <div className=" w-7/12 mt-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={motionVariants}
            >
              <img src={vectorImage} alt="shhd" style={imgStyle} />
            </motion.div>
          </div>

          <div className=" w-4/12 text-center mt-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={motionVariants2}
            >
              <h1 className="text-3xl font-semibold text-red-700">
                Teaching Factory Resource Empowerment Network
              </h1>
              <p className="text-2xl mt-1 font-semibold text-gray-700">
                Wujudkan inovasi pada dunia industri
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={motionVariants3}
            >
              <CardSlider />
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
                  KATEGORI
                </h1>
                <div className="px-4 pt-4 rounded-lg mt-4 bg-white  font-semibold shadow-md border text-2xl flex flex-col h-72 overflow-y-auto">
                <button
                      className={`mt-2 mb-4 p-2 tracking-widest rounded-lg ${
                        selectedCategory === "" ? "bg-red-700 text-white" : "text-gray-700"
                      }`}
                      onClick={() => handleCategoryClick("")}
                    >
                      Semua
                    </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`mb-4 p-2 tracking-widest rounded-lg ${
                        selectedCategory === category ? "bg-red-700 text-white" : "text-gray-700"
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
              </center>
            </motion.div>
            <center>
            <div className="mt-6 p-8 border shadow-md rounded-lg">
            <img src={logoTelkom} alt="shhd" style={imgStyle2} />
            </div>
            </center>
          </div>
          <div className=" w-9/12 h-screen mt-16">
            <Carditem filter={selectedCategory} />
          </div>
        </div>
      </div>

      <div className="min-h-screen min-w-full bg-red-700"></div>
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
      <Scroll/>
    </div>
  );
};

export default HomeDesktop;
