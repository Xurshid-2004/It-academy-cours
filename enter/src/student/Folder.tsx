import { useGetTeachersQuery } from "../bigteacher/teacherApi"

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

const Folder = () => {
  const {data, isLoading} = useGetTeachersQuery();
  const id = localStorage.getItem("lessonId");
  const info = data?.find((item: Teacher) => item.id === id);

  if (isLoading) return <h1 className="text-white">loading...</h1>
  if (!info) return <h1 className="text-white">Ma'lumot yo'q</h1>
  
  return (
    <div className="bg-blue-900 w-[100%] h-[535px] text-white p-6">
      <div className="w-[1320px] h-[300px] mx-auto gap-20 flex rounded-xl">
        <div className="w-[50%] flex justify-center p-2 gap-12 items-center min-h-[300px] border bg-black/50 rounded-xl">
          <div className="flex flex-col ml-10 justify-end gap-2">
            <h4>Lesson name: {info?.name}</h4>
            <hr />
            <h4>izoh: {info?.description}</h4>
            <h4>type: {info?.type}</h4>
            <h4>muddat: {info?.day}</h4>
          </div>
          <div className="w-[360px] h-[260px] flex justify-end">
            <img className="w-[300px] h-[260px] rounded-xl" src={info?.url} alt="no img" />
          </div>
        </div>
        <div className="w-[50%] min-h-[300px] rounded-xl">
          <video
            className="w-full h-full object-cover rounded-xl shadow-2xl"
            controls
            autoPlay
            loop
            muted
          >
            <source src={info?.video || "1.mp4"} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

export default Folder
