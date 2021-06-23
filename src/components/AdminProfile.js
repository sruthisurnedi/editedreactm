import AddProduct from './AddProduct'
import ViewProduct from './ViewProduct'
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'

function AdminProfile() {
    return (
        <BrowserRouter>
        {/*buttons*/}
        <div className="d-block float-end mt-2 me-4">
         <button className="btn btn-dark">
             <Link className="nav-link text-light" to="/addproducts">Add Products</Link>
         </button>
         <button className="btn btn-dark ms-3">
             <Link className="nav-link text-light" to="/viewproducts">View Products</Link>
         </button>
        </div>
        <br></br>
        <Switch>
        <Route path="/addproducts">
           <AddProduct />
        </Route>
        <Route path="/viewproducts">
            <ViewProduct />
        </Route>
        {/* <Route path="/products">
            <Redirect to="/products/viewproducts" />
        </Route> */}
        </Switch>
        </BrowserRouter>
    )
}

export default AdminProfile;