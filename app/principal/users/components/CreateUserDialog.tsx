"use client";

import { useState } from "react";

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


type CreateUserDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess: () => void;
};


type Role =
  | "STUDENT"
  | "TEACHER"
  | "PRINCIPAL";



export default function CreateUserDialog({

  open,

  onOpenChange,

  onSuccess,

}:CreateUserDialogProps){



  const [formData,setFormData] = useState({

    firstName:"",

    lastName:"",

    nationalCode:"",

    phoneNumber:"",

    username:"",

    password:"",

    role:"STUDENT" as Role,

    studentCode:"",

    birthDate:"",

    specialization:"",

  });



  const [errors,setErrors] =
  useState<Record<string,string>>({});



  function resetForm(){
    setFormData({
      firstName:"",
      lastName:"",
      nationalCode:"",
      phoneNumber:"",
      username:"",
      password:"",
      role:"STUDENT",
      studentCode:"",
      birthDate:"",
      specialization:"",
    });
    setErrors({});
  }



  function handleChange(
    field:string,
    value:string | undefined
  ){

    setFormData(prev=>({

      ...prev,

      [field]: value ?? "",

    }));


    setErrors(prev=>({

      ...prev,

      [field]:"",

    }));

  }



  function validate(){


  const newErrors:
  Record<string,string> = {};



  if(!formData.firstName.trim()){

   newErrors.firstName =
   "نام الزامی است";

  }



  if(!formData.lastName.trim()){

   newErrors.lastName =
   "نام خانوادگی الزامی است";

  }



  if(!formData.nationalCode || formData.nationalCode.length !== 10 || !/^\d+$/.test(formData.nationalCode)){

    newErrors.nationalCode =
    "کد ملی باید ۱۰ رقم عددی باشد";

  }



  if(formData.username.length < 3){

   newErrors.username =
   "نام کاربری کوتاه است";

  }



  if(formData.password.length < 8){

   newErrors.password =
   "رمز عبور حداقل ۸ کاراکتر باشد";

  }



  if(
   formData.role==="STUDENT" &&
   !formData.studentCode
  ){

   newErrors.studentCode =
   "کد دانش‌آموزی الزامی است";

  }



  if(
   formData.role==="TEACHER" &&
   !formData.specialization
  ){

   newErrors.specialization =
   "تخصص الزامی است";

  }



  setErrors(newErrors);



  return Object.keys(newErrors).length===0;



  }



  async function handleSubmit(){



  if(!validate())
   return;



  const payload = {

    firstName:
    formData.firstName,

    lastName:
    formData.lastName,

    nationalCode:
    formData.nationalCode,

    phoneNumber:
    formData.phoneNumber || undefined,

    username:
    formData.username,

    password:
    formData.password,

    role:
    formData.role,


    ...(formData.role==="STUDENT" && {

      studentCode:
      formData.studentCode,

      birthDate:
      formData.birthDate,

    }),

    ...(formData.role==="TEACHER" && {

      specialization:
      formData.specialization,

    }),

  };



  try{



  const response =
  await fetch(

    "/api/users",

    {

      method:"POST",

      headers:{

        "Content-Type":
        "application/json",

      },


      body:
      JSON.stringify(payload),



    }

  );



  const data =
  await response.json();



  if(!response.ok){



    if(data.error === "NATIONAL_CODE_EXISTS"){

      setErrors(prev => ({
        ...prev,
        nationalCode:
          "این کد ملی قبلاً در سیستم ثبت شده است"
      }));

    }

    else if(data.details){

      const fieldErrors:
      Record<string,string> = {};

      for(
        const key
        in data.details
      ){

        const msgs =
          data.details[key];

        if(
          Array.isArray(msgs) &&
          msgs.length > 0
        ){

          fieldErrors[key] =
            msgs[0];

        }

      }

      setErrors(fieldErrors);

    }

    else{

      alert(
        "ایجاد کاربر ناموفق بود"
      );

    }


    return;

  }



  alert(
    "کاربر با موفقیت ایجاد شد"
  );



  console.log(
    "Created:",
    data
  );



  resetForm();

  onSuccess();

  if (onOpenChange) {
    onOpenChange(false);
  }



  }



  catch(error){

  console.error(error);

  alert(
    "خطای ارتباط با سرور"
  );

  }



  }



  return (

    <Dialog

      open={open}

      onOpenChange={onOpenChange}

    >



      <DialogTrigger>

        <Button>
          ایجاد کاربر جدید
        </Button>

      </DialogTrigger>



    <DialogContent

      dir="rtl"

      className="
      max-h-[85vh]
      overflow-y-auto
      sm:max-w-xl
      "

    >

      <DialogHeader>

        <DialogTitle>

          ایجاد کاربر جدید

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

             value={formData.firstName}

             onChange={(e)=>

               handleChange(

                 "firstName",

                 e.target.value

               )

             }

           />

{errors.firstName && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.firstName}

  </p>

)}

         </div>





        <div className="space-y-2">

          <Label>

            نام خانوادگی

          </Label>

           <Input

             value={formData.lastName}

             onChange={(e)=>

               handleChange(

                 "lastName",

                 e.target.value

               )

             }

           />

