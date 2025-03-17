import React, { useContext } from 'react'
import { cartContext } from '../context/CartContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RotateLoader } from 'react-spinners';

export default function Cart() {

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
		const res = await deleteItem(id)
	}

  return (
			<>
				{allProducts.length ? (
					<div className="container mx-auto my-8">
						<div className="mb-3 flex justify-between">
							<div>
								<h2 className="text-3xl font-semibold">Shop Cart:</h2>
								<p className="text-green-500 font-semibold ">
									Total Cart Price: {totalCartPrice / 4}
								</p>
							</div>

							<button
								onClick={clearCart}
								className="text-white my-2 ml-2 font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300"
							>
								Clear Cart
							</button>
						</div>
						{allProducts?.map((product) => (
							<div key={product.id} className="flex justify-between">
								<div className="flex items-center justify-center mb-2">
									<figure>
										<img
											src={product.product.imageCover}
											alt={product.product.title}
											className="w-40 h-48 mr-3"
										/>
									</figure>

									<article>
										<p className="font-semibold text-lg">
											{product.product.title.split(" ").slice(0, 7).join(" ")}
										</p>
										<p className="text-green-500 font-semibold">
											price: {product.price / 4}
										</p>
										<button
											onClick={() => myDeleteItem(product.product.id)}
											className="text-white my-2  font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300"
										>
											<FontAwesomeIcon icon={faTrashCan} className="mr-2" />
											Remove
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
