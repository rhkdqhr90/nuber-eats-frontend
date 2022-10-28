import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { RestaurantQuery, RestaurantQueryVariables } from "../../__api__/types";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
type TRestaurantParams = {
  id: string;
};
export const RestaurantOne = () => {
  const params = useParams() as TRestaurantParams;

  const { loading, data } = useQuery<RestaurantQuery, RestaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );
  console.log(data);
  return (
    <div>
      <div
        className="bg-gray-800 py-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
        }}
      >
        <div className=" bg-white w-3/12 py-6 pl-48">
          <h4 className=" text-4xl mb-3">
            {data?.restaurant.restaurant?.name}
          </h4>
          <h5 className=" text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className=" text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
    </div>
  );
};
