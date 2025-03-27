import { useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyOtp } from "../../api/Auth";
import style from "../../style/VerifyOTP.module.css"; 

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const phoneNumber = location.state?.phoneNumber;

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const result = await verifyOtp(otp);
    
        if (result.error) {
            setMessage(result.error);
        } else {
            setMessage("Login successful!");
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
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
