"use client";


import {
  useState
} from "react";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { Badge } from "@/components/ui/badge";


import { Button } from "@/components/ui/button";


import type {
  PreRegistration,
} from "../types";





type Props = {

  registrations: PreRegistration[];

  onSuccess: () => void;

};







export default function PreRegistrationTable({

  registrations,

  onSuccess,

}: Props) {



  const [loadingId,setLoadingId] =
    useState<number | null>(null);









  async function checkRegistration(
    id:number
  ){


    console.log(
      "CLICK CHECK:",
      id
    );



    try{


      setLoadingId(id);





      const response =
        await fetch(
          `/api/pre-registrations/${id}`,
          {

            method:"PUT",

          }
        );




      console.log(
        "RESPONSE STATUS:",
        response.status
      );






      if(!response.ok){


        const errorData =
          await response.json()
          .catch(()=>null);



        console.log(
          "ERROR RESPONSE:",
          errorData
        );



        throw new Error(
          "خطا در تغییر وضعیت"
        );


      }







      await onSuccess();




      console.log(
        "REFRESH DONE"
      );




    }
    catch(error){


      console.error(
        "CHECK ERROR:",
        error
      );



      alert(
        "خطا در بررسی درخواست"
      );



    }
    finally{


      setLoadingId(null);


    }


  }









  return (

    <div
      className="data-table-wrap"
      dir="rtl"
    >


      <Table>


        <TableHeader>


          <TableRow>


            <TableHead className="text-right">
              نام دانش‌آموز
            </TableHead>


            <TableHead className="text-right">
              نام پدر
            </TableHead>


            <TableHead className="text-right">
              شماره تماس
            </TableHead>


            <TableHead className="text-right">
              پایه درخواستی
            </TableHead>


            <TableHead className="text-right">
              وضعیت
            </TableHead>


            <TableHead className="text-right">
              تاریخ ثبت
            </TableHead>


            <TableHead className="text-right">
              عملیات
            </TableHead>


          </TableRow>


        </TableHeader>








        <TableBody>



          {
            registrations.map((item)=>(


              <TableRow

                key={
                  item.preRegistrationId
                }

              >






                <TableCell className="text-right">

                  {item.studentFirstName}

                  {" "}

                  {item.studentLastName}


                </TableCell>








                <TableCell className="text-right">

                  {
                    item.fatherName || "-"
                  }

                </TableCell>








                <TableCell className="text-right">

                  {
                    item.phoneNumber
                  }

                </TableCell>








                <TableCell className="text-right">

                  {
                    item.requestedGrade
                  }

                </TableCell>









                <TableCell className="text-right">


                  <Badge>

                    {
                      item.status === "PENDING"

                      ?

                      "در انتظار بررسی"

                      :

                      "بررسی شده"

                    }


                  </Badge>


                </TableCell>









                <TableCell className="text-right">


                  {
                    new Date(
                      item.createdAt
                    )
                    .toLocaleDateString(
                      "fa-IR"
                    )
                  }


                </TableCell>









                <TableCell className="text-right">


                  {
                    item.status === "PENDING" && (


                      <Button


                        size="sm"


                        onClick={()=>{

                          console.log(
                            "BUTTON CLICKED"
                          );


                          checkRegistration(
                            item.preRegistrationId
                          );


                        }}



                        disabled={
                          loadingId === item.preRegistrationId
                        }


                      >


                        {
                          loadingId === item.preRegistrationId

                          ?

                          "در حال بررسی..."

                          :

                          "✓ بررسی شد"

                        }



                      </Button>


                    )
                  }


                </TableCell>






              </TableRow>


            ))
          }









          {
            registrations.length === 0 && (


              <TableRow>


                <TableCell

                  colSpan={7}

                  className="text-center"

                >

                  درخواست پیش‌ثبت‌نامی وجود ندارد


                </TableCell>


              </TableRow>


            )
          }







        </TableBody>


      </Table>


    </div>


  );


}