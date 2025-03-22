import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/Auth";
import style from "../../style/VerifyOTP.module.css"; // Import CSS

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const phoneNumber = location.state?.phoneNumber;

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const result = await verifyOtp(otp);
    
        if (result.error) {
            setMessage(result.error);
        } else {
            setMessage("Login successful!");
            localStorage.setItem("token", result.token);
            setTimeout(() => {
                navigate("/"); // Redirect ke halaman Home setelah sukses
            }, 1000); // Redirect setelah 1 detik
        }
    };
    

    return (
        <div className={style.container}>
            <div className={style.card}>
                <h2 className={style.title}>Verify OTP</h2>
                <p className={style.subtitle}>OTP sent to: {phoneNumber}</p>
                <form onSubmit={handleVerifyOtp}>
                    <input 
                        type="text" 
                        className={style.inputField}
                        placeholder="Enter OTP" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        required
                    />
                    <button type="submit" className={style.button}>Verify OTP</button>
                </form>
                {message && <p className={style.message}>{message}</p>}
            </div>
        </div>
    );
};

export default VerifyOTP;
