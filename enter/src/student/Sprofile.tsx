import { useEffect, useState } from "react";
import { useAddUserMutation, useGetEditMutation, useGetUsersQuery } from "../api";
import { Drawer } from "vaul";
import { connect } from "react-redux";
import { actions } from "../toolkit";

const Sprofile = (props: any) => {
  const { data } = useGetUsersQuery("/users");
  const id = localStorage.getItem("id");
  const info = data?.filter((item: any) => item.id === id && item.role === "student");

  const [addUser] = useAddUserMutation();
  const [getEdit] = useGetEditMutation();

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  // Rasmlar aylanib turishi uchun
  const images = [
    "/img31.png",
    "/img30.png",
    "/img22.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  function save() {
    if (props.current === null) {
      addUser(props.user);
    } else {
      getEdit(props.user);
    }
  }

  return (
    <>
      {/* ========== Drawer ========== */}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/50 z-[999]" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white z-[1000] rounded-t-xl max-h-[80vh]">
            <div className="p-6 max-w-md mx-auto">
              <Drawer.Handle />
              <Drawer.Title className="text-xl font-bold mt-4">Edit Student</Drawer.Title>
              <div className="flex flex-col gap-3 mt-4">
                <input
                  value={props.user.name}
                  onChange={(e) => props.getName(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Name"
                />
                <input
                  value={props.user.phone}
                  onChange={(e) => props.getPhone(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Phone"
                />
                <input
                  value={props.user.email}
                  onChange={(e) => props.getEmail(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Email"
                />
                <input
                  value={props.user.password}
                  onChange={(e) => props.getPass(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Password"
                />
                <button className="btn btn-success" onClick={() => { save(); setOpen(false); }}>
                  Save
                </button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* ========== Background & Page ========== */}
      <div className="relative w-full min-h-[535px] overflow-hidden">
        {/* Background aylanib turadigan rasm */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 transition-all duration-1000"
          style={{
            backgroundImage: `url(${images[current]})`,
            filter: "blur(5px)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-30 min-h-[535px] flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-md border border-white rounded-xl p-6 w-[95%]">
            <h2 className="text-2xl font-bold text-white mb-6">About you: Student</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {info?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="bg-black/40 backdrop-blur-md text-white rounded-xl p-4 flex flex-col gap-2"
                >
                  <p className="font-bold">#{i + 1}</p>
                  <p>Name: {item.name}</p>
                  <p>Phone: {item.phone}</p>
                  <p>Email: {item.email}</p>
                  <p>Password: {item.password}</p>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => { setOpen(true); props.getEdit(item); }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect((state: any) => ({ ...state.count }), actions)(Sprofile);
