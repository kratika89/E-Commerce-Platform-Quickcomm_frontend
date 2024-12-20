import { Divider } from "@mui/material";
import { Paper, Grid, TextField, Button } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../services/FetchNodeAdminServices";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useRazorpay from "react-razorpay";
import { serverURL } from "../../../services/FetchNodeAdminServices";
export default function PaymentDetails({ refresh, setRefresh }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  var [open, setopen] = useState(false);
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var cartData = useSelector((state) => state.cart);
  var user = useSelector((state) => state.user);

  var userData = Object.values(user);

  var data = Object.values(cartData);
  var keys = Object.keys(cartData);

  var discount = data.reduce((f, s) => {
    var ap = 0;
    if (s.offerprice > 0) {
      var ap = (s.price - s.offerprice) * s.qty;
    }

    return f + ap;
  }, 0);

  const [userId, setuserId] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [houseNo, sethouseNo] = useState("");
  const [floorNo, setfloorNo] = useState("");
  const [towerNo, settowerNo] = useState("");
  const [building, setBuilding] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setlandmark] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [btnTxt, setbtnTxt] = useState("Place Order");
  var totalamount = data.reduce((f, s) => {
    var ap = 0;

    var ap = s.price * s.qty;

    return f + ap;
  }, 0);

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: (totalamount - discount) * 100,
      currency: "INR",
      name: "QuickComm",
      description: "Test Transaction",
      image: `${serverURL}/images/logo.png`,

      handler: async (res) => {
        console.log(res);

        dispatch({ type: "CLEAR_CART", payload: [] });
        await postData("smsapi/sendmail", {
          to: userData[0]?.emailaddress,
          subject: "Your Cart",
          message: "<h1>Hi</h1>",
        });
        navigate("/homepage");
      },
      prefill: {
        name: userData[0]?.fullname,
        email: userData[0]?.emailaddress,
        contact: userData[0]?.mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
  };
  useEffect(function () {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleplaceorder = async () => {
    if (btnTxt == "Make Payment") {
      handlePayment();
    }
    if (userData.length == 0) {
      navigate("/signuppage");
    } else {
      var response = await postData("userinterface/checkuser_address", {
        userid: userData[0]?.userid,
      });
      if (response.status) {
        var userDataAddress = { ...userData[0], ...response?.data[0] };
        dispatch({
          type: "ADD_USER",
          payload: [userData[0]?.userid, userDataAddress],
        });
        setbtnTxt("Make Payment");
      } else {
        setopen(true);
      }
    }
  };
  const handleClose = (bool) => {
    setopen(bool);
  };

  const handleSumbitAddress = async () => {
    var body = {
      userid: userData[0]?.userid,
      pincode: pinCode,
      houseno: houseNo,
      floorno: floorNo,
      towerno: towerNo,
      building: building,
      address: address,
      landmark: landmark,
      city: city,
      state: state,
    };
    var response = await postData("userinterface/sumbit_address", body);
    if (response.status) {
      // var {userid,...remainingData}=userData[0]

      var userDataAddress = { ...userData[0], ...body };
      dispatch({
        type: "ADD_USER",
        payload: [userData[0]?.userid, userDataAddress],
      });
      Swal.fire({
        text: response.message,
        timer: 5000,
      });
      setbtnTxt("Make Payment");
      setRefresh(!refresh);
      navigate("/cart");
    } else {
      Swal.fire({
        text: response.message,
        timer: 5000,
      });
    }
    setopen(false);
  };

  const addressView = () => {
    return (
      <div>
        <Paper
          style={{
            width: 380,
            height: 650,
            borderRadius: 15,
            justifySelf: "right",
          }}
        >
          <div style={{ marginLeft: 25 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  marginTop: 30,
                  fontFamily: "JioType, helvetica, arial, sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  letterSpacing: 0.15,
                  lineHeight: 1,
                }}
              >
                Add Address
              </div>
              <div>
                <img
                  src={"/cross.png"}
                  style={{
                    width: 15,
                    height: 15,
                    marginTop: 30,
                    marginRight: 20,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: 30,
                fontFamily: "JioType, helvetica, arial, sans-serif",
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: 0.15,
                lineHeight: 1,
              }}
            >
              Address Details
            </div>

            <div style={{ marginTop: 15, display: "flex" }}>
              <MyLocationIcon style={{ fontSize: 20, color: "#0078ad" }} />
              <div
                style={{
                  color: "#0078ad",
                  fontWeight: 500,
                  fontSize: 13.5,
                  letterSpacing: 0.25,
                  lineHeight: 1.4285714286,
                }}
              >
                Use Current Location
              </div>
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 11.5,
                letterSpacing: 0.07,
                lineHeight: 1.4285714286,
                color: "rgba(0, 0, 0, .65)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                webkitLineClamp: "1",
                webkitBoxOrient: "vertical",
                marginLeft: 20,
              }}
            >
              Using GPS
            </div>
            <Grid container spacing={1}>
              <Grid item xs={12} style={{ width: "90%", marginTop: 5 }}>
                <TextField
                  onChange={(e) => setpinCode(e.target.value)}
                  label="Pin Code"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: 5, width: "45%" }}>
                <TextField
                  onChange={(e) => sethouseNo(e.target.value)}
                  label="House No."
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: 5, width: "45%" }}>
                <TextField
                  onChange={(e) => setfloorNo(e.target.value)}
                  label="Floor No."
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ width: "90%", marginTop: 5 }}>
                <TextField
                  onChange={(e) => settowerNo(e.target.value)}
                  label="Tower No."
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ width: "90%", marginTop: 5 }}>
                <TextField
                  onChange={(e) => setBuilding(e.target.value)}
                  label="Building / Apartment Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ width: "90%", marginTop: 5 }}>
                <TextField
                  onChange={(e) => setAddress(e.target.value)}
                  label="Address"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ width: "90%", marginTop: 5 }}>
                <TextField
                  onChange={(e) => setlandmark(e.target.value)}
                  label="Landmark / Area"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ width: "90%", marginTop: 5 }}>
                <TextField
                  onChange={(e) => setcity(e.target.value)}
                  label="City"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ width: "90%", marginTop: 5 }}>
                <TextField
                  onChange={(e) => setstate(e.target.value)}
                  label="State"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSumbitAddress}
                  style={{
                    borderRadius: 25,
                    height: 53,
                    marginTop: 10,
                    color: "#fff",
                    background: "#0078ad",
                    fontFamily: "JioType, helvetica, arial, sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.4285714286,
                    width: "95%",
                  }}
                  fullWidth
                >
                  Save and Proceed
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper
          style={{
            width: 380,
            height: 250,
            borderRadius: 15,
            justifySelf: "right",
            marginTop: 40,
          }}
        >
          <div>
            <div
              style={{
                padding: 25,
                fontFamily: "JioType, helvetica, arial, sans-serif",
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: 0.15,
                lineHeight: 1,
              }}
            >
              Delivery Contact Details
            </div>
            <div
              style={{
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: 0.15,
                lineHeight: 1.4285714286,
                color: "rgba(0, 0, 0, .65)",
                webkitLineClamp: "1",
                webkitBoxOrient: "vertical",
                marginTop: 15,
                marginLeft: 20,
              }}
            >
              This mobile number will receive an OTP, required for collecting
              the order.
            </div>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                style={{ width: "90%", marginTop: 5, marginLeft: 20 }}
              >
                <TextField
                  label="Receiver's Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ width: "90%", marginTop: 5, marginLeft: 20 }}
              >
                <TextField
                  label="Receiver's Number"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper
          style={{
            width: 380,
            height: 250,
            borderRadius: 15,
            justifySelf: "right",
            marginTop: 40,
          }}
        >
          <div
            style={{
              padding: 25,
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 900,
              fontSize: 15,
              letterSpacing: 0.15,
              lineHeight: 1,
            }}
          >
            Save as
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 20,
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                width: 70,
                height: 28,
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                borderRadius: 15,
                padding: 3,
                color: "#0078ad",
                marginTop: 2,
                fontWeight: 500,
                fontSize: 15,
                letterSpacing: 0.25,
                lineHeight: 1.4285714286,
                alignItems: "center",
              }}
            >
              Home
            </div>
            <div
              style={{
                cursor: "pointer",
                width: 70,
                height: 28,
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                borderRadius: 15,
                padding: 3,
                color: "#0078ad",
                marginTop: 2,
                fontWeight: 500,
                fontSize: 15,
                letterSpacing: 0.25,
                lineHeight: 1.4285714286,
                alignItems: "center",
              }}
            >
              Work
            </div>
            <div
              style={{
                cursor: "pointer",
                width: 70,
                height: 28,
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                borderRadius: 15,
                padding: 3,
                color: "#0078ad",
                marginTop: 2,
                fontWeight: 500,
                fontSize: 15,
                letterSpacing: 0.25,
                lineHeight: 1.4285714286,
                alignItems: "center",
              }}
            >
              Other
            </div>
          </div>
          <div style={{ marginTop: 10, marginLeft: 25, width: "90%" }}>
            <TextField
              label="Add New Address Type"
              variant="standard"
              placeholder="Eg: Club House, Kumar's Home"
              fullWidth
            />
          </div>
        </Paper>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          border: "1px solid #e0e0e0",
          width: "auto",
          height: "auto",
          borderRadius: 24,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          marginBottom: 15,
        }}
      >
        <div
          style={{
            fontFamily: "JioType, helvetica, arial, sans-serif",
            fontWeight: 900,
            fontSize: "1rem",
            letterSpacing: -0.72,
            lineHeight: 1.25,
            marginLeft: 28,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          Payment Details
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "rgba(0, 0, 0, .65)",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 550,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
              marginLeft: 30,
            }}
          >
            MRP
          </div>
          <div
            style={{
              color: "rgba(0, 0, 0, .65)",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 550,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
            }}
          >
            &#8377;{totalamount.toFixed(2)}
          </div>
        </div>
        <Divider variant="middle" />
        <div
          style={{
            display: "flex",
            marginTop: 15,
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "rgba(0, 0, 0, .65)",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 550,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
              marginLeft: 30,
            }}
          >
            Product Discount
          </div>
          <div
            style={{
              color: "#00b259",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 550,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
            }}
          >
            - &#8377;{discount.toFixed(2)}
          </div>
        </div>
        <Divider variant="middle" />
        <div
          style={{
            display: "flex",
            marginTop: 15,
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "rgba(0, 0, 0, .65)",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 550,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
              marginLeft: 30,
            }}
          >
            Delivery Fee
          </div>
          <div
            style={{
              color: "#00b259",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 550,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
            }}
          >
            Free
          </div>
        </div>
        <Divider variant="middle" />
        <div
          style={{
            display: "flex",
            marginTop: 15,
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "rgba(0, 0, 0, .65)",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
              marginLeft: 30,
            }}
          >
            Total
          </div>
          <div
            style={{
              color: "#141414",
              fontFamily: "JioType, helvetica, arial, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
            }}
          >
            &#8377;{(totalamount - discount).toFixed(2)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            color: "#00b259",
            fontFamily: "JioType, helvetica, arial, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: -0.07,
            lineHeight: 1.4285714286,
            marginLeft: 198,
            marginBottom: 10,
          }}
        >
          You Saved &#8377;{discount.toFixed(2)}
        </div>
      </div>
      <Button
        onClick={handleplaceorder}
        style={{
          border: "1px solid #ddd",
          borderRadius: 25,
          width: matches ? "91%" : "93%",
          height: 53,
          marginTop: 10,
          color: "#fff",
          background: "#0078ad",
          fontFamily: "JioType, helvetica, arial, sans-serif",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: -0.07,
          lineHeight: 1.4285714286,
        }}
        fullWidth
      >
        {btnTxt}
      </Button>
      <Drawer anchor={"right"} open={open} onClose={() => handleClose(false)}>
        {addressView()}
      </Drawer>
    </div>
  );
}
