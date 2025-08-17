import { create } from "zustand";

export const useProduct = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all fields." };
    }
    const res = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      return { success: false, message: "Server returned an error" };
    }

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  }
  ,
  fetchProducts: async () => {
    const res = await fetch(`/api/products`);
    try {
      const data = await res.json();
      set({ products: data.data })
    } catch (error) {
      console.log("Error : ", error);
    }
  },
  DeleteProducts: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        return { success: false, message: "Failed to delete product" };
      }
  
      // Update local state immediately
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
  
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "An error occurred" };
    }
  },  
  updateProduct: async (pid,updatedProduct)=>{
    const res=await fetch(`/api/products/${pid}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(updatedProduct),
    });
    const data=await res.json();
    if(!data.success) return {success : false , message: data.message}
    set((state)=>({
      products:state.products.map((product)=>(product._id === pid ? data.data : product)),
    }))
  },
}))