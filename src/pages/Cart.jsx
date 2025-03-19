import React, { useContext, useState } from 'react'
import { cartContext } from '../context/CartContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PulseLoader, RotateLoader } from 'react-spinners';
import SAR from '../component/SAR';
import { Link } from 'react-router-dom';

export default function Cart() {

	const [isPushed, setPushed] = useState(false)

  const {updateCount,allProducts,totalCartPrice,deleteItem,clearCart} = useContext(cartContext)

  
	if (!allProducts) {
		return (
			<div className="flex w-full h-full absolute bg-white justify-center items-center">
				<RotateLoader color="#22c55e" size={40} margin={20} />
			</div>
		);
	}

	async function updateMyProduct(id, newCount) {
		
		const res = await updateCount(id , newCount)
	}

	async function myDeleteItem(id) {
		setPushed(true);

		setTimeout(() => {
			setPushed(false);
		}, 1000);
		const res = await deleteItem(id);
	}

  return (
			<>
				{allProducts.length ? (
					<div className="container mx-auto my-8">
						<div className="mb-3 flex justify-between items-center">
							<div>
								<h2 className="text-3xl font-semibold">Shop Cart:</h2>
								<p className="font-semibold ">
									<span className="text-green-500">Total Cart Price:</span>
									<SAR price={totalCartPrice / 4} />
								</p>
							</div>
							<div className="flex">
								<button
									onClick={clearCart}
									className="text-white mr-3 font-semibold border rounded-md bg-green-600 p-2  hover:bg-green-400 duration-300"
								>
									Clear Cart
								</button>
								<Link
									to="/payment"
									className="text-white font-semibold border rounded-md bg-green-600 p-2  hover:bg-green-400 duration-300"
								>
									Go to checkout
								</Link>
							</div>
						</div>
						{allProducts?.map((product) => (
							<div key={product.id} className="flex justify-between">
								<div className="flex items-center justify-center mb-2">
									<Link
										to={`/productDetails/${product.product.id}/${product.product.category.name}}`}
									>
										<figure>
											<img
												src={product.product.imageCover}
												alt={product.product.title}
												className="w-40 h-48 mr-3"
											/>
										</figure>
									</Link>

									<article>
										<p className="font-semibold text-lg">
											{product.product.title.split(" ").slice(0, 7).join(" ")}
										</p>
										<p className="text-green-500 font-semibold">
											<SAR color="#22c55e" price={product.price / 4} />
										</p>

										<button
											onClick={() => myDeleteItem(product.product.id)}
											className="text-white my-2  font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300"
										>
											{isPushed ? (
												<PulseLoader
													size={12}
													color="white"
													speedMultiplier={0.8}
												/>
											) : (
												<>
												<FontAwesomeIcon icon={faTrashCan} className="mr-2" />
											Remove
											</>
											)}
											
										</button>
									</article>
								</div>

								<div className="flex justify-center  items-center">
									<button
										onClick={() =>
											updateMyProduct(product.product.id, product.count + 1)
										}
										className="text-white my-2 mr-2 font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300"
									>
										+
									</button>
									<p className="font-semibold">{product.count}</p>
									<button
										disabled={product.count == 1}
										onClick={() =>
											updateMyProduct(product.product.id, product.count - 1)
										}
										className="text-white my-2 ml-2 font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300"
									>
										-
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<h1 className="text-center text-2xl mt-6 font-semibold">
						Your cart is empty
					</h1>
				)}
			</>
		);
}
