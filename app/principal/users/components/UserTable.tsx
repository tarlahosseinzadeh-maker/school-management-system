import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import EditUserDialog from "./EditUserDialog";
import ToggleUserStatus from "./ToggleUserStatus";


type User = {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  nationalCode: string;
  role: "STUDENT" | "TEACHER" | "PRINCIPAL";
  isActive: boolean;
};


type UserTableProps = {
  users: User[];
  onSuccess: () => void;
};



function roleLabel(
  role: User["role"]
) {

  switch (role) {

    case "STUDENT":
      return "دانش‌آموز";

    case "TEACHER":
      return "معلم";

    case "PRINCIPAL":
      return "مدیر";

    default:
      return role;

  }

}



function roleVariant(
  role: User["role"]
) {

  switch(role){

    case "STUDENT":
      return "secondary";

    case "TEACHER":
      return "default";

    case "PRINCIPAL":
      return "outline";

  }

}



export default function UserTable({
  users,
  onSuccess,
}: UserTableProps) {


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

          <TableRow>


            <TableHead className="text-right">
              نام
            </TableHead>


            <TableHead className="text-right">
              نام خانوادگی
            </TableHead>


            <TableHead className="text-right">
              نام کاربری
            </TableHead>


            <TableHead className="text-right">
              کد ملی
            </TableHead>


            <TableHead className="text-right">
              نقش
            </TableHead>


            <TableHead className="text-right">
              وضعیت
            </TableHead>


            <TableHead className="text-right">
              عملیات
            </TableHead>


          </TableRow>

        </TableHeader>





        <TableBody>


          {
            users.map((user)=>(


              <TableRow
                key={user.userId}
                className="
                hover:bg-gray-50
                transition
                "
              >


                <TableCell>
                  {user.firstName}
                </TableCell>


                <TableCell>
                  {user.lastName}
                </TableCell>


                <TableCell>
                  {user.username}
                </TableCell>


                <TableCell>
                  {user.nationalCode}
                </TableCell>



                <TableCell>

                  <Badge
                    variant={
                      roleVariant(user.role) as any
                    }
                  >

                    {roleLabel(user.role)}

                  </Badge>

                </TableCell>




                <TableCell>


                  {
                    user.isActive

                    ?

                    <Badge
                      className="
                      bg-green-100
                      text-green-700
                      hover:bg-green-100
                      "
                    >
                      فعال
                    </Badge>


                    :


                    <Badge
                      variant="destructive"
                    >
                      غیرفعال
                    </Badge>

                  }


                </TableCell>





                <TableCell>

                  <div
                    className="
                    flex
                    gap-2
                    "
                  >

                    <EditUserDialog
                      user={user}
                      onSuccess={onSuccess}
                    />


                    <ToggleUserStatus
                      userId={user.userId}
                      isActive={user.isActive}
                      onSuccess={onSuccess}
                    />


                  </div>

                </TableCell>



              </TableRow>


            ))
          }






          {
            users.length === 0 && (

              <TableRow>

                <TableCell
                  colSpan={7}
                  className="
                  text-center
                  py-8
                  text-gray-500
                  "
                >

                  کاربری پیدا نشد

                </TableCell>

              </TableRow>

            )
          }



        </TableBody>


      </Table>


    </div>

  );

}
