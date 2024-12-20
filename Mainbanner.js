import { userstylebanner } from "./Mainbannercss";
import { Grid,TextField ,Button,Select,InputLabel,FormControl,MenuItem,FormHelperText} from "@mui/material";
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { postData } from "../../../services/FetchNodeAdminServices";
import Swal from "sweetalert2";
export default function Mainbanner(){
    const classes=userstylebanner()
    
    const [status,setstatus]=useState('')
    const [loadingStatus,setloadingstatus]=useState(false)
    const [filenames,setfilenames]=useState({bytes:[],fileName:cart})
    const[errorMessages,seterrorMessages]=useState([])
    const handleerrorMessages=(label,message)=>{
      var msg=errorMessages
      msg[label]=message
      seterrorMessages((...prev)=>({...prev,...msg}))
    }
    const validData=()=>{
        var err=false
        
        if(status.length===0){
            handleerrorMessages('status','Pls select some Status')
            err=true
        }
        if(filenames.bytes.length===0){
            handleerrorMessages('filenames','Pls select files.')
            err=true
        }
        return err
    }
    const showthumbnails=()=>{
        return filenames?.bytes?.map((item)=>{
            return (<div style={{margin:2,width:30,height:30,borderRadius:5}}><img src={URL.createObjectURL(item)} style={{width:30,height:30}}/></div>)
        })
    }
    const handlefilenames=(e)=>{
        setfilenames({bytes: Object.values(e.target.files)})
    }
    const handleSumbit=async()=>{
        var err=validData()
        if(err===false){
        setloadingstatus(true)
        var formData=new FormData()
        formData.append('status',status)
        filenames?.bytes?.map((item,i)=>{
            formData.append('picture'+i,item)
        })
        var result=await postData('mainbanner/mainbanner_sumbit',formData)
        if(result.status){
            Swal.fire({
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: false,
            });
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Database Error",
                showConfirmButton: false,
                timer: 2000,
                toast: false
            });
        }
    }
        setloadingstatus(false)
    }
    const resetValue=()=>{
        
        setstatus(' ')
        setfilenames({bytes:[ ],fileName:cart})
    }
    return(
        <div className={classes.root}>
            <div className={classes.box}>
               <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{display:'flex',alignItems:'center',padding:5}}>
                     <img src={logo} className={classes.imgstyle}/>
                     <div className={classes.headingStyle}>
                     Banner Registeration
                     </div>
                    </div>
                </Grid>
                
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" value={status} onFocus={()=>handleerrorMessages('status',null)} error={errorMessages?.status} onChange={(e)=>setstatus(e.target.value)}>
                        <MenuItem value='show'>Show</MenuItem>
                        <MenuItem value='hide'>Hide</MenuItem>
                        <MenuItem value='Expire'>Expire</MenuItem>
                    </Select>
                    <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.status}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" component='label'>
                     Upload
                     <input type="file" hidden accept="/image*" multiple onChange={handlefilenames}/>
                    </Button>
                    <div className={classes.errorMessageStyle}>{errorMessages.filenames!=null?errorMessages?.filenames:<></>}</div>
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <div style={{display:'flex'}}>
                        {showthumbnails()}

                    </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                <LoadingButton
                        loading={loadingStatus}
                         loadingPosition="start"
                         startIcon={<SaveIcon />}
                        variant="contained"
                       onClick={handleSumbit}
                     >
                     Save
                     </LoadingButton>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                   <Button variant="contained" onClick={resetValue}>Reset</Button>
                </Grid>
               </Grid>
            </div>
        </div>
    )

}