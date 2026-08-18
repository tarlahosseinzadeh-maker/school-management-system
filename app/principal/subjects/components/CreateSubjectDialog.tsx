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



type CreateSubjectDialogProps = {
  onSuccess: () => void;
};





export default function CreateSubjectDialog({
  onSuccess,
}: CreateSubjectDialogProps) {


  const [open, setOpen] =
    useState(false);



  const [formData, setFormData] = useState({

    subjectName: "",

    gradeLevel: "",

    description: "",

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
          "/api/subjects",
          {

            method: "POST",

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
          "ایجاد درس ناموفق بود"
        );


        return;

      }






      onSuccess();


      setOpen(false);





      setFormData({

        subjectName: "",

        gradeLevel: "",

        description: "",

      });



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
          className="bg-blue-600 text-white hover:bg-blue-700"
        >

          + ایجاد درس

        </Button>


      </DialogTrigger>







      <DialogContent
        dir="rtl"
      >


        <DialogHeader>


          <DialogTitle>

            ایجاد درس جدید

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

            placeholder="پایه تحصیلی (اختیاری)"

          />







          <Textarea

            name="description"

            value={
              formData.description
            }

            onChange={
              handleChange
            }

            placeholder="توضیحات (اختیاری)"

          />







          <Button

            className="w-full"

            onClick={
              handleSubmit
            }

          >

            ذخیره درس

          </Button>





        </div>





      </DialogContent>




    </Dialog>


  );


}