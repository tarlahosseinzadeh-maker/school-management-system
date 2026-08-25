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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { GRADE_OPTIONS } from "@/src/constants/grades";



type CreateSubjectDialogProps = {
  onSuccess: () => void;
};





export default function CreateSubjectDialog({
  onSuccess,
}:CreateSubjectDialogProps){



  const [open, setOpen] =
    useState(false);



  const [formData, setFormData] = useState({

    subjectName: "",

    gradeLevel: "",

    description: "",

  });



  const [errors, setErrors] = useState<Record<string, string>>({});





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


    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));

  }



  function handleSelectChange(value: string | null) {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        gradeLevel: value,
      }));
      setErrors((prev) => ({
        ...prev,
        gradeLevel: "",
      }));
    }
  }



  function validate(){


  const newErrors:
  Record<string,string> = {};



  if(!formData.subjectName.trim()){

   newErrors.subjectName =
   "نام درس الزامی است";

  }



  if(!formData.gradeLevel){

    newErrors.gradeLevel =
    "پایه تحصیلی الزامی است";

  }



  setErrors(newErrors);



  return Object.keys(newErrors).length===0;



  }





  async function handleSubmit(){



    if(!validate())
      return;





    try{



      const response =
        await fetch(
          "/api/subjects",
          {

            method:"POST",

            headers:{
              "Content-Type":"application/json",
            },


            body:
              JSON.stringify({

                subjectName:
                  formData.subjectName,


                gradeLevel:
                  formData.gradeLevel,


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

    <Dialog>

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

          {errors.subjectName && (
            <p className="text-red-500 text-sm">{errors.subjectName}</p>
          )}





          <div className="space-y-2">

            <Label>پایه تحصیلی</Label>



            <Select

              value={formData.gradeLevel}

              onValueChange={handleSelectChange}

            >

              <SelectTrigger>

                <SelectValue placeholder="انتخاب پایه" />

              </SelectTrigger>



              <SelectContent>

                {GRADE_OPTIONS.map((grade) => (

                  <SelectItem

                    key={grade.value}

                    value={grade.value}

                  >

                    {grade.label}

                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          {errors.gradeLevel && (
            <p className="text-red-500 text-sm">{errors.gradeLevel}</p>
          )}





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
