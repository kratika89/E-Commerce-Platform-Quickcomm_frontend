import { useState } from "react"
import Header from "../homepage/Header"
import MyCart from "./MyCart"
import PaymentDetails from "./PaymentDetails"
export default function Cart() {
    const[refresh,setRefresh]=useState(true) 
     return (
      
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div>
                <Header />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '82.6%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        marginTop: 24, marginBottom: 24, display: 'flex', fontWeight: 900,
                        textTransform: 'none',
                        fontSize: 24,
                        letterSpacing: -.72,
                        lineHeight: 1.1666666667
                    }}>
                        My Cart
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{
                            flexBasis: '65%',
                            maxWidth: '65%',
                            marginRight:15
                        }}>
                          <MyCart refresh={refresh} setRefresh={setRefresh} />
                        </div>
                        <div style={{flexBasis:'30%',maxWidth:'30%'}}>
                        <PaymentDetails refresh={refresh} setRefresh={setRefresh}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}