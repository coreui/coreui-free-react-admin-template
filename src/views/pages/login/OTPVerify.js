import React, { useEffect, useState, useRef } from "react";
import {QRCodeCanvas} from "qrcode.react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CButton,
  CSpinner,
  CForm,
  CRow,
  CCol,
  CAlert,
} from "@coreui/react";
import { api, saveTokens, clearTokens } from "../../../api/api";

const TwoFactorSetupAndVerification = () => {
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [digits, setDigits] = useState(Array(6).fill("")); // OTP digits
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // Success state
    const inputRefs = useRef([]); // Refs for digit inputs
    const verifyButtonRef = useRef(null); // Ref for the Verify button

  useEffect(() => {
    // Fetch QR Code data from Django API
    api
      .post("auth/otp/generate/")
      .then((response) => {
        setQrData(response.data.otpauth_url);
      })
      .catch((error) => {
        console.error("Error fetching QR data:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Focus on the first input field when component mounts
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (value && index === 5) {
        verifyButtonRef.current?.focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && digits[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index) => {
    inputRefs.current[index]?.select();
  };

  const handle2FAVerification = async (e) => {
    e.preventDefault();
    setError(null);

    const token = digits.join("");
    try {
      await api.post("auth/otp/verify/", { token });
      setSuccess(true); // Set success state
      clearTokens();

    } catch (err) {
      setError("Invalid 2FA code. Please try again.");
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CRow className="justify-content-center w-100">
        <CCol style={{ maxWidth: "500px" }}>
          <CCard>
            <CCardHeader>
              <h3>Two-Factor Authentication</h3>
            </CCardHeader>
            <CCardBody className="text-center">
              {success ? (
                <>
                  <CAlert color="success">
                    Two-Factor Authentication successfully verified!
                  </CAlert>
                  <CButton
                    color="primary"
                    className="mt-3"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Go to Login
                  </CButton>
                </>
              ) : (
                <>
                  {loading ? (
                    <CSpinner color="primary" />
                  ) : qrData ? (
                    <>
                      <QRCodeCanvas value={qrData} size={256} includeMargin={true} />
                      <p className="mt-3">
                        Scan the QR Code with your authenticator app.
                      </p>
                    </>
                  ) : (
                    <p>Failed to load QR Code. Please try again.</p>
                  )}
                  <hr />
                  <CForm onSubmit={handle2FAVerification}>
                    <div className="text-center">
                      <p className="text-medium-emphasis">
                        Enter the 6-digit code from your app
                      </p>
                    </div>

                    {error && <CAlert color="danger">{error}</CAlert>}

                    <div className="d-flex justify-content-between mb-3">
                      {digits.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          value={digit}
                          maxLength={1}
                          ref={(el) => (inputRefs.current[index] = el)}
                          onInput={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Backspace" && handleBackspace(index)
                          }
                          onFocus={() => handleFocus(index)}
                          className="form-control mx-1"
                          style={{
                            width: "3rem",
                            textAlign: "center",
                            fontSize: "1.5rem",
                          }}
                        />
                      ))}
                    </div>

                    <CButton
                      color="primary"
                      className="mt-3"
                      type="submit"
                      ref={verifyButtonRef}
                    >
                      Verify
                    </CButton>
                  </CForm>
                </>
              )}
            </CCardBody>
            <CCardFooter className="text-center">
              {!success && (
                <CButton color="secondary" onClick={() => window.location.reload()}>
                  Refresh QR Code
                </CButton>
              )}
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default TwoFactorSetupAndVerification;
