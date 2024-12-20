import AddButton from "./AddButton"
import { serverURL } from "../../../services/FetchAdmin"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch} from "react-redux";

export default function ProductDetailCategory({productdata,refresh,setrefresh}) {
    // var data = [{ productdetailname: 'Maaza Mango Drink', weight: '250', weightType: 'gm', packagingType: '1', noofqty: '1', stock: 5, price: 99, offerprice: 80, offertype: 'Festival', productstatus: 'Trending', picture: 'maazamango.webp' },
    // { productdetailname: 'Thums Up', weight: '250', weightType: 'gm', packagingType: '1', noofqty: '1', stock: 5, price: 99, offerprice: 80, offertype: 'Festival', productstatus: 'Trending', picture: 'thumbsup.webp' },
    // { productdetailname: 'Sprite', weight: '250', weightType: 'gm', packagingType: '1', noofqty: '1', stock: 5, price: 99, offerprice: 80, offertype: 'Festival', productstatus: 'Trending', picture: 'sprite.webp' },
    // { productdetailname: 'Maggi 2-Minute Masala Instant Noodles', weight: '250', weightType: 'gm', packagingType: '1', noofqty: '1', stock: 5, price: 99, offerprice: 80, offertype: 'Festival', productstatus: 'Trending', picture: 'maggi big.webp' },
    // { productdetailname: 'Maggi 2-Minute Masala Noodles ', weight: '250', weightType: 'gm', packagingType: '1', noofqty: '1', stock: 5, price: 99, offerprice: 80, offertype: 'Festival', productstatus: 'Trending', picture: 'maggi small.webp' },
    // { productdetailname: 'Britannia Nutri Choice Hi-Fibre Digestive Biscuits', weight: '250', weightType: 'gm', packagingType: '1', noofqty: '1', stock: 5, price: 99, offerprice: 80, offertype: 'Festival', productstatus: 'Trending', picture: 'britannianutri.webp' },
    // ]
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const md_matches = useMediaQuery(theme.breakpoints.up('md'));
    var cartData=useSelector((state)=>state?.cart)
    var keys=Object.keys(cartData)
    console.log("xxxx:",keys)
    var dispatch=useDispatch()
    const handleChangeQty=(value,item)=>{
        if(value==0){
            dispatch({type:"DELETE_CART",payload:[item.productdetailid]})

        }
        else{
    item['qty']=value
    dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})

    setrefresh(!refresh)}
    }
    const showcomponent = () => {
        return productdata.map((item) => {
            var op = parseInt(((item.price - item.offerprice) / item.price) * 100)
            return <div style={{
                marginTop: 16, flexBasis: matches?'33.33333333%':'46%',
                maxWidth: md_matches?'28.33333333%':'50%', paddingRight: 9, paddingLeft: 8, border: '1px solid #e0e0e0', borderRadius: 20, height: matches?480:430, marginLeft: 25
            }}>

                <div style={{ alignSelf: 'center', marginTop: 18 ,position:'relative'}}>
                     
                    <img src={`${serverURL}/images/${item.picture}`} style={{ width: '100%',position:'relative' }} />
                    <div >
                       <img src={`${serverURL}/images/${'heart.png'}`} style={{width:40,height:40,position:'absolute',zIndex:2,top:'0%',right:'0%'}}/>
                    </div>
                </div>
                <div>
                    <img src={`${serverURL}/images/smart-bazaar-tag.svg`} width="80"/>
                  </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div style={{
                        fontSize: 14.5, fontWeight: 600, width: '90%',
                        overflow: "hidden",
                        textOverflow: 'ellipsis',
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        webkitBoxOrient: "vertical",
                        letterSpacing: -0.07,
                        lineHeight: 1.4285714286,
                        color: 'rgba(0,0,0,.65) ',
                        margin: 4,
                    }}>
                        {item.productdetailname} {item.weight}{item.weightType}
                        {item.productdetailname.length <= 24 ? <div style={{ fontSize: 14, fontWeight: 550, letterSpacing: -0.07, lineHeight: 1.4285714286, }}>&nbsp;</div> : <></>}
                    </div>
                    <div style={{
                        flexDirection: 'row',
                        alignItems: 'center', display: 'flex', flexWrap: 'wrap',
                    }}>

                        <span style={{
                            marginBottom: 4, fontWeight: 900,
                            fontSize: 18,
                            letterSpacing: -0.48,
                            lineHeight: 1
                        }}>
                            <span>&#8377;</span> {item.offerprice}
                        </span>
                        <s style={{ color: '#b5b5b5' }}><span style={{
                            marginBottom: 4, fontWeight: 500,
                            fontSize: 12,
                            letterSpacing: -0.06,
                            marginLeft: 5,
                            lineHeight: 1.3333333333,
                            color: '#b5b5b5'
                        }}>
                            <span>&#8377;</span>{item.price}</span></s>
                        <span style={{ background: '#e5f7ee', margin: 4, color: '#03753c', width: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2, textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{op}%OFF</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 8, marginBottom: 8 }}>
                        <span style={{
                            fontWeight: 700,
                            fontSize: 16,
                            letterSpacing: -0.08,
                            lineHeight: 1.5,
                            color: '#0c5273'
                        }}>{item.weight}{item.weightType}</span>
                    </div>
                    <div style={{marginTop:5}}>
                   <AddButton qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid]?.qty:0} onChange={(value)=>handleChangeQty(value,item)} />
                    </div>
                </div>
            </div>
        })
    }
    return (
        <div style={{
            display: 'flex',
            flex: '0 1 auto',
            flexWrap: 'wrap',
            marginBottom: 80
        }}>
            {showcomponent()}
        </div>
    )
}