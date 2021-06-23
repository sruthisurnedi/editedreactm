// import axios from "axios";
// import { useEffect,useState } from "react";
// function ViewProduct(){
//     let [productlist,setProductList]=useState([])
//     useEffect(()=>{
//      axios.get('/products/getproducts')
//      .then(res=>{
//          setProductList(res.data.message);
//      })
//      .catch(err=>console.log(err.message))
//     },[])
// }
// return(
//     // <div className="container">
//     //   <div className="row row-cols-1 row-cols-md-3 mt-5">
            
//     //           productlist.map(productObj=>{
//     //               return(
//     //               <div className="col mb-3">
//     //                  <div className="card bg-secondary shadow-lg text-light">
//     //                      <img src={productObj.productImg} width="100%" className="card-img-top" />
//     //                      <div className="card-body">
//     //                          <h5 className="card-title">Product Name: {productObj.productname}</h5>
//     //                          <p className="card-text">Model:{productObj.brand}</p> 
//     //                          <p className="card-text">Price:{productObj.price}</p>
//     //                          <a href="" className="btn btn-dark float-end">Add to Cart</a>  
                        
//     //                      </div>
//     //               )
//     //           })
//     //       }
//      // </div>



//    // </div>
// )

import { useEffect, useState } from "react";
import axios from 'axios'
import Item from "./Item";

export default function ViewProduct(){
    let[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/products/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
    },[])
    console.log(product)
    return(
        <div className="row m-2">
            {
                product.map((productObj,ind)=>{
                    return(
                        <div className="col col md-4 col-lg-4 mt-2 w-25">
                            <Item productObj={productObj} key={ind}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
