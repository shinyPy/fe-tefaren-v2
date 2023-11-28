import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, fallbackElement, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Mengambil token dari localStorage
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          // Melakukan pengecekan ke server menggunakan token
          const res = await axios.get(`http://127.0.0.1:8000/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Jika status response dari server adalah 200 (OK), set isAuthenticated menjadi true
          if (res.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (err) {
          // Jika terjadi error atau token tidak valid, set isAuthenticated menjadi false
          setIsAuthenticated(false);
          localStorage.removeItem("user_role");
          localStorage.removeItem("user_nis");
          localStorage.removeItem("user_email");
          localStorage.removeItem("login_success_message");
          localStorage.removeItem("accessToken");
          localStorage.setItem("preloadState", "2");
          
          // Redirect ke halaman login
          navigate("/login");
        }
      } else {
        // Jika token tidak ditemukan, set isAuthenticated menjadi false
        setIsAuthenticated(false);
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_nis");
        localStorage.removeItem("user_email");
        localStorage.removeItem("login_success_message");
        localStorage.removeItem("accessToken");
        localStorage.setItem("preloadState", "2");
        // Redirect ke halaman login
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  // Memeriksa apakah pengguna memiliki peran yang diizinkan
  const userRole = localStorage.getItem("user_role");
  const isAuthorized = isAuthenticated && userRole && allowedRoles.includes(userRole);

  // Mengembalikan elemen yang sesuai berdasarkan otorisasi
  return isAuthorized ? element : fallbackElement;
};

export default PrivateRoute;
