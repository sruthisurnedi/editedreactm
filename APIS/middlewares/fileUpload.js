//import cloudinary based modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require('multer-storage-cloudinary')

//configure cloudinary
cloudinary.config({
    cloud_name:'dbrye76st',
    api_key:'569265671191379',
    api_secret:'WYd-XvqBfB89jI4wTNZFXke2mDI'
})

//configure multer storage -cloudinary
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"CDB21DX011",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage:clStorage})

module.exports=multerObj;