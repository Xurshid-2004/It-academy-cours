import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "./api";
import { teacherApi } from "./bigteacher/teacherApi";

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

interface Teacher {
  name: string;
  age: string;
  day: string;
  select: string;
  url: string;
  vidyo: string;
  img: string;
}

interface CountState {
  user: User;
  users: User[];
  current: string | null;
  chekPass: boolean;
}

interface TeacherState {
  obj: Teacher;
}

const slice = createSlice({
  name: "count",
  initialState: {
    user: {
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "",
    },
    users: [],
    current: null,
    chekPass: false,
  } as CountState,
  reducers: {
    getName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    getPhone: (state, action: PayloadAction<string>) => {
      state.user.phone = action.payload;
    },
    getEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    getPass: (state, action: PayloadAction<string>) => {
      if (action.payload.length >= 8) {
        state.user.password = action.payload;
        state.chekPass = false;
      } else {
        state.chekPass = true;
      }
    },
    getRole: (state, action: PayloadAction<string>) => {
      state.user.role = action.payload;
    },
    getEdit: (state, action: PayloadAction<User & { id: string }>) => {
      state.current = action.payload.id;
      state.user = action.payload;
    },
  },
});

// teacher companentaniki
const teacher = createSlice({
  name: "teacher",
  initialState: {
    obj: {
      name: "",
      age: "",
      day: "",
      select: "",
      url: "",
      vidyo: "",
      img: "",
    },
  } as TeacherState,
  reducers: {
    getName: (state, action: PayloadAction<string>) => {
      state.obj.name = action.payload;
    },
    getAge: (state, action: PayloadAction<string>) => {
      state.obj.age = action.payload;
    },
    getDay: (state, action: PayloadAction<string>) => {
      state.obj.day = action.payload;
    },
    getSelect: (state, action: PayloadAction<string>) => {
      state.obj.select = action.payload;
    },
    getVidyo: (state, action: PayloadAction<string>) => {
      state.obj.vidyo = action.payload;
    },
    getUrl: (state, action: PayloadAction<string>) => {
      state.obj.url = action.payload;
    },
    getImg: (state, action: PayloadAction<string>) => {
      state.obj.img = action.payload;
    },
    clear: (state) => {
      state.obj = {
        name: "",
        age: "",
        day: "",
        select: "",
        url: "",
        vidyo: "",
        img: "",
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    count: slice.reducer,
    // 2 techer
    teacher: teacher.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // 2 techerniki
    [teacherApi.reducerPath]: teacherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, teacherApi.middleware),
});

export const actions = { ...slice.actions };
export const lesson = { ...teacher.actions };


