import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CategoryQuery, CategoryQueryVariables } from "../../__api__/types";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPage
      totalResult
      restaurant {
        ...RestaurantPart
      }
      category {
        ...CategoryPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Category = () => {
  const params = useParams<{ slug: string }>();
  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug + "",
        },
      },
    }
  );
  console.log(data);

  return <h1>category</h1>;
};
