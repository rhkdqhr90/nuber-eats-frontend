import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../component/form-error";
import { LoginMutation, LoginMutationVariables } from "../__api__/types";
import uber from "../images/uber.svg"

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className=" h-screen flex items-center flex-col mt-32  ">
      <img src={uber} alt="우버이미지"  className=" w-60 mb-5" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid gap- mt-5 px-5"
        >
          <input
            {...register("email", { required: "이메일은 필수 입니다" })}
            required
            placeholder="email"
            className="input"
            type="email"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: 10,
            })}
            placeholder="password"
            className="input mt-3"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="비밀번호는 반드시 10글자 이상 이어야 합니다." />
          )}
          <button className="btn mt-3 mb-3">
            {loading ? " Loading..." : " Log In"}
          </button>
          {loginMutationResult?.login.error && (
            <FormError
              errorMessage={loginMutationResult.login.error}
            ></FormError>
          )}
        </form>
      </div>
    
  );
};
