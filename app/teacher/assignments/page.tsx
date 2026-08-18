import { requireTeacher } from "@/src/utils/auth";
import { getTeacherClasses } from "@/src/services/teacher.service";
import AssignmentsClient from "../components/AssignmentsClient";
import type { TeacherClassSubject } from "../types";

export default async function AssignmentsPage() {
  const { teacherId } = await requireTeacher();
  const classes = await getTeacherClasses(teacherId);

  return (
    <AssignmentsClient classes={classes as TeacherClassSubject[]} />
  );
}
