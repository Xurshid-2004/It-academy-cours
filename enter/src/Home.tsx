import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Home() {

useEffect(()=>{
  localStorage.removeItem("id")
  localStorage.removeItem("role")
  localStorage.removeItem("token")
},[])


  return (
    <div>
      {/* codlar */}
      <div className="absolute inset-0 z-0  opacity-30 font-black text-green-500 drop-shadow-[0_0_35px_rgba(56,197,94,0.8)] pointer-events-none font-mono text-[18px] flex justify-between overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            className="flex flex-col gap-2"
          >
            {/* Har bir ustun uchun takrorlanuvchi kodlar */}
            <span className="py-2">const api = "https://learn.it";</span>
            <span className="py-2">
              function start() {"{"} return true {"}"}
            </span>
            <span className="py-2">import React from 'react';</span>
            <span className="py-2">
              {"<div>"} Loading... {"</div>"}
            </span>
            <span className="py-2">git commit -m "feat: design"</span>
            <span className="py-2">
              while(learning) {"{"} success++ {"}"}
            </span>
            <span className="py-2">npm install framer-motion</span>
            {/* Kodlar uzunroq bo'lishi uchun nusxa ko'paytiramiz */}
            <span className="py-2">const api = "https://learn.it";</span>
            <span className="py-2">
              function start() {"{"} return true {"}"}
            </span>
            <span className="py-2">import React from 'react';</span>
            <span className="py-2">
              {"<div>"} Loading... {"</div>"}
            </span>
          </motion.div>
        ))}
      </div>
{/* codlar */}

      <div className="w-full min-h-[550px]  bg-gradient-to-r from-blue-500 to-indigo-800 ">
        <div className="w-full h-[550px]  flex gap-7 ">
          <div className="w-[50%] h-full mx-auto mt-2  ">
            <img
              className="w-full h-[530px] rounded-xl"
              src="img22.png"
              alt=""
            />
          </div>
          <div className="w-[35%] text-white h-[450px] rounded-xl   bg-black  mx-auto shadow-2xl rounded-xl shadow-white  my-auto">
            <p className="text-center text tracking-[2px] text-[18px] leading-[45px] ">
              "At our Learning Center, we believe that education is the key to a
              brighter future. Founded with a passion for knowledge, we offer a
              wide range of courses from language proficiency to advanced IT
              skills. Our state-of-the-art facilities and student-centered
              approach ensure that every learner gets the attention they
              deserve. Join thousands of successful students and start your
              journey with us today." 3. Nega biz? (Features/Advantages uchun)
            </p>
          </div>
        </div>
      </div>
      {/* section2 */}
      <div className="w-full min-h-[550px] bg-gradient-to-l via-purple-500 from-red-500 to-indigo-800">
        <div className="w-full h-[550px] border-2 flex gap-7 ">
          <div className="w-[35%] text-white h-[450px]  grid grid-5  mx-auto shadow-2xl shadow-white rounded-xl  my-auto">
            <p className="text-center text tracking-[2px] text-[18px] leading-[45px] ">
              "At our Learning Center, we believe that education is the key to a
              brighter future. Founded with a passion for knowledge, we offer a
              wide range of courses from language proficiency to advanced IT
              skills. Our state-of-the-art facilities and student-centered
              approach ensure that every learner gets the attention they
              deserve. Join thousands of successful students and start your
              journey with us today." 3. Nega biz? (Features/Advantages uchun)
            </p>
          </div>
          <div className="w-[50%] h-full mx-auto mt-2  ">
            <img
              className="w-full h-[530px] rounded-xl"
              src="img2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* 12345678 section 3*/}
      <div className="w-full border h-[900px]">
        <video
          className="w-full h-full object-cover rounded-xl shadow-2xl"
          controls
          autoPlay
          loop
          muted
        >
          <source src="/vidyos/vid.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 12345678 */}

      <div className="bg-black min-h-[100px]  ">
        <div className="flex flex-col gap-3   bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-800 p-10  rounded-3xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Launch Your Career with Us!
          </h2>
          <p className="text-indigo-100 mb-6 leading-relaxed">
            Master modern professions at our learning center. Register now and
            get an exclusive discount today!
          </p>
          <Link
            to={"/sign-in"}
            className=" !no-underline bg-black active:sclae-95 text-[24px] rounded-xl text-indigo-700 px-5 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg"
          >
            Registration
          </Link>
        </div>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold mb-4">🌟 MyWebsite</div>
                <p className="text-gray-400">
                  Zamonaviy web yechimlari va professional xizmatlar
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Xizmatlar</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      Web Dizayn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      Dasturlash
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      SEO Optimallashtirish
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      Texnik Yordam
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Kompaniya</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      Bizning Jamoa
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      Karyera
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      Yangiliklar
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition duration-300"
                    >
                      Hamkorlik
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Bog'lanish</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>📧 info@mywebsite.uz</li>
                  <li>📞 +998 93 394 82 00</li>
                  <li>📍 JIZZAX, O'zbekiston</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © 2026 MyWebsite. Barcha huquqlar himoyalangan.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
