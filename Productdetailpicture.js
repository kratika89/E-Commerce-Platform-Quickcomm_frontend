import { userstyle } from "./productdetailpicturecss";
import { FormControl, Grid,MenuItem,InputLabel,FormHelperText,Select,Button,Avatar } from "@mui/material";
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useState ,useEffect } from "react";
import { getData ,postData,currentDate} from "../../../services/FetchNodeAdminServices";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
export default function Productdetailpicture(){
var classes=userstyle()
const[categoryid,setcategoryid]=useState('')
    const[subcategoryid,setsubcategoryid]=useState('')
    const[brandid,setbrandid]=useState('')
    const[productid,setproductid]=useState('')
    const[productdetailid,setproductdetailid]=useState('')
    const[categoryList,setcategoryList]=useState([])
    const [subcategoryList,setsubcategoryList]=useState([])
    const [brandList,setbrandList]=useState([])
    const [productList,setproductList]=useState([])
    const[productdetailList,setproductdetailList]=useState([])
    const [filenames,setfilenames]=useState({bytes:[],fileName:cart})

    const [loadingStatus,setloadingStatus]=useState(false)
    const [errorMessages,seterrorMessages]=useState([])
    const handleerrorMessages=(label,message)=>{
     var msg=errorMessages
     msg[label]=message
     seterrorMessages((...prev)=>({...prev,...msg}))
    }
    const validData=()=>{
        var err=false
        if(categoryid.length===0){
            handleerrorMessages('categoryid','Pls input category id')
            err=true;
        }
        if(subcategoryid.length===0){
            handleerrorMessages('subcategoryid','Pls input subcategory id')
            err=true;
        }
        if(brandid.length===0){
            handleerrorMessages('brandid','Pls input brand id')
            err=true;
        }
        if(productid.length===0){
            handleerrorMessages('productid','Pls input Product id')
            err=true;
        }
        if(productdetailid.length===0){
            handleerrorMessages('productdetailid','Pls input Product Deatail id')
            err=true;
        }
        if(filenames.bytes.length===0){
            handleerrorMessages('filenames','Pls select files.')
            err=true
        }
        return err
    }
    const fetchallcategory=async()=>{
        var result=await getData('category/displayall_category')
        setcategoryList(result.data)
    }
    useEffect(function(){
        fetchallcategory()
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
    
    useEffect(() => {
        fetchallsubcategory();
      }, []);
    const fetchallsubcategory=async(cid)=>{
        var body={categoryid:cid}
        var result=await postData('subcategory/getallsubcatby_catid',body)
        setsubcategoryList(result.data)
    }
    
    const fillsubcategory=()=>{
       return subcategoryList.map((item)=>{
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
       })
    }
    const handlebrand=async(sid)=>{
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
    const fillbrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }
    const handleproduct=async(bid)=>{
        setbrandid(bid)
        fetchAllproduct(bid)
    }
    useEffect(function(){
        fetchAllproduct()
    },[])
    const fetchAllproduct=async(bid)=>{
        var body={brandid:bid}
        var result=await postData('product/getallproductby_brand',body)
        setproductList(result.data)
    }
    const fillproduct=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productsname}</MenuItem>
        })
    }
    const handleproductdetail=async(pid)=>{
        setproductid(pid)
        fetchallproductdetail(pid)
    }
    useEffect(function(){
        fetchallproductdetail()
    },[])
    const fetchallproductdetail=async(pid)=>{
        var body={productid:pid}
        var result=await postData('productdetail/getallproductdetailby_productid',body)
        setproductdetailList(result.data)
    }
    const fillproductdetail=()=>{
        return productdetailList.map((item)=>{
            return <MenuItem value={item.productdetailid}>{item.productdetailname}</MenuItem>
        })
    }

    const showthumbnails=()=>{
      return filenames?.bytes?.map((item)=>{
      return(<div style={{margin:2,width:30,height:30,borderRadius:5}}><img src={URL.createObjectURL(item)} style={{width:30,height:30}}/></div>)
     })
    }
    const handlepicture=(e)=>{ 
        handleerrorMessages('filenames',null)
        setfilenames({bytes: Object.values(e.target.files),fileName:URL.createObjectURL(e.target.files[0])}) 
    }
    const handleSumbit=async()=>{
        var err=validData()
        if(err===false){
        setloadingStatus(true)
        var formData=new FormData()
        formData.append('categoryid',categoryid)
        formData.append('subcategoryid',subcategoryid)
        formData.append('brandid',brandid)
        formData.append('productid',productid)
        formData.append('productdetailid',productdetailid)
        filenames?.bytes?.map((item,i)=>{
            formData.append('picture'+i,item)
        })
        
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        var result=await postData('productdetailpicture/productdetailpic_sumbit',formData)
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
        setcategoryid(' ')
        setsubcategoryid(' ')
        setbrandid(' ') 
        setproductid(' ')
        setproductdetailid(' ')
        setfilenames({bytes:[ ],fileName:cart})
    }
return(<div className={classes.root}>
    <div className={classes.box}>
        <Grid container spacing={2}>
         <Grid item xs={12}>
          <div style={{display:'flex',alignItems:'center',padding:5}}>
            <img src={logo} className={classes.imgstyle}/>
            <div className={classes.headingstyle}>
                Product Detail Picture
            </div>
          </div>
         </Grid>
         <Grid item xs={2.4}>
          <FormControl fullWidth>
            <InputLabel>Categoryid</InputLabel>
            <Select label="Category ID" value={categoryid} onFocus={()=>handleerrorMessages('categoryid',null)} error={errorMessages?.categoryid}  onChange={(e)=>handlesubcategory(e.target.value)}>
            {fillCategory()}
            </Select>
         <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.categoryid}</FormHelperText>
          </FormControl>
         </Grid>
         <Grid item xs={2.4}>
          <FormControl fullWidth>
            <InputLabel>Subcategoryid</InputLabel>
            <Select label="Subcategory ID" value={subcategoryid} onFocus={()=>handleerrorMessages('subcategoryid',null)} error={errorMessages?.subcategoryid}  onChange={(e)=>handlebrand(e.target.value)}>
            {fillsubcategory()}
            </Select>
            <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.subcategoryid}</FormHelperText>
          </FormControl>
         </Grid>
         <Grid item xs={2.4}>
          <FormControl fullWidth>
            <InputLabel>Brandid</InputLabel>
            <Select label="Brand ID" value={brandid} onFocus={()=>handleerrorMessages('brandid',null)} error={errorMessages?.brandid} onChange={(e)=>handleproduct(e.target.value)}>
            {fillbrand()}
            </Select>
            <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.brandid}</FormHelperText>
          </FormControl>
         </Grid>
         <Grid item xs={2.4}>
          <FormControl fullWidth>
            <InputLabel>Productid</InputLabel>
            <Select label="Product ID" value={productid} onFocus={()=>handleerrorMessages('productid',null)} error={errorMessages?.productid} onChange={(e)=>handleproductdetail(e.target.value)}>
            {fillproduct()}
            </Select>
            <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.productid}</FormHelperText>
          </FormControl>
         </Grid>
         <Grid item xs={2.4}>
          <FormControl fullWidth>
            <InputLabel>Product Detail id</InputLabel>
            <Select label="Product Detail ID" value={productdetailid} onFocus={()=>handleerrorMessages('productdetailid',null)} error={errorMessages?.productdetailid} onChange={(e)=>setproductdetailid(e.target.value)}>
            {fillproductdetail()}
            </Select>
            <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.productdetailid}</FormHelperText>
          </FormControl>
         </Grid>
         <Grid item xs={6} className={classes.center}>
            <div style={{display:'flex',flexDirection:'column'}}>
            <Button variant="contained" component="label" >Upload
            <input type="file" hidden accept="/image*" multiple onChange={handlepicture}/>
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

</div>)
}