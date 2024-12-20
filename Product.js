import { useState } from "react";
import { userstyleProduct } from "./Productcss";
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useEffect } from "react";
import Swal from "sweetalert2";
import { currentDate, getData ,postData } from "../../../services/FetchNodeAdminServices";
import { MenuItem,Grid, TextField, Avatar, Button, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
export default function Product(props) {
    const classes = userstyleProduct()
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
    const [brandid, setbrandid] = useState('')
    const [productName, setproductName] = useState('')
    const [productIcon, setproductIcon] = useState({ bytes: '', fileName: cart })
    const [categoryList,setcategoryList]=useState([])
    const [subcategoryList,setsubcategoryList]=useState([])
    const [brandList,setbrandList]=useState([])
    const [errorMessages,seterrorMessages]= useState([])
    const [productDescription,setproductDescription]=useState('')
    const[loadingStatus,setloadingStatus]=useState(false)
    const handleerrorMessages=(label,message)=>{
        var msg=errorMessages
        msg[label]=message
        seterrorMessages((prev)=>({...prev,...msg}))
    }
    const validData=()=>{
        var err=false
        if(categoryid.length===0){
            handleerrorMessages('categoryid','Pls Select category Id.')
            err=true
        }
        if(subcategoryid.length===0){
            handleerrorMessages('subcategoryid','Pls Select subcategory Id.')
            err=true
        }
        if(brandid.length===0){
            handleerrorMessages('brandid','Pls Select brand Id.')
            err=true
        }
        
        if(productName.length===0){
            handleerrorMessages('productName','Pls input brand name.')
            err=true
        }
        if(productDescription.length===0){
            handleerrorMessages('productDescription','Pls input Product Description.')
            err=true
        }
        if(productIcon.bytes.length===0){
           handleerrorMessages('productIcon','Pls input Product Icon.')
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
       fetchAllsubcategory(cid)
    }
    const fetchAllsubcategory=async(cid)=>{
        var body={categoryid:cid}
        var result=await postData('subcategory/getallsubcatby_catid',body)
        setsubcategoryList(result.data)
    }
    useEffect(function(){
        fetchAllsubcategory()
    },[])
    const fillSubcategory=()=>{
             return subcategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handlebrand=(sid)=>{
        setsubcategoryid(sid)
        fetchAllbrand(sid)
    }
    const fetchAllbrand=async(sid)=>{
        var body={subcategoryid:sid}
        var result=await postData('brand/getallbrandby_subcat',body)
        setbrandList(result.data)
    }
    useEffect(function(){
        fetchAllbrand()
    },[])
    const fillBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }
    const handlepicture=(e)=>{
        setproductIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
    }
    const handleSumbit=async()=>{
       var err=validData()
       if(err===false){
        setloadingStatus(true)
        var formData=new FormData()
        formData.append('categoryid',categoryid)
        formData.append('subcategoryid',subcategoryid)
        formData.append('brandid',brandid)
        formData.append('productsname',productName)
        formData.append('productdescription',productDescription)
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        formData.append('picture',productIcon.bytes)
        var result=await postData('product/product_sumbit',formData)
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
       setloadingStatus(false)
       resetValue()
    }
    const resetValue=()=>{
        setcategoryid('')
            setsubcategoryid('')
            setbrandid('')
            setproductName('')
            setproductDescription('')
            setproductIcon({bytes:'',fileName:cart})
        
    }
    return (
        <div className={classes.box}>
            <div className={classes.subbox}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
                            <img src={logo} className={classes.imgStyle} />
                            <div className={classes.headingStyle}>
                                Product Register
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Category Id</InputLabel>
                            <Select value={categoryid} label="Category ID" onFocus={()=>handleerrorMessages('categoryid',null)} error={errorMessages?.categoryid} 
                            onChange={(e)=>handlesubcategory(e.target.value)}>
                            {fillCategory()}
                            </Select>
                            <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.categoryid}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Subcategory Id</InputLabel>
                            <Select value={subcategoryid} label="Subcategory ID"  onFocus={()=>handleerrorMessages('subcategoryid',null)} error={errorMessages?.subcategoryid}  onChange={(e)=>handlebrand(e.target.value)}>
                             {fillSubcategory()}
                            </Select>
                            <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.subcategoryid}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Brand Id</InputLabel>
                            <Select value={brandid} label="Brand ID"  onFocus={()=>handleerrorMessages('brandid',null)} error={errorMessages?.brandid}  onChange={(e)=>setbrandid(e.target.value)}>
                             {fillBrand()}
                            </Select>
                            <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.brandid}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Product Name" value={productName}  onFocus={()=>handleerrorMessages('brandName',null)} error={errorMessages?.brandName} helperText={errorMessages?.brandName} onChange={(e) => setproductName(e.target.value)} fullWidth></TextField>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Product Decription" value={productDescription}  onChange={(e) => setproductDescription(e.target.value)} onFocus={()=>handleerrorMessages('productDescription',null)} error={errorMessages?.productDescription} helperText={errorMessages?.productDescription} fullWidth></TextField>

                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <div style={{display:'flex',flexDirection:'column'}}>
                        <Button variant="contained" component='label'>
                            Upload
                            <input onChange={handlepicture} hidden type="file" aceept="/image*" multiple />
                          
                        </Button> 
                         <div className={classes.errorMessageStyle}>{errorMessages.productIcon!=null?errorMessages?.productIcon:<></>}</div>
                          </div>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar src={productIcon.fileName} variant="rounded" />
                    </Grid>
                    <Grid item xs={6} className={classes.center} >
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
                        <Button variant="contained" component="label" onClick={resetValue}>
                            Reset
                        </Button>

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}