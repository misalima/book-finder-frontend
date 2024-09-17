"use client";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IUser } from "@/types/user";
import { useUser } from "@/hooks/useUser";
import Error from "../Error";
import Success from "../Success";

export interface FormEditProfile {
  username: string;
  email: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  profile_visibility: 0 | 1;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function FormRegistration({ user }: { user: IUser }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm<FormEditProfile>({
    defaultValues: {
      username: user.username,
      email: user.email,
      profile_visibility: user.profile_visibility || 0,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selected, setSelected] = useState<0 | 1>(user.profile_visibility || 0);
  const [errs, setErrs] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const { mutateAsync: updateUser } = useUser.Update();

  const currentPassword = watch("password");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const username = watch("username");
  const email = watch("email");
  const profile_visibility = watch("profile_visibility");

  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("profile_visibility", user.profile_visibility || 0);
  }, [user, setValue]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleCheckboxChange = (value: 0 | 1) => {
    setSelected(value);
    setValue("profile_visibility", value);
  };

  const onSubmit = async (data: FormEditProfile) => {
    try {
      setErrs([]);
      const updateData: IUpdateUser = { id: user.id || "" };

      if (data.username !== user.username) updateData.username = data.username;
      if (data.email !== user.email) updateData.email = data.email;
      if (data.password) updateData.password = data.password;
      if (data.newPassword && data.password) updateData.newPassword = data.newPassword;
      updateData.profile_visibility = data.profile_visibility;
      
      await updateUser(updateData);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.response?.data?.message ||
        "Something went wrong. Please try again.";

      setErrs(
        (prevErrs) => [...prevErrs, errorMessage].filter(Boolean) as string[]
      );
      console.error("Error updating profile:", error);
    }
  };

 const hasChanges = () => {
   const hasUsernameChanged = username !== user.username;
   const hasEmailChanged = email !== user.email;
   const hasProfileVisibilityChanged =
     profile_visibility !== user.profile_visibility;

   // Check if passwords are present and valid
   const hasPasswordChange =
     (currentPassword && newPassword) || (currentPassword && confirmPassword);

   // New password should be different from current password
   const isNewPasswordValid = !newPassword || newPassword !== currentPassword;

   // Ensure new password and confirm password match if they are provided
   const isConfirmPasswordValid =
     !confirmPassword || confirmPassword === newPassword;

   return (
     hasUsernameChanged ||
     hasEmailChanged ||
     hasProfileVisibilityChanged ||
     (hasPasswordChange && isNewPasswordValid && isConfirmPasswordValid)
   );
 };

  const isButtonDisabled = !hasChanges();

  return (
    <div className="flex flex-col justify-center items-center py-6 px-96">
      {errs && errs.map((err, index) => <Error key={index} message={err} />)}
      {success && <Success message="Alterações salvas com sucesso" />}
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-white font-bold text-4xl">Editar Perfil</span>

        <div>
          <label className="font-medium ml-1 text-white">Usuário</label>
          <input
            id="username"
            type="text"
            className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
        </div>

        <div>
          <label className="font-medium ml-1 text-white">E-mail</label>
          <input
            id="email"
            type="email"
            className="rounded-lg w-full p-2 focus:outline-none border border-gray-400"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>

        <div className="relative">
          <label className="font-medium ml-1 text-white">Senha Atual</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("password", {
              validate: (value) => {
                if (value && value.length < 8) {
                  return "A senha tem no mínimo 8 caracteres";
                }
                return true;
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
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
            type={showNewPassword ? "text" : "password"}
            className="rounded-lg w-full focus:outline-none p-2 border border-gray-400"
            {...register("newPassword", {
              validate: (value) => {
                if (currentPassword && value === currentPassword) {
                  return "A nova senha precisa ser diferente da senha atual";
                }
                if (value && value.length < 8) {
                  return "A nova senha precisa ter no mínimo 8 caracteres";
                }
                return true;
              },
            })}
            disabled={!currentPassword}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={toggleNewPasswordVisibility}
          >
            {showNewPassword ? (
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
            {...register("confirmPassword", {
              validate: (value) =>
                value === newPassword ||
                "A confirmação da senha precisa ser igual à nova senha",
            })}
            disabled={!currentPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
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
          <label className="font-medium text-white">
            Visibilidade do Perfil:
          </label>
          <div className="flex items-center">
            <input
              id="status-publico"
              type="radio"
              checked={selected === 0}
              onChange={() => handleCheckboxChange(0)}
              className="w-4 h-4 border-gray-300 ml-4"
            />
            <label className="font-medium ml-2 text-white">Público</label>
          </div>

          <div className="flex items-center">
            <input
              id="status-privado"
              type="radio"
              checked={selected === 1}
              onChange={() => handleCheckboxChange(1)}
              className="w-4 h-4 border-gray-300 ml-4"
            />
            <label className="font-medium ml-2 text-white">Privado</label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            } bg-primary-green text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-opacity-90`}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
