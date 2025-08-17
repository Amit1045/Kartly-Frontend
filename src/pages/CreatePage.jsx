import React from "react";
import { useState } from "react";
import { useProduct } from "../ProductData/useProduct";
import { useNavigate } from 'react-router-dom';

function CreatePage({isLight}) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  const navigate =useNavigate()
  const { createProduct} = useProduct()
  const handleAddProduct = async () => {
    try {
      const result = await createProduct(newProduct);
      if (result.success) {
        // alert("Product created Successful !!")
        navigate('/')
        
      }
    }
    catch (error) {
      console.log("Error Message : ", error);
    }

  }
  return (
    <div className=" min-h-3/4 flex items-center justify-center mt-[100px] ">
      <div className={isLight ? "bg-gray-50 p-8 w-full max-w-md shadow-[20px_20px_50px_grey]  rounded-lg":"bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"}>
        <h2 className={isLight?"text-3xl font-bold text-center text-black mb-6":"text-3xl font-bold text-center text-white mb-6"}>
          Create New Product
        </h2>
        <div className="space-y-4">
          <input
            className={isLight ? "w-full p-3 rounded-md bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
              :"w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"}
            type="text"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            className={isLight ? "w-full p-3 rounded-md bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
            :"w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"}
            type="number"
            placeholder="Product Price"
            name="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Product URL"
            name="imgUrl"
            className={isLight ? "w-full p-3 rounded-md bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
            :"w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"}
            value={newProduct.imgUrl}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
         
            <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
              onClick={handleAddProduct}>Add Product
            </button>
        

        </div>
      </div>
    </div>
  );
}

export default CreatePage;
