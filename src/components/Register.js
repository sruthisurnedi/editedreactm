import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'

export default function Register(){
    let {register,handleSubmit,formState:{errors}}=useForm();
    const[file,setFile]=useState(null)
    let history=useHistory();
    //console.log(history)

    const onFormSubmit=(userObj)=>{
        //create formdata
        let formData=new FormData;
        //add image to FormData obj
        formData.append('photo',file,file.name)
        //add userobj to formdata
        formData.append("userObj",JSON.stringify(userObj))
        //pass it to userApi  by making http post request
        axios.post('/user/createuser',formData)
        .then(res=>{
            console.log(res.data)
            alert(res.data.message)

            history.push('/login')
        })
        
    }
    //when file is selected
    const onFileSelect=(event)=>{
        setFile(event.target.files[0])
    }

    return(
        <div>
            <h1 className="text-center text-warning mt-4">Register Here..</h1>
            <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
            {/* username */}
            <label htmlFor="un" className="mt-5">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:5})} className="form-control mb-3" />
            {/*username validation */}
            {errors.username?.type=== 'required' && <p className="text-danger">*Username is required</p>}
            {errors.username?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}


            {/* password */}
            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.password && <p className="text-danger">*Password is required</p>}

            {/* email */}
            <label htmlFor="e">Email</label>
            <input type="mail" id="e" {...register('mail',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.mail && <p className="text-danger">*Enter email</p>}


            {/* Date of birth */}
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" {...register('dob',{required:true})} className="form-control mb-3" />
            {/* dob validation */}
            {errors.dob && <p className="text-danger">*Give Date of Birth</p>}

            <input type="file" name="photo" className="form-control mb-3" onChange={(e=>onFileSelect(e))}/>
        

            <button type="submit" className="btn btn-success">Register</button>
        </form>
        </div>
    )
}

// import {useForm} from 'react-hook-form'

// export default function FormHook(){
//     let{register,handleSubmit,formState:{errors}}=useForm();
//     const onFormSubmit=(userObj)=>{
//         console.log(userObj)
//     }
//     return(
//         <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(onFormSubmit)}>
//          {/*username*/}
//         <label htmlFor="un">Username</label>
//         <input type="text" id="un" {...register('username',{required:true,minLength:4})} className="form-control mb-3"/>
//         {errors.username?.type==='required' && <p className="text-danger">*Username is required</p>}
//         {errors.username?.type==='minlength' && <p className="text-danger">*Min-length should be 3</p>}
//         {/*password*/}
//         <label htmlFor="pw">password</label>
//         <input type="password" id="pw" {...register('password',{required:true})} className="form-control mb-3"/>
//         {errors.password?.type==='required' && <p className="text-danger">*Password is required</p>}
//         {errors.password?.type==='minlength' && <p className="text-anger">*Min-length should be 3</p>}
//         {/*E-mail*/}
//         <label htmlFor="e-mail">E-mail</label>
//         <input type="email" id="city" {...register('email',{required:true})} className="form-control mb-3"/>
        
//         <label htmlFor="numberid" className="form-label">Date Of Birth</label>
//        <input type="date" id="numberid" className="form-control"/>
        
//         <button type="submit" className="btn btn-success d-block mx-auto mt-4">Register</button>
        
        
//         </form>
//     )
// }

// import {useForm} from "react-hook-form"
// import axios from 'axios'
// import { useHistory } from "react-router";



// function Register(){
//     let {register,handleSubmit,formState:{errors}}=useForm();
//     let history=useHistory();
//     const onFormSubmit=(userObj)=>{
//         //pass it to user api by making http post req
//         axios.post('/users/createusers',userObj)
//         .then(res=>alert(res.data.message))
//         .catch(err=>console.log(err))        
//         console.log(userObj)       
//     }

//     return(
//         <form className="Form w-75 mx-auto mt-5 p-3 shadow shadow-lg bg-dark text-light border border-3" onSubmit={handleSubmit(onFormSubmit)} >
           
//             {/* username */}
//             <label htmlFor="un">username</label>
//             <input type="text" id="un" {...register('username',{required:true,minLength:5})} className="form-control mb-3 " />
//             {errors.username?.type==='required' && <p className="text-danger">*username is required</p>}
//             {errors.username?.type==='minLength' && <p className="text-danger">*minLength is 5</p>}
             
//             {/* password */}
//             <label htmlFor="pw">password</label>
//             <input type="password" id="pw" {...register('password',{required:true,minLength:8})} className="form-control mb-3"/>
//             {errors.password?.type==='required' && <p className="text-danger">*password is required</p>}
//             {errors.password?.type==='minLength' && <p className="text-danger">*minLength is 8</p>}
      
             
//             {/* emial */}
//             <label htmlFor="em">email</label>
//             <input type="email" id="em" {...register('email',{required:true})} className="form-control mb-3"/>
//             {errors.email && <p className="text-danger">*email is required</p>}

//         <label htmlFor="dob"className="form-label">DOB</label>
//         <input type="date" id="dob" {...register('dob',{required:true})} className="form-control mb-3"/>
//         {errors.username?.type==='required' && <p className="text-danger">*Dob is required</p>}
//         {/* {errors.username?.type==='minlength' && <p className="text-anger">*Should be above 18</p>} */}

//         {/* <label htmlFor="numberid" className="form-label">Date Of Birth</label>
//        <input type="date" id="numberid" className="form-control"/> */}
      
//             <button type="submit" className="btn btn-success mt-3" >Register</button>
//             {/* <button type="reset" className="btn btn-warning mt-3 ms-3"onClick={()=>window.location.reload()}>reset</button> */}
//         </form>
    
//     )




// } 
// export default Register;