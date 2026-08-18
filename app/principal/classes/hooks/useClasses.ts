"use client";

import { useEffect, useState } from "react";

import type { SchoolClass } from "../types";


export function useClasses() {


  const [classes, setClasses] = useState<SchoolClass[]>([]);


  const [loading, setLoading] = useState(true);


  const [error, setError] = useState<string | null>(null);




  async function fetchClasses() {

    try {

      setLoading(true);

      setError(null);



      const response = await fetch(
        "/api/classes"
      );



      if (!response.ok) {

        throw new Error(
          "خطا در دریافت کلاس‌ها"
        );

      }



      const data =
        await response.json();



      setClasses(data);



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

    fetchClasses();

  }, []);





  return {

    classes,

    loading,

    error,

    refresh: fetchClasses,

  };


}