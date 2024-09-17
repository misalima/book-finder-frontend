"use client";
import FormEditProfile from "@/components/FormEditProfile";
import { isIUser } from "@/types/user";
import { useUser } from "@/hooks/useUser";
import LoadingScreen from "@/components/LoadingScreen";


export default function Page({ params }: { params: { id: string } }) {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUser.GetOneUser(params.id);

  
  if (userLoading) {
    return <LoadingScreen />;
  }

  if (userError) {
    return (
      <div className="w-full h-screen bg-red-300 flex items-center justify-center">
        <h1 className="text-2xl text-white font-medium">
          An unexpected error occurred while fetching user
        </h1>
      </div>
    );
  }
  if (isIUser(user) && user.id) {
    return (
      
      <div className="bg-dark-grey py-14">
        <FormEditProfile 
          user={user}/>
        </div>
      
      
    );
  }
}
  