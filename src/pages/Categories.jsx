import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { RotateLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


export default function Categories() {

async function categoryChose() {
	return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
}

const { isLoading, data } = useQuery({
	queryKey: ["categoryChose"],
	queryFn: categoryChose,
});

if (isLoading) {
	return (
		<div className="flex w-full h-full absolute bg-white justify-center items-center">
			<RotateLoader color="#22c55e" size={40} margin={20} />
		</div>
	);
}
return (
	<div className="my-8 container mx-auto">
		<div className="grid grid-cols-2 mt-7  md:grid-cols-4 lg:grid-cols-6 gap-4">
			{data.data.data.map((category) => (
				<Link
					to={`/categories/${category._id}/${category.name}`}
					key={category.name}
					className="pb-4 px-1"
				>
					<div className="rounded-md  hover:border-green-500 hover:border">
						<div>
							<img
								src={category.image}
								alt="category-image"
								className="w-full rounded-md h-44 mb-1"
							/>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-1 text-center">{category.name}</h3>
						</div>
					</div>
				</Link>
			))}
		</div>
	</div>
);
}
