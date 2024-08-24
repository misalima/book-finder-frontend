"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface FormRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  username: yup.string().required("Nome de usuário é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
}).required();

export default function FormRegistration() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormRegister>({
    resolver: yupResolver(schema)
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data: FormRegister) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="bg-primary-green w-full">
        <div className="flex justify-center items-center h-screen">
          <Image alt="logo" width={480} height={180} src={'/images/logo.png'} />
        </div>
      </div>
      <div className="pt-14 px-48">
        <form className="w-80 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <span className="text-primary-green font-bold text-4xl">Crie sua conta</span>
          <div>
            <label className="font-semibold ml-1">Usuário</label>
            <input
              id="username"
              type="text"
              className="rounded-lg w-full p-2 border-2 border-dark-grey"
              {...register('username')}
            />
            {errors.username && <div className="ml-1 error-message text-errors font-semibold">{errors.username.message}</div>}
          </div>

          <div>
            <label className="font-semibold ml-1">E-mail</label>
            <input
              id="email"
              type="email"
              className="rounded-lg w-full p-2 border-2 border-dark-grey"
              {...register('email')}
            />
            {errors.email && <div className="ml-1 error-message text-errors font-semibold">{errors.email.message}</div>}
          </div>

          <div className="relative">
            <label className="font-semibold ml-1">Senha</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="rounded-lg w-full p-2 border-2 border-dark-grey"
              {...register('password')}
            />
            <div className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
            </div>
            {errors.password && <div className="ml-1 error-message text-errors font-semibold">{errors.password.message}</div>}
          </div>

          <div className="relative">
            <label className="font-semibold ml-1">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="rounded-lg w-full p-2 border-2 border-dark-grey"
              {...register('confirmPassword')}
            />
            <div className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
            </div>
            {errors.confirmPassword && <div className="ml-1 error-message text-errors font-semibold">{errors.confirmPassword.message}</div>}
          </div>

          <div>
            <button type="submit" className="rounded-lg w-full bg-primary-green text-white p-2 mt-2">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
