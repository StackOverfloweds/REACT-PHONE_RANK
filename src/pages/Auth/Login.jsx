import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login } from "../../api/Auth";
import style from "../../style/Login.module.css"; 

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState(null); // State untuk menangani error
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const phoneRegex = /^[0-9]{12}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setMessage("Nomor telepon harus 12 digit angka.");
            setIsValid(false);
            return;
        }
    
        try {
            const result = await login(phoneNumber);
    
            if (result.error) {
                console.error("Login Error:", result.error);
    
                // Perbaiki cara menangani error
                setError(result.error.error || JSON.stringify(result.error));
                setIsValid(false);
            } else {
                setMessage("Kode OTP telah dikirim. Mengalihkan ke verifikasi...");
                setIsValid(true);
    
                // Redirect setelah 1,5 detik
                setTimeout(() => navigate(`/verify-otp?phone=${phoneNumber}`), 1500);
            }
        } catch (err) {
            console.error("Login Error:", err);
    
            let errorMsg = "Terjadi kesalahan. Silakan coba lagi.";
            if (err.response) {
                errorMsg = err.response.data?.error || "Terjadi kesalahan pada server.";
            } else if (err.request) {
                errorMsg = "Gagal terhubung ke server. Periksa koneksi internet Anda.";
            }
    
            setError(errorMsg);
            setIsValid(false);
        }
    };
    

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h2 className={style.title}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className={style.inputField}
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={style.button}>
                        Request OTP
                    </button>
                </form>

                {message && <p className={style.message} style={{ color: "green" }}>{message}</p>}
                {error && <p className={style.message} style={{ color: "red" }}>{error}</p>}

                <p className={style.registerText}>
                    Belum punya akun?{" "}
                    <a href="/register" className={style.registerLink}>Register di sini</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
