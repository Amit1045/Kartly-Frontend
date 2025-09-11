import React, { useEffect, useState } from 'react'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useProduct } from '../ProductData/useProduct';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


function HomePage({ isLight }) {
  const { fetchProducts, products, DeleteProducts } = useProduct();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts(); 
      setLoading(false);
    };
    loadProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setItems(products); // update draggable items whenever products change
  }, [products]);

  if (loading)
    return (
      <p
        className={
          isLight
            ? "text-center text-grey-500 text-5xl mt-[100px]"
            : "text-center text-white text-5xl mt-[100px]"
        }
      >
        Loading... <CircularProgress />
      </p>
    );

  const handleDelete = async (pid) => {
    try {
      const result = await DeleteProducts(pid);
      if (result.success) {
        console.log(result.message);
      }
    } catch (error) {
      console.log("Error Message : ", error);
    }
  };

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setItems(reordered);
  };

  return (
    <div>
      <h1 className="text-cyan-400 font-serif py-5 m-6 text-center text-4xl">
        Current Products <RocketLaunchIcon />
      </h1>

      <marquee
        behaviour="alternate"
        direction="right"
        scrollamount="20"
      >
        <p
          className={
            isLight
              ? "w-80 text-black text-2xl p-4 rounded-lg shadow-md"
              : "w-80 text-white text-2xl p-4 rounded-lg shadow-md"
          }
        >
          Flat <span className="text-orange-300 font-bold">20%Off</span> On Every Product Today
        </p>
      </marquee>

      {/* DragDrop wrapper */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="products" direction="horizontal">
          {(provided) => (
            <div
              className="flex flex-wrap justify-center gap-6 px-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((Product, index) => (
                <Draggable
                  key={Product._id}
                  draggableId={Product._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={
                        isLight
                          ? "bg-gray-100 w-80 text-black text-2xl p-4 rounded-lg shadow-md"
                          : "bg-[#1f2937] w-80 text-white text-2xl p-4 rounded-lg shadow-md"
                      }
                    >
                      <img
                        src={Product.image}
                        alt={Product.name}
                        className="h-48 w-full rounded"
                      />
                      <h2 className="font-serif mt-2">{Product.name}</h2>
                      <h3>${Product.price}</h3>
                      <div className="pt-2 flex gap-2">
                        <button
                          title="Delete"
                          className="bg-amber-300 rounded px-2 py-1 hover:bg-red-400"
                          onClick={() => handleDelete(Product._id)}
                        >
                          <DeleteIcon className="text-zinc-600 " />
                        </button>
                        <Link to={`/edit/${Product._id}`}>
                          <button
                            title="Edit"
                            className="bg-amber-200 rounded px-2 py-1 hover:bg-blue-300"
                          >
                            <EditNoteIcon className="text-zinc-600" />
                          </button>
                        </Link>
                        <Link to={`/buy/${Product._id}`}>
                          <button
                            title="Buy"
                            className="bg-amber-200 rounded text-zinc-600 px-2 py-1 hover:bg-red-400 hover:text-white"
                          >
                            <LocalMallIcon className="text-red-600" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default HomePage;
