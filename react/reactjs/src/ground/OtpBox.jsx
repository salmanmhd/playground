import { useEffect, useRef, useState } from "react";
import "./styles.css";

const OTP_LENGHT = 4;
export default function OtpBox() {
  const [otp, setOtp] = useState(new Array(OTP_LENGHT).fill(""));
  const [error, setError] = useState("");

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  function handleChange(value, idx) {
    value = value.trim();
    if (isNaN(value)) return;
    console.log(value);
    const newArr = [...otp];
    newArr[idx] = value.slice(-1);

    setOtp(newArr);
    value && refArr.current[idx + 1]?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    // otp.map((el) => (isNaN(el) ? el : setError("Please fill the otp")));
    for (let i = 0; i < otp.length; i++) {
      if (isNaN(otp[i]) || otp[i] === "") {
        setError("Please fill the otp");
        return;
      }
    }
    setError("");
    console.log("otp verified");
  }

  function handleKeyPress(e, idx) {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[idx - 1]?.focus();
    }
  }
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Enter OTP to proceed</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {otp.map((el, idx) => (
          <input
            type="text"
            value={otp[idx]}
            onChange={(e) => handleChange(e.target.value, idx)}
            ref={(input) => (refArr.current[idx] = input)}
            key={idx}
            onKeyDown={(e) => {
              handleKeyPress(e, idx);
            }}
          />
        ))}
        {error && <p className="error">{error}</p>}
        <button>Next</button>
      </form>
    </div>
  );
}
