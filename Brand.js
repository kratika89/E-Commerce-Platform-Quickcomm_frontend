import { FormHelperText,FormControl,Select,MenuItem,InputLabel, TextField,Button,Grid,Avatar } from "@mui/material"
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { userStylebrand } from "./Brandcss"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import { getData,postData,currentDate} from "../../../services/FetchNodeAdminServices"
import { useEffect } from "react"
import Swal from "sweetalert2";

export default function Brand(props){
    var classes=userStylebrand()
    const[brandName,setbrandName]=useState('')
    const[categoryid,setcategoryid]=useState('')
    const[subcategoryid,setsubcategoryid]=useState('')
    const[loadingStatus,setloadingStatus]=useState(false)
    const[brandIcon,setbrandIcon]=useState({bytes:'',fileName:cart})
    const[categoryList,setcategoryList]=useState([])
    const[subcategoryList,setsubcategoryList]=useState([])
    const[errorMessages,seterrorMessages]=useState([])
    const handleerrormessages=(label,message)=>{
        var msg=errorMessages
        msg[label]=message
        seterrorMessages((prev)=>({...prev,...msg}))
    }
    const validData=()=>{
        var err=false
        if(categoryid.length===0){
            handleerrormessages('categoryid','Pls input Category id.')
            err=true
        }
        if(subcategoryid.length===0){
            handleerrormessages('subcategoryid','Pls input SubCategory id.')
            err=true
        }
        if(brandName.length===0){
            handleerrormessages('brandName','Pls input Brand Name.')
            err=true
        }
        if(brandIcon.bytes.length===0){
            handleerrormessages('brandIcon','Pls select Brand Icon.')
            err=true
        }
        return err
    }

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

    const handlesubcategory=(cid)=>{
        setcategoryid(cid)
      fetchallsubcategory(cid)
    }
    const fetchallsubcategory=async(cid)=>{
        var body={categoryid:cid}
     var result=await postData('subcategory/getallsubcatby_catid',body)
     setsubcategoryList(result.data)
     
    }
    useEffect(function(){
        fetchallsubcategory()
       },[])
    const fillSubcategory=()=>{
        return subcategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


   const handleImage=(e)=>{
     handleerrormessages('brandIcon',null)
     setbrandIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})

   }
   const resetValue=()=>{
    setcategoryid('')
    setsubcategoryid('')
    setbrandName('')
    setbrandIcon({bytes:'',fileName:cart})
   }
   const handleReset=()=>{
    resetValue()
   }
   const handleSumbit=async()=>{
    var err=validData()
    if(err===false){
        setloadingStatus(true)
        var formData=new FormData()
        formData.append('categoryid',categoryid)
        formData.append('subcategoryid',subcategoryid)
        formData.append('brandname',brandName)
        formData.append('brandicon',brandIcon.bytes)
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('useradmin','Farzi')
        var result=await postData('brand/brand_sumbit',formData)
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
            setloadingStatus(false)
            resetValue()
    }
   }

    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
               
             <Grid item xs={12}>
                <div style={{display:'flex',alignItems:'center',padding:5}}>
                    <img src={logo} className={classes.imgStyle}/>
                    <div className={classes.headingStyle}>
                       Brand Register
                    </div>
                </div>
             </Grid> 
             <Grid item xs={6}>
                    {/* ield label="Catrgory ID" fullWidth></TextField> */}
                    <FormControl fullWidth>
                        <InputLabel>Category Id</InputLabel>
                        <Select value={categoryid} error={errorMessages?.categoryid} onFocus={()=>handleerrormessages('categoryid',null)} 
                          label="Category ID" onChange={(e)=>handlesubcategory(e.target.value)}>
                            {fillCategory()}
                             </Select>
                             <FormHelperText><div className={classes.errorMessageStyle} >{errorMessages?.categoryid}</div> </FormHelperText> 
                        
                     </FormControl>
                </Grid>
                <Grid item xs={6}>
                     {/* <TextField label="Subcategory ID" fullWidth></TextField>  */}
                    <FormControl fullWidth>
                        <InputLabel>Subcategory Id</InputLabel>
                        <Select value={subcategoryid} error={errorMessages?.subcategoryid}
                          label="SubCategory ID" onFocus={()=>handleerrormessages('subcategoryid',null)} onChange={(e)=>setsubcategoryid(e.target.value)}>
                             
                            {fillSubcategory()}
                             </Select>
                              <FormHelperText><div className={classes.errorMessageStyle} >{errorMessages?.subcategoryid}</div> </FormHelperText>
                        
                     </FormControl>
                </Grid>
             <Grid item xs={12}>
                <TextField label="Brand Name" value={brandName} onFocus={()=>handleerrormessages('brandName',null)} error={errorMessages?.brandName} helperText={errorMessages?.brandName} onChange={(e)=>setbrandName(e.target.value)} fullWidth></TextField>
             </Grid>
             <Grid item xs={6} className={classes.center}>
                <div style={{display:'flex',flexDirection:'column'}}>
             <Button variant="contained" component='label'>

                Upload

                <input onChange={handleImage} hidden type="file" accept="image/*" multiple/>
             </Button>
             <div className={classes.errorMessageStyle}>{errorMessages.brandIcon!=null?errorMessages?.brandIcon:<></>}</div>
             </div>
             </Grid>
             <Grid item xs={6} className={classes.center}>
                <Avatar src={brandIcon.fileName} variant="rounded"/>
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
              <Button variant="contained" label="component" onClick={handleReset}>
                Reset
              </Button>
             </Grid>
            </Grid>
        </div>

    </div>)
}