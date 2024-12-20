import { userstyleProduct } from "./Productcss"
import { useEffect } from "react"
import { useState } from "react"
import { getData,createDate,serverURL ,postData,currentDate} from "../../../services/FetchNodeAdminServices"
import MaterialTable from "@material-table/core"
import { IconButton,Button,Dialog,DialogActions,DialogContent } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import { FormHelperText, FormControl, Select, MenuItem, InputLabel, TextField, Grid, Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom";
export default function Displayallproduct(props){
    const classes=userstyleProduct()



   


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
    var navigate=useNavigate()
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
        // if(productIcon.bytes.length===0){
        //    handleerrorMessages('productIcon','Pls input Product Icon.')
        // }
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
        sethideUpload(true)
    }
    const productForm=()=>{
        return(
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
                    {hideUpload?<div>{showsavecancel()}</div>:
                <Button variant="contained" component='label'>
                    Upload
                    <input onChange={handlepicture} hidden type="file" aceept="/image*" multiple />
                   
                </Button>
    } 
    <div className={classes.errorMessageStyle}>{errorMessages.productIcon!=null?errorMessages?.productIcon:<></>}</div>
                  </div>
            </Grid>
            <Grid item xs={6} className={classes.center}>
                <Avatar src={productIcon.fileName} variant="rounded" />
            </Grid>
            <Grid item xs={6} className={classes.center} >
            

            </Grid>
        </Grid>
        )
    }







   

    const[oldpicture,setoldpicture]=useState('')
    const[hideUpload,sethideUpload]=useState(false)
    const[productId,setproductId]=useState('')
    const[open,setopen]=useState(false)
    const [productlist,setproductlist]=useState([])
    const handleOpenDialog=(rowData)=>{
        setcategoryid(rowData.categoryid)
        fetchAllsubcategory(rowData.categoryid)
        setsubcategoryid(rowData.subcategoryid)
        fetchAllbrand(rowData.subcategoryid)
        setbrandid(rowData.brandid)
        setproductId(rowData.productid)
        setproductName(rowData.productsname)
        setproductDescription(rowData.productdescription)
        setproductIcon({bytes:'',fileName:`${serverURL}/images/${rowData.picture}`})
        setoldpicture(`${serverURL}/images/${rowData.picture}`)
        setopen(true)
    }
    const handleclosedialog=()=>{
        setopen(false)
    }
    const showsavecancel=()=>{
        return(<div>
            <Button onClick={handleeditpicture}>Save</Button>
            <Button onClick={handlecancelButton}>Cancel</Button>
        </div>)

    }
    const handlecancelButton=()=>{
        setproductIcon({bytes:'',fileName:oldpicture})
        sethideUpload(false)
    }
    const handleeditpicture=async()=>{
  
         setloadingStatus(true)
         var formData= new FormData()
         formData.append('picture',productIcon.bytes)
         formData.append('updated_at',currentDate())
         formData.append('user_admin','Farzi')
         formData.append('productid',productId)
         var result=await postData('product/edit_picture',formData)
         if(result.status){
             Swal.fire({
                position:'top-end',
                 icon: "success",
                 title: result.message,
                 showConfirmButton: false,
                 timer: 2000,
                 toast: false,
             });
         }
         else{
             Swal.fire({
                position:'top-end',
                 icon: "error",
                 title: "Database Error",
                 showConfirmButton: false,
                 timer: 2000,
                 toast: false
             });
         }
        
        setloadingStatus(false)
        sethideUpload(false)
        fetchallproduct()
       
     }
     const handledeleteproduct=async()=>{
        setloadingStatus(true)
        var body={productid:productId}
        var result=await postData('product/delete_product',body)
        if(result.status){
            Swal.fire({
               position:'top-end',
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: false,
            });
        }
        else{
            Swal.fire({
               position:'top-end',
                icon: "error",
                title: "Database Error",
                showConfirmButton: false,
                timer: 2000,
                toast: false
            });
        }
       
       setloadingStatus(false)
      
       fetchallproduct()
      
     }
     const handledeletedata =() => {

        Swal.fire({
            title: "Do you want to delete the brand?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              handledeleteproduct()
    
            } else if (result.isDenied) {
              Swal.fire("Subcategory not deleted!", "", "info");
            }
          });
           
    }
    const handleeditDialog=async()=>{
        var err=validData()
        if(err===false){
         setloadingStatus(true)
         var body={'categoryid':categoryid,'subcategoryid':subcategoryid,'brandid':brandid,'productsname':productName,'productdescription':productDescription,
         'updated_at':currentDate(),'user_admin':'Farzi',productid:productId}
         var result=await postData('product/edit_product',body)
         if(result.status){
             Swal.fire({
                position:'top-end',
                 icon: "success",
                 title: result.message,
                 showConfirmButton: false,
                 timer: 2000,
                 toast: false,
             });
         }
         else{
             Swal.fire({
                position:'top-end',
                 icon: "error",
                 title: "Database Error",
                 showConfirmButton: false,
                 timer: 2000,
                 toast: false
             });
         }
        }
        setloadingStatus(false)
        
        fetchallproduct()
       
     }
    const showproductdialog=()=>{
        return (<div>
            <Dialog open={open}>
            <IconButton
      aria-label="close"
      onClick={handleclosedialog}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
                <DialogContent>
                    {productForm()}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={loadingStatus}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                         onClick={handleeditDialog}
                    >
                        Edit Data
                    </LoadingButton>
                    <Button variant="contained" label="component" onClick={handledeletedata}>
                        Delete
                    </Button>
                   
                </DialogActions>
            </Dialog>
        </div>)
    }
    const fetchallproduct=async()=>{
        var result=await getData('product/displayall_product')
        if(result.status){
            setproductlist(result.data)
        }
        else{
            alert(result.message)
        } 
    }
    useEffect(function(){
        fetchallproduct()
    },[])
    function producttable(){
        return(
            <div className={classes.box}>
                <div className={classes.displaybox}>
                <MaterialTable
                            title="Product List"
                            columns={[
                                { title: 'Product Id', field: 'productid' },
                                { title: 'Category/Subcategory/Brand', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }} ><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div><div>{rowData.brandname}</div></div> } ,
                                { title: 'Product Name', field: 'productsname' },
                                
                                
                                { title: 'Created', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }} ><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },

                                {
                                    title: 'Admin', field: 'user_admin'
                                },
                                { title: 'Icon', render: (rowData) => <div> <img src={`${serverURL}/images/${rowData.picture}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },
                            ]}
                            data={productlist}
                            options={{
                                pageSize: 3,
                                pageSizeOptions: [3, 5, 10, { value: productlist.length, label: 'All' }]
                            }}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Product',
                                    onClick: (event, rowData) => handleOpenDialog(rowData)
                                },
                                {
                                    icon: 'add',
                                    tooltip: 'Add User',
                                    isFreeAction: true,
                                    onClick: (event) => navigate('/dashboard/product')
                                  }
                            ]}
                        />

                </div>
            </div>
        )
    }
    return(<div>
        {producttable()}
        {showproductdialog()}
    </div>)
}