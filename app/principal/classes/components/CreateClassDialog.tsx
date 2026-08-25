"use client";


import {
  useState
} from "react";


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

import { GRADE_OPTIONS } from "@/src/constants/grades";



type Props = {

  onSuccess:()=>void;

};





export default function CreateClassDialog({

  onSuccess,

}:Props){



const [open,setOpen] =
  useState(false);



const [className,setClassName] =
  useState("");



const [gradeLevel,setGradeLevel] =
  useState<string>("");



const [capacity,setCapacity] =
  useState("");



const [academicYear,setAcademicYear] =
  useState("");





async function createClass(){



const response =
  await fetch(
    "/api/classes",
    {

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },


      body:JSON.stringify({

        className,

        gradeLevel,

        capacity:Number(capacity),

        academicYear,

      })


    }
  );





  if(response.ok){



    setClassName("");

    setGradeLevel("");

    setCapacity("");

    setAcademicYear("");

    setOpen(false);


    onSuccess();



  }



}





return (


  <Dialog

    open={open}

    onOpenChange={setOpen}

  >



    <DialogTrigger>



      <Button>

        ایجاد کلاس جدید

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

          ایجاد کلاس جدید

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



            value={className}



            onChange={(e)=>

              setClassName(
                e.target.value
              )

            }



          />



        </div>





        <div className="space-y-2">



          <Label>

            پایه

          </Label>



          <Select

            value={gradeLevel}

            onValueChange={(value) => setGradeLevel(value || "")}

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

            ظرفیت کلاس

          </Label>



          <Input

            type="number"



            value={capacity}



            onChange={(e)=>

              setCapacity(
                e.target.value
              )

            }



          />



        </div>





        <div className="space-y-2">



          <Label>

            سال تحصیلی

          </Label>



          <Input



            placeholder="مثلا 1405-1406"



            value={academicYear}



            onChange={(e)=>

              setAcademicYear(
                e.target.value
              )

            }



          />



        </div>





        <Button

          onClick={createClass}

          className="
          w-full
          mt-2
          "

        >

          ذخیره کلاس

        </Button>





      </div>





    </DialogContent>





  </Dialog>



);



}
