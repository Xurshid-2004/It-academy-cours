import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteTeacherMutation, useGetTeachersQuery } from "./teacherApi";

const Teacher = () => {
  const { data } = useGetTeachersQuery();

  const [deleteTeacher] = useDeleteTeacherMutation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const info = data?.filter((item: any) => item.teacherId == id);
  const [current, setCurrent] = useState(0);
  const images = ["/img31.png", "/img30.png", "/img22.png"];

  function delItem(id: any) {
    deleteTeacher(id);
  }

  useEffect(() => {
    if (!token || role !== "teacher") {
      navigate("/sign-in");
    }
  }, [token, role]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full min-h-[535px] overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 bg-center transition-all duration-1000 scale-110"
        style={{
          backgroundImage: `url(${images[current]})`,
          filter: "blur(5px)",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* CARDS */}
      <div className="relative z-30 overflow-y-auto w-full min-h-[535px] flex justify-center gap-10 items-center">

        {/* Sidebar */}
        <div className="w-[300px] sticky top-20 flex flex-col items-center min-h-[350px] rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm">
          <Link
            className="w-[250px] h-[55px] bg-green-500 active:scale-95 rounded-xl font-bold text-[20px] tracking-wider justify-center mt-2 inline-flex items-center text-white text-center"
            to={"/profil"}
          >
            <button className="no-underline">Profile</button>
          </Link>
          <Link
            className="w-[250px] h-[55px] bg-green-500 active:scale-95 rounded-xl font-bold text-[20px] tracking-wider justify-center mt-2 inline-flex items-center text-white text-center"
            to={"/lesson"}
          >
            Add Course
          </Link>
          <Link
            className="w-[250px] h-[55px] bg-green-500 active:scale-95 rounded-xl font-bold text-[20px] tracking-wider justify-center mt-2 inline-flex items-center text-white text-center"
            to={"/code"}
          >
            Add course code
          </Link>
        </div>

        {/* Courses grid */}
        <div className="w-[1000px] overflow-y-auto p-4 grid grid-cols-3 gap-4 min-h-[350px] rounded-xl border-2 border-white bg-white/10 backdrop-blur-md">
          {info?.map((item: any) => (
            <div
              className="backdrop-blur-md text-white rounded-xl w-[270px] h-[310px] flex flex-col gap-2 items-center p-2 bg-black/50"
              key={item.id}
            >
              <img
                className="w-[250px] h-[180px] rounded-xl"
                src={item.url}
                alt="course"
              />
              <p className="text-[30px] tracking-widest">{item.select || item.type}</p>
              <button
                onClick={() => delItem(item.id)}
                className="btn btn-danger"
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teacher;