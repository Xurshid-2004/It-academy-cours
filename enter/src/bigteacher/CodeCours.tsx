import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CodeCours = () => {
  return (
    <div className="text-right  w-full p-4" >
<Link to={"/teacher"} className="btn btn-dark  h-[45px] ">bac to teacher</Link>

  <div className="absolute inset-0 z-0 bg-[url('img99.png')]  opacity-30 font-black text-green-500 drop-shadow-[0_0_35px_rgba(56,197,94,0.8)] pointer-events-none font-mono text-[18px] flex justify-between overflow-hidden">
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







    </div>
  )
}

export default CodeCours
