"use client";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IUser } from "@/types/user";

export interface FormEditProfile {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  newPassword: string;
}

export default function FormRegistration(user: IUser) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty }
  } = useForm<FormEditProfile>({
    defaultValues: {
      username: user.username,
      email: user.email
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selected, setSelected] = useState<string | null>("publico");

  const currentPassword = watch("password");
  const username = watch("username");
  const email = watch("email");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
  }, [user, setValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCheckboxChange = (value: string) => {
    setSelected(value);
  };

  const onSubmit = (data: FormEditProfile) => {
    console.log(data);
  };

  const isButtonDisabled = !(
    isDirty &&
    (username !== user.username || email !== user.email ||
     newPassword || confirmPassword)
  );

  return (
    <div className="flex justify-center items-center py-6 px-96 ">
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-white font-bold text-4xl">Editar Perfil</span>

        <div>
          <label className="font-medium ml-1 text-white">Usuário</label>
          <input
            id="username"
            type="text"
            className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
            {...register("username")}
          />
        </div>

        <div>
          <label className="font-medium ml-1 text-white">E-mail</label>
          <input
            id="email"
            type="email"
            className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
            {...register("email")}
          />
        </div>

        <div className="relative">
          <label className="font-medium ml-1 text-white">Senha Atual</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("password")}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiFillEyeInvisible
                className="hover:text-dark-grey mt-5"
                size={30}
              />
            ) : (
              <AiFillEye className="hover:text-dark-grey mt-5" size={30} />
            )}
          </div>
        </div>

        <div className="relative">
          <label className="font-medium ml-1 text-white">Nova Senha</label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("newPassword")}
            disabled={!currentPassword}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiFillEyeInvisible
                className="hover:text-dark-grey mt-5"
                size={30}
              />
            ) : (
              <AiFillEye className="hover:text-dark-grey mt-5" size={30} />
            )}
          </div>
        </div>

        <div className="relative">
          <label className="font-medium ml-1 text-white">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("confirmPassword")}
            disabled={!currentPassword}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <AiFillEyeInvisible
                className="hover:text-dark-grey mt-5"
                size={30}
              />
            ) : (
              <AiFillEye className="hover:text-dark-grey mt-5" size={30} />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <label className="font-medium text-white">Visibilidade do Perfil:</label>
          <div className="flex items-center">
            <input
              id="status-publico"
              type="radio"
              checked={selected === "publico"}
              onChange={() => handleCheckboxChange("publico")}
              className="w-4 h-4 border-gray-300 ml-4"
            />
            <label className="font-medium ml-2 text-white">Público</label>
          </div>

          <div className="flex items-center">
            <input
              id="status-privado"
              type="radio"
              checked={selected === "privado"}
              onChange={() => handleCheckboxChange("privado")}
              className="w-4 h-4 ml-4"
            />
            <label className="font-medium ml-2 text-white">Privado</label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`rounded-lg font-medium p-3 text-white ${isButtonDisabled ? 'bg-gray-400 hover:bg-gray-500' : 'bg-primary-green hover:bg-green-600'}`}
            disabled={isButtonDisabled}
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
