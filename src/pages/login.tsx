import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../component/form-error";
import { LoginMutation, LoginMutationVariables } from "../__api__/types";
import uber from "../images/uber.svg";
import { Button } from "../component/button";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { isLoggedInVar } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<FormData>({
    mode: "onBlur",
  });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
      isLoggedInVar(true);
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
    <div className=" h-screen flex items-center flex-col mt-10 lg:mt-32 ">
      <Helmet>
        <title> LogIn | Nuber-eats</title>
      </Helmet>
      <div className=" w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={uber} alt="우버이미지" className=" w-60 mb-10 " />
        <h4 className="w-full font-medium text-left text-3xl">Welcome Back</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid gap- mt-5 w-full"
        >
          <input
            {...register("email", {
              required: "이메일은 필수 입니다",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            required
            placeholder="email"
            className="input"
            type="email"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"이메일 양식에 맞게 작성해 주세요"} />
          )}
          <input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: 10,
            })}
            placeholder="password"
            type="password"
            className="input mt-3"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="비밀번호는 반드시 10글자 이상 이어야 합니다." />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log in"}
          ></Button>
          {loginMutationResult?.login.error && (
            <FormError
              errorMessage={loginMutationResult.login.error}
            ></FormError>
          )}
        </form>
        <div>
          새로운 회원{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
};
