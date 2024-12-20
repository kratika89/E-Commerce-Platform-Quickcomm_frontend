import { useState, useEffect } from "react"
import { getData, serverURL, createDate } from "../../../services/FetchNodeAdminServices"
import MaterialTable from "@material-table/core"
import { userStyle } from "./CategoryCss"
import { Dialog, DialogContent, DialogActions } from '@mui/material'
import { IconButton, Button, TextField, Grid, Avatar } from "@mui/material"
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save'
import Swal from "sweetalert2"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom"
import { postData, currentDate } from "../../../services/FetchNodeAdminServices"
export default function DisplayAllCategory() {
  const classes = userStyle()
  const [open, setOpen] = useState(false)
  const[hideUpload,sethideUpload]=useState(false)
  const[oldImage,setoldImage]=useState('')


  
  const [categoryId, setcategoryId] = useState('')
  const [categoryName, setcategoryName] = useState('')
  const [loadingStatus, setloadingStatus] = useState(false)
  const [categoryIcon, setcategoryIcon] = useState({ bytes: '', fileName: cart })
  const [errorMessages, seterrorMessages] = useState({})
  var navigate=useNavigate()
  const handleerrormessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    seterrorMessages((prev) => ({ ...prev, ...msg }))
  }
  const validateData = () => {
    var err = false
    if (categoryName.length === 0) {
      handleerrormessages('categoryName', 'Pls input Categoryname.')
      err = true
    }


    return err
  }


  const showSaveCancel=()=>{
    return(<div>
      <Button onClick={handleEditIcon}>Save</Button>
      <Button onClick={handleCancelbutton}>Cancel</Button>
    </div>)
  }
  const handleImage = (e) => {
    handleerrormessages('categoryIcon', '')
    setcategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
    
    sethideUpload(true)
  }

  const categoryForm = () => {
    return (


      <Grid container spacing={2} >
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
            <img src={logo} className={classes.imgStyle} />
            <div className={classes.headingStyle}>
              Category Register
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField value={categoryName} onFocus={() => handleerrormessages('categoryName', null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName} onChange={(e) => setcategoryName(e.target.value)} label="Category Name" fullWidth />

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {hideUpload?<div>{showSaveCancel()}</div>:
            <Button variant="contained" component='label' >
              Upload
              <input onChange={handleImage} hidden type="file" accept="image/*" multiple />

            </Button>
  }
            <div className={classes.errorMessageStyle}>{errorMessages?.categoryIcon != null ? errorMessages?.categoryIcon : <></>}</div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={categoryIcon.fileName} variant="rounded" />



        </Grid>

      </Grid>


    )
  }








  const handlecloseDialog = () => {
    setOpen(false)
  }
  const handleOpenDialog = (rowData) => {
    setcategoryName(rowData.categoryname)
    setcategoryId(rowData.categoryid)
    setcategoryIcon({bytes:'',fileName:`${serverURL}/images/${rowData.categoryicon}`})
    setoldImage(`${serverURL}/images/${rowData.categoryicon}`)
    setOpen(true)
  }
  const handleCancelbutton=()=>{
    setcategoryIcon({bytes:'',fileName:oldImage})
    sethideUpload(false)
  }
  const handleEditdata = async () => {
    var err = validateData()
    if (err === false) {
      setloadingStatus(true)
      var body = {
        'categoryname': categoryName
        , 'updated_date': currentDate(), 'user_admin': 'Farzi', categoryid: categoryId
      }
      var result = await postData('category/edit_category', body)
      if (result.status) {
        Swal.fire({
          position: 'top-right',
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      }
      else {
        Swal.fire({
          position: 'top-right',
          icon: "error",
          title: "Database Error",
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }
    }
    setloadingStatus(false)
    
    fetchAllCategory()

  }

   const categoryDelete=async()=>{
    setloadingStatus(true)
    var body={'categoryid':categoryId}
    
    var result=await postData('category/delete_category',body)
    if(result.status)
    {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
            toast:true
          });
          
       }
       else
       {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
            toast:true
          });
       }
       setloadingStatus(false)
      sethideUpload(false)
    
    fetchAllCategory()
   }

  const handleDeleteCategory=()=>{
    Swal.fire({
      title: "Do you want to delete category",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        categoryDelete()
      
      } else if (result.isDenied) {
        Swal.fire("Category not deleted.", "", "info");
      }
    });
  }

  const handleEditIcon=async()=>{
    
    setloadingStatus(true)
    var formData=new FormData()
    formData.append('categoryicon',categoryIcon.bytes)
    formData.append('updated_date',currentDate())
   formData.append('user_admin','Faazi')
   formData.append('categoryid',categoryId)
    
    var result=await postData('category/edit_category_icon',formData)
    if(result.status)
    {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
            toast:true
          });
          
       }
       else
       {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
            toast:true
          });
       }
       setloadingStatus(false)
      sethideUpload(false)
    
    fetchAllCategory()
    }

const showCategoryDialog = () => {
    return (<div>
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
        {categoryForm()}
        <DialogActions>
          <LoadingButton
            loading={loadingStatus}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleEditdata}
          >
            Edit Data
          </LoadingButton>
          <Button variant="contained" label="component" onClick={handleDeleteCategory} >
            Delete
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>)

  }

  




  
const [categoryList, setcategoryList] = useState([])
  const fetchAllCategory = async () => {
    var result = await getData('category/displayall_category')
    if (result.status) {
      setcategoryList(result.data)
    }
    else {
      alert(result.message)
    }
  }
  useEffect(function () {
    fetchAllCategory()
  }, [])


  function categoryTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="Category List"
            columns={[
              { title: 'Category ID', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname' },

              { title: 'Created', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{createDate(rowData.created_date)}</div><div>{createDate(rowData.updated_date)}</div></div> },
              { title: 'Admin', field: 'user_admin' },
              { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.categoryicon}`} style={{ borderRadius: 6, width: 60, height: 60 }} /></div> },
            ]}
            data={
              categoryList
            }
            options={{
              pageSize: 3,
              pageSizeOptions: [3, 5, 10, { value: categoryList.length, label: 'All' }]
            }}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
             
              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/category')
              }
           
            ]}
            
          />
        </div>
      </div>
    )
  }







  return (<div>
    {categoryTable()}
    {showCategoryDialog()}
  </div>)
}