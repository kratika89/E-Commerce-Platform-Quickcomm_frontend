import Header from "../homepage/Header";
import PlusMinusButton from "../homepage/PlusMinusButton";
import ProductDescription from "./ProductDescription";
import ProductImageComponent from "./ProductImageComponent";
import ProductScroll from "../homepage/ProductScroll";
import { getData } from "../../../services/FetchAdmin"
import { postData } from "../../../services/FetchAdmin"
import { useState,useEffect} from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function ProductdetailsPage() {
 var location=useLocation()
 var p=location?.state?.product
    const[popularproductoffers,setpopularproductoffers]=useState([])
    const [product,setProduct]=useState(p)
    const dispatch=useDispatch()
    var cartData=useSelector((state)=>state?.cart)
    var keys=Object.keys(cartData)  
    const [refresh,setrefresh]=useState(true)
   
    console.log("LLOCATION:",location)
   
    const fetchallproductoffers=async(productstatus)=>{
        var result=await postData('userinterface/displayall_productdbystatus',{productstatus})
        setpopularproductoffers(result.data)   
    }


    useEffect(function(){
        
        fetchallproductoffers('Popular')
    },[])

    const handleChange=(value,item)=>{
        if(value==0){
            dispatch({type:"DELETE_CART",payload:[item.productdetailid]})

        }
        else{
    item['qty']=value
    dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})

    setrefresh(!refresh)}
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

            <div>
                <Header />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                <div style={{ width: '82.6%' }}>
                    <div style={{ height: 40, margin: 10 }}>

                    </div>
                    <div style={{
                        display: 'flex',
                        flex: '0 1 auto',
                        flexWrap: 'wrap', borderBottom: '8px solid #f5f5f5',marginBottom:24
                    }}>
                        <div style={{
                            flexBasis: '48%',
                            maxWidth: '50%',
                            marginBottom:24,paddingRight:8
                        }}>
                          <ProductImageComponent product={product}  setProduct={setProduct} />
                          <div style={{display:'flex',justifyContent:'center'}}>
                          <PlusMinusButton qty={keys.includes(product?.productdetailid+"")?cartData[product?.productdetailid]?.qty:0} onChange={(value)=>handleChange(value,product)}/>
                          </div></div>
                      <div style={{flexBasis: '50%',
                            maxWidth: '50%',paddingLeft:8}}>
                          <ProductDescription product={product} setProduct={setProduct} />
                      </div>
                    </div>
                    <div style={{ borderBottom: '8px solid #f5f5f5',paddingBottom:24,marginBottom:24}}>
                    <ProductScroll data={popularproductoffers} title={"Popular"}/></div>
                    <div style={{ borderBottom: '8px solid #f5f5f5',paddingBottom:24}}>
                    <ProductScroll data={popularproductoffers} title={"Popular"}/></div>
                </div>
                
            </div>
        </div>)
}