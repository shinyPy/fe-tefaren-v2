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
        cleanupLocalStorage();
        openLogin();
        navigate("/login");
      }
    };

    // Pertama kali cek otentikasi saat komponen dimount
    checkAuthentication();

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
