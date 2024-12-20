import { Paper, TextField } from "@mui/material";
import { useState ,useEffect} from "react";
import { serverURL } from "../../../services/FetchAdmin";
import { LoadingButton } from "@mui/lab";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../../services/FetchAdmin";
import { useDispatch } from "react-redux";




export default function Otppage() {
  const [otp, setOtp] = useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  var location = useLocation();
  var mobileno = location?.state?.mobilenumber;
  const navigate = useNavigate();
  var dispatch=useDispatch()
   const genOtp=location?.state?.genOtp


  console.log("mmm", mobileno);
  const handleVerify = async () => {

    if(otp==genOtp){
    var response = await postData("userinterface/checkusermobile_no", {
      mobileno,
    });
    if (response.status) {
      dispatch({type:"ADD_USER",payload:[response.data.userid,response.data]})

      var res = await postData("userinterface/checkuser_address", {
        userid:response.data.userid
      });
      if (res.status) {
        var userDataAddress={...response.data,...res?.data[0]}
      dispatch({type:"ADD_USER",payload:[response.data.userid,userDataAddress]})
      } 

    navigate('/cart')
    } else {
      navigate("/userdetails", { state: { mobileno } });
    }
  }
  else{
    alert("Invalid Otp")
  }
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
                src={`${serverURL}/images/${"lefticon.webp"}`}
                style={{ width: 28, height: 28, color: "#000093" }}
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
                  OTP verification
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
                  Enter the OTP sent to you on +91-{mobileno}{" "}
                  <span style={{ color: "#0a2885", fontWeight: 700 }}>
                    Change number
                  </span>
                </div>
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
              <MuiOtpInput value={otp} onChange={handleChange} />
              <div style={{ display:"flex",color: "#0a2885", fontWeight: 700,marginTop:-40,marginLeft:300}}>Resend</div>
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
                    onClick={handleVerify}
                    style={{ color: "#fff", fontWeight: 600 }}
                  >
                    Verify
                  </div>
                </LoadingButton>
              </div>
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
