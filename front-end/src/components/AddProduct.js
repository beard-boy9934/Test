import React from "react";
import {useNavigate} from 'react-router-dom'
const AddProduct=()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError]=React.useState(false);
    const navigate=useNavigate();
    const addProduct=async()=>{
    
    if(!name || !price || !company || !category)
    {
        setError(true);
        return false;
    }
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    let result=await fetch('http://localhost:5000/add-product', {method:'post',
         body:JSON.stringify({name,price,category,company,userId}),
         headers:{'Content-Type':'application/json'},

        });
        result=await result.json();
        navigate('/')
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Product Name" className="inputBox" onChange={(e)=>{setName(e.target.value)}} value={name}></input>
            {
                error && !name && <span className="invalid-input">Enter valid-name</span>
            }
            <input type="text" placeholder="Enter Product Price" className="inputBox" onChange={(e)=>{setPrice(e.target.value)}} value={price}></input>
            {
                error && !price && <span className="invalid-input">Enter valid price</span>
            }
            <input type="text" placeholder="Enter Product Category" className="inputBox" onChange={(e)=>{setCategory(e.target.value)}} value={category}></input>
            {
                error && !category && <span className="invalid-input">Enter valid category</span>
            }
            <input type="text" placeholder="Enter Product Company" className="inputBox" onChange={(e)=>{setCompany(e.target.value)}} value={company}></input>
            {
                error && !company && <span className="invalid-input">Enter valid company</span>
            }
            <button onClick={addProduct} className="appbutton" type="button">Add</button>
        </div>
    )
}

export default AddProduct