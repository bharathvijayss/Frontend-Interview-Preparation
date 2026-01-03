import { useState, useRef, useEffect } from 'react';
import { otpInput } from './Otp.module.css';

function Otp() {
  const otpLength = 5;

  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const otpDigitChangeHandler = (value, index) => {
    if (isNaN(value)) return;
    const updatedVal = value.trim().slice(-1);
    const temp = [...otp];
    temp[index] = updatedVal;
    setOtp(temp);
    if (updatedVal && index + 1 < otpLength) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackSpace = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index - 1 >= 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <p>Enter OTP:</p>
      {otp.map((digit, index) => (
        <input
          key={index}
          className={otpInput}
          value={digit}
          onChange={(e) => otpDigitChangeHandler(e.target.value, index)}
          onKeyDown={(e) => handleBackSpace(e, index)}
          ref={(inputEle) => (inputRef.current[index] = inputEle)}
        />
      ))}
    </div>
  );
}

export default Otp;
