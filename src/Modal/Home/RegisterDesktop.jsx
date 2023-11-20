import React, {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Input, Select} from "../../Components/CommonInput";
import backgroundForm from "../../Assets/Image/layered-waves-haikei.png";
import telkomLogo from "../../Assets/Image/logo-telkom-schools-bundar-1024x1024.png";
import Swal from "sweetalert2";
import axios from "axios";

import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaQuestionCircle,
    FaStopCircle,
    FaIdCard,
    FaSchool,
    FaUser,
    FaLock,
    FaMailBulk
} from "react-icons/fa";

const RegisterModal = ({isOpen, onClose, onLink}) => {
    const customContentStyle = {
        marginBottom: "100vh",
        backgroundImage: `url(${backgroundForm})`,
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

    const formRef = useRef(null);
    /* ----------------- Atur Step pada form -----------------*/

    const [step, setStep] = useState(1);
    const totalSteps = 2;

    useEffect(() => {
        if (step < 1) {
            setStep(1);
        } else if (step > totalSteps) {
            setStep(totalSteps);
        }
    }, [step]);

    const handleNext = (e) => {
        e.preventDefault();
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handlePrev = (e) => {
        e.preventDefault();
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const progress = (step / totalSteps) * 100;

    const stepStyles = {
        1: {
            display: step === 1
                ? "block"
                : "none"
        },
        2: {
            display: step === totalSteps
                ? "block"
                : "none"
        }
    };

    /* --------------------------------------------------- */

    /* ----------------- Atur Pemiihan tipe akun -----------------*/
    const [selectedRole, setSelectedRole] = useState("");

    const [selectedMajor, setSelectedMajor] = useState("");

    const handleMajorChange = (event) => {
        setSelectedMajor(event.target.value);
    };

    const [selectedTeacher, setSelectedTeacher] = useState("");

    const handleTeacherChange = (event) => {
        setSelectedTeacher(event.target.value);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const renderIcon = () => {
        if (selectedRole === "siswa") {
            return FaUserGraduate;
        } else if (selectedRole === "guru") {
            return FaChalkboardTeacher;
        } else {
            return FaQuestionCircle;
        }
    };
    /* --------------------------------------------------- */

    /* ----------------- Atur Jurusan -----------------*/
    const [jurusanOptions, setJurusanOptions] = useState([]);

    useEffect(() => {
        // Fetch data from the backend and populate the jurusanOptions state
        fetch("http://127.0.0.1:8000/api/jurusan-values") // Ganti dengan URL API yang sebenarnya
            .then((response) => response.json())
            .then((data) => {
                // Asumsikan data respons adalah array objek jurusan
                setJurusanOptions(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    /* --------------------------------------------------- */

    /* ----------------- Atur Jabatan -----------------*/
    const [jabatanOptions, setJabatanOptions] = useState([]);

    useEffect(() => {
        // Fetch jabatan data from your API
        fetch("http://127.0.0.1:8000/api/jabatan-values") // Ganti dengan URL API yang sebenarnya
            .then((response) => response.json())
            .then((data) => {
                setJabatanOptions(data); // Perbarui state jabatanOptions dengan respons API
            })
            .catch((error) => {
                console.error("Error fetching jabatan data:", error);
            });
    }, []);
    /* --------------------------------------------------- */

    /* ----------------- Atur Nama-----------------*/
    /* --------------------------------------------------- */

    /* ----------------- Atur Email-----------------*/
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const [emailValue, setEmailValue] = useState("");
    const [validationEmail, setValidationEmail] = useState(false);

    useEffect(() => {
        if (emailValue !== "" && !isValidEmail(emailValue)) {
            setValidationEmail(true);
        } else {
            setValidationEmail(false);
        }
    }, [emailValue]);

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    };
    /* --------------------------------------------------- */

    /* ----------------- Atur Password----------------*/
    const isValidPassword = (password) => {
        const passwordPattern = /^.{8,}$/;
        return passwordPattern.test(password);
    };

    const [passwordValue, setPasswordValue] = useState("");
    const [validationPassword, setValidationPassword] = useState(false);

    useEffect(() => {
        if (passwordValue !== "" && !isValidPassword(passwordValue)) {
            setValidationPassword(true);
        } else {
            setValidationPassword(false);
        }
    }, [passwordValue]);

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };
    /* --------------------------------------------------- */

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

    const [submitted, setSubmitted] = useState(false);

    const [idValue, setIdValue] = useState("");
    const handleIDChange = (e) => {
        setIdValue(e.target.value);
    };

    const [name, setName] = useState("");
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (selectedRole === "") {
            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: "Pilih peran pengguna terlebih dahulu.",
                width: 500,
                customClass: {
                    title: "text-red-500 text-2xl font-bold",
                    text: "text-red-500 text-lg"
                }
            });
            return;
        }

        if (emailValue === "" || !isValidEmail(emailValue)) {
            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: "Email tidak valid atau kosong.",
                width: 500,
                customClass: {
                    title: "text-red-500 text-2xl font-bold",
                    text: "text-red-500 text-lg"
                }
            });
            return;
        }

        if (passwordValue === "" || !isValidPassword(passwordValue)) {
            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: "Password harus terdiri dari setidaknya 8 karakter.",
                width: 500,
                customClass: {
                    title: "text-red-500 text-2xl font-bold",
                    text: "text-red-500 text-lg"
                }
            });
            return;
        }

        let data = {
            tipe_pengguna: selectedRole,
            email: emailValue,
            password: passwordValue,
            nama_pengguna: name
        };

        if (selectedRole === "siswa") {
            if (idValue === "" || selectedMajor === "") {
                Swal.fire({
                    icon: "error",
                    title: "Registrasi Gagal",
                    text: "Nomor Induk dan Jurusan harus diisi.",
                    width: 500,
                    customClass: {
                        title: "text-red-500 text-2xl font-bold",
                        text: "text-red-500 text-lg"
                    }
                });
                return;
            }
            data.nomorinduk_pengguna = idValue;
            data.jurusan_pengguna = selectedMajor;
        } else if (selectedRole === "guru") {
            if (idValue === "" || selectedTeacher === "") {
                Swal.fire({
                    icon: "error",
                    title: "Registrasi Gagal",
                    text: "Nomor Induk dan Jabatan harus diisi.",
                    width: 500,
                    customClass: {
                        title: "text-red-500 text-2xl font-bold",
                        text: "text-red-500 text-lg"
                    }
                });
                return;
            }
            data.nomorinduk_pengguna = idValue;
            data.jabatan_pengguna = selectedTeacher;
        } else {
            // Handle other roles if needed
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", data);
        
            if (response.status === 200) {
                // Registration successful
                localStorage.setItem("register_success_message", "Register Berhasil!");
        
                // Reset the form
                setSelectedRole("");
                setIdValue("");
                setSelectedMajor("");
                setSelectedTeacher("");
                setPasswordValue("");
                setSubmitted(true);
        
                onLink();
            } else {
                // Registration failed, display an error message from the server response
                const responseData = response.data;
                const errorMessage = responseData.message || "Terjadi kesalahan dalam registrasi. Mohon coba lagi.";
        
                Swal.fire({
                    icon: "error",
                    title: "Registrasi Gagal",
                    text: errorMessage,
                    width: 500,
                    customClass: {
                        title: "text-red-500 text-2xl font-bold",
                        text: "text-red-500 text-lg"
                    }
                });
        
                setSubmitted(false);
            }
        } catch (error) {
            console.error("Registration error:", error);
        
            // Use response data for error message if available
            const responseData = (error.response && error.response.data) || {};
            const errorMessage = responseData.message || "Terjadi kesalahan dalam registrasi. Mohon coba lagi.";
        
            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: errorMessage,
                width: 500,
                customClass: {
                    title: "text-red-500 text-2xl font-bold",
                    text: "text-red-500 text-lg"
                }
            });
        
            setSubmitted(false);
        }
        
        
    };

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
            <div
                className="bg-white w-1/2 p-4 flex justify-center items-center rounded-2xl"
                style={customContentStyle}
                ref={formRef}>
                <div className="w-1/2 p-4 flex justify-center items-center">
                    <form onSubmit={handleRegister}>
                        <h1
                            className="text-3xl font-semibold opacity-75 text-center uppercase tracking-wider">
                            Register
                        </h1>
                        <h1 className=" text-sm font-medium opacity-75 text-center">
                            Silahkan Lakukan Registasi
                        </h1>
                        <AnimatePresence mode="wait">
                            {/* -----------------  Step 1 ----------------- */}
                            {
                                step === 1 && (
                                    <motion.div key={1} initial={{
                                            opacity: 0
                                        }}
                                        // Atur opacity awal menjadi 0
                                        animate={{
                                            opacity: 1
                                        }}
                                        // Animasikan opacity menjadi 1
                                        transition={{
                                            duration: 0.5
                                        }} style={stepStyles[1]}>
                                        {/* ----------------- Pilih tipe Akun ----------------- */}
                                        <Select onChange={handleRoleChange} value={selectedRole} icon={renderIcon()}>
                                            <option value="" disabled="disabled">
                                                Tipe Pengguna
                                            </option>
                                            <option name="siswa" value="siswa">
                                                Siswa
                                            </option>
                                            <option name="guru" value="guru">
                                                Guru
                                            </option>
                                        </Select>
                                        {/* --------------------------------------------------- */}
                                        {/* ----------------- Nomor Induk ----------------- */}
                                        {
                                            selectedRole === "siswa"
                                                ? (
                                                    <Input
                                                        placeholder="NIS"
                                                        value={idValue}
                                                        onChange={handleIDChange}
                                                        icon={FaIdCard}/>
                                                )
                                                : selectedRole === "guru"
                                                    ? (
                                                        <Input
                                                            placeholder="NIP"
                                                            value={idValue}
                                                            onChange={handleIDChange}
                                                            icon={FaIdCard}/>
                                                    )
                                                    : (
                                                        <Input placeholder="Nomor Induk" enable={false} icon={FaStopCircle}/>
                                                    )
                                        }
                                        {/* --------------------------------------------------- */}
                                        {/* ----------------- Jurusan / Jabatan ----------------- */}
                                        {
                                            selectedRole === "siswa"
                                                ? (
                                                    <Select value={selectedMajor} onChange={handleMajorChange} icon={FaSchool}>
                                                        <option value="" disabled="disabled">
                                                            Pilih Jurusan
                                                        </option>
                                                        {
                                                            jurusanOptions.map((jurusan, index) => (
                                                                <option key={index} value={jurusan}>
                                                                    {jurusan.toUpperCase()}
                                                                </option>
                                                            ))
                                                        }
                                                    </Select>
                                                )
                                                : selectedRole === "guru"
                                                    ? (
                                                        <Select onChange={handleTeacherChange} value={selectedTeacher} icon={FaSchool}>
                                                            <option value="" disabled="disabled">
                                                                Pilih Jabatan
                                                            </option>
                                                            {
                                                                jabatanOptions.map((jabatan, index) => (
                                                                    <option key={index} value={jabatan}>
                                                                        {jabatan.toUpperCase()}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Select>
                                                    )
                                                    : (
                                                        <Input placeholder="Jurusan / Jabatan" enable={false} icon={FaStopCircle}/>
                                                    )
                                        }
                                        {/* --------------------------------------------------- */}
                                    </motion.div>
                                )
                            }
                            {/* --------------------------------------------------- */}

                            {/* -----------------  Step 2 ----------------- */}
                            {
                                step === totalSteps && (
                                    <motion.div key={2} initial={{
                                            opacity: 0
                                        }}
                                        // Atur opacity awal menjadi 0
                                        animate={{
                                            opacity: 1
                                        }}
                                        // Animasikan opacity menjadi 1
                                        transition={{
                                            duration: 0.5
                                        }} style={stepStyles[2]}>
                                        {/* ----------------- Nama Pengguna ----------------- */}
                                        <Input
                                            placeholder="Nama"
                                            onChange={handleNameChange}
                                            value={name}
                                            icon={FaUser}/> {/* --------------------------------------------------- */}

                                        {/* ----------------- Email ----------------- */}
                                        <div className=" relative">
                                            <Input
                                                placeholder="Email"
                                                icon={FaMailBulk}
                                                inputType="email"
                                                value={emailValue}
                                                onChange={handleEmailChange}/>
                                            <AnimatePresence>
                                                {
                                                    validationEmail && (
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
                                                                Harap masukkan email dengan format yang benar
                                                            </div>
                                                        </motion.div>
                                                    )
                                                }
                                            </AnimatePresence>
                                        </div>

                                        {/* --------------------------------------------------- */}

                                        {/* ----------------- Password----------------- */}
                                        <div className=" relative">
                                            <Input type="password"
                                                // Atur tipe input menjadi "password"
                                                placeholder="Sandi" inputType="password"
                                                // Atur inputType menjadi "password"
                                                icon={FaLock} value={passwordValue} onChange={handlePasswordChange}/>
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
                                                                Harap masukkan password dengan minimal 8 karakter
                                                            </div>
                                                        </motion.div>
                                                    )
                                                }
                                            </AnimatePresence>
                                        </div>
                                        {/* --------------------------------------------------- */}
                                    </motion.div>
                                )
                            }
                            {/* --------------------------------------------------- */}
                        </AnimatePresence>

                        {/* ----------------- Progress Bar ----------------- */}
                        <div className="mt-4">
                            <div className="w-full h-2 bg-blue-200 rounded-full">
                                <motion.div
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    transition={{
                                        duration: 0.5
                                    }}>
                                    <motion.div
                                        className="h-2 bg-blue-600 rounded-full"
                                        style={{
                                            width: `${progress}%`
                                        }}
                                        initial={{
                                            width: "0%"
                                        }}
                                        animate={{
                                            width: `${progress}%`
                                        }}
                                        transition={{
                                            duration: 0.5
                                        }}></motion.div>
                                </motion.div>
                            </div>
                        </div>
                        {/* --------------------------------------------------- */}

                        {/* ----------------- Tombol Progress ----------------- */}
                        <div className="mt-4">
                            {
                                step === 1
                                    ? (
                                        <motion.button
                                            initial={{
                                                y: 10
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10
                                            }}
                                            transition={{
                                                duration: 0.5
                                            }}
                                            className="py-2 px-2 w-full bg-blue-600 text-white rounded-full ripple"
                                            onClick={handleNext}
                                            type="button">
                                            Selanjutnya
                                        </motion.button>
                                    )
                                    : (
                                        <div className="flex justify-between space-x-4">
                                            <motion.button
                                                initial={{
                                                    x: -20
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: -20
                                                }}
                                                transition={{
                                                    duration: 0.5
                                                }}
                                                className="py-2 w-1/2 bg-blue-600 text-white rounded-full ripple"
                                                onClick={handlePrev}
                                                type="button">
                                                Kembali
                                            </motion.button>
                                            <motion.button
                                                initial={{
                                                    x: 20
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: 20
                                                }}
                                                transition={{
                                                    duration: 0.5
                                                }}
                                                className="py-2 w-1/2 bg-blue-600 text-white rounded-full ripple"
                                                type="submit"
                                                disabled={submitted}>
                                                Kirim
                                            </motion.button>
                                        </div>
                                    )
                            }
                        </div>
                        {/* --------------------------------------------------- */}

                        {/* ----------------- Tombol ke Login ----------------- */}
                        <div className="max-w-md mx-auto mt-2">
                            <div className="flex items-center">
                                <p>Sudah punya Akun?</p>
                                <button
                                    type="button"
                                    onClick={onLink}
                                    className="ml-2 text-blue-500 hover:underline transition-all">
                                    Login
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------- */}
                    </form>
                </div>
                <div className="w-1/2 p-4 flex justify-center items-center">
                    <center>
                        <img src={telkomLogo} alt="jhabsj" className=" w-5/12 h-10/12"/>
                        <div className="flex space-x-2 w-4/6 my-4 mt-6">
                            <div className="flex-grow bg-white h-1.5 rounded-full"></div>
                            <div className="w-1.5 bg-white mx-1.5 rounded-full"></div>
                            <div className="flex-grow bg-white h-1.5 rounded-full"></div>
                        </div>
                        <h1 className="text-white text-4xl tracking-wider font-semibold">
                            TEFAREN
                        </h1>
                        <h1 className="text-white text-xs font-medium px-4">
                            Teaching Factory Resource Empowerment Network
                        </h1>
                    </center>
                </div>
            </div>
        </motion.div>
    );
};

export default RegisterModal;
