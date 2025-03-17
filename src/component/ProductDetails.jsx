import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { RotateLoader } from 'react-spinners'
import SAR from './SAR'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { cartContext } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {
 
const {addProductToCart} = useContext(cartContext)

const {id} = useParams()

async function addProduct(id){

    const res = await addProductToCart(id)

    if (res) {
        toast.success('Added Successfuly', {duration: 1500, position: 'top-center'})
    }
    else {
        toast.error('Error Occurred', {duration: 1500, position: 'top-center'})
    }
    

}

async function getAllProductDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

const {isLoading , data , isError} = useQuery({
      queryKey: ['getAllProductDetails'],
      queryFn : getAllProductDetails
    })

    

if (isLoading) {
        return <div className="flex w-full h-full absolute bg-white justify-center items-center">
                    <RotateLoader color="#22c55e" size={40} margin={20}/>
                </div>
    }

    if (isError) {
        return <Navigate to='/NotFound' />
    }


    return (
        <>
    <div className="container mx-auto my-8">
     
            <div className='flex justify-between items-center'>
                <div className='w-1/4'>
                    <img src={data.data.data.imageCover} alt="" className='' />
                </div>
                <div className='w-2/3'>
                    <h2 className='font-semibold mb-2'>{data.data.data.title}</h2>
                    <p className='font-semibold mb-3 text-sm text-slate-500'>{data.data.data.description}</p>
                    <p className='font-semibold text-sm mb-2'>{data.data.data.category.name}</p>
                    <div className='flex justify-between'>
                        <p className='font-semibold'><SAR price={data.data.data.price / 4} /></p>
                        <p><FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-500 mr-1"
                            />{data.data.data.ratingsAverage}</p>
                    </div>
                    <button onClick={() => addProduct(data.data.data.id)} className='text-white my-2 font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300 w-full'> + add to cart</button>
                </div>
            </div>
    </div>
  	</>
  )
}
