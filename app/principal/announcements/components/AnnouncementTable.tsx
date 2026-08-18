import type {
  Announcement
} from "../types";



interface Props {

  announcements: Announcement[];

}



export default function AnnouncementTable({
  announcements
}: Props) {



  if (announcements.length === 0) {

    return (

      <div className="empty-state">هنوز اطلاعیه‌ای ثبت نشده است.</div>

    );

  }





  return (

    <div className="data-table-wrap">


      <table className="w-full">


        <thead>

          <tr className="border-b">

            <th className="p-3">
              عنوان
            </th>

            <th className="p-3">
              متن
            </th>

            <th className="p-3">
              وضعیت
            </th>

            <th className="p-3">
              تاریخ
            </th>


          </tr>

        </thead>



        <tbody>


          {
            announcements.map(
              (item) => (

                <tr
                  key={
                    item.announcementId
                  }
                  className="border-b"
                >


                  <td className="p-3">

                    {item.title}

                  </td>



                  <td className="p-3">

                    {item.content}

                  </td>



                  <td className="p-3">

                    {
                      item.isPublished
                      ? "منتشر شده"
                      : "غیرفعال"
                    }

                  </td>



                  <td className="p-3">

                    {
                      new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "fa-IR"
                      )
                    }

                  </td>



                </tr>

              )

            )
          }


        </tbody>


      </table>


    </div>

  );

}