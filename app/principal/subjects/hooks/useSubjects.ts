"use client";

import { useEffect, useState } from "react";

import type { Subject } from "../types";



export function useSubjects() {


  const [subjects, setSubjects] =
    useState<Subject[]>([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState<string | null>(null);





  async function fetchSubjects() {


    try {


      setLoading(true);

      setError(null);



      const response =
        await fetch(
          "/api/subjects"
        );





      if (!response.ok) {


        throw new Error(
          "خطا در دریافت درس‌ها"
        );


      }





      const data =
        await response.json();





      setSubjects(data);



    } catch (err) {


      setError(

        err instanceof Error
          ? err.message
          : "خطای ناشناخته"

      );



    } finally {


      setLoading(false);


    }


  }







  useEffect(() => {

    fetchSubjects();

  }, []);







  return {

    subjects,

    loading,

    error,

    refresh: fetchSubjects,

  };


}