export default function ForbiddenPage() {

  return (

    <main
      dir="rtl"
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      "
    >

      <div
        className="
        bg-white
        border
        rounded-xl
        p-8
        text-center
        shadow-sm
        "
      >

        <div className="text-5xl mb-4">
          ⛔
        </div>


        <h1 className="text-2xl font-bold">
          دسترسی غیرمجاز
        </h1>


        <p className="mt-3 text-gray-500">
          شما اجازه مشاهده این صفحه را ندارید.
        </p>


      </div>

    </main>

  );

}