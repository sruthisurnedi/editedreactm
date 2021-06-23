import {useParams} from 'react-router-dom'

 export default function UserProfile(){
   // let location=useLocation();
    let url=useParams()
    console.log(url)
    //console.log("Location is",location)
    return(
        <div>
            
           {/* <h1>Welcome ,{location.state.username}</h1> */}
           <h1 className="text-light bg-success text-center p-6">Home Page</h1>
        </div>
    )
}
