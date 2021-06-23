import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import ViewProduct from './ViewProduct';


export default function UserProfile(){

    let params=useParams();
    let [userObj,setUserObj]=useState({})

    let history=useHistory();
    //console.log(history)

    useEffect(()=>{
        axios.get(`/user/getuser/${username}`)
        .then(res=>{
            userObj=res.data;
            setUserObj({...userObj.message})
        })

    },[])


    let username=params.username;
    console.log("userObj is",userObj)


    return(
        <div className="text-center">
            <h1 className="text-warning">Welcome , {username}</h1>
            <div className="text-white">

                <h2>{userObj.mail}</h2>
                <h2>{userObj.dob}</h2>
                <img src={userObj.profileImage} width="100px" alt="" />
                <ViewProduct />
            </div>

            
        </div>
    )
}




// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useHistory } from 'react-router';
//  export default function UserProfile(){
// //    // let location=useLocation();
// //     let params=useParams();
// //     useEffect(()=>{
// //         axios.get(`/users/getusers/${username}`)
// //     })
// //     let username=params.username;

// const history=useHistory();
// const logout=()=>{
//     localStorage.clear();
//     history.push(`/login`)
// }




//     //console.log(url)
//     //console.log("Location is",location)
//     return(
//         <div>
            
//            <h1>Welcome...You're loggin in</h1>
//            <button
//                className="bg-success"
//                onClick={logout}>Logout
//            </button>
//            <button>Logout</button>
//            {/* <h1 className="text-light bg-dark text-center">Welcome to your UserProfile</h1> */}
//         </div>
//     )
// }