import { useState } from "react";
import { createContext,useContext } from "react";


const cartContext=createContext();

const CartContextProvider=({children})=>{
   const [cartProducts,setCartProducts]=useState([]);
  
   return <cartContext.Provider value={{cartProducts,setCartProducts}}>
    {children}
   </cartContext.Provider>


};
export const useCart=()=>useContext(cartContext);
export default CartContextProvider;