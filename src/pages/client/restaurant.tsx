import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Restaurant } from "../../component/restaurants";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../__api__/types";

interface IFormProps {
  searchTerm: string;
}

const RESTAURANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryPart
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPage
      totalResult
      result {
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Restaurants = () => {
  const [page, setpage] = useState(1);
  const { data, loading, error } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setpage((current) => current + 1);
  const onPrevPageClick = () => setpage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const navigate = useNavigate();
  const onSearchSubmit = () => {
    console.log(getValues());
    const searchTerm = getValues().searchTerm;
    navigate({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className=" bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register("searchTerm", { required: true, min: 3 })}
          type="Search"
          placeholder="Search Restaurant"
          className="input w-3/4 rounded-md border-0  md:w-3/12"
        />
      </form>
      <div>
        {!loading && (
          <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
            <div className=" flex justify-around max-w-xs mx-auto">
              {data?.allCategories.categories?.map((category) => (
                <Link key={category.id} to={`/category/${category.slug}`}>
                  <div
                    key={category.id}
                    className="flex flex-col group items-center cursor-pointer"
                  >
                    <div
                      className=" w-16 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
                      style={{ backgroundImage: `url(${category.coverImage})` }}
                    ></div>
                    <span className="mt-2 text-sm text-center font-bold">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className=" grid md:grid-cols-3 gap-x-5 gap-y-10 mt-16">
              {data?.restaurants.result?.map((restaurant) => (
                <Restaurant
                  key={restaurant.id}
                  id={restaurant.id + ""}
                  coverImage={restaurant.coverImage}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
            <div className=" grid grid-cols-3 text-center max-w-md m-auto  items-center mt-10">
              {page > 1 ? (
                <button
                  className=" font-medium text-2xlg focus:outline-none"
                  onClick={onPrevPageClick}
                >
                  &larr;
                </button>
              ) : (
                <div></div>
              )}
              <span>
                page {page} of {data?.restaurants.totalPage}
              </span>
              {page !== data?.restaurants.totalPage && (
                <button
                  className=" font-medium text-2xlg focus:outline-none"
                  onClick={onNextPageClick}
                >
                  &rarr;
                </button>
              )}
            </div>{" "}
            <></>
          </div>
        )}
      </div>
    </div>
  );
};
