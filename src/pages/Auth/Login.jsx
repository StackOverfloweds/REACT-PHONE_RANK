import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../../api/Auth";
import style from "../../style/Login.module.css"; 

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate(); // Hook untuk navigasi

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
                setMessage(result.error);
                setIsValid(false);
            } else {
                setMessage("Kode OTP telah dikirim. Mengalihkan ke verifikasi...");
                setIsValid(true);

                // Redirect otomatis setelah 1,5 detik ke halaman verify-otp
                setTimeout(() => navigate(`/verify-otp?phone=${phoneNumber}`), 1500);
            }
        } catch (error) {
            setMessage("Terjadi kesalahan. Silakan coba lagi.");
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
                {message && <p className={style.message}>{message}</p>}

                <p className={style.registerText}>
                    Belum punya akun?{" "}
                    <a href="/register" className={style.registerLink}>Register di sini</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
