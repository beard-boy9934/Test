const express=require("express");
const cors=require("cors")
require('./db/config');
const user=require("./db/user")
const Product=require("./db/Product")
const app=express();

app.use(express.json());
app.use(cors());
//Registration
app.post("/register",async (req,resp)=>{
    let users=new user(req.body);
    let result=await users.save();
    result=result.toObject();
    delete result.password
    resp.send(result);
});
//Login
app.post("/login",async (req,resp)=>{
if(req.body.password && req.body.email)
{
    let userd=await user.findOne(req.body).select("-password");
    if(userd)
    {
        resp.send(userd)
    }
    else{
        resp.send({result : "No User Found"})
    }
}
else{
    resp.send({result : "No User Found"})
}
});
//Add-Product
app.post("/add-product",async (req,resp)=>{
let product=new Product(req.body);
let result=await product.save();
resp.send(result)
});

//Product-List
app.get("/products",async(req,resp)=>{
    let products=await Product.find();
    if(products.length>0)
    {
        resp.send(products);
    }
    else
    {
        resp.send({result :"No product found"})
    }
});
// Product-Delete
app.delete("/product/:id",async(req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    resp.send(result);
});

//Update
app.get("/product/:id",async(req,resp)=>{
    const result=await Product.findOne({_id:req.params.id})
    if(result)
    {
    resp.send(result);
    }
    else
    {
        resp.send({result:"No record found"});
    }
})

//Update
app.put("/product/:id",async(req,resp)=>{
    let result=await Product.updateOne({_id:req.params.id},{$set:req.body});
    resp.send(result);
})

app.get("/search/:key",async(req,resp)=>{
    let result=await Product.find({
        $or:[
            {name :{$regex:req.params.key}},
            {price :{$regex:req.params.key}},
            {company :{$regex:req.params.key}},
            {category :{$regex:req.params.key}}
        ],
    });
    resp.send(result);
});
app.listen(5000);