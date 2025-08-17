import React, { useEffect, useState } from 'react'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useProduct } from '../ProductData/useProduct';
import { Link } from 'react-router-dom';

function HomePage({ isLight }) {
  const { fetchProducts, products, DeleteProducts } = useProduct()


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (pid) => {
    try {
      const result = await DeleteProducts(pid);
      if (result.success) {
        console.log(result.message);
      }
    }
    catch (error) {
      console.log("Error Message : ", error);
    }
  }

  return (
    <div>
      <h1 className='text-cyan-400 font-serif py-5 m-6 text-center text-4xl'>
        Current Products < RocketLaunchIcon />
      </h1>
      <div className='flex flex-wrap justify-center gap-6 px-4'>
        {products.map((Product, index) => (
          <div key={index} className={isLight ? 'bg-gray-100 w-80 text-black text-2xl p-4 rounded-lg shadow-md' 
            : 
            'bg-[#1f2937] w-80 text-white text-2xl p-4 rounded-lg shadow-md'
          }>
            <img
              src={Product.image}
              alt={Product.name}
              className='h-48 w-full  rounded'
            />
            <h2 className='font-serif mt-2'>{Product.name}</h2>
            <h3>${Product.price}</h3>
            <div className="pt-2 flex gap-2">
              <button className='bg-amber-300 rounded px-2 py-1 hover:bg-red-400'
                onClick={() => handleDelete(Product._id)}>
                <DeleteIcon className='text-zinc-600 ' />
              </button>
              <Link to={`/edit/${Product._id}`}>
                <button className='bg-amber-200 rounded px-2 py-1 hover:bg-blue-300'>
                  <EditNoteIcon className='text-zinc-600' />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default HomePage