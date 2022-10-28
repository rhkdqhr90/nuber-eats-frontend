import React from "react";
import { Link } from "react-router-dom";
interface IRestaurantProps {
  id: string;
  coverImage: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImage,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className=" flex flex-col">
        <div
          style={{ backgroundImage: `url(${coverImage})` }}
          className=" bg-cover py-28 bg-center mb-3"
        ></div>
        <h3 className=" text-lg font-bold">{name}</h3>
        <span className=" border-t mt-2 py-3 text-xs opacity-50 border-gray-300">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};
