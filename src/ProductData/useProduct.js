import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem("token");

export const useProduct = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all fields." };
    }
    const token = localStorage.getItem("token"); // get fresh token

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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
    set({ loading: true });
    const res = await fetch(`${API_URL}/api/products`);
    try {
      const data = await res.json();
      set({ products: data.data, loading: false })

    } catch (error) {
      console.log("Error : ", error);
      set({ loading: false })
    }
  },
  DeleteProducts: async (pid) => {
    try {
      const token = localStorage.getItem("token"); // get fresh token

      const res = await fetch(`${API_URL}/api/products/${pid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // attach token
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        return { success: false, message: "Failed to delete product" };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "An error occurred" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    const token = localStorage.getItem("token"); 

    const res = await fetch(`${API_URL}/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
        
      },
      body: JSON.stringify(updatedProduct),
    }); 
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({
      products: state.products.map((product) => (product._id === pid ? data.data : product)),
    }))
  },
}))