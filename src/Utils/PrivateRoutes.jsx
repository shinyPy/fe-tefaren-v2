import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, fallbackElement, allowedRoles, openLogin }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          // Jika token tidak ditemukan, set isAuthenticated menjadi false
          setIsAuthenticated(false);
          cleanupLocalStorage();
          openLogin();
          navigate("/login");
          return;
        }

        const res = await axios.get(`http://127.0.0.1:8000/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          // Jika status response dari server adalah 200 (OK), set isAuthenticated menjadi true
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Jika terjadi error atau token tidak valid, set isAuthenticated menjadi false
        setIsAuthenticated(false);
        cleanupLocalStorage();
        openLogin();
        navigate("/login");
      }
    };

    // Pertama kali cek otentikasi saat komponen dimount
    checkAuthentication();

    // Set interval untuk melakukan pengecekan token setiap 5 detik (sesuaikan dengan kebutuhan)
    const intervalId = setInterval(checkAuthentication, 5000);

    // Membersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, [navigate, openLogin]);

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

  // Memeriksa apakah pengguna memiliki peran yang diizinkan
  const userRole = localStorage.getItem("user_role");
  const isAuthorized = isAuthenticated && userRole && allowedRoles.includes(userRole);

  // Mengembalikan elemen yang sesuai berdasarkan otorisasi
  return isAuthorized ? element : fallbackElement;
};

export default PrivateRoute;
