import { requireTeacher } from "@/src/utils/auth";
import { getTeacherClasses } from "@/src/services/teacher.service";
import FilesClient from "../components/FilesClient";
import type { TeacherClassSubject } from "../types";

export default async function FilesPage() {
  const { teacherId } = await requireTeacher();
  const classes = await getTeacherClasses(teacherId);

  return <FilesClient classes={classes as TeacherClassSubject[]} />;
}
