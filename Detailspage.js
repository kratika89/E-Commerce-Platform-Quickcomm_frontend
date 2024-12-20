import { Paper, TextField } from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { postData } from "../../../services/FetchNodeAdminServices";
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";



export default function Detailspage() {
  var location=useLocation()
    const[mobileno,setmobileno]=useState(location.state.mobileno)
    const[firstName,setfirstName]=useState('')
    const[lastName,setlastName]=useState('')
    const[gender,setgender]=useState('')
    const[emailAddress,setemailAddress]=useState('')
    const[dob,setdob]=useState('')
    const[snackBar,setsnackBar]=useState({open:false,message:''})
     var dispatch=useDispatch()
     var navigate=useNavigate()
     const handleSumbit=async()=>{
    var body={firstname:firstName,lastname:lastName,emailaddress:emailAddress,gender,dob,mobileno}
     var response=await postData('userinterface/sumbit_user_data',body)
     if(response.status){
        body['userid']=response.userid
        dispatch({type:"ADD_USER",payload:[response?.userid,body]})
        setsnackBar({message:response.message,open:true})
        navigate('/cart')
     }
     else{
        setsnackBar({message:response.message,open:true})
     }
   }

   const handleClose=()=>{
    setsnackBar({message:'',open:false})
   }



    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ borderRadius: 24 }}>
                <div style={{ padding: 24, border: '1px solid #fff', borderRadius: 24, width: 354, height: 570, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        fontWeight: 900,
                        textTransform: 'none',
                        fontSize: 26,
                        letterSpacing: -.72,
                        lineHeight: 1.1666666667, marginBottom: 4
                    }}>Setup your account

                    </div>
                    <div style={{
                        fontWeight: 550,
                        textTransform: 'none',
                        fontSize: 16,
                        letterSpacing: -.08,
                        lineHeight: 1.5, color: 'rgba(0,0,0,.65)', marginBottom: 12
                    }}>
                        Seamless onboarding, quick checkouts, and faster deliveries across quickcomm and other Platforms.
                    </div>
                    <TextField variant="standard" label="First Name" onChange={(e)=>setfirstName(e.target.value)} style={{ marginBottom: 24 }} />
                    <TextField variant="standard" label="Last Name" onChange={(e)=>setlastName(e.target.value)} style={{ marginBottom: 24 }} />
                    <div  style={{
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: 16,
                        letterSpacing: -.08,
                        lineHeight: 1.5, marginBottom: 4
                    }}>Gender

                    </div>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel onChange={(e)=>setgender(e.target.value)} value="female" control={<Radio />} label="Female" />
                            <FormControlLabel onChange={(e)=>setgender(e.target.value)} value="male" control={<Radio />} label="Male" />
                            <FormControlLabel onChange={(e)=>setgender(e.target.value)} value="other" control={<Radio />} label="Other" />

                        </RadioGroup>
                    </FormControl>
                    <TextField onChange={(e)=>setemailAddress(e.target.value)}  variant="standard" label="Email ID" style={{ marginTop: 4, marginBottom: 8 }} />
                    <TextField onChange={(e)=>setdob(e.target.value)} variant="standard" label="Date Of Birth" style={{ marginBottom: 26, marginTop: 4 }} />
                    <div style={{
                        border: '1px solid #fff', letterSpacing: -.08,
                        lineHeight: 1.5, borderRadius: 25, height: 50, backgroundColor: '#0f3cc9', color: '#fff', display: 'flex', justifyContent: 'center', fontSize: 18, fontWeight: 600, alignItems: 'center', marginBottom: 26
                    }}> <LoadingButton
                        // loading="false"
                        loadingPosition="start"
                        //  startIcon={<SaveIcon />}
                        variant="text"

                    >
                            <div onClick={handleSumbit} style={{ color: '#fff', fontWeight: 600 }}>Continue</div>
                        </LoadingButton>

                    </div>
                    <div style={{
                        fontWeight: 550,
                        textTransform: 'none',
                        fontSize: 13,
                        letterSpacing: -.06,
                        lineHeight: 1.3333333333, color: 'rgba(0,0,0,.65)'
                    }}> By continuing, you agree to our <span style={{ color: '#0a2885', marginLeft: 5 }}>Terms and Conditions of Use, Privacy Policy</span>
                        and <span style={{ color: '#0a2885' }}>Retail Account Privacy Policy.</span>

                    </div>
                </div>
            </Paper>
            <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={snackBar.open}
        
  autoHideDuration={5000}
  onClose={handleClose}
  message={snackBar.message}
       
        
      />
        </div>
    )
}