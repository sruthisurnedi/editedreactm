export default function Items(props){
    let productObj=props.productObj;
    return(
        <div class="card shadow">
            <div class="card-body">
                {/* <img src={imgOne} class="w-25" /> */}
                <img src={productObj.profileImage} className="w-100" />
                <h4 className="text-dark">Name : {productObj.productname}</h4>
                <h4 className="text-dark">Price : {productObj.price}</h4>
                <h4 className="text-dark">Brand :{productObj.brand}</h4>
                <div class="d-flex float-end">
                    <button type="button" class="btn btn-sm btn-info">Buy</button>
                </div>
            </div>

        </div>
    )
}