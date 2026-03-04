import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useAddTeacherMutation } from "./teacherApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lesson } from "../toolkit";

const Tlesson = () => {
  const [addTeacher, { isLoading }] = useAddTeacherMutation();

  const [modules, setModules] = useState<any[]>([
    { id: Date.now(), name: "", age: "", day: "", select: "", url: "", vidyo: "", videoOpen: false, listOpen: false }
  ]);

  const [current, setCurrent] = useState(0);
  const images = ["/img31.png", "/img30.png", "/img22.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const addNewModule = () => {
    setModules([...modules, {
      id: Date.now(), name: "", age: "", day: "", select: "", url: "", vidyo: "",
      videoOpen: false, listOpen: false
    }]);
    toast.info("Yangi blok qo'shildi");
  };

  const updateModuleValue = (id: number, field: string, value: string) => {
    setModules(modules.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteModule = (id: number) => {
    if (modules.length > 1) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  const saveModule = async (item: any) => {
    try {
      const dataToSend = {
        name: item.name,
        description: item.age,
        day: item.day,
        type: item.select,
        url: item.url,
        video: item.vidyo,
        teacherId: localStorage.getItem("id"),
      };
      await addTeacher(dataToSend).unwrap();
      toast.success("Saqlandi!");
    } catch (err) {
      toast.error("Xato yuz berdi!");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-950">
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />

      <div
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[current]})`, filter: "blur(15px) brightness(0.2)" }}
      />

      <div className={`relative z-10 w-full flex flex-col items-center py-6 gap-6 h-screen ${modules.length > 1 ? 'overflow-y-auto' : 'overflow-hidden'} custom-scrollbar`}>

        {modules.map((item) => (
          <div key={item.id} className="relative mb-6">

            <button
              onClick={() => deleteModule(item.id)}
              className="absolute -right-3 -top-3 bg-red-500/80 hover:bg-red-600 text-white w-7 h-7 rounded-full text-[10px] z-50 transition-all"
            >
              ✕
            </button>

            <div className="w-[900px] min-h-[350px] border border-white/10 rounded-2xl flex justify-center items-start gap-6 p-6 backdrop-blur-xl shadow-2xl">

              {/* 1-CARD: Inputs */}
              <div className="w-[300px] bg-black/50 p-1 rounded flex flex-col gap-3">

                <input
                  value={item.name}
                  onChange={(e) => updateModuleValue(item.id, "name", e.target.value)}
                  className="w-full p-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 outline-none transition-all"
                  placeholder="Lesson name"
                />

                <input
                  value={item.age}
                  onChange={(e) => updateModuleValue(item.id, "age", e.target.value)}
                  className="w-full p-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-500 outline-none transition-all"
                  placeholder="Description"
                />

                <input
                  type="date"
                  value={item.day}
                  onChange={(e) => updateModuleValue(item.id, "day", e.target.value)}
                  className="w-full p-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                />

                <select
                  value={item.select}
                  onChange={(e) => updateModuleValue(item.id, "select", e.target.value)}
                  className="w-full p-2 text-xs rounded-lg bg-zinc-900 border border-white/10 text-white outline-none cursor-pointer"
                >
                  <option value="" disabled>Choose lesson type</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="devops">DevOps</option>
                  <option value="security">Security</option>
                  <option value="mobile">Mobile Developer</option>
                  <option value="database">Database</option>
                </select>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setModules(modules.map(m => m.id === item.id ? { ...m, videoOpen: !m.videoOpen } : m))}
                    className="btn btn-success"
                  >
                    Media {item.videoOpen ? '▲' : '▼'}
                  </button>
                  <button
                    onClick={addNewModule}
                    className="btn btn-danger w-[130px]"
                  >
                    + Module
                  </button>
                </div>

                <button
                  disabled={!item.name || isLoading}
                  className="btn btn-primary"
                  onClick={() => saveModule(item)}
                >
                  {isLoading ? "Saqlanmoqda..." : "Save"}
                </button>
              </div>

              {/* 2-CARD: Media */}
              {item.videoOpen && (
                <div className="w-[280px] bg-black/50 flex flex-col rounded gap-10 p-3">
                  <input
                    value={item.url}
                    onChange={(e) => updateModuleValue(item.id, "url", e.target.value)}
                    className="w-full p-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                    placeholder="Image URL"
                  />
                  <input
                    value={item.vidyo}
                    onChange={(e) => updateModuleValue(item.id, "vidyo", e.target.value)}
                    className="w-full p-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                    placeholder="Video URL"
                  />
                  <button
                    className="btn btn-success w-full"
                    onClick={() => setModules(modules.map(m => m.id === item.id ? { ...m, listOpen: !m.listOpen } : m))}
                  >
                    Extra {item.listOpen ? '▲' : '▼'}
                  </button>
                </div>
              )}

              {/* 3-CARD: Extra */}
              {item.listOpen && (
                <div className="bg-black/50 flex flex-col gap-12 p-3 rounded-xl w-[280px]">
                  <textarea
                    className="w-full p-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white h-[80px] outline-none"
                    placeholder="Vazifa izohi..."
                  />
                  <input
                    className="w-full p-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                    placeholder="Resurs linki"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default connect((state: any) => ({ ...state.teacher }), lesson)(Tlesson);