import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetTeachersQuery } from "../bigteacher/teacherApi";
import { Drawer } from "vaul";

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

interface SlessonProps {}

const Slesson: React.FC<SlessonProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "student") {
      navigate("/sign-in");
    }
  }, []);

  const { data: lesson } = useGetTeachersQuery();
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");

  const Categories = Array.from(new Set(lesson?.map((item: Teacher) => item.type)));
  const info = lesson?.filter((item: Teacher) => item.type === category);

  const images = ["/img31.png", "/img30.png", "/img22.png"];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  function pass(item: Teacher) {
    localStorage.setItem("lessonId", item.id);
    navigate("/folder");
  }

  return (
    <div className="relative w-full min-h-[532px] overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-all duration-1000 scale-110"
        style={{ backgroundImage: `url(${images[current]})`, filter: "blur(5px)" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* MAIN CONTENT */}
      <div className="relative z-30 flex flex-col items-center gap-8">
        <h2 className="text-white text-3xl font-bold tracking-wide">
          Choose Your Lesson
        </h2>

        <div className="flex gap-12">
          {/* LEFT MENU */}
          <div className="w-[300px] h-[350px] flex flex-col gap-12 p-4 rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm">
            <button onClick={() => setOpen(true)} className="btn btn-primary h-12 w-full rounded-lg">
              Courses
            </button>
            <button className="btn btn-success h-12 w-full rounded-lg">Projects</button>
            <Link to={"/sprofile"}>
              <button className="btn btn-danger h-12 w-full rounded-lg">Profile</button>
            </Link>
          </div>

          {/* LESSON CARDS */}
          <div className="w-[900px] h-[350px] overflow-x-auto grid grid-cols-3 gap-4 p-4 rounded-xl border-2 border-white bg-white/10 backdrop-blur-md">
            {info?.map((item: Teacher) => (
              <div
                key={item.id}
                onClick={() => pass(item)}
                className="bg-black/50 rounded-xl p-3 w-[240px] h-[290px] hover:scale-105 cursor-pointer"
              >
                <img src={item.url} alt={item.name} className="w-full h-[180px] rounded-xl object-cover" />
                <h3 className="p-2 text-center text-white">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DRAWER */}
      <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/50" />
          <Drawer.Content
            className="fixed top-0 bottom-0 right-0 z-50 w-[300px] bg-white p-6 flex flex-col gap-4 shadow-xl"
            style={{ "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties}
          >
            <h3 className="text-xl font-bold mb-4">Select Category</h3>
            <div className="flex flex-col gap-3">
              {Categories?.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setOpen(false); }}
                  className="btn btn-warning w-full h-12 rounded-lg active:scale-95 transition-transform"
                >
                  {cat}
                </button>
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Slesson;