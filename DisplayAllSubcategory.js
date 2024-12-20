import MaterialTable from "@material-table/core";
import { getData ,createDate, serverURL,postData,currentDate} from "../../../services/FetchAdmin";
import { useState,useEffect } from "react";
import { usernewStyles } from "./Subcategorycss";
import { FormHelperText,Select,MenuItem,InputLabel,FormControl,IconButton,Dialog,DialogActions,DialogContent,Button } from "@mui/material";
import { TextField, Grid, Avatar } from "@mui/material";
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
export default function DisplayAllSubcategory(){
const classes=usernewStyles()


  



    const [categoryList,setcategoryList]=useState([])
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryName, setsubcategoryName] = useState('')
    const [subcategoryIcon, setsubcategoryIcon] = useState({ bytes: '', fileName: cart })
    const [loadingStatus, setloadingStatus] = useState(false)
    const [errorMessages, seterrorMessages] = useState({})
    var navigate=useNavigate()
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
        if (subcategoryName.length === 0) {
            handleerrormessages('subcategoryName', 'Pls input subvcategory name.')
            err = true
        }
        // if (subcategoryIcon.bytes.length === 0) {
        //     handleerrormessages('subcategoryIcon', 'Pls select subcategoryicon.')
        //     err = true
        // }
        return err
    }
    
const handleImage = (e) => {
        setsubcategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        sethideUpload(true)
    }
    const showSubcategoryForm=()=>{
        return(
            <div>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
                        <img src={logo} className={classes.imgStyle} />
                        <div className={classes.headingStyle}> Subcategory Registeration</div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField label="Category ID"  value={categoryid} onChange={(e) => setcategoryid(e.target.value)} fullWidth></TextField> */}
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
                    {hideUpload?<div>{showSaveCancel()}</div>:
                    <Button variant="contained" component='label'>
                        Upload
                        <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                    </Button>}
                    <div className={classes.errorMessageStyle}>{errorMessages.subcategoryIcon!=null?errorMessages?.subcategoryIcon:<></>}</div>
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Avatar src={subcategoryIcon.fileName} variant="rounded" />

                </Grid>
                

            </Grid>
            </div>
        )
    }















const[oldImage,setoldImage]=useState('')
const[hideUpload,sethideUpload]=useState(false)
const[subcategoryId,setsubcategoryId]=useState()
const[open,setopen]=useState(false)
const handleDialog=(rowData)=>{
    setsubcategoryId(rowData.subcategoryid)
    setcategoryid(rowData.categoryid)
    setsubcategoryName(rowData.subcategoryname)
    setsubcategoryIcon({bytes:'',fileName:`${serverURL}/images/${rowData.subcategoryicon}`})
    setoldImage(`${serverURL}/images/${rowData.subcategoryicon}`)
    setopen(true)
}
const handlecloseDialog=()=>{
setopen(false)
}

const handlecancelButton=()=>{
    setsubcategoryIcon({bytes:'',fileName:oldImage})
    sethideUpload(false)
    }
    


const showSaveCancel=()=>{
    return(<div>
        <Button onClick={handleEditIcon}>Save</Button>
        <Button onClick={handlecancelButton}>Cancel</Button>
    </div>)
}


const handleEditData = async () => {
    var err = validData()
        if (err === false) {
            setloadingStatus(true)
            var body ={'categoryid': categoryid,'subcategoryname':subcategoryName,'updated_at':currentDate(),'useradmin': 'Farzi',subcategoryid:subcategoryId}
            var result = await postData('subcategory/edit_subcategory',body)
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
        fetchAllSubcategory()
}

const handleDeleteSubcategory=async()=>{
    setloadingStatus(true)
    var body ={'subcategoryid':subcategoryId}
    var result = await postData('subcategory/delete_subcategory',body)
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

setloadingStatus(false)
sethideUpload(false)
fetchAllSubcategory()

}
const subcategoryDelete = async () => {
    Swal.fire({
        title: "Do you want to delete the subcategory?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't delete`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          handleDeleteSubcategory()

        } else if (result.isDenied) {
          Swal.fire("Subcategory not deleted!", "", "info");
        }
      });
           
}
const handleEditIcon = async () => {
            setloadingStatus(true)
            var formData = new FormData()
            formData.append('subcategoryicon',subcategoryIcon.bytes)
            formData.append('updated_at',currentDate())
            formData.append('useradmin','Farzi')
            formData.append('subcategoryid',subcategoryId)

            var result = await postData('subcategory/edit_subcategory_icon',formData)
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
        
        setloadingStatus(false)
        sethideUpload(false)
        fetchAllSubcategory()
}
const showSubcategoryupdate=()=>{
    return(<div>
        <Dialog open={open}>
        <IconButton
          aria-label="close"
          onClick={handlecloseDialog}
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

        </DialogContent>
        {showSubcategoryForm()}
        <DialogActions>
          <LoadingButton
            loading={loadingStatus}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleEditData}
          >
            Edit Data
          </LoadingButton>
          <Button variant="contained" label="component" onClick={subcategoryDelete} >
            Delete
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>)
}













const [subcategoryList,setsubcategoryList]=useState([])
const fetchAllSubcategory=async()=>{
    var result= await getData('subcategory/display_subcategory')
    if(result.status){
        setsubcategoryList(result.data)
    }
    else{
        alert(result.message)
    }

}
useEffect(function(){
    fetchAllSubcategory() },[]
)


function subcategoryTable() {
    return (
        <div className={classes.main}>
            <div className={classes.displaybox}>
      <MaterialTable
        title="Subcategory List"
        columns={[
          { title: 'Subcategory ID', field: 'subcategoryid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Name', field: 'subcategoryname' },
          { title: 'Created', render:(rowData)=> <div style={{display:'flex',flexDirection:'column'}}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div>},
          { title: 'Admin', field: 'useradmin' },
          { title: 'Icon', render:(rowData)=> <div><img src={`${serverURL}/images/${rowData.subcategoryicon}`} style={{borderRadius:6,width:60,height:60}}/></div>},
        ]}
        data={subcategoryList}    
        options={{
            pageSize: 3,
            pageSizeOptions: [3, 5, 10, { value: subcategoryList.length, label: 'All' }]
          }}    
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit subcategory',
            onClick: (event, rowData) => handleDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/subcategory')
          }
        ]}
      />
   
    </div>
        </div>
         )
  }


  return(<div>
    {subcategoryTable()}
    {showSubcategoryupdate()}
  </div>)
}