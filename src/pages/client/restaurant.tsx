import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../__api__/types";

const RESTAURANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPage
      totalResult
      result {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return (
    <div>
      <form className=" bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          placeholder="Search Restaurant"
          className="input w-3/12 rounded-md border-0"
        />
      </form>
      <div>
        {!loading && (
          <div className="max-w-screen-2xl mx-auto mt-8">
            <div className=" flex justify-around max-w-xs mx-auto">
              {data?.allCategories.categories?.map((category) => (
                <div className="flex flex-col group items-center cursor-pointer">
                  <div
                    className=" w-16 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
                    style={{ backgroundImage: `url(${category.coverImage})` }}
                  ></div>
                  <span className="mt-2 text-sm text-center font-bold">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
            <div className=" grid grid-cols-3 gap-x-5 gap-y-10 mt-10">
              {data?.restaurants.result?.map((restaurant) => (
                <div>
                  <div
                    style={{ backgroundImage: `url(${restaurant.coverImage})` }}
                    className=" bg-cover py-28 bg-center mb-3"
                  ></div>
                  <h3 className=" text-lg font-bold">{restaurant.name}</h3>
                  <span className=" border-t-2 border-gray-200">{restaurant.category?.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
