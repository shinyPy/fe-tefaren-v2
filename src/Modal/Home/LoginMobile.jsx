import React, {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Input} from "../../Components/CommonInput";
import {FaUser, FaLock} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigation} from "../../Utils/Navigation";

const LoginModal = ({isOpen, onClose, onLink}) => {
    const navigate = useNavigation();
    const customContentStyle = {
        marginBottom: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "30% center"
    };

    const modalVariants = {
        open: {
            opacity: 1,
            y: 0
        },
        closed: {
            opacity: 0,
            y: -300
        }, // Atur nilai y sesuai dengan tinggi yang diinginkan
    };

    const [nameValue, setNameValue] = useState("");
    const [validationName, setValidationName] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [validationPassword, setValidationPassword] = useState(false);
    const formRef = useRef(null);

    const handleNameFocus = () => {
        setValidationName(true);
    };

    const handleNameBlur = () => {
        setValidationName(false);
    };

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };

    const handlePasswordFocus = () => {
        setValidationPassword(true);
    };

    const handlePasswordBlur = () => {
        setValidationPassword(false);
    };

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      if(!nameValue || !passwordValue){
        setEmailMessage(!nameValue ? "Silahkan isi terlebih dahulu." : "");
        setPasswordMessage(!passwordValue ? "Silahkan isi terlebih dahulu." : "");
        return;
      }
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nameValue);

        const requestData = isEmail
            ? {
                email: nameValue,
                password: passwordValue
            }
            : {
                nomorinduk_pengguna: nameValue,
                password: passwordValue
            };

        try {
            const response = await axios.post(
                "https://shiniya.top/api/login",
                requestData
            );

            const responseData = response.data;

            if (responseData.success === true) {
                const user = responseData.pengguna;
                localStorage.setItem("accessToken", responseData.accessToken);
                localStorage.setItem("user_email", user.email);
                localStorage.setItem("user_nis", user.nomorinduk_pengguna);
                localStorage.setItem("user_role", user.level_pengguna);
                localStorage.setItem("user_name", user.nama_pengguna);
                localStorage.setItem("login_success_message", "Login Berhasil!");
                localStorage.setItem("preloadState", "2");
                navigate("/");
                window.location.reload();
                onClose();
            } else {
                Swal.fire(
                    {icon: "error", title: "Error!", text: "Mohon Periksa kembali Nomor Induk / Email dan Sandi anda"}
                );
                console.error("Invalid response data:", responseData);
            }
        } catch (error) {
            console.error("Error:", error);

            Swal.fire(
                {icon: "error", title: "Login Error", text: "Terjadi Kesalahan pada saat login"}
            );
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return() => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const registerSuccessMessage = localStorage.getItem("register_success_message");

        if (registerSuccessMessage) {
            // Menampilkan toast jika ada pesan registrasi sukses
            toast.success(registerSuccessMessage);

            // Hapus pesan dari localStorage agar tidak tampil lagi setelah hard refresh
            localStorage.removeItem("register_success_message");
        }
    }, []);

    return (
        <motion.div
            initial="closed"
            animate={isOpen
                ? "open"
                : "closed"}
            exit="closed"
            variants={modalVariants}
            transition={{
                duration: 0.35
            }}
            className="fixed top-0 left-0 w-full bg-opacity-50 bg-gray-700 flex justify-center items-center backdrop-blur-sm"
            style={{
                height: "200vh"
            }}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick="closeOnClick"
                rtl={false}
                pauseOnFocusLoss="pauseOnFocusLoss"
                draggable="draggable"
                pauseOnHover="pauseOnHover"
                theme="colored"/>
            <div
                className="bg-white w-11/12 p-4 flex justify-center items-center rounded-2xl"
                style={customContentStyle}
                ref={formRef}>
                <form onSubmit={handleLogin}>
                    <h1
                        className="text-3xl font-semibold opacity-75 text-center uppercase tracking-widest">
                        LOGIN
                    </h1>
                    <h1 className="text-sm font-medium opacity-75 text-center">
                        Silahkan Login Di Bawah Ini
                    </h1>
                    <div className="relative">
                        <Input
                            placeholder="Nomor Induk / Email"
                            icon={FaUser}
                            value={nameValue}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            onFocus={handleNameFocus}/>

<p className=" mt-0.5 text-red-700">{emailMessage}</p>
                        <AnimatePresence>
                            {
                                validationName && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -10
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10
                                        }}
                                        transition={{
                                            duration: 0.25
                                        }}
                                        className="absolute border mt-3 z-10 bg-yellow-400 shadow-sm rounded-lg px-4 py-2">
                                        <div className="text-sm text-white">
                                            Anda bisa menggunakan Nomor Induk ataupun Email
                                        </div>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Sandi"
                            inputType="password"
                            icon={FaLock}
                            value={passwordValue}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            onFocus={handlePasswordFocus}/>
                               <p className=" mt-0.5 text-red-700">{passwordMessage}</p>
                        <AnimatePresence>
                            {
                                validationPassword && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -10
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10
                                        }}
                                        transition={{
                                            duration: 0.25
                                        }}
                                        className="absolute border mt-3 z-10 bg-yellow-400 shadow-sm rounded-lg px-4 py-2">
                                        <div className="text-sm text-white">
                                            Harap masukkan sandi yang sesuai dengan akunmu
                                        </div>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                    <div className="mt-4">
                        <button
                            className="py-2 px-4 w-full bg-blue-600 text-white rounded-lg ripple"
                            type="submit">
                            Login
                        </button>
                    </div>
                    <div className="max-w-md mx-auto mt-2">
                        <div className="flex items-center">
                            <p>Belum punya akun?</p>
                            <div
                                onClick={() => {
                                    onLink();
                                }}
                                className="ml-2 text-blue-500 hover:underline transition-all cursor-pointer">
                                Register
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default LoginModal;