{errors.lastName && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.lastName}

  </p>

)}

         </div>




        <div className="space-y-2">

          <Label>

            کد ملی

          </Label>

           <Input

             value={formData.nationalCode}

             onChange={(e)=>

               handleChange(

                 "nationalCode",

                 e.target.value

               )

             }

           />

{errors.nationalCode && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.nationalCode}

  </p>

)}

         </div>




        <div className="space-y-2">

          <Label>

            شماره تماس

          </Label>

           <Input

             value={formData.phoneNumber}

             onChange={(e)=>

               handleChange(

                 "phoneNumber",

                 e.target.value

               )

             }

           />

{errors.phoneNumber && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.phoneNumber}

  </p>

)}

         </div>




        <div className="space-y-2">

          <Label>

            نام کاربری

          </Label>

           <Input

             value={formData.username}

             onChange={(e)=>

               handleChange(

                 "username",

                 e.target.value

               )

             }

           />

{errors.username && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.username}

  </p>

)}

         </div>




        <div className="space-y-2">

          <Label>

            رمز عبور

          </Label>

           <Input

             type="password"

             value={formData.password}

             onChange={(e)=>

               handleChange(

                 "password",

                 e.target.value

               )

             }

           />

{errors.password && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.password}

  </p>

)}

         </div>




        <div className="space-y-2">

          <Label>

            نقش

          </Label>



          <Select

            value={formData.role}

            onValueChange={(value)=>

              handleChange(

                "role",

                value as Role

              )

            }

          >

            <SelectTrigger>

              <SelectValue />

            </SelectTrigger>



            <SelectContent>



              <SelectItem value="STUDENT">

                دانش‌آموز

              </SelectItem>



              <SelectItem value="TEACHER">

                معلم

              </SelectItem>



              <SelectItem value="PRINCIPAL">

                مدیر

              </SelectItem>



            </SelectContent>



          </Select>



        </div>



        {
          formData.role === "STUDENT" && (

            <>



              <div className="space-y-2">

                <Label>

                  کد دانش‌آموزی

                </Label>



                 <Input

                   value={formData.studentCode}

                   onChange={(e)=>

                     handleChange(

                       "studentCode",

                       e.target.value

                     )

                   }

                 />

{errors.studentCode && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.studentCode}

  </p>

)}

               </div>




              <div className="space-y-2">

                <Label>

                  تاریخ تولد

                </Label>



                <Input

                  type="date"

                  value={formData.birthDate}

                  onChange={(e)=>

                    handleChange(

                      "birthDate",

                      e.target.value

                    )

                  }

                />

              </div>



            </>

          )

        }



        {
          formData.role === "TEACHER" && (

            <div className="space-y-2">

              <Label>

                تخصص

              </Label>



               <Input

                 value={formData.specialization}

                 onChange={(e)=>

                   handleChange(

                     "specialization",

                     e.target.value

                   )

                 }

               />

{errors.specialization && (

  <p

    className="

    text-sm

    text-red-500

    "

  >

    {errors.specialization}

  </p>

)}

             </div>


          )

        }



        <Button

          className="
          w-full
          mt-4
          "

          onClick={handleSubmit}

        >

          ذخیره کاربر

        </Button>



      </div>



    </DialogContent>



  </Dialog>



);



}
