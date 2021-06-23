import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'

export default function Register(){
    let {register,handleSubmit,formState:{errors}}=useForm();
    const[file,setFile]=useState(null)
    let history=useHistory();
    //console.log(history)

    const onFormSubmit=(productObj)=>{
        //create formdata
        let formData=new FormData();
        //add image to FormData obj
        formData.append('pic',file,file.name)
        //add userobj to formdata
        formData.append("productObj",JSON.stringify(productObj))
        //pass it to userApi  by making http post request
        axios.post('/products/createproduct',formData)
        .then(res=>{
            console.log(res.data)
            alert(res.data.message)

            history.push('/viewproducts')
        })
        
    }
    //when file is selected
    const onFileSelect=(event)=>{
        setFile(event.target.files[0])
    }

    return(
        <div>
            <h1 className="text-center text-warning mt-4">Add your Product</h1>
            <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
            {/* productname */}
            <label htmlFor="pr" className="mt-5">Product Name</label>
            <input type="text" id="pr" {...register('productname',{required:true,minLength:5})} className="form-control mb-3" />
            {/*username validation */}
            {errors.productname?.type=== 'required' && <p className="text-danger">*Product name is required</p>}
            {/* {errors.product?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>} */}


            {/* Brand */}
            <label htmlFor="brand">Brand</label>
            <input type="text" id="brand" {...register('brand',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.brand && <p className="text-danger">*Brand name is required</p>}

            {/* price*/}
            <label htmlFor="price">Price</label>
            <input type="number" id="price" {...register('price',{required:true})} className="form-control mb-3" />
            {/*price validation */}
            {errors.price && <p className="text-danger">*Enter the price</p>}

            <input type="file" name="pic" className="form-control mb-3" onChange={(e=>onFileSelect(e))}/>
        

            <button type="submit" className="btn btn-success">Add</button>
        </form>
        </div>
    )
}