"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "@/hooks/useUser";
import { IRegisterUser } from "@/types/registerUser";
import Link from "next/link";
import Success from "@/app/(authentication)/register/Success";

export interface FormRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    username: yup.string().required("Nome de usuário é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas devem coincidir")
      .required("Confirmação de senha é obrigatória"),
  })
  .required();
  
export default function FormRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({
    resolver: yupResolver(schema),
  });
  const [isRegistered, setIsRegistered] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: createUser } = useUser.Create();
  const [err, setErr] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleServerError = (error: any) => {
    if((error.response.data.message).toString().includes("Username")) {
      setErr("Já existe um cadastro com o nome de usuário informado")
    } else if((error.response.data.message).toString().includes("Email")) {
      setErr("O email informado já está vinculado a uma conta")
    } else {
      setErr("Oops... Um erro inesperado aconteceu!")
    }
  }

  const handleRegister = async (formData: IRegisterUser) => {
    await createUser(formData)
    .then(() => {
      setIsRegistered(true)
      setErr('')
    })
    .catch((e) => {
      handleServerError(e)
    });
  };
  
  const onSubmit = (data: FormRegister) => {
    const userData: IRegisterUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    handleRegister(userData);
  };
  
  return (
    <>
      <div className="min-h-screen grid grid-cols-2">
        <div className="bg-primary-green w-full">
          <div className="flex justify-center items-center h-screen">
            <Link href={"/"} aria-label="Ir para a página inicial">
              <Image
                alt="logo"
                width={480}
                height={180}
                src={"/images/logo.png"}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white text-[#555]">
        {isRegistered?(<Success />) : (
          <form
            className="w-80 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            aria-labelledby="register-form-title"
            role="form"
            aria-label="Formulário de cadastro"
          >
            <span
              id="register-form-title"
              className="text-primary-green font-bold text-4xl"
            >
              Crie sua conta
            </span>
            <div>
              <label className="font-medium ml-1" htmlFor="register-username">
                Usuário
              </label>
              <input
                id="register-username"
                type="text"
                className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
                {...register("username")}
                aria-required="true"
                aria-invalid={!!errors.username}
                aria-describedby={
                  errors.username ? "register-username-error" : undefined
                }
              />

              {errors.username && (
                <div
                  id="register-username-error"
                  role="alert"
                  aria-live="assertive"
                  className="ml-1 error-message text-errors font-semibold"
                >
                  {errors.username.message}
                </div>
              )}
            </div>

            <div>
              <label className="font-medium ml-1" htmlFor="register-email">
                E-mail
              </label>
              <input
                id="register-email"
                type="email"
                className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
                {...register("email")}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "register-email-error" : undefined
                }
              />
              {errors.email && (
                <div
                  id="register-email-error"
                  role="alert"
                  aria-live="assertive"
                  className="ml-1 error-message text-errors font-semibold"
                >
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="font-medium ml-1" htmlFor="register-password">
                Senha
              </label>
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
                {...register("password")}
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "register-password-error" : undefined
                }
              />
              <div
                className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer ${
                  errors.password ? "" : "pt-5"
                }`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiFillEyeInvisible
                    className="hover:text-dark-grey"
                    size={30}
                  />
                ) : (
                  <AiFillEye className="hover:text-dark-grey" size={30} />
                )}
              </div>
              {errors.password && (
                <div
                  id="register-password-error"
                  role="alert"
                  aria-live="assertive"
                  className="ml-1 error-message text-errors font-semibold"
                >
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="relative">
              <label
                className="font-medium ml-1"
                htmlFor="register-confirm-password"
              >
                Confirmar Senha
              </label>
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
                {...register("confirmPassword")}
                aria-required="true"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword
                    ? "register-confirm-password-error"
                    : undefined
                }
              />
              <div
                className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer ${
                  errors.confirmPassword ? "" : "pt-5"
                }`}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible
                    className="hover:text-dark-grey"
                    size={30}
                  />
                ) : (
                  <AiFillEye className="hover:text-dark-grey" size={30} />
                )}
              </div>
              {errors.confirmPassword && (
                <div
                  id="register-confirm-password-error"
                  role="alert"
                  aria-live="assertive"
                  className="ml-1 error-message text-errors font-semibold"
                >
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="hover:bg-dark-grey rounded-lg w-full bg-primary-green text-white p-2 mt-2"
              >
                Cadastrar
              </button>
              <h2 className="mt-4 text-center">
                Já tem uma conta? 
                <Link href={"/login"}>
                  <span className="ml-2 font-semibold text-primary-green hover:text-dark-grey">
                    Faça Login
                  </span>
                </Link>
              </h2>
            </div>
          </form>
          )}
          {err && (
            <div className="bg-red-100 w-1/2 py-4 px-4 border border-red-400 rounded-md mt-4 text-center text-errors font-semibold">
              {err}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
