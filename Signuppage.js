import { Paper, TextField, Button } from "@mui/material";
import { postData, serverURL } from "../../../services/FetchAdmin";
import logo from "../../../assets/logo.png";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
export default function Signuppage() {
  const [mobilenumber, setmobilenumber] = useState("+91 ");
  // const [genOtp,setgenOtp]=useState('')
   
  
  var navigate = useNavigate();
  const fetchsmsapi=async(genOtp)=>{
    var response=await postData("smsapi/sendotp",{otp:genOtp,mobileno:mobilenumber})
  }
  
  const handlenextpage = () => {
    var genOtp=parseInt(Math.random()*(8999)+1000)
    alert(genOtp)
    fetchsmsapi(genOtp)
    navigate("/otppage", { state: { mobilenumber,genOtp } });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} style={{ borderRadius: 24 }}>
        <div
          style={{
            padding: 24,
            border: "1px solid #fff",
            borderRadius: 24,
            width: 354,
            height: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 15 }}>
              <img
                src={`${serverURL}/images/${"close.png"}`}
                style={{ width: 18, height: 18, color: "#000093" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    textTransform: "none",
                    fontSize: 24,
                    letterSpacing: -0.72,
                    lineHeight: 1.1666666667,
                    marginBottom: 4,
                  }}
                >
                  Sign In
                </div>
                <div
                  style={{
                    fontWeight: 550,
                    textTransform: "none",
                    fontSize: 16,
                    letterSpacing: -0.08,
                    lineHeight: 1.5,
                    color: "rgba(0,0,0,.65)",
                  }}
                >
                  Verify your mobile number to access your{" "}
                  <span style={{ color: "black", fontWeight: 700 }}>
                    Quickcomm
                  </span>{" "}
                  account
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: 15,
                }}
              >
                <img src={logo} style={{ width: 60, height: 60 }} />
              </div>
            </div>
            <div
              style={{
                height: 187,
                display: "flex",
                flexDirection: "column",
                marginTop: 5,
                justifyContent: "space-between",
                marginBottom: 25,
              }}
            >
              <TextField
                value={mobilenumber}
                onChange={(e) => setmobilenumber(e.target.value)}
                label="Mobile Number"
                variant="standard"
              />

              {mobilenumber.length == 14 ? (
                <div
                  style={{
                    border: "1px solid #fff",
                    letterSpacing: -0.08,
                    lineHeight: 1.5,
                    borderRadius: 25,
                    height: 50,
                    backgroundColor: "#0f3cc9",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 600,
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <LoadingButton
                    // loading="false"
                    loadingPosition="start"
                    //  startIcon={<SaveIcon />}
                    variant="text"
                  >
                    <div
                      onClick={handlenextpage}
                      style={{ color: "#fff", fontWeight: 600 }}
                    >
                      Continue
                    </div>
                  </LoadingButton>
                </div>
              ) : (
                <div
                  style={{
                    border: "1px solid #fff",
                    letterSpacing: -0.08,
                    lineHeight: 1.5,
                    borderRadius: 25,
                    opacity: 0.3,
                    height: 50,
                    backgroundColor: "#0f3cc9",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 600,
                    alignItems: "center",
                  }}
                >
                  <Button>
                    <div style={{ color: "#fff", fontWeight: 600 }}>
                      Continue
                    </div>
                  </Button>
                </div>
              )}
            </div>
            <div
              style={{
                fontWeight: 550,
                textTransform: "none",
                fontSize: 13,
                letterSpacing: -0.06,
                lineHeight: 1.3333333333,
                color: "rgba(0,0,0,.65)",
              }}
            >
              {" "}
              By continuing, you agree to our{" "}
              <span style={{ color: "#0a2885", marginLeft: 5 }}>
                Terms and Conditions of Use, Privacy Policy
              </span>
              and{" "}
              <span style={{ color: "#0a2885" }}>
                Retail Account Privacy Policy.
              </span>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
