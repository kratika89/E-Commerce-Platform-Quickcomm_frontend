import { useState, useEffect } from "react"
import { FormHelperText, FormControl, Select, MenuItem, InputLabel, TextField, Button, Grid, Avatar } from "@mui/material"
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import MaterialTable from "@material-table/core"
import { userStylebrand } from "./Brandcss"
import CloseIcon from '@mui/icons-material/Close';
import { IconButton,Dialog, DialogActions, DialogContent } from "@mui/material"
import { postData, getData, currentDate, serverURL, createDate } from "../../../services/FetchAdmin"
import { useNavigate } from "react-router-dom";


export default function Diaplayallbrand(props) {
    const classes = userStylebrand()



    const [brandId, setbrandId] = useState('')
    const [brandName, setbrandName] = useState('')
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
    const [loadingStatus, setloadingStatus] = useState(false)
    const [brandIcon, setbrandIcon] = useState({ bytes: '', fileName: cart })
    const [categoryList, setcategoryList] = useState([])
    const [subcategoryList, setsubcategoryList] = useState([])
    const [errorMessages, seterrorMessages] = useState([])
    var navigate=useNavigate()
    const handleerrormessages = (label, message) => {
        var msg = errorMessages
        msg[label] = message
        seterrorMessages((prev) => ({ ...prev, ...msg }))
    }
    const validData = () => {
        var err = false
        if (categoryid.length === 0) {
            handleerrormessages('categoryid', 'Pls input Category id.')
            err = true
        }
        if (subcategoryid.length === 0) {
            handleerrormessages('subcategoryid', 'Pls input SubCategory id.')
            err = true
        }
        if (brandName.length === 0) {
            handleerrormessages('brandName', 'Pls input Brand Name.')
            err = true
        }
        // if(brandIcon.bytes.length===0){
        //     handleerrormessages('brandIcon','Pls select Brand Icon.')
        //     err=true
        // }
        return err
    }

    const fetchAllcategory = async () => {
        var result = await getData('category/displayall_category')
        setcategoryList(result.data)
    }
    useEffect(function () {
        fetchAllcategory()
    }, [])
    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handlesubcategory = (cid) => {
        setcategoryid(cid)
        fetchallsubcategory(cid)
    }
    const fetchallsubcategory = async (cid) => {
        var body = { categoryid: cid }
        var result = await postData('subcategory/getallsubcatby_catid', body)
        setsubcategoryList(result.data)

    }
    useEffect(function () {
        fetchallsubcategory()
    }, [])
    const fillSubcategory = () => {
        return subcategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


    const handleImage = (e) => {
        handleerrormessages('brandIcon', null)
        setbrandIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        sethideUploadbutton(true)

    }
    const brandForm = () => {
        return (
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
                        <img src={logo} className={classes.imgStyle} />
                        <div className={classes.headingStyle}>
                            Brand Register
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {/* ield label="Catrgory ID" fullWidth></TextField> */}
                    <FormControl fullWidth>
                        <InputLabel>Category Id</InputLabel>
                        <Select value={categoryid}
                            label="Category ID" onChange={(e) => handlesubcategory(e.target.value)}>
                            {fillCategory()}
                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle} >{errorMessages?.categoryid}</div> </FormHelperText>

                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    {/* <TextField label="Subcategory ID" fullWidth></TextField>  */}
                    <FormControl fullWidth>
                        <InputLabel>Subcategory Id</InputLabel>
                        <Select value={subcategoryid}
                            label="SubCategory ID" onChange={(e) => setsubcategoryid(e.target.value)}>

                            {fillSubcategory()}
                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle} >{errorMessages?.categoryid}</div> </FormHelperText>

                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Brand Name" value={brandName} onFocus={() => handleerrormessages('brandName', null)} error={errorMessages?.brandName} helperText={errorMessages?.brandName} onChange={(e) => setbrandName(e.target.value)} fullWidth></TextField>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {hideUploadbutton ? <div>{showSaveCancel()}</div> :
                            <Button variant="contained" component='label'>

                                Upload

                                <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                            </Button>
                        }
                        <div className={classes.errorMessageStyle}>{errorMessages.brandIcon != null ? errorMessages?.brandIcon : <></>}</div>
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Avatar src={brandIcon.fileName} variant="rounded" />
                </Grid>


            </Grid>
        )
    }












    const[oldImage,setoldImage]=useState('')
    const [hideUploadbutton, sethideUploadbutton] = useState(false)
    const [open, setopen] = useState(false)
    const [brandlist, setbrandlist] = useState([])
    const fetchallbrand = async () => {
        var result = await getData('brand/displayall_brand')
        if (result.status) {
            setbrandlist(result.data)
        }
        else {
            alert(result.message)
        }
    }
    useEffect(function () {
        fetchallbrand()
    }, [])
    const handleDialog = (rowData) => {
        setcategoryid(rowData.categoryid)
        fetchallsubcategory(rowData.categoryid)
        setsubcategoryid(rowData.subcategoryid)
        setbrandIcon({bytes:'',fileName:`${serverURL}/images/${rowData.brandicon}`})
        setbrandId(rowData.brandid)
        setbrandName(rowData.brandname)
        setoldImage(`${serverURL}/images/${rowData.brandicon}`)
        setopen(true)
    }
    const handleClosedialog = () => {
        setopen(false)
    }
    const showSaveCancel = () => {
        return (<div>
            <Button onClick={handleEditicon}>Save</Button>
            <Button onClick={handlecancelButton}>Cancel</Button>
        </div>
        )
    }
    const handlecancelButton = () => {
        setbrandIcon({bytes:'',fileName:oldImage})
        sethideUploadbutton(false) 
    }
    const handleEditicon = async () => {
        setloadingStatus(true)
        var formData = new FormData
        formData.append('brandicon', brandIcon.bytes)
        formData.append('updated_at', currentDate())
        formData.append('useradmin', 'Farzi')
        formData.append('brandid', brandId)
        var result = await postData('brand/edit_brandicon', formData)
        if (result.status) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true,
            });

        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Database Error",
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }
        setloadingStatus(false)
        sethideUploadbutton(false)
        fetchallbrand()
    }

    const handleEditdata = async () => {
        var err = validData()
        if (err === false) {
            setloadingStatus(true)
            var body = {
                'categoryid': categoryid, 'subcategoryid': subcategoryid, 'brandname': brandName,
                'updated_at': currentDate(), 'useradmin': 'Farzi', brandid: brandId
            }
            var result = await postData('brand/edit_brand', body)
            if (result.status) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                });

            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Database Error",
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });

                
            }
            setloadingStatus(false)
                fetchallbrand()
        }
    }
    const handleDeletebrand=async()=>{
        setloadingStatus(true)
        var body={brandid: brandId}
        var result = await postData('brand/delete_brand', body)
        if (result.status) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true,
            });

        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Database Error",
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });

            
        }
        setloadingStatus(false)
            fetchallbrand()
    
    }
    const handledeletedata = async () => {

        Swal.fire({
            title: "Do you want to delete the brand?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              handleDeletebrand()
    
            } else if (result.isDenied) {
              Swal.fire("Subcategory not deleted!", "", "info");
            }
          });
           
    }
        const showbrandDialog = () => {

            return (<div>
                <Dialog open={open}>
                <IconButton
          aria-label="close"
          onClick={handleClosedialog}
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
                        {brandForm()}
                    </DialogContent>
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
                        <Button variant="contained" label="component" onClick={handledeletedata}>
                            Delete
                        </Button>
                       
                    </DialogActions>
                </Dialog>
            </div>)
        }

        function brandTable() {
            return (
                <div className={classes.root}>
                    <div className={classes.displaybox}>
                        <MaterialTable
                            title="Brand List"
                            columns={[
                                { title: 'Brand Id', field: 'brandid' },
                                { title: 'Category Name', field: 'categoryname' },
                                { title: 'Subcategory Name', field: 'subcategoryname' },
                                { title: 'Brand Name', field: 'brandname' },
                                { title: 'Created', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }} ><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },

                                {
                                    title: 'Admin', field: 'useradmin'
                                },
                                { title: 'Icon', render: (rowData) => <div> <img src={`${serverURL}/images/${rowData.brandicon}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },
                            ]}
                            data={brandlist}
                            options={{
                                pageSize: 3,
                                pageSizeOptions: [3, 5, 10, { value: brandlist.length, label: 'All' }]
                            }}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Brand',
                                    onClick: (event, rowData) => handleDialog(rowData)
                                },
                                {
                                    icon: 'add',
                                    tooltip: 'Add User',
                                    isFreeAction: true,
                                    onClick: (event) => navigate('/dashboard/brand')
                                  }
                            ]}
                        />

                    </div>
                </div>
            )
        }

        return (<div>
            {brandTable()}
            {showbrandDialog()}
        </div>)
    }