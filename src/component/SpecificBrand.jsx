import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import SAR from "../component/SAR";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function SpecificCategories() {
	const { id } = useParams();

	async function getSpecificBrand() {
		return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
	}

	const { isLoading, data, isError } = useQuery({
		queryKey: ["getSpecificBrand"],
		queryFn: getSpecificBrand,
	});

	console.log(data);

	if (isLoading) {
		return (
			<div className="flex w-full h-full absolute bg-white justify-center items-center">
				<RotateLoader color="#22c55e" size={40} margin={20} />
			</div>
		);
	}

	if (isError) {
		return <Navigate to="/NotFound" />;
	}

	return (
		<>
			<div className="container mx-auto my-8">
				<div className="grid grid-cols-2 mt-7  md:grid-cols-4 lg:grid-cols-6 gap-4">
					{data.data.data.map((product) =>
						product.brand._id === id ? (
							<div
								key={product.name}
								className="hover:shadow-md hover:border p-2 cursor-pointer  hover:border-green-500 rounded-md"
							>
								<Link
									to={`/productDetails/${product.id}/${product.category.name}`}
								>
									<div className="">
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
												<SAR price={product.price / 4} />
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
								</Link>
							</div>
						) : null,
					)}
				</div>
			</div>
		</>
	);
}