import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../component/form-error";
import uber from "../images/uber.svg";
import { Button } from "../component/button";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import React from "react";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  UserRole,
} from "../__api__/types";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;
interface CreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<CreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const navigate = useNavigate();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      //redirect
      navigate("/login");
    }
  };

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };

  return (
    <div className=" h-screen flex items-center flex-col mt-10 lg:mt-32 ">
      <Helmet>
        <title> Create Account | Nuber-eats</title>
      </Helmet>
      <div className=" w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={uber} alt="우버이미지" className=" w-60 mb-10 " />
        <h4 className="w-full font-medium text-left text-3xl">
          신규 회원 가입
        </h4>
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
          <select
            className="input mt-3"
            {...register("role", { required: true })}
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>

          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Create Account"}
          ></Button>
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          이미 아아디를 가지고 계십니까?{" "}
          <Link to="/Login" className="text-lime-600 hover:underline">
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
};
