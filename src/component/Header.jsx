import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { authContext } from '../context/AuthContext'



export default function Header() {

    const {myToken , setToken} = useContext(authContext)
    const navigate = useNavigate()


    function logOut (){
        setToken(null);
        localStorage.removeItem('tkn')

        navigate('/Login')
    }

    return (
        <div className='bg-gray-200 py-3 mb-6'>
            <div className="container mx-auto">

                <nav className="flex justify-between items-center">
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faCartShopping} className='pr-2 text-3xl text-green-600' />
                        <ul className="flex">
                            <li className='px-2 hover:text-slate-400 duration-300 text-slate-600 font-semibold'>
                                <Link to="/Home">
                                    Home
                                </Link>
                            </li>
                            <li className='px-2 hover:text-slate-400 duration-300 text-slate-600 font-semibold'>
                                <Link to="/Cart">
                                    Cart
                                </Link>
                            </li>
                            <li className='px-2 hover:text-slate-400 duration-300 text-slate-600 font-semibold'>
                                <Link to="/Categories">
                                    Categorie
                                </Link>
                            </li>
                            <li className='px-2 hover:text-slate-400 duration-300 text-slate-600 font-semibold'>
                                <Link to="/Brands">
                                    Brands
                                </Link>
                            </li>
                        </ul>
                    </div>

                        
                    <ul className='flex'>
                            {myToken ? <li>
                            <span role='button' onClick={logOut} className='pl-2 text-white font-semibold border rounded-md bg-green-600 p-2 mx-1 hover:bg-green-400 duration-300'>LogOut</span>
                        </li> : <> <li>
                            <Link to="/SignUp" className='pl-2 text-white font-semibold border rounded-md bg-green-600 p-2 mx-1 hover:bg-green-400 duration-300'>SignUp</Link>

                        </li>
                        <li>
                            <Link to="/Login" className='pl-2 text-white font-semibold border rounded-md bg-green-600 p-2 mx-1 hover:bg-green-400 duration-300'>LogIn</Link>

                        </li></> }
                        
                        
                    </ul>

                </nav>
            </div>
        </div>
    )
}
