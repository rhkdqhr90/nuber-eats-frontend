import { gql, useQuery } from "@apollo/client";
import React from "react";
import { MeQuery } from "../__api__/types";

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
