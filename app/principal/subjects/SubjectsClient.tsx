"use client";

import { useSubjects } from "./hooks/useSubjects";

import SubjectTable from "./components/SubjectTable";

import CreateSubjectDialog from "./components/CreateSubjectDialog";

import { useEffect, useState } from "react";



export default function SubjectsClient() {



  const {
    subjects,
    loading,
    error,
    refresh,
  } = useSubjects();



  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(loading);
  }, [loading]);



  return (

    <div className="space-y-6" dir="rtl">




      <div
        className="flex justify-between items-center"
      >




        <h1 className="page-title">

          مدیریت دروس

        </h1>





        <CreateSubjectDialog
          onSuccess={refresh}
        />




      </div>






      {dataLoading && (
        <div className="ui-loading">در حال بارگذاری...</div>
      )}

      {!dataLoading && error && (
        <div className="ui-error">{error}</div>
      )}

      {!dataLoading && !error && (
        <SubjectTable

          subjects={subjects}

          onSuccess={refresh}

        />
      )}



    </div>
  );
}
