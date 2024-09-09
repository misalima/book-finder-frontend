"use client";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as yup from "yup";
import { IUser } from "@/types/user";

export interface FormEditProfile {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  newPassword: string;
}

const schema = yup.object({
  username: yup.string().required("Nome de usuário é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória"),
  newPassword: yup.string().required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
}).required();

export default function FormRegistration(user: IUser) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, 
  } = useForm<FormEditProfile>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setIsButtonDisabled(false);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="flex justify-center items-center py-6 px-96 ">
      <form className=" w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-white font-bold text-4xl">Editar Perfil</span>
        <div>
          <label className="font-medium ml-1 text-white ">Usuário</label>
          <input
            id="username"
            type="text"
            className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
            {...register("username")}
            
          />

          {errors.username && (
            <div className="ml-1 error-message text-errors font-semibold">
              {errors.username.message}
            </div>
          )}
        </div>

        <div>
          <label className="font-medium ml-1 text-white">E-mail</label>
          <input
            id="email"
            type="email"
            className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
            {...register("email")}
          
          />
          {errors.email && (
            <div className="ml-1 error-message text-errors font-semibold">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="relative">
          <label className="font-medium ml-1 text-white ">Senha Atual</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("password")}
          />
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer ${errors.password ? "" : "pt-5"
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

        <div className="relative">
          <label className="font-medium ml-1 text-white ">Nova Senha</label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("newPassword")}
          />
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer ${errors.password ? "" : "pt-5"
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
        <div className="relative">
          <label className="font-medium ml-1 text-white">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("confirmPassword")}
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
            <div className="ml-1 error-message text-errors font-semibold">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <label className="font-medium text-white">Visibilidade do Perfil:</label>
          <div className="flex items-center">
            <input
              id="status-publico"
              type="radio"
              checked={selected === "publico"}
              onChange={() => handleCheckboxChange("publico")}
              className="w-4 h-4  border-gray-300 ml-4"
            />
            <label className="font-medium ml-2 text-white">Público</label>
          </div>

          <div className="flex items-center">
            <input
              id="status-privado"
              type="radio"
              checked={selected === "privado"}
              onChange={() => handleCheckboxChange("privado")}
              className="w-4 h-4  ml-4 "
            />
            <label className="font-medium ml-2 text-white">Privado</label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`rounded-lg font-medium p-3  text-white 
              ${isButtonDisabled ? "hover:bg-gray-500 bg-primary-green cursor-not-allowed" : "bg-primary-green hover:bg-green-600"} 
             `}
            disabled={isButtonDisabled}
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
