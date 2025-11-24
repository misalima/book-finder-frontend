"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface FormLogin {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
}).required();

export default function FormRegistration() {
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormLogin>({
    resolver: yupResolver(schema)
  });
  

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const onSubmit = async (data: FormLogin) => {
   const result = await signIn("credentials", {
      redirect: false, 
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError("password", { type: "manual", message: "Usuário ou senha incorreto(a)" });
    } else if (result?.ok) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2 bg-white">
      <div className="flex justify-center items-center">
        <form
          className="w-80 text-[#555] space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          aria-labelledby="login-form-title"
          role="form"
          aria-label="Formulário de login"
        >
          <span
            id="login-form-title"
            className="text-primary-green font-bold text-4xl"
          >
            Fazer login
          </span>
          <div>
            <label className="font-medium ml-1" htmlFor="login-email">
              E-mail
            </label>
            <input
              id="login-email"
              type="email"
              className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
              {...register("email")}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "login-email-error" : undefined}
            />
            {errors.email && (
              <div
                id="login-email-error"
                role="alert"
                aria-live="assertive"
                className="ml-1 error-message text-errors font-semibold"
              >
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="font-medium ml-1" htmlFor="login-password">
              Senha
            </label>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
              {...register("password")}
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
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
                id="login-password-error"
                role="alert"
                aria-live="assertive"
                className="ml-1 error-message text-errors font-semibold"
              >
                {errors.password.message}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="hover:bg-dark-grey rounded-lg w-full bg-primary-green text-white p-2 mt-2"
            >
              Entrar
            </button>
            <h2 className="mt-4 text-center">
              Ainda não tem uma conta?{" "}
              <Link href={"/register"}>
                <span className="text-primary-green hover:text-dark-grey font-semibold">
                  Cadastre-se
                </span>
              </Link>
            </h2>
          </div>
        </form>
      </div>
      <div className="bg-primary-green w-full">
        <div className="flex justify-center items-center h-screen">
          <Link href={"/"} aria-label="Ir para a página inicial">
          <Image alt="logo" width={480} height={180} src={"/images/logo.png"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
