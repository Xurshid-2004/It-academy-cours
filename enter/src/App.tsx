import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Teacher from "./bigteacher/Teacher";
import Student from "./student/Student";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Tlesson from "./bigteacher/Tlesson";
import CodeCours from "./bigteacher/CodeCours";
import Profil from "./bigteacher/Profil";
import Slesson from "./student/Slesson";
import Sprofile from "./student/Sprofile";
import Folder from "./student/Folder";

const App = () => {
  const getToken = () => localStorage.getItem("token");
  const getRole = () => localStorage.getItem("role");
const navigate=useNavigate()

  return (
    <div className="min-h-screen">
     
      <nav className="flex fixed w-full p-10 justify-between items-center h-[80px] z-10 flex  bg-gradient-to-r from-black via-purple-500 to-indigo-800 animate-gradient">
       <button className="btn btn-success" onClick={()=>navigate(-1)}>1ta orqaga</button>
       
        <h1 className="mx-auto text tracking-[14px] text-white">
          IT Education Center
        </h1>
        <div className="flex gap-10 ">
          <Link className="btn btn-dark" to={"/sign-in"}>
          Sign in
          </Link>
        <Link
          className="text-white no-underline text-3xl btn btn-danger"
          to={"/"}
        >
          Back to Home
        </Link>

        </div>
      </nav>
      <div className="pt-[80px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/student"
            element={
              getToken() && getRole() === "student" ? (
                <Student />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/teacher"
            element={
              getToken() && getRole() === "teacher" ? (
                <Teacher />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route path="/lesson" element={<Tlesson />} />
          <Route path="/code" element={<CodeCours />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/slesson" element={<Slesson />} />
          <Route path="/sprofile" element={<Sprofile />} />
          <Route path="/folder" element={<Folder/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
