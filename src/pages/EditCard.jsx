import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../ProductData/useProduct";

function EditPage({isLight}) {
  const { id } = useParams(); // URL param: /edit/:id
  const navigate = useNavigate();

  const { products, updateProduct } = useProduct();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Prefill form from existing product in state
  useEffect(() => {
    const existingProduct = products.find((p) => p._id === id);
    if (existingProduct) {
      setProduct({
        name: existingProduct.name,
        price: existingProduct.price,
        image: existingProduct.image,
      });
    }
  }, [id, products]);

  const handleUpdate = async () => {
    try {
      const result = await updateProduct(id, product);
      if (result?.success === false) {
        console.log("Update failed:", result.message);
      } else {
        navigate("/home"); // after update, redirect to home/products page
      }
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (

    <div className=" min-h-3/4 flex items-center justify-center mt-[100px] ">
    <div className={isLight ? "bg-gray-50 p-8 w-full max-w-md shadow-[20px_20px_50px_grey]  rounded-lg":"bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"}>
      <h2 className={isLight?"text-3xl font-bold text-center text-black mb-6":"text-3xl font-bold text-center text-white mb-6"}>
      Update Product
      </h2>
      <div className="space-y-4">
        <input
          className={isLight ? "w-full p-3 rounded-md bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
            :"w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"}
          type="text"
          placeholder="Product Name"
          name="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        <input
          className={isLight ? "w-full p-3 rounded-md bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
          :"w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"}
          type="number"
          placeholder="Product Price"
          name="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product URL"
          name="imgUrl"
          className={isLight ? "w-full p-3 rounded-md bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
          :"w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"}
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
           onClick={handleUpdate}
           >Update Product
          </button>
      </div>
    </div>
  </div>
  );
}

export default EditPage;
