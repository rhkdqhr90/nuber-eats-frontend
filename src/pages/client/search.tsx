import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  SearchRestaurantQuery,
  SearchRestaurantQueryVariables,
} from "../../__api__/types";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPage
      totalResult
      restaurants {
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryReadyToStart, { loading, data, called }] = useLazyQuery<
    SearchRestaurantQuery,
    SearchRestaurantQueryVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return navigate("/", { replace: true });
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, []);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};
