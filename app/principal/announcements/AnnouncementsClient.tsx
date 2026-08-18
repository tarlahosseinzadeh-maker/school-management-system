"use client";


import { useEffect, useState } from "react";
import AnnouncementTable from "./components/AnnouncementTable";

import type {
  Announcement
} from "./types";
import AnnouncementForm from "./AnnouncementForm";


export default function AnnouncementsClient() {


  const [
    announcements,
    setAnnouncements
  ] = useState<Announcement[]>([]);



  const [
    loading,
    setLoading
  ] = useState(true);




  async function loadAnnouncements() {


    try {


      const response =
        await fetch(
          "/api/announcements"
        );


      const data =
        await response.json();



      setAnnouncements(data);



    } catch (error) {


      console.error(
        "LOAD ANNOUNCEMENTS ERROR:",
        error
      );


    } finally {


      setLoading(false);

    }


  }





  useEffect(() => {

    loadAnnouncements();

  }, []);





  if (loading) {
    return <div className="ui-loading">در حال بارگذاری...</div>;
  }

  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="page-title">مدیریت اطلاعیه‌ها</h1>


<AnnouncementForm
  onCreated={loadAnnouncements}
/>


<AnnouncementTable
  announcements={announcements}
/>


</div>

);

}