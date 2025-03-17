import axios from 'axios';
import React, { createContext, use, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';


export const cartContext = createContext();

export default function CartContextProvider( {children} ) {

  const {myToken} = useContext(authContext) 

  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [allProducts, setAllProducts] = useState([])

  function getUserCart() {
    axios.get('https://ecommerce.routemisr.com/api/v1/cart',{ 
    headers: {token: localStorage.getItem('tkn')}})
    .then((res) => {
      console.log(res.data);
      setAllProducts(res.data.data.products)
      setNumOfCartItems(res.data.numOfCartItems)
      setTotalCartPrice(res.data.data.totalCartPrice)
    }).catch((err) => {
      console.log(err);
      
    })
  }

  async function clearCart() {
    const res = await axios
					.delete("https://ecommerce.routemisr.com/api/v1/cart", {
						headers: { token: localStorage.getItem("tkn") },
					})
					.then((res) => {
						setTotalCartPrice(0);
						setAllProducts([]);
						setNumOfCartItems(0);
						return true;
					})
					.catch((err) => {
						console.log(err);
						return false;
					});
				return res;
  }

  async function deleteItem(id) {
    const res =await axios
					.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
						headers: { token: localStorage.getItem("tkn") },
					})
					.then((res) => {
						setTotalCartPrice(res.data.data.totalCartPrice);
						setAllProducts(res.data.data.products);
						setNumOfCartItems(res.data.numOfCartItems);
						return true;
					})
					.catch((err) => {
						console.log(err);
						return false;
					});
          return res
        
  }

  async function updateCount(id , newCount) {
    const booleanFlag = await axios.put(
						`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
						{
							count: newCount,
						},
						{ 
              headers: { token: localStorage.getItem("tkn") }
            },
					)
					.then((res) => {
						setTotalCartPrice(res.data.data.totalCartPrice);
            setAllProducts(res.data.data.products);
            setNumOfCartItems(res.data.numOfCartItems);
            return true;
					})
					.catch((err) => {
						console.log(err);
            return false;
					});
    
  }

  useEffect(() => {
    getUserCart()
  }, [myToken])
  

    async function addProductToCart(id){

        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {'productId': id},{
            headers: {token: localStorage.getItem('tkn')}
            
        });
        getUserCart();
            
        
        return data;
    }
    

  return (
    <cartContext.Provider value={ {addProductToCart,
    numOfCartItems,
    allProducts,
    totalCartPrice,
    updateCount,
    deleteItem,
    clearCart} }>

    {children}

    </cartContext.Provider>
  )
}
