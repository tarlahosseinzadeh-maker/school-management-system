"use client";

import { Button } from "@/components/ui/button";


type ToggleUserStatusProps = {
  userId: number;
  isActive: boolean;
  onSuccess: () => void;
};



export default function ToggleUserStatus({
  userId,
  isActive,
  onSuccess,
}: ToggleUserStatusProps) {


  async function handleToggle() {


    const confirmed = window.confirm(
      isActive
        ? "آیا می‌خواهید این کاربر غیرفعال شود؟"
        : "آیا می‌خواهید این کاربر فعال شود؟"
    );


    if (!confirmed) {
      return;
    }



    try {


      const response = await fetch(
        `/api/users/${userId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            isActive: !isActive,
          }),

        }
      );



      const data =
        await response.json();



      if (!response.ok) {

        console.error(data);

        alert(
          "تغییر وضعیت ناموفق بود"
        );

        return;

      }



      onSuccess();



    } catch (error) {

      console.error(error);

      alert(
        "خطای ارتباط با سرور"
      );

    }

  }




  return (

    <Button
      size="sm"
      variant={
        isActive
          ? "destructive"
          : "default"
      }
      onClick={handleToggle}
    >

      {
        isActive
          ? "غیرفعال کردن"
          : "فعال کردن"
      }

    </Button>

  );

}