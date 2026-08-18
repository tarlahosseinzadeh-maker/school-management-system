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

import EditClassDialog from "./EditClassDialog";

import type { SchoolClass } from "../types";





type ClassTableProps = {

  classes: SchoolClass[];

  onSuccess: () => void;

  onManageSubjects: (
    schoolClass: SchoolClass
  ) => void;


  onManageStudents: (
    schoolClass: SchoolClass
  ) => void;

};






export default function ClassTable({

  classes,

  onSuccess,

  onManageSubjects,

  onManageStudents,

}: ClassTableProps) {


  return (


    <div
      dir="rtl"
      className="
      overflow-hidden
      rounded-xl
      border
      bg-white
      "
    >


      <Table>


        <TableHeader>


          <TableRow
            className="
            bg-gray-50
            "
          >


            <TableHead className="text-right">
              نام کلاس
            </TableHead>


            <TableHead className="text-right">
              پایه
            </TableHead>


            <TableHead className="text-right">
              ظرفیت
            </TableHead>


            <TableHead className="text-right">
              سال تحصیلی
            </TableHead>


            <TableHead className="text-center">
              عملیات
            </TableHead>


          </TableRow>


        </TableHeader>





        <TableBody>


          {
            classes.map((item)=>(


              <TableRow

                key={item.classId}

                className="
                hover:bg-gray-50
                transition
                "

              >



                <TableCell>

                  <span className="font-medium">
                    {item.className}
                  </span>

                </TableCell>





                <TableCell>


                  <Badge
                    variant="secondary"
                  >

                    {item.gradeLevel}

                  </Badge>


                </TableCell>





                <TableCell>

                  {item.capacity}

                </TableCell>





                <TableCell>

                  {item.academicYear}

                </TableCell>





                <TableCell>


                  <div
                    className="
                    flex
                    justify-center
                    flex-wrap
                    gap-2
                    "
                  >



                    <EditClassDialog

                      schoolClass={item}

                      onSuccess={onSuccess}

                    />





                    <Button

                      variant="outline"

                      onClick={() =>
                        onManageSubjects(item)
                      }

                    >

                      مدیریت درس‌ها

                    </Button>





                    <Button

                      onClick={() =>
                        onManageStudents(item)
                      }

                    >

                      دانش‌آموزان

                    </Button>




                  </div>


                </TableCell>





              </TableRow>


            ))
          }









          {
            classes.length === 0 && (

              <TableRow>


                <TableCell

                  colSpan={5}

                  className="
                  text-center
                  py-8
                  text-gray-500
                  "

                >

                  کلاسی پیدا نشد


                </TableCell>


              </TableRow>

            )
          }





        </TableBody>


      </Table>


    </div>


  );

}