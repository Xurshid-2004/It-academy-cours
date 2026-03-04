import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase";
import { ref, get, push, update, remove } from "firebase/database";

interface Teacher {
  id: string;
  name: string;
  description: string;
  day: string;
  type: string;
  url: string;
  video: string;
  teacherId: string;
  img?: string;
}

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Teacher"],

  endpoints: (build) => ({
    // Barcha o'qituvchilarni olish
    getTeachers: build.query<Teacher[], void>({
      async queryFn() {
        try {
          const snapshot = await get(ref(db, "teacher"));
          if (snapshot.exists()) {
            const data = snapshot.val();
            const teachers = Object.entries(data).map(([id, value]: any) => ({
              id,
              ...value,
            }));
            return { data: teachers };
          }
          return { data: [] };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: (result: Teacher[] | undefined) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Teacher" as const, id })),
              { type: "Teacher" as const, id: "LIST" },
            ]
          : [{ type: "Teacher" as const, id: "LIST" }],
    }),

    // Yangi o'qituvchi qo'shish
    addTeacher: build.mutation<Teacher, Partial<Teacher>>({
      async queryFn(body) {
        try {
          const newRef = await push(ref(db, "teacher"), {
            ...body,
            img: body.img,
          });
          return { data: { id: newRef.key!, ...body } as Teacher };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),

    // O'qituvchini tahrirlash
    editTeacher: build.mutation<Teacher, { id: string } & Partial<Teacher>>({
      async queryFn(data) {
        try {
          const { id, ...body } = data;
          await update(ref(db, `teacher/${id}`), { ...body });
          return { data: { id, ...body } as Teacher };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),

    // O'qituvchini o'chirish
    deleteTeacher: build.mutation<string, string>({
      async queryFn(id: string) {
        try {
          await remove(ref(db, `teacher/${id}`));
          return { data: id };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useAddTeacherMutation,
  useEditTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;