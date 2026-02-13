import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["User"],

  endpoints: (build) => ({
    // olib kelish
    getUsers: build.query({
      query: (url) => url,
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // saqlash
    addUser: build.mutation({
      query: (body) => {
        const length = 10;
        const chars = "sdfghjjklzxcvbnbfghjkkjhghjm123456789876";
        let token = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          token = token + chars[randomIndex];
        }
        return {
          url: "/users",
          method: "POST",
          body: {
            ...body,
            token: token,
          },
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    
// editqilish
getEdit:build.mutation({
query:(data)=>{
const {id,...body}=data;
return{
  url:`/users/${id}`,
  method:"PUT",
  body
}
},
invalidatesTags:[{type:"User",id:"LIST"}]
})

// editqilish

  }),
});

export const { useGetUsersQuery, useAddUserMutation,useGetEditMutation } = userApi;



