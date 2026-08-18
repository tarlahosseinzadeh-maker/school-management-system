"use client";

import {
  useEffect,
  useState
} from "react";


export type User = {

  userId: number;

  firstName: string;

  lastName: string;

  nationalCode: string;

  phoneNumber?: string;

  username: string;

  isActive: boolean;

  role:
    | "STUDENT"
    | "TEACHER"
    | "PRINCIPAL";

};




export function useUsers(
  search = "",
  role:
    | "STUDENT"
    | "TEACHER"
    | "PRINCIPAL"
    | "" = ""
) {



  const [users,setUsers] =
    useState<User[]>([]);



  const [loading,setLoading] =
    useState(true);



  const [error,setError] =
    useState<string | null>(null);






  async function fetchUsers(){


    try{


      setLoading(true);

      setError(null);




      const params =
        new URLSearchParams();




      if(search){

        params.set(
          "search",
          search
        );

      }




      if(role){

        params.set(
          "role",
          role
        );

      }






      const response =
        await fetch(
          `/api/users?${params.toString()}`
        );






      if(!response.ok){

        throw new Error(
          "خطا در دریافت کاربران"
        );

      }






      const data =
        await response.json();





      setUsers(
        data.users
      );




    }
    catch(err){



      setError(

        err instanceof Error

        ? err.message

        : "خطای ناشناخته"

      );


    }
    finally{


      setLoading(false);


    }


  }








  useEffect(()=>{


    fetchUsers();


  },[search,role]);








  return {

    users,

    loading,

    error,

    refresh:fetchUsers,

  };


}