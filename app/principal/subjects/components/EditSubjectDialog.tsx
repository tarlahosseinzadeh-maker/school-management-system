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

import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";

import type { Subject } from "../types";



type EditSubjectDialogProps = {
  subject: Subject;
  onSuccess: () => void;
};





export default function EditSubjectDialog({
  subject,
  onSuccess,
}: EditSubjectDialogProps) {


  const [open, setOpen] =
    useState(false);



  const [formData, setFormData] =
    useState({

      subjectName:
        subject.subjectName,


      gradeLevel:
        subject.gradeLevel ?? "",


      description:
        subject.description ?? "",

    });








  function handleChange(
    e:
      React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
  ) {


    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });


  }








  async function handleSubmit() {


    try {


      const response =
        await fetch(
          `/api/subjects/${subject.subjectId}`,
          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

            },


            body:
              JSON.stringify({

                subjectName:
                  formData.subjectName,


                gradeLevel:
                  formData.gradeLevel || null,


                description:
                  formData.description || null,

              }),

          }
        );






      const data =
        await response.json();






      if (!response.ok) {


        console.error(data);


        alert(
          "ویرایش درس ناموفق بود"
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

<Button>
  ویرایش
</Button>

      </DialogTrigger>







      <DialogContent
        dir="rtl"
      >


        <DialogHeader>


          <DialogTitle>

            ویرایش درس

          </DialogTitle>


        </DialogHeader>







        <div className="space-y-4">





          <Input

            name="subjectName"

            value={
              formData.subjectName
            }

            onChange={
              handleChange
            }

            placeholder="نام درس"

          />







          <Input

            name="gradeLevel"

            value={
              formData.gradeLevel
            }

            onChange={
              handleChange
            }

            placeholder="پایه تحصیلی"

          />







          <Textarea

            name="description"

            value={
              formData.description
            }

            onChange={
              handleChange
            }

            placeholder="توضیحات"

          />







          <Button

            className="w-full"

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