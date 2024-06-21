import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
const ProductList=()=>{
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts=async ()=>{
        let result=await fetch('http://localhost:5000/products');
        result=await result.json();
        setProducts(result);
    };
    const deleteProduct=async(id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE"
        });
        result=await result.json();
        if(result)
        {
        getProducts();
        }

    };
    const searchHandle=async(event)=>{
        let key=event.target.value;
        if(key)
        {
        let result=await fetch(`http://localhost:5000/search/${key}`);
        result=await result.json();
        if(result)
        setProducts(result)
        }
        else
        {
        getProducts()
        }
    }
    return (
        <div className="product-list">
        <h3>Product List</h3>
        <input className="search-box" type='text' placeholder="Search" onChange={searchHandle}></input>
        <ul>
            <li>S. No.</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
        {
            products.length>0?products.map((items,index)=>
        <ul>
            <li>{index+1}</li>
            <li>{items.name}</li>
            <li>{items.price}</li>
            <li>{items.category}</li>
            <li>{items.company}</li>
            <li>
            <button onClick={()=>deleteProduct(items._id)}>Delete</button>
            <Link to={"/update/"+items._id}>Update</Link>
            </li>
            
        </ul>
        )
        :<h1>No product Found!!</h1>
        }
        </div>
    )
}

export default ProductList