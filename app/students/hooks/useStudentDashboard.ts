"use client";


import {
  useEffect,
  useState
} from "react";




export function useStudentDashboard(){


  const [profile,setProfile] =
    useState<any>(null);


  const [subjects,setSubjects] =
    useState<any[]>([]);


  const [grades,setGrades] =
    useState<any[]>([]);


  const [assignments,setAssignments] =
    useState<any[]>([]);


  const [files,setFiles] =
    useState<any[]>([]);



  const [loading,setLoading] =
    useState(true);







  async function loadData(){


    try{


      setLoading(true);




      const [

        profileResponse,

        subjectsResponse,

        gradesResponse,

        assignmentsResponse,

        filesResponse


      ] = await Promise.all([



        fetch(
          "/api/students/profile"
        ),



        fetch(
          "/api/students/subjects"
        ),



        fetch(
          "/api/students/grades"
        ),



        fetch(
          "/api/students/assignments"
        ),



        fetch(
          "/api/students/files"
        )



      ]);








      const profileData =
        await profileResponse.json();



      const subjectsData =
        await subjectsResponse.json();



      const gradesData =
        await gradesResponse.json();



      const assignmentsData =
        await assignmentsResponse.json();



      const filesData =
        await filesResponse.json();









      console.log(
        "STUDENT DASHBOARD DATA:",
        {
          profileData,
          subjectsData,
          gradesData,
          assignmentsData,
          filesData
        }
      );









      setProfile(

        profileResponse.ok

        ? profileData

        : null

      );







      setSubjects(

        subjectsResponse.ok &&
        Array.isArray(subjectsData)

        ? subjectsData

        : []

      );







      setGrades(

        gradesResponse.ok &&
        Array.isArray(gradesData)

        ? gradesData

        : []

      );







      setAssignments(

        assignmentsResponse.ok &&
        Array.isArray(assignmentsData)

        ? assignmentsData

        : []

      );







      setFiles(

        filesResponse.ok &&
        Array.isArray(filesData)

        ? filesData

        : []

      );






    }
    catch(error){



      console.error(

        "STUDENT DASHBOARD ERROR:",

        error

      );



    }
    finally{


      setLoading(false);


    }


  }









  useEffect(()=>{


    loadData();



  },[]);









  return {


    profile,


    subjects,


    grades,


    assignments,


    files,


    loading



  };


}