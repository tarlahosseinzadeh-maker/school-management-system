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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import type { SchoolClass } from "../types";

import { GRADE_OPTIONS } from "@/src/constants/grades";



type EditClassDialogProps = {
  schoolClass: SchoolClass;
  onSuccess: () => void;
};



export default function EditClassDialog({
  schoolClass,
  onSuccess,
}: EditClassDialogProps) {



  const [open, setOpen] = useState(false);



  const [formData, setFormData] = useState({

    className:
      schoolClass.className,

    gradeLevel:
      schoolClass.gradeLevel,

    capacity:
      String(schoolClass.capacity),

    academicYear:
      schoolClass.academicYear,

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


      const payload = {

        className:
          formData.className,


        gradeLevel:
          formData.gradeLevel,


        capacity:
          Number(formData.capacity),

        academicYear:
          formData.academicYear,

      };





      const response =
        await fetch(
          `/api/classes/${schoolClass.classId}`,
          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

            },

            body:
              JSON.stringify(payload),

          }
        );





      const data =
        await response.json();





      if (!response.ok) {


        console.error(data);



        alert(
          "ویرایش کلاس ناموفق بود"
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

            ویرایش کلاس

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
              نام کلاس
            </Label>



            <Input

              name="className"

              value={
                formData.className
              }

              onChange={
                handleChange
              }

            />

          </div>





          <div className="space-y-2">

            <Label>
              پایه
            </Label>



            <Select

              value={formData.gradeLevel}

              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  gradeLevel: value || "",
                })
              }

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





          <div className="space-y-2">

            <Label>
              ظرفیت
            </Label>



            <Input

              name="capacity"

              type="number"

              value={
                formData.capacity
              }

              onChange={
                handleChange
              }

            />

          </div>





          <div className="space-y-2">

            <Label>
              سال تحصیلی
            </Label>



            <Input

              name="academicYear"

              value={
                formData.academicYear
              }

              onChange={
                handleChange
              }

            />

          </div>





          <Button

            className="
            w-full
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
