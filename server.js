// //create express app
// const exp=require('express')
// const app=exp()
// const path=require("path")

// //connect frontend and backend
// app.use(exp.static(path.join(__dirname,'./build')))
// //import apis
// const userApi=require("./APIS/user-api")

// //evaluate path to execute specific api
// app.use("/users",userApi)
// app.get('/*', (req, res)=> {
//     res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//     })
//   })


// const port=3000;
// app.listen(port,()=>console.log(`server is running on port ${port}...`))

//creating express app
const exp=require('express')
const app=exp();
const path = require("path");


//connect front end backend
app.use(exp.static(path.join(__dirname, './build/')))

//import apis
const userApi=require("./APIS/user-api")
const productApi = require('./APIS/products-api');
const adminApi=require('./APIS/admin-api')

//evaluate path to execute specific api
app.use("/user",userApi)
app.use("/products",productApi)
app.use("/admin",adminApi)

//const productApi=require("./APIS/product-api")
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
        if (err) {
              res.status(500).send(err)
        }
    })
})
//get mongo client object
const mc=require("mongodb").MongoClient;
//database url
//const databaseUrl="mongodb+srv://cdb21dx011:cdb21dx011@srucluster.kyeqr.mongodb.net/cdb21dx011db?retryWrites=true&w=majority"
//const databaseUrl="mongodb://cdb21dx011:cdb21dx011@srucluster-shard-00-00.kyeqr.mongodb.net:27017,srucluster-shard-00-01.kyeqr.mongodb.net:27017,srucluster-shard-00-02.kyeqr.mongodb.net:27017/cdb21dx011db?ssl=true&replicaSet=atlas-9vs8m1-shard-0&authSource=admin&retryWrites=true&w=majority"
const databaseUrl="mongodb+srv://cdb21dx011:cdb21dx011@srucluster.kyeqr.mongodb.net/cdb21dx011db?retryWrites=true&w=majority"
//connect to db
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    
    if(err){
        console.log("err in db connection",err)
    }
    else{
        //get database object
        databaseObj=client.db("cdb21dx011db")
        let productCollectionObj=databaseObj.collection("productcollection")
        let userCollectionObj=databaseObj.collection("usercollection")
        let adminCollectionObj=databaseObj.collection("admincollection")
        //saving collection to api
        app.set("productCollectionObj",productCollectionObj)
        app.set("userCollectionObj",userCollectionObj)
        app.set("adminCollectionObj",adminCollectionObj)

        console.log("database connected")
    }
})
//handling unavailble paths
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is not matched`})
})

//error handling middleware(for syntax errors)
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})


//app.use("/products",productApi)

//assign port
const port=8080;
app.listen(port,()=>console.log(`server running on port ${port} `))