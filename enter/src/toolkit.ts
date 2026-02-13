import { configureStore, createSlice, } from "@reduxjs/toolkit";
import { userApi } from "./api";
import { teacherApi } from "./bigteacher/teacherApi";

const slice =createSlice({
    name:"count",

    initialState:{
user:{
    name:"",
    phone:"",
    email:"",
    password:"",
    role:"",
},
users:[],
current:null,
chekPass:false,
},

reducers:{
getName:(state,action)=>{
    state.user.name=action.payload
},
getPhone:(state,action)=>{
state.user.phone=action.payload
},
getEmail:(state,action)=>{
    state.user.email=action.payload
},

getPass:(state,action)=>{
    if(action.payload.length>=8){
        state.user.password=action.payload
      state.chekPass=false
    }else{
state.chekPass=true
    }

},
getRole:(state,action)=>{
    state.user.role=action.payload;
},
getEdit:(state,action)=>{
state.current=action.payload.id
state.user=action.payload
}

},
})

// teacher companentaniki
const teacher=createSlice({
name:"teacher",
initialState:{
obj:{
 name:"",
 age:"",
 day:"",
 select:"",
 url:"",
 vidyo:"",
 img:"",
    },
},
reducers:{
getName:(state,action)=>{
state.obj.name=action.payload
},
getAge:(state,action)=>{
    state.obj.age=action.payload
},
getDay:(state,action)=>{
    state.obj.day=action.payload
},
getSelect:(state,action)=>{
state.obj.select=action.payload
},
getVidyo:(state,action)=>{
state.obj.vidyo=action.payload
},

getUrl:(state,action)=>{
    state.obj.url=action.payload
},
getImg:(state,action)=>{
    state.obj.img=action.payload
},
clear:(state:any)=>{
state.obj={
name:"",
age:"",
day:"",
select:"",
url:"",
vidyo:"",
}

}


}
})


export const store=configureStore({
reducer:{
    count:slice.reducer,
    // 2 techer
    teacher:teacher.reducer,
    [userApi.reducerPath]:userApi.reducer,
    // 2 techerniki
    [teacherApi.reducerPath]:teacherApi.reducer,
},

middleware:( getDefaultMiddleware)=> getDefaultMiddleware().concat(userApi.middleware,teacherApi.middleware)
})

export const actions={...slice.actions}
export const lesson={...teacher.actions}


