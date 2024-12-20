import { FormHelperText,FormControl,MenuItem,InputLabel,Select,TextField, Button, Grid, Avatar } from "@mui/material";
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useState } from "react";
import { postData, currentDate } from "../../../services/FetchAdmin";
import { usernewStyles } from "./Subcategorycss";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";
import { getData } from "../../../services/FetchNodeAdminServices";


export default function Subcategory(props) {
    var classes = usernewStyles()
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryName, setsubcategoryName] = useState('')
    const [subcategoryIcon, setsubcategoryIcon] = useState({ bytes: '', fileName: cart })
    const [loadingStatus, setloadingStatus] = useState(false)
    const [errorMessages, seterrorMessages] = useState({})
    const [categoryList,setcategoryList]=useState([])
    const fetchAllcategory=async()=>{
        var result=await getData('category/displayall_category')
        setcategoryList(result.data)
    }
    useEffect(function(){
        fetchAllcategory()
    },[])
    const fillCategory=()=>{
        return categoryList.map((item)=>{
         return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

        })
    }

    const handleerrormessages = (label, message) => {
        var msg=errorMessages
        msg[label] = message
        seterrorMessages((prev) => ({ ...prev, ...msg }))

    }
    const validData = () => {
        var err = false
        if(categoryid.length===0){
            handleerrormessages('categoryid','Pls input Category ID.')
            err=true
        }
        if (subcategoryName.length === 0) {
            handleerrormessages('subcategoryName', 'Pls input subvcategory name.')
            err = true
        }
        if (subcategoryIcon.bytes.length === 0) {
            handleerrormessages('subcategoryIcon', 'Pls select subcategoryicon.')
            err = true
        }
        return err
    }



    const handleImage = (e) => {
        setsubcategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
    }
    const resetValue = () => {
        setcategoryid('')
        setsubcategoryName('')
        setsubcategoryIcon({ bytes: '', fileName: cart })


    }
    const handleSumbit = async () => {
        var err = validData()
        if (err === false) {
            setloadingStatus(true)
            var formData = new FormData()
            formData.append('categoryid', categoryid)
            formData.append('subcategoryname', subcategoryName)
            formData.append('subcategoryicon', subcategoryIcon.bytes)
            formData.append('created_at', currentDate())
            formData.append('updated_at', currentDate())
            formData.append('useradmin', 'Farzi')
            var result = await postData('subcategory/subcategory_sumbit', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: false,
                });
                
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Database Error",
                    showConfirmButton: false,
                    timer: 2000,
                    toast: false
                });
            }
        }
        setloadingStatus(false)
        resetValue()
    }
    const handleReset = () => {
        resetValue()
    }
    return (<div className={classes.main}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
                        <img src={logo} className={classes.imgStyle} />
                        <div className={classes.headingStyle}> Subcategory Registeration</div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField label="Category ID" onFocus={()=>handleerrormessages('categoryid',null)} error={errorMessages?.categoryid} helperText={errorMessages?.categoryid}  value={categoryid} onChange={(e) => setcategoryid(e.target.value)} fullWidth></TextField> */}
                     <FormControl fullWidth>
                        <InputLabel>Category Id</InputLabel>
                        <Select value={categoryid} error={errorMessages?.categoryid}  onFocus={()=>handleerrormessages('categoryid',null)} 
                          label="Category ID" onChange={(e)=>setcategoryid(e.target.value)}>

                            {fillCategory()}
                             </Select>
                             <FormHelperText><div className={classes.errorMessageStyle} >{errorMessages?.categoryid}</div> </FormHelperText>
                        
                     </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Subcategory Name" onFocus={()=>handleerrormessages('subcategoryName',null)} error={errorMessages?.subcategoryName} helperText={errorMessages?.subcategoryName} value={subcategoryName} onChange={(e) => setsubcategoryName(e.target.value)} fullWidth></TextField>

                </Grid>
                <Grid item xs={6} className={classes.center}>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" component='label'>
                        Upload
                        <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                    </Button>
                    <div className={classes.errorMessageStyle}>{errorMessages.subcategoryIcon!=null?errorMessages?.subcategoryIcon:<></>}</div>
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Avatar src={subcategoryIcon.fileName} variant="rounded" />

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
                    <Button variant="contained" component='label' onClick={handleReset}>
                        Reset
                    </Button>

                </Grid>

            </Grid>
        </div>
    </div>)
}