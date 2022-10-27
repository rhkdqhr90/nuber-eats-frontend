import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../hooks/userMe";
import {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../__api__/types";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  
  const { data: userData, refetch } = useMe();
  const navigate = useNavigate();
  const onCompleted = async (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      await refetch();
      navigate("/");
    }
  };
  const [verifyEmail] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION, { onCompleted });
  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className=" mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title> Verify Email | Nuber-eats</title>
      </Helmet>
      <h2 className=" text-lg font-medium">Confirm email.....</h2>
      <h4 className=" text-gray-700 text-sm">
        Please wait, don't close this page
      </h4>
    </div>
  );
};
