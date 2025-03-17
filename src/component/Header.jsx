import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { authContext } from '../context/AuthContext'
import { cartContext } from '../context/CartContext'



export default function Header() {

    const {numOfCartItems} = useContext(cartContext)

    const {myToken , setToken} = useContext(authContext)
    const navigate = useNavigate()


    function logOut (){
        setToken(null);
        localStorage.removeItem('tkn')

        navigate('/Login')
    }

    return (
					<div className="bg-gray-200 py-3">
						<div className="container mx-auto">
							<nav className="flex justify-between items-center">
								<div className="flex items-center">
									<p className="pl-2 text-white font-semibold border rounded-full bg-green-600 p-2 mx-1 cursor-pointer ">
										Ecommerce
									</p>
									<ul className="flex">
										<li className="px-2 hover:text-slate-400 duration-300 text-slate-600 font-semibold">
											<Link to="/Home">Home</Link>
										</li>
										<li className="px-2 hover:text-slate-400 duration-300 text-slate-600 font-semibold">
											<Link to="/Categories">Categories</Link>
										</li>
										<li className="px-2 hover:text-slate-400 duration-300 text-slate-600 font-semibold">
											<Link to="/Brands">Brands</Link>
										</li>
									</ul>
								</div>

								<ul className="flex items-center">
									{myToken ? (
										<>
											<li className="duration-300 relative pt-2 hover:scale-110">
												<Link to="/Cart">
													<FontAwesomeIcon
														icon={faCartShopping}
														className="text-4xl text-green-600 hover:text-green-400 pr-2"
													/>
													<p className="absolute  text-white text-sm font-bold top-0 left-8 rounded-full bg-red-500 px-1">
														{numOfCartItems ? numOfCartItems : ""}
													</p>
												</Link>
											</li>{" "}
											<li>
												<button
													onClick={logOut}
													className="pl-2 text-white font-semibold border rounded-md bg-green-600 p-2 mx-1 hover:bg-green-400 duration-300"
												>
													LogOut
												</button>
											</li>{" "}
										</>
									) : (
										<>
											{" "}
											<li>
												<Link
													to="/SignUp"
													className="pl-2 text-white font-semibold border rounded-md bg-green-600 p-2 mx-1 hover:bg-green-400 duration-300"
												>
													SignUp
												</Link>
											</li>
											<li>
												<Link
													to="/Login"
													className="pl-2 text-white font-semibold border rounded-md bg-green-600 p-2 mx-1 hover:bg-green-400 duration-300"
												>
													LogIn
												</Link>
											</li>
										</>
									)}
								</ul>
							</nav>
						</div>
					</div>
				);
}
