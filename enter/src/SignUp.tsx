import  { connect } from "react-redux"
import { useAddUserMutation} from "./api"
import { actions } from "./toolkit"
import { useNavigate } from "react-router-dom"

const SignUp=(props:any)=>{
    const [addUser,{}]=useAddUserMutation();
    const navigate =useNavigate();

  function signUser(){
      if (props.chekPass) return;
    addUser(props.user);
    navigate("/sign-in")
}  
    
return <div className="h-[540px] bg-gradient-to-r from-rose-400 via-violet-600 to-indigo-900 p-8 text-white rounded-2xl">

<div className=" w-1/4 shadow bg-blue-200 rounded p-3 mx-auto">
<input onChange={(e)=>props.getName(e.target.value)} placeholder="name"  className="form-control mb-2" type="text" />
<input onChange={(e)=>props.getPhone(e.target.value)} placeholder="phone"  className="form-control mb-2" type="text" />
<input onChange={(e)=>props.getEmail(e.target.value)} placeholder="email"  className="form-control mb-2" type="text" />
<input onChange={(e)=>props.getPass(e.target.value)}  placeholder="pasword"  className="form-control mb-2" type="text" />
{props.chekPass&&<p className="text-red-500 mb-1">there should be 8 character at least </p>}
<select value={props.obj?.select||""} className="form-control mb-2"
defaultValue=""
onChange={(e)=>props.getRole(e.target.value)} name="" id="">
    <option disabled selected value="">choose role</option>
    <option value="teacher">Teacher</option>
    <option value="student">student</option>
</select>
<div>
    {/* api.ts dagi adduser ichidagi body ga fuksya yuborildi button orqali */}
    <button onClick={signUser}  className="btn btn-success w-full">sign up</button>
</div>
</div>

</div>

}
export default connect((state:any)=>({...state.count}),actions)(SignUp)
