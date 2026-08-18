"use client";

import { useSubjects } from "./hooks/useSubjects";

import SubjectTable from "./components/SubjectTable";

import CreateSubjectDialog from "./components/CreateSubjectDialog";



export default function SubjectsClient() {


  const {
    subjects,
    loading,
    error,
    refresh,
  } = useSubjects();





  if (loading) {

    return <div className="ui-loading">در حال بارگذاری...</div>;

  }





  if (error) {

    return <div className="ui-error">{error}</div>;

  }







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







      <SubjectTable

        subjects={subjects}

        onSuccess={refresh}

      />





    </div>

  );


}