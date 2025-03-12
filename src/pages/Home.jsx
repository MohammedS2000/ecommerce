import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SAR from "../component/SAR";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
	const [allProducts, setAllProducts] = useState(null);

	async function getAllProducts() {
		const res= await axios.get("https://ecommerce.routemisr.com/api/v1/products");

		setAllProducts(res.data.data);
	}

	// const x = useQuery('getAllProducts', getAllProducts);
	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<>
			{allProducts ? (
				<div className="container mx-auto my-6">
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{allProducts.map((product) => (
							<div key={product.name} className="">
								<div className="hover:shadow-md hover:border cursor-pointer hover:border-green-500 p-2 rounded-md">
									<img
										src={product.imageCover}
										alt="product-image"
										className="w-full mb-1"
									/>
									<h3 className="text-green-500 text-sm font-semibold mb-1">
										{product.category.name}
									</h3>
									<h2 className="text-lg font-semibold mb-1">
										{product.title.split(" ").slice(0, 2).join(" ")}
									</h2>
									<div className="flex justify-between">
										<div className="font-semibold">
											<SAR price={product.price} />
										</div>

										<div className="flex justify-center items-center">
											<FontAwesomeIcon
												icon={faStar}
												className="text-yellow-500 mr-1"
											/>
											<p className="font-normal text-slate-600 ">
												{product.ratingsAverage}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="flex w-full h-full absolute bg-white justify-center items-center">
					<RotateLoader color="#22c55e" size={40} margin={20}/>
				</div>
			)}
		</>
	);
}
