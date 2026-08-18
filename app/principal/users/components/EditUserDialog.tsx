"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { useState } from "react";

import type { User } from "../hooks/useUsers";



type EditUserDialogProps = {
  user: User;
  onSuccess: () => void;
};



export default function EditUserDialog({
  user,
  onSuccess,
}: EditUserDialogProps) {


  const [open, setOpen] = useState(false);


  const [formData, setFormData] = useState({

    firstName: user.firstName,

    lastName: user.lastName,

    username: user.username,

    phoneNumber: user.phoneNumber || "",

  });



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  }





  async function handleSubmit() {

    try {


      const response = await fetch(
        `/api/users/${user.userId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            formData
          ),

        }
      );



      const data =
        await response.json();



      if (!response.ok) {

        console.error(data);

        alert(
          "ویرایش کاربر ناموفق بود"
        );

        return;

      }



      onSuccess();

      setOpen(false);



    } catch (error) {

      console.error(error);

      alert(
        "خطای ارتباط با سرور"
      );

    }

  }





  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >


      <DialogTrigger>

        <Button
          size="sm"
          variant="outline"
        >
          ویرایش
        </Button>

      </DialogTrigger>





      <DialogContent

        dir="rtl"

        className="
        sm:max-w-md
        "

      >


        <DialogHeader>

          <DialogTitle>
            ویرایش اطلاعات کاربر
          </DialogTitle>

        </DialogHeader>





        <div
          className="
          space-y-5
          py-4
          "
        >



          <div className="space-y-2">

            <Label>
              نام
            </Label>

            <Input

              name="firstName"

              value={
                formData.firstName
              }

              onChange={
                handleChange
              }

            />

          </div>






          <div className="space-y-2">

            <Label>
              نام خانوادگی
            </Label>

            <Input

              name="lastName"

              value={
                formData.lastName
              }

              onChange={
                handleChange
              }

            />

          </div>






          <div className="space-y-2">

            <Label>
              نام کاربری
            </Label>

            <Input

              name="username"

              value={
                formData.username
              }

              onChange={
                handleChange
              }

            />

          </div>







          <div className="space-y-2">

            <Label>
              شماره تلفن
            </Label>

            <Input

              name="phoneNumber"

              value={
                formData.phoneNumber
              }

              onChange={
                handleChange
              }

            />

          </div>






          <Button

            className="
            w-full
            mt-2
            "

            onClick={
              handleSubmit
            }

          >

            ذخیره تغییرات

          </Button>





        </div>


      </DialogContent>


    </Dialog>

  );

}