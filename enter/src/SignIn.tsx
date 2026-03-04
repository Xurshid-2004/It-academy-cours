import { Link, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./api";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { connect } from "react-redux";
import { actions } from "./toolkit";
const SignIn = () => {
const [state, setState] = useState({ email: "", password: "" });
// bacend ,malumot
const { data } = useGetUsersQuery();
const navigate =useNavigate()


useEffect(()=>{
  localStorage.removeItem("role")
  localStorage.removeItem("token")
  localStorage.removeItem("id")
},[])


function checkUser() {
localStorage.removeItem("role")
localStorage.removeItem("id")
localStorage.removeItem("token")
handleConfetti();
if(!state.email || !state.password){
  alert("email yoki passworda muammo mavjud")
  return
}
if(!data)return;
const user = data.find((item:any)=>item.email===state.email.trim()&&item.password.trim()===state.password.trim());
if(!user){
  alert("bunday malumot mavjud emas")
  return
}
localStorage.setItem("token",user.token);
localStorage.setItem("role",user.role);
localStorage.setItem("id",user.id);
handleConfetti();
if(user.role==="teacher"){
  navigate("/teacher")
}else{
  navigate("/student")
}
}



 const handleConfetti = () => {
    // Portlash kuchi va zarlar soni
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min:number, max:number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 200 * (timeLeft / duration);
      
      // Ikkita tomondan "bombacha" otilishi
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ffd700', '#22c55e', '#ffffff', '#ff69b4']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#3b82f6', '#a855f7', '#fbbf24', '#f472b6']
      });
    }, 250);
  };
  

return (
  <div className=" h-[532px] justify-start  flex flex-col  bg-gradient-to-r from-rose-400 via-violet-600 to-indigo-900 p-8 text-white rounded">

      <div className="md:w-1/4 shdow bg-blue-200 rounded mt-4 p-3 mx-auto">
        <input
          onChange={(e) => setState({ ...state, email: e.target.value })}
          className="form-control mb-2"
          placeholder="email"
          type="text"
        />
        <input
          onChange={(e) => setState({ ...state, password: e.target.value })}
          className="form-control mb-2"
          placeholder="password"
          type="password"
        />
        <button onClick={checkUser} className="btn btn-success mb-2 w-full">
          sign in
        </button>
        <p className="text-center my-3">or</p>
        <p className="text-center">
          you have not account ? <Link to={"/sign-up"}>sign up</Link>
        </p>
      </div>



    </div>
  );
};
export default connect((state:any)=>({...state.count}),actions)(SignIn)
