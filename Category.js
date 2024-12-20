


import { Grid, TextField, Button, Avatar } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import Swal from "sweetalert2"
import { postData,currentDate} from "../../../services/FetchNodeAdminServices"
import { userStyle } from "./CategoryCss";

export default function Category(props) {
    var classes = userStyle()
    const [categoryName, setcategoryName] = useState('')
    const [loadingStatus, setloadingStatus] = useState(false)
    const[categoryIcon, setcategoryIcon]=useState({bytes:'',fileName:cart})
    const[errorMessages,seterrorMessages]=useState({})
    const handleerrormessages=(label,message)=>{
        var msg=errorMessages
        msg[label]=message
        seterrorMessages((prev)=>({...prev,...msg}))
    }
    const validateData=()=>{
        var err=false
        if(categoryName.length===0){
           handleerrormessages('categoryName','Pls input Categoryname.')
            err=true
        }
        if(categoryIcon.bytes.length===0){
            handleerrormessages('categoryIcon','Pls select Categoryicon.')
            err=true
        }
        return err
    }
    const handleImage=(e)=>{
        handleerrormessages('categoryIcon','')
        setcategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
    }
     const resetValue=()=>{
              setcategoryName('')
        setcategoryIcon({bytes:'',fileName:cart})
    
     }
    const handleSumbit=async()=>{
        var err=validateData()
        if(err===false){
        setloadingStatus(true)
      var formData=new FormData()
      formData.append('categoryname',categoryName)
      formData.append('categoryicon',categoryIcon.bytes)
      formData.append('created_date',currentDate())
      formData.append('updated_date',currentDate())
      formData.append('user_admin','Farzi')
      var result=await postData('category/category_sumbit',formData)
       if(result.status){
        Swal.fire({
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
            toast:false,
          });
       }
       else{
        Swal.fire({
            icon: "error",
            title: "Database Error",
            showConfirmButton: false, 
            timer: 2000,
            toast:false
          });
        }
       }
       setloadingStatus(false)
       resetValue()
    }
    const handleReset=()=>{
      resetValue()
    }
    return (

        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
                            <img src={logo} className={classes.imgStyle} />
                            <div className={classes.headingStyle}>
                                Category Register
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onFocus={()=>handleerrormessages('categoryName',null)} error={errorMessages?.categoryName} value={categoryName} helperText={errorMessages?.categoryName} onChange={(e) => setcategoryName(e.target.value)} label="Category Name" fullWidth />

                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <Button variant="contained" component='label' >
                            Upload
                           <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                                                     
                        </Button>
                        <div className={classes.errorMessageStyle}>{errorMessages?.categoryIcon!=null?errorMessages?.categoryIcon:<></>}</div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar src={categoryIcon.fileName} variant="rounded"/>

                        

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
                    <Button variant="contained" label="component" onClick={handleReset} >
                          Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}