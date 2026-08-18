import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { Badge } from "@/components/ui/badge";


import EditSubjectDialog from "./EditSubjectDialog";


import type { Subject } from "../types";



type SubjectTableProps = {
  subjects: Subject[];
  onSuccess: () => void;
};





export default function SubjectTable({
  subjects,
  onSuccess,
}: SubjectTableProps) {


  return (

    <div
      className="data-table-wrap"
      dir="rtl"
    >

      <Table>


        <TableHeader>

          <TableRow>


            <TableHead className="text-right">
              نام درس
            </TableHead>


            <TableHead className="text-right">
              پایه
            </TableHead>


            <TableHead className="text-right">
              توضیحات
            </TableHead>


            <TableHead className="text-right">
              عملیات
            </TableHead>


          </TableRow>


        </TableHeader>





        <TableBody>


          {
            subjects.map((subject) => (

              <TableRow
                key={subject.subjectId}
              >



                <TableCell className="text-right">

                  {subject.subjectName}

                </TableCell>





                <TableCell className="text-right">


                  {
                    subject.gradeLevel ? (

                      <Badge>
                        {subject.gradeLevel}
                      </Badge>

                    ) : (

                      "-"
                    )
                  }


                </TableCell>







                <TableCell className="text-right">

                  {
                    subject.description ||
                    "-"
                  }

                </TableCell>







                <TableCell className="text-right">


                  <EditSubjectDialog

                    subject={subject}

                    onSuccess={onSuccess}

                  />


                </TableCell>






              </TableRow>

            ))
          }





          {
            subjects.length === 0 && (

              <TableRow>


                <TableCell

                  colSpan={4}

                  className="text-center"

                >

                  درسی پیدا نشد


                </TableCell>


              </TableRow>

            )
          }





        </TableBody>


      </Table>


    </div>


  );


}