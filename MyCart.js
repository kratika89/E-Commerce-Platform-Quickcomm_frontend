import { serverURL } from "../../../services/FetchAdmin"
import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import PlusMinusButton from "../homepage/PlusMinusButton"
export default function MyCart({refresh,setRefresh}) {
    const [overState,setoverState]=useState('#b5b5b5')
    const [value,setvalue]=useState(0)
    var dispatch=useDispatch()
    var cartData=useSelector((state)=>state.cart)
    var user=useSelector((state)=>state.user)
    var userData =Object.values(user) 
    var data =Object.values(cartData) 
    var keys =Object.keys(cartData) 
    var totalamount=data.reduce((f,s)=>{
        var ap=0
        if(s.offerprice>0){
            var ap=s.offerprice*s.qty
        }
        else{
            var ap=s.price*s.qty
        }
        return f+ap
    },0)
   
    const showAddress=()=>{
        
            return <div>
                <div style={{fontWeight:'bold',fontSize:18,marginBottom:5}}>Delivery Address</div>
                <div style={{fontWeight:550,fontSize:16,marginBottom:2}}>{userData[0].firstname} {userData[0].lastname} </div>
              <div>{userData[0].address}</div>
              <div>{userData[0].building},{userData[0].towerno},{userData[0].floorno}</div>
              <div>House No:{userData[0].houseno}</div>
              <div>{userData[0].state},{userData[0].city},{userData[0].pincode}</div>
            </div>
  
         
       
      }

    const handlePlus=()=>{
        var v=value
        v++
        setvalue(v)
    }
    const handleMinus=()=>{
        var v=value
        v--
        setvalue(v)
    }
    const handleChange=(value,item)=>{
        if(value==0)
        {
          dispatch({type:"DELETE_CART",payload:[item.productdetailid]})  
        }
        else
        {
        item['qty']=value
        dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})
        }
         setRefresh(!refresh)
       }
       
    // var data = [{ productdetailname: 'Maaza Mango Drink', weight: '1.2', weightType: 'L', packagingType: '1', noofqty: '1', stock: 5, price: 75.00, offerprice: 52.00, offertype: 'Festival', productstatus: 'Popular', picture: 'maaza1.webp' },
    //     {productdetailname: 'Maaza Mango Drink', weight: '1.2', weightType: 'L', packagingType: '1', noofqty: '1', stock: 5, price: 75.00, offerprice: 52.00, offertype: 'Festival', productstatus: 'Popular', picture: 'maaza1.webp'},
    //     { productdetailname: 'Maaza Mango Drink', weight: '1.2', weightType: 'L', packagingType: '1', noofqty: '1', stock: 5, price: 75.00, offerprice: 52.00, offertype: 'Festival', productstatus: 'Popular', picture: 'maaza1.webp' }
    // ]
    const showitem = () => {
        return data.map((item) => {
            return <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
                
                <div>
                    <div style={{ paddingTop: 24, display: 'flex', flexDirection: 'column' ,borderBottom:'1px solid #e0e0e0'}}>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ padding: 4, width: 88, height: 80 }}>
                                <img src={`${serverURL}/images/${item.picture}`} style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    fontWeight: 550,
                                    textTransform: 'none',
                                    fontSize: 15,
                                    letterSpacing: -.07,
                                    lineHeight: 1.4285714286,
                                    color: '#595959'
                                }}>{item.productdetailname} {item.weight} {item.weightType}
                                </div>
                                 
                                    {item.offerprice>0?<><div>
                                <span style={{
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    letterSpacing: -.08,
                                    lineHeight: 1.5
                                }}>
                                   
                         <span>&#8377;</span>{item.offerprice*item.qty}</span><span style={{
                                    fontWeight: 550,
                                    textTransform: 'none',
                                    fontSize: 12,
                                    letterSpacing: -.06,
                                    lineHeight: 1.3333333333, color: '#b8b8b8', marginLeft: 6
                                }}><s><span>&#8377;</span>{item.price*item.qty}</s></span>
                                </div>
                                
                                
                                <div style={{ marginTop: 3 }}>
                                    <div style={{
                                        background: '#e5f7ee', color: '#03753c', width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2, textAlign: 'center', padding: 3, fontWeight: 700,
                                        fontSize: 12,
                                        letterSpacing: -0.06,
                                        lineHeight: 1.3333
                                    }}>You Save <span style={{ marginLeft: 4 }}>&#8377;</span> {(item.price - item.offerprice)*item.qty}</div>
                                </div></>:<>
                                <div>
                                <span style={{
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    letterSpacing: -.08,
                                    lineHeight: 1.5
                                }}>
                                   
                         <span>&#8377;</span>{item.price*item.qty}</span>
                                </div>
                                </>}
                                <div style={{ marginTop: 3 }}>
                                    <span style={{
                                        letterSpacing: -0.06,
                                        lineHeight: 1.3333, fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,.65)'
                                    }}>Sold By:</span>
                                    <span style={{
                                        letterSpacing: -0.06,
                                        lineHeight: 1.3333, fontSize: 12, fontWeight: 530, marginLeft: 4
                                    }}>Reliance Retail</span>
                                </div>
                                <div style={{ marginTop: 4 }}>
                                    <span style={{
                                        letterSpacing: -0.06,
                                        lineHeight: 1.3333, fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,.65)'
                                    }}>Size:</span>
                                    <span style={{
                                        letterSpacing: -0.06,
                                        lineHeight: 1.3333, fontSize: 12, fontWeight: 530, marginLeft: 4
                                    }}>{item.weight} {item.weightType}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 24, displaty: 'flex',marginBottom:16 }} >
                            <div style={{ float: 'right', lineHeight: 3, display: 'flex' ,justifyContent:'space-between'}}>
                            <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?item?.qty:0} onChange={(value)=>handleChange(value,item)}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <div>
            {userData?.length>0?<div style={{border:'0.5px solid #e2e2e2',borderRadius:20,padding:10,marginBottom:10}}>{showAddress()}

            </div>:<div></div>}
        <div style={{ border: '1px solid #e0e0e0', width: '100%', height: 'auto', marginRight: 15, borderRadius: 20 }}>
             <div style={{
                    paddingTop: 20, paddingBottom: 12,paddingLeft:20,paddingRight:20,
                    display: 'flex',justifyContent:'space-between',
                    width: '95%'
                }}>
                    <div>
                    <span style={{
                        fontWeight: 900,
                        textTransform: 'none',
                        fontSize: 16,
                        letterSpacing: -.48,
                        lineHeight: 1.25, color: 'black'
                    }}>Hyperlocal Basket</span><span style={{
                        paddingLeft: 5, fontWeight: 550,
                        textTransform: 'none',
                        fontSize: 14,
                        letterSpacing: -.07,
                        lineHeight: 1.4285714286, color: '#616161'
                    }}>(1)</span></div>

                    <span style={{
                         fontWeight: 900,
                        textTransform: 'none',
                        fontSize: 16,
                        letterSpacing: -.48,
                        lineHeight: 1.25
                    }}><span>&#8377;</span>{totalamount}</span>
                </div>
            {showitem()}
        </div></div>
    )
}