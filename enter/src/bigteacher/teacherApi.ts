import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["User"],

  endpoints: (build) => ({
    getTeacher: build.query({
      query: (url) => url,
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    addLesson: build.mutation({
      query: (body) => ({
        url: "/teacher",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    delObj: build.mutation({
      query: (id) => ({
        url: `/teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useAddLessonMutation, useGetTeacherQuery, useDelObjMutation } =
  teacherApi;
