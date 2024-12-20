import { useEffect, useState } from "react"
import { userStyledetail } from "./Productdetailcss"
import { getData, createDate, serverURL, postData, currentDate } from "../../../services/FetchNodeAdminServices"
import MaterialTable from "@material-table/core"
import { Dialog, DialogActions, DialogContent, Button, IconButton } from "@mui/material"
import Swal from "sweetalert2"
import { LoadingButton } from "@mui/lab"
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, TextField, Avatar, FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";


export default function Displayallproductdetail(props) {
    const classes = userStyledetail()








    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
    const [brandid, setbrandid] = useState('')
    const [productid, setproductid] = useState('')
    const [productdetailname, setproductdetailname] = useState('')
    const [weight, setweight] = useState('')
    const [weighttype, setweighttype] = useState('')
    const [packagingtype, setpackagingtype] = useState('')
    const [noofQty, setnoofQty] = useState('')
    const [stock, setstock] = useState('')
    const [price, setprice] = useState('')
    const [offerprice, setofferprice] = useState('')
    const [offertype, setoffertype] = useState('')
    const [productstatus, setproductstatus] = useState('')
    const [picture, setpicture] = useState({ bytes: '', fileName: cart })
    const [loadingStatus, setloadingStatus] = useState(false)
    const [categoryList, setcategoryList] = useState([])
    const [subcategoryList, setsubcategoryList] = useState([])
    const [brandList, setbrandList] = useState([])
    const [productList, setproductList] = useState([])
    const [productdetaildescription, setproductdetaildescription] = useState('')
    const [errorMessages, seterrorMessages] = useState([])
    var navigate = useNavigate()
    const handleerrorMessages = (label, message) => {
        var msg = errorMessages
        msg[label] = message
        seterrorMessages((...prev) => ({ ...prev, ...msg }))
    }
    const validData = () => {
        var err = false
        if (categoryid.length === 0) {
            handleerrorMessages('categoryid', 'Pls select categoryid')
            err = true
        }
        if (subcategoryid.length === 0) {
            handleerrorMessages('subcategoryid', 'Pls select subcategoryid')
            err = true
        }
        if (brandid.length === 0) {
            handleerrorMessages('brandid', 'Pls select brandid')
            err = true
        }
        if (productid.length === 0) {
            handleerrorMessages('productid', 'Pls select productid')
            err = true
        }
        if (productdetailname.length === 0) {
            handleerrorMessages('productdetailname', 'Pls select name')
            err = true
        }
        if (weight.length === 0) {
            handleerrorMessages('weight', 'Pls input weight')
            err = true
        }
        if (weighttype.length === 0) {
            handleerrorMessages('weighttype', 'Pls select weightype')
            err = true
        }
        if (packagingtype.length === 0) {
            handleerrorMessages('packagingtype', 'Pls select type')
            err = true
        }
        if (noofQty.length === 0) {
            handleerrorMessages('noofQty', 'Pls select qunatity')
            err = true
        }
        if (stock.length === 0) {
            handleerrorMessages('stock', 'Pls input stock')
            err = true
        }
        if (price.length === 0) {
            handleerrorMessages('price', 'Pls input price')
            err = true
        }
        if (offerprice.length === 0) {
            handleerrorMessages('offerprice', 'Pls select categoryid')
            err = true
        }
        if (productstatus.length === 0) {
            handleerrorMessages('productstatus', 'Pls select some status')
            err = true
        }
        if (offertype.length === 0) {
            handleerrorMessages('offertype', 'Pls select type')
            err = true
        }
        if (productdetaildescription.length === 0) {
            handleerrorMessages('productdetaildescription', 'Pls input description')
            err = true
        }
        // if(picture.bytes.length===0){
        //     handleerrorMessages('picture','Pls select picture.')
        //     err=true
        // }
        return err
    }
    const fetchallcategory = async () => {
        var result = await getData('category/displayall_category')
        setcategoryList(result.data)
    }
    useEffect(function () {
        fetchallcategory()
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

    useEffect(() => {
        fetchallsubcategory();
    }, []);
    const fetchallsubcategory = async (cid) => {
        var body = { categoryid: cid }
        var result = await postData('subcategory/getallsubcatby_catid', body)
        setsubcategoryList(result.data)
    }

    const fillsubcategory = () => {
        return subcategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }
    const handlebrand = async (sid) => {
        setsubcategoryid(sid)
        fetchAllbrand(sid)
    }
    const fetchAllbrand = async (sid) => {
        var body = { subcategoryid: sid }
        var result = await postData('brand/getallbrandby_subcat', body)
        setbrandList(result.data)
    }
    useEffect(function () {
        fetchAllbrand()
    }, [])
    const fillbrand = () => {
        return brandList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }
    const handleproduct = async (bid) => {
        setbrandid(bid)
        fetchAllproduct(bid)
    }
    useEffect(function () {
        fetchAllproduct()
    }, [])
    const fetchAllproduct = async (bid) => {
        var body = { brandid: bid }
        var result = await postData('product/getallproductby_brand', body)
        setproductList(result.data)
    }
    const fillproduct = () => {
        return productList.map((item) => {
            return <MenuItem value={item.productid}>{item.productsname}</MenuItem>
        })
    }
    const handlepicture = (e) => {
        setpicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        sethideUpload(true)
    }
    const productdetailForm = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: 5 }}>
                        <img src={logo} className={classes.imgStyle} />
                        <div className={classes.headingStyle}>
                            Product Details Register
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Categoryid</InputLabel>
                        <Select label="Category ID" value={categoryid} onFocus={() => handleerrorMessages('categoryid', null)} error={errorMessages?.categoryid} onChange={(e) => handlesubcategory(e.target.value)}>
                            {fillCategory()}
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.categoryid}</FormHelperText>
                    </FormControl>


                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Subcategoryid</InputLabel>
                        <Select label="Subcategory ID" value={subcategoryid} onFocus={() => handleerrorMessages('subcategoryid', null)} error={errorMessages?.subcategoryid} onChange={(e) => handlebrand(e.target.value)}>

                            {fillsubcategory()}
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.categoryid}</FormHelperText>
                    </FormControl>


                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Brandid</InputLabel>
                        <Select label="Brand ID" onFocus={() => handleerrorMessages('brandid', null)} error={errorMessages?.brandid} value={brandid} onChange={(e) => handleproduct(e.target.value)}>
                            {fillbrand()}
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.brandid}</FormHelperText>
                    </FormControl>


                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Productid</InputLabel>
                        <Select label="Product ID" value={productid} onFocus={() => handleerrorMessages('productid', null)} error={errorMessages?.productid} onChange={(e) => setproductid(e.target.value)}>
                            {fillproduct()}
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.productid}</FormHelperText>
                    </FormControl>


                </Grid>
                <Grid item xs={8}>
                    <TextField label="Product Detail Name" value={productdetailname} onFocus={() => handleerrorMessages('productdetailname', null)} error={errorMessages?.productdetailname} helperText={errorMessages?.productdetailname} onChange={(e) => setproductdetailname(e.target.value)} fullWidth></TextField>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel>Product Status</InputLabel>
                        <Select label="Product Status" value={productstatus} onFocus={() => handleerrorMessages('productstatus', null)} error={errorMessages?.productstatus} helperText={errorMessages?.productstatus} onChange={(e) => setproductstatus(e.target.value)}>
                            <MenuItem value='Trending'>Trending</MenuItem>
                            <MenuItem value='Popular'>Popular</MenuItem>
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.productstatus}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="weight" value={weight} onFocus={() => handleerrorMessages('weight', null)} error={errorMessages?.weight} helperText={errorMessages?.weight} onChange={(e) => setweight(e.target.value)} fullWidth></TextField>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>WeightType</InputLabel>
                        <Select label="Weight Type" value={weighttype} onFocus={() => handleerrorMessages('weighttype', null)} error={errorMessages?.weighttype} onChange={(e) => setweighttype(e.target.value)}>
                            <MenuItem value='Gram'>Gram</MenuItem>
                            <MenuItem value='KilloGram'>KilloGram</MenuItem>
                            <MenuItem value='MilliGram'>MilliGram</MenuItem>
                            <MenuItem value='Litres'>Litres</MenuItem>
                            <MenuItem value='MilliLitres'>MilliLitres</MenuItem>
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.weighttype}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Packaging Type</InputLabel>
                        <Select label="Packaging Type" value={packagingtype} onFocus={() => handleerrorMessages('packagingtype', null)} error={errorMessages?.packagingtype} onChange={(e) => setpackagingtype(e.target.value)}>
                            <MenuItem value='Bottle'>Bottle</MenuItem>
                            <MenuItem value='Box'>Box</MenuItem>
                            <MenuItem value='Mini Box'>Mini Box</MenuItem>
                            <MenuItem value='Tube'>Tube</MenuItem>
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.packagingtype}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Number Of Quantity" value={noofQty} onFocus={() => handleerrorMessages('noofQty', null)} error={errorMessages?.noofQty} helperText={errorMessages?.noofQty} onChange={(e) => setnoofQty(e.target.value)} fullWidth></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Stock" value={stock} onFocus={() => handleerrorMessages('stock', null)} error={errorMessages?.stock} helperText={errorMessages?.stock} onChange={(e) => setstock(e.target.value)} fullWidth></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Price" value={price} onFocus={() => handleerrorMessages('price', null)} error={errorMessages?.price} helperText={errorMessages?.price} onChange={(e) => setprice(e.target.value)} fullWidth></TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Offer Price" value={offerprice} onFocus={() => handleerrorMessages('offerprice', null)} error={errorMessages?.offerprice} helperText={errorMessages?.offerprice} onChange={(e) => setofferprice(e.target.value)} fullWidth></TextField>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Offer Type</InputLabel>
                        <Select label="Offer Type" value={offertype} onFocus={() => handleerrorMessages('offertype', null)} error={errorMessages?.offertype} onChange={(e) => setoffertype(e.target.value)}>
                            <MenuItem value='Festive Sale'>Festive Sale</MenuItem>
                            <MenuItem value='Diwali Sale'>Diwali Sale</MenuItem>
                            <MenuItem value='15 August Sale'>15 August Sale</MenuItem>
                        </Select>
                        <FormHelperText className={classes.errorMessageStyle}>{errorMessages?.offertype}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    {/* <TextField label="Product Detail Description" value={productdetaildescription} onFocus={()=>handleerrorMessages('productdetaildescription',null)} error={errorMessages?.productdetaildescription} helperText={errorMessages?.productdetaildescription} onChange={(e)=>setproductdetaildescription(e.target.value)} fullWidth></TextField> */}
                    <ReactQuill placeholder="Product Description" modules={{
                        toolbar: {
                            container: [
                                [{ header: "1" }, { header: "2" }, { font: [] }],
                                [{ size: [] }],
                                ["bold", "italic", "underline", "strike", "blockquote"],
                                [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                    { indent: "-1" },
                                    { indent: "+1" },
                                ],
                                ["link", "image", "video"],
                                ["code-block"],
                                ["clean"],
                            ],
                        },
                        clipboard: {
                            matchVisual: false,
                        },
                    }}
                        formats={[
                            "header",
                            "font",
                            "size",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                            "list",
                            "bullet",
                            "indent",
                            "link",
                            "image",
                            "video",
                            "code-block",
                        ]} theme="snow" value={productdetaildescription} onChange={setproductdetaildescription} />
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {hideUpload ? <div>{showsavecancelbutton()}</div> :
                            <Button variant="contained" component="label" >
                                Upload
                                <input type="file" hidden accept="/image*" onChange={handlepicture} multiple />
                            </Button>
                        }
                        <div className={classes.errorMessageStyle}>{errorMessages.picture != null ? errorMessages?.picture : <></>}</div>
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Avatar src={picture.fileName} variant="rounded" />
                </Grid>



            </Grid>
        )
    }







    const [oldimage, setoldimage] = useState('')
    const [hideUpload, sethideUpload] = useState(false)
    const [productdetailid, setproductdetailid] = useState('')
    const [productdetailList, setproductdetailList] = useState([])
    const [open, setopen] = useState(false)
    const handleOpenDialog = (rowData) => {
        setcategoryid(rowData.categoryid)
        fetchallsubcategory(rowData.categoryid)
        setsubcategoryid(rowData.subcategoryid)
        fetchAllbrand(rowData.subcategoryid)
        setbrandid(rowData.brandid)
        fetchAllproduct(rowData.brandid)
        setproductid(rowData.productid)
        setproductdetailid(rowData.productdetailid)
        setproductdetailname(rowData.productdetailname)
        setweight(rowData.weight)
        setweighttype(rowData.weightType)
        setpackagingtype(rowData.packagingType)
        setnoofQty(rowData.noofqty)
        setstock(rowData.stock)
        setprice(rowData.price)
        setofferprice(rowData.offerprice)
        setoffertype(rowData.offertype)
        setproductstatus(rowData.productstatus)
        setproductdetaildescription(rowData.productdetaildescription)
        setpicture({ bytes: '', fileName: `${serverURL}/images/${rowData.picture}` })
        setoldimage(`${serverURL}/images/${rowData.picture}`)
        setopen(true)
    }
    const handleclosedialog = () => {

        setopen(false)
    }
    const showsavecancelbutton = () => {
        return (<div>
            <Button onClick={handleeditpicture}>Save</Button>
            <Button onClick={handlecancelButton}>Cancel</Button>
        </div>)
    }
    const handlecancelButton = () => {
        setpicture({ bytes: '', fileName: oldimage })
        sethideUpload(false)
    }
    const handledeleteproduct = async () => {
        setloadingStatus(true)
        var body = { productdetailid: productdetailid }
        var result = await postData('productdetail/delete_data', body)
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
        fetchallproductdetail()
    }
    const handledeleteproductd = () => {
        Swal.fire({
            title: "Do you want to delete the product details?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handledeleteproduct()

            } else if (result.isDenied) {
                Swal.fire("Product details not deleted!", "", "info");
            }
        });
    }
    const handleeditpicture = async () => {

        setloadingStatus(true)
        var formData = new FormData()

        formData.append('updated_at', currentDate())
        formData.append('user_admin', 'Farzi')
        formData.append('picture', picture.bytes)
        formData.append('productdetailid', productdetailid)
        var result = await postData('productdetail/edit_picture', formData)
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
        fetchallproductdetail()
    }

    const handleeditproductd = async () => {
        var err = validData()
        if (err === false) {
            setloadingStatus(true)
            var body = {
                'categoryid': categoryid, 'subcategoryid': subcategoryid, 'brandid': brandid, 'productid': productid,
                'productdetailname': productdetailname,
                'weight': weight, 'weightType': weighttype, 'packagingType': packagingtype, 'noofqty': noofQty, 'stock': stock, 'price': price,
                'offerprice': offerprice, 'offertype': offertype, 'productstatus': productstatus, 'productdetaildescription': productdetaildescription,
                'updated_at': currentDate(), 'user_admin': 'Farzi', productdetailid: productdetailid
            }
            var result = await postData('productdetail/edit_productdetail', body)
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
        fetchallproductdetail()
    }
    const showproductddialog = () => {
        return (
            <div>
                <Dialog open={open} maxWidth="md">
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
                        {productdetailForm()}
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton
                            loading={loadingStatus}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={handleeditproductd}
                        >
                            Edit Data
                        </LoadingButton>
                        <Button variant="contained" label="component" onClick={handledeleteproductd}>
                            Delete
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const fetchallproductdetail = async () => {
        var result = await getData('productdetail/displayall_productd')
        if (result.status) {
            setproductdetailList(result.data)
        }
        else {
            alert(result.message)
        }
    }
    useEffect(function () {
        fetchallproductdetail()
    }, [])

    function productdetailtable() {
        return (
            <div className={classes.root}>
                <div className={classes.displaybox}>
                    <MaterialTable
                        title="Product Detail List"
                        columns={[
                            { title: 'Product Detail ID', field: 'productdetailid' },
                            { title: 'ID', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }} ><div>{rowData.categoryname}/</div><div>{rowData.subcategoryname}/</div><div>{rowData.brandname}/</div><div>{rowData.productname}</div></div> },
                            { title: 'Product Detail Name', field: 'productdetailname' },
                            { title: 'Weight', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{rowData.weight}</div><div>{rowData.weightType}</div></div> },
                            { title: 'Quantity and Type', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{rowData.packagingType}</div><div>{rowData.noofqty}</div></div> },
                            { title: 'Stock', field: 'stock' },
                            { title: 'Price/Status/Offer', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }} ><div><s>{rowData.price}</s></div><div>{rowData.offerprice}</div><div>{rowData.offertype}</div><div>{rowData.productstatus}</div></div> },

                            { title: 'Picture', render: (rowData) => <div> <img src={`${serverURL}/images/${rowData.picture}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },
                        ]}
                        data={productdetailList}
                        options={{
                            pageSize: 3,
                            pageSizeOptions: [3, 5, 10, { value: productdetailList.length, label: 'All' }]
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Brand',
                                onClick: (event, rowData) => handleOpenDialog(rowData)
                            },
                            {
                                icon: 'add',
                                tooltip: 'Add User',
                                isFreeAction: true,
                                onClick: (event) => navigate('/dashboard/productdetail')
                            }
                        ]}
                    />
                </div>
            </div>
        )
    }


    return (<div>
        {productdetailtable()}
        {showproductddialog()}
    </div>)
}