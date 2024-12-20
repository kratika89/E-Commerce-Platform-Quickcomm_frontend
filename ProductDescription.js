import { CenterFocusStrong } from "@mui/icons-material";
import { postData, serverURL } from "../../../services/FetchAdmin";
import ReactWhatsapp from 'react-whatsapp';
import parse from "html-react-parser";
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function ProductDescription({ product,setProduct }) {
  const [productlist, setproductlist] = useState([]);
  const[productDetailid,setproductDetailid]=useState(product.productdetailid)
  const[color,setcolor]=useState('white')
  
  const location=useLocation()
  const fetchallproductbyid = async () => {
    var response = await postData(
      "userinterface/user_display_product_details_by_id",
      { productid: product?.productid }
    );
    setproductlist(response.data);
  };
  useEffect(() => {
    fetchallproductbyid();
  }, []);
  
  const showDetails = () => {
    var op = parseInt(
      ((product.price - product.offerprice) / product.price) * 100
    );
    return (
      <div
        style={{
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: 8, width: "100%" }}>
          <div
            style={{
              marginBottom: 8,
              display: "flex",
              justrtifyContent: "space-between",
            }}
          >
            <div
              style={{
                minHeight: 28,
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: -0.08,
                lineHeight: 1.5,
                display: "inline-flex",
                color: "#0c5273",
              }}
            >
              Maaza
            </div>
          </div>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: -0.09,
              lineHeight: 1.3333333333,
              color: "#141414",
            }}
          >
            {product.productdetailname} {product.weight} {product.weightType}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: 150,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <img
                src={`${serverURL}/images/${"rating icon.png"}`}
                style={{ width: 150, height: 40 }}
              />

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: -0.09,
                  lineHeight: 1.3333333333,
                  color: "#0c5273",
                }}
              >
                {" "}
                39192
              </div>
            </div>
            <div
              style={{
                width: "calc(100% - 150px)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ paddingRight: 10 }}>
                <img
                  src={`${serverURL}/images/${"heart.png"}`}
                  style={{ width: 35, height: 35, color: "#5d5d5d" }}
                />
              </div>
              <span>
              <a href={`https://api.whatsapp.com/send?text=${serverURL}${location.pathname}`}><ShareIcon  /></a>
              </span>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 16, width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginBottom: 8,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: 4,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginLeft: 4,
                    display: "flex",
                    fontWeight: 900,
                    fontSize: 24,
                    letteSpacing: -0.72,
                    lineHeight: 1,
                  }}
                >
                  <span>&#8377;</span>
                  {product.offerprice}
                </div>
                <div style={{ marginLeft: 16 }}>
                  <span
                    style={{
                      background: "#e5f7ee",
                      color: "#03753c",
                      width: 60,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 2,
                      textAlign: "center",
                      padding: 3,
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: -0.08,
                      lineHeight: 1.5,
                    }}
                  >
                    {op}%OFF
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: -0.08,
                  lineHeight: 1.5,
                  display: "flex",
                  color: "rgba(0,0,0,.65)",
                }}
              >
                M.R.P:{" "}
                <s>
                  <span style={{ marginLeft: 4 }}>&#8377;</span>
                  {product.price}
                </s>
                <span style={{ marginLeft: 4 }}>(Incl. of all taxes)</span>
              </div>
            </div>
            <div
              style={{
                display: "block",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  paddingLeft: 8,
                  paddingTop: 4,
                  paddingRight: 8,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 24,
                  border: "1px solid #f5f5f5",
                }}
              >
                <img
                  src={`${serverURL}/images/${"pluxee.png"}`}
                  style={{ height: 15, width: 50 }}
                />
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: -0.06,
                  lineHeight: 1.3333333333,
                  marginTop: 4,
                  color: "#b5b5b5",
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                T&C Apply
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleselectedProduct=(item)=>{
   setproductDetailid(item.productdetailid)
   setProduct(item)
  }
  const showsizes = () => {
    return productlist.map((item) => {
      var op = parseInt(((item.price - item.offerprice) / item.price) * 100);
      return (
        <div onClick={()=>handleselectedProduct(item)}
          style={{
            border: item.productdetailid==productDetailid?`1px solid blue`:`1px solid #e0e0e0`,
            height: 65,
            borderRadius: 22,
            marginBottom: 12,

          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "76%",
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <div
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                border:item.productdetailid==productDetailid?`1px solid blue`:`1px solid white`,
                marginRight: 20,
              }}
            ></div>
            <div
              style={{
                width: 48,
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                marginRight: 8,
                flex: "0 0 auto",
              }}
            >
              <img
                src={`${serverURL}/images/${item.picture}`}
                style={{
                  width: "100%",
                  maxHeight: 48,
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </div>

            <div
              style={{
                marginRight: 8,
                display: "flex",
                
                flexGrow: "1",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: -0.08,
                  lineHeight: 1.5,
                  color: "#141414",
                }}
              >
                Pack Of 1
              </div>
              <div style={{fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: -0.08,
                  lineHeight: 1.5,
                  color: "#141414",
                  marginLeft:8}}>
                    {item.weight}{item.weightType}

              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: "0 0 auto",
                marginLeft: 8,
                textAlign: "right",
                flexDirection: "column",
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <span
                  style={{
                    marginRight: 4,
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: -0.08,
                    lineHeight: 1.5,
                  }}
                >
                  <span>&#8377;</span>
                  {item.offerprice}{" "}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.4285714286,
                    color: "#b5b5b5",
                  }}
                >
                  <s>
                    <span>&#8377;</span>
                    {item.price}
                  </s>
                </span>
              </div>
              <div>
                <span
                  style={{
                    background: "#e5f7ee",
                    color: "#03753c",
                    width: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    textAlign: "center",
                    padding: 3,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: -0.06,
                    lineHeight: 1.3333,
                  }}
                >
                  {op}%OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const description = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {parse(product.productdetaildescription)}
      </div>
    );
  };
  return (
    <div>
      {showDetails()}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          paddingBottom: 24,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div
          style={{
            paddingBottom: 16,
            display: "flex",
            alignItems: "center",
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: -0.72,
            lineHeight: 1,
            color: "#141414",
          }}
        >
          Packsize
        </div>
        {showsizes()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          paddingBottom: 12,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        
       
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          paddingBottom: 24,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div
          style={{
            paddingBottom: 16,
            display: "flex",
            alignItems: "center",
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: -0.72,
            lineHeight: 1,
            color: "#141414",
            marginBottom: 8,
          }}
        >
          Offers(15)
        </div>
        <div
          style={{
            padding: 8,
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              marginRight: 8,
              width: 25,
              height: 25,
              dispaly: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={`${serverURL}/images/${"bank-offer-icon.png"}`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              flexGrow: "1",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.4285714286,
                color: "#141414",
              }}
            >
              BANK OFFERS
            </div>
            <div
              style={{
                display: "flex",
                flexGrow: "1",
                fontWeight: 550,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.4285714286,
                color: "rgba(0,0,0,.65)",
              }}
            >
              Get Flat Rs.75 instant cashback on using Mobikwik Wallet on
              JioMart
            </div>
            <div
              style={{
                fontWeight: 550,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.4285714286,
                color: "#b5b5b5",
              }}
            >
              15 Offers Available
            </div>
          </div>
          <div
            style={{
              marginLeft: 16,
              display: "flex",
              alignItems: "center",
              backgroundColor: "whute",
              color: "#0c5273",
            }}
          >
            <img
              src={`${serverURL}/images/${"chevron-right-icon.png"}`}
              style={{ padding: 12 }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid #e0e0e0",
              width: 80,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 16,
              color: "#0c5273",
              borderRadius: 25,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: -0.08,
              lineHeight: 1.5,
            }}
          >
            View All
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          paddingBottom: 16,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: -0.72,
            lineHeight: 1,
          }}
        >
          Deliver To
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: -0.08,
                lineHeight: 1.5,
                paddingRight: 8,
                color: "#141414",
              }}
            >
              400020
            </div>
            <div
              style={{
                fontWeight: 550,
                fontSize: 16,
                letterSpacing: -0.08,
                lineHeight: 1.5,
                color: "rgba(0,0,0,.65)",
              }}
            >
              Mumbai
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0c5273",
              backgroundColor: "white",
              padding: 16,
            }}
          >
            <img
              src={`${serverURL}/images/${"pencil.png"}`}
              style={{ width: 20, height: 20 }}
            />
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 4 }}>
          <div
            style={{
              paddingRight: 8,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: -0.08,
              lineHeight: 1.5,
              color: "#25ab21",
              borderRight: "2px solid #e0e0e0",
            }}
          >
            In Stock
          </div>
          <div
            style={{
              paddingRight: 40,
              paddingLeft: 8,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: -0.08,
              lineHeight: 1.5,
              color: "#141414",
            }}
          >
            Dilevery By Tomorrow
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          paddingBottom: 16,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: -0.72,
            lineHeight: 1,
          }}
        >
          Sold By
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 8,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: -0.09,
            lineHeight: 1.3333333333,
            color: "#0c5273",
          }}
        >
          Quickcomm
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          paddingBottom: 16,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {description()}
      </div>

      <div style={{ display: "flex", paddingTop: 16, marginBottom: 16 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: -0.08,
            lineHeight: 1.5,
            marginRight: 4,
            alignItems: "center",
            paddingTop: 22,
          }}
        >
          Article ID: 490001795
        </div>
        <div
          style={{
            textAlign: "left",
            minWidth: 48,
            justifyContent: "spaceBetween",
            padding: 16,
            color: "#0c5273",
            backgroundColor: "rgba(0,0,0,0)",
          }}
        >
          <img src={`${serverURL}/images/${"copy-desktop-icon.png"}`} />
        </div>
      </div>
    </div>
  );
}
