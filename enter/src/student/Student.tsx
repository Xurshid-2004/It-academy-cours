import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Student = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    "/img89.png",
    "/img99.png",
    "/img43.png"
  ];

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "student") {
      navigate("/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); 
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="bg-[url('/iphone.png')] min-h-[520px] blur-s bg-cover bg-center bg-no-repeat realtive">
    <div className="min-h-[350px]  ">
      <div className="flex justify-center py-5">
        
        {/* Carousel Main Container: Width 1120px, Height 350px */}
        <div className="relative w-[1120px] h-[370px] overflow-hidden rounded-[2rem] shadow-2xl group bg-white">
          
          {/* Inner Wrapper for Sliding Effect */}
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img 
                  src={img} 
                  alt={`Slide ${index}`} 
                  className="w-[1320px] h-full object-cover" 
                />
              </div>
            ))}
          </div>

          {/* Overlay for better look */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

          {/* Controls: Left Button */}
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Controls: Right Button */}
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators (Dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-10 bg-white shadow-lg" : "w-3 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Pastki qismda o'sha mashhur 1120px lik buttonni qo'shishingiz mumkin */}
    </div>
<div className="w-[1220px] min-h-[500px]   flex flex-col   mx-auto">
  <div className="grid grid-cols-3">

<div className="w-[330px] h-[350px]  rounded-xl hover:-translate-y-10 active:scale-95 transition-all">
  <img className="object-cover rounded-3xl" src="/img30.png" alt="" />
</div>
<div className="w-[330px] h-[350px] rounded-xl hover:-translate-y-10 active:scale-95 transition-all">
  <img className="object-cover rounded-3xl" src="/img57.png" alt="" />
</div>
<div className="w-[330px] h-[350px]  rounded-xl hover:-translate-y-10 active:scale-95 transition-all">
  <img className="object-cover rounded-3xl" src="/img55.png" alt="" /> 
</div>
  </div>
<div className="mx-auto mt-7 text-white text-[18px]">
  <Link to={"/slesson"}>
<button className="w-[1120px] h-[50px] bg-black text-white text-[24px] tracking-widest  active:scale-95  rounded  "> Lesson start</button>
  </Link>
</div>
</div>


    </div>
  );
};

export default Student;