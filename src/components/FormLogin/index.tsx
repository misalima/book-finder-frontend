"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

export interface FormLogin {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
}).required();

export default function FormRegistration() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormLogin>({
    resolver: yupResolver(schema)
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const onSubmit = (data: FormLogin) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2 bg-white">
      <div className="flex justify-center items-center">
        <form
          className="w-80 text-[#555] space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="text-primary-green font-bold text-4xl">
            Fazer login
          </span>
          <div>
            <label className="font-medium ml-1">E-mail</label>
            <input
              id="email"
              type="email"
              className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
              {...register("email")}
            />
            {errors.email && (
              <div className="ml-1 error-message text-errors font-semibold">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="font-medium ml-1">Senha</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
              {...register("password")}
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
              <div className="ml-1 error-message text-errors font-semibold">
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
          <Link href={"/"}>
          <Image alt="logo" width={480} height={180} src={"/images/logo.png"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
