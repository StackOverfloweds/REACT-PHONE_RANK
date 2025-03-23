import { useState } from "react";
import { register } from "../../api/Auth";
import { Link } from "react-router-dom"; 
import style from "../../style/Register.module.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); // State untuk menyimpan pesan error
    const [success, setSuccess] = useState(false); // State untuk menampilkan link ke login

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validasi nomor telepon (harus 12 digit angka)
        const phoneRegex = /^[0-9]{12}$/;
        if (!phoneRegex.test(phone)) {
            setError("Nomor telepon harus 12 digit angka.");
            return;
        }

        try {
            const result = await register(username, fullName, phone);
            
            if (result.error) {
                setError(result.error);
                setMessage(""); // Reset pesan sukses jika ada error
                setSuccess(false);
            } else {
                setMessage("Registrasi berhasil! Silakan login.");
                setError(""); // Reset pesan error jika berhasil
                setSuccess(true); // Aktifkan link login
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        }
    };

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h2 className={style.title}>Register</h2>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className={style.inputField}
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className={style.inputField}
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className={style.inputField}
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required
                    />
                    <button type="submit" className={style.button}>
                        Register
                    </button>
                </form>

                {/* Menampilkan pesan error jika ada */}
                {error && <p className={style.error}>{error}</p>}
                
                {/* Menampilkan pesan sukses jika berhasil */}
                {message && <p className={style.success}>{message}</p>}

                {/* Menampilkan link login hanya jika registrasi sukses */}
                {success && (
                    <p className={style.link}>
                        Silakan <Link to="/login">Login</Link> untuk masuk ke akun Anda.
                    </p>
                )}

                {/* Link login tetap tersedia untuk pengguna yang sudah punya akun */}
                {!success && (
                    <p className={style.link}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Register;
