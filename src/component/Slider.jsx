import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function SimpleSlider() {

   async function categorySlider() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    
        
    }

    const {isLoading , data} = useQuery({
		queryKey: ['categorySlider'],
		queryFn: categorySlider});

    
    

        if (isLoading) {
		return<div className="flex w-full h-full absolute bg-white justify-center items-center">
					<RotateLoader color="#22c55e" size={40} margin={20}/>
				</div>
	}

  
  
    
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
			<Slider {...settings}>
				{data.data.data.map((category) => (
					<Link
						to={`/categories/${category._id}/${category.name}`}
						key={category.name}
						className="pb-4 px-1 "
					>
						<img
							src={category.image}
							alt="product-image"
							className="w-full rounded-md cursor-pointer hover:border-green-500 hover:border h-44 mb-1"
						/>
						<h3 className="text-lg font-semibold text-center mb-1">{category.name}</h3>
					</Link>
				))}
			</Slider>
		);
}