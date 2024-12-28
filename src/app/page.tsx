"use client";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { AnimatePresence, motion } from "framer-motion";
import Snow from "@/components/Snow";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Garland from "@/components/Garland";
import Image from "next/image";

interface Star {
  left: number;
  top: number;
  animationDelay: string;
  size: number;
}

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const throwConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowMessage(true);
  };

  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array(50)
      .fill(0)
      .map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: `${Math.random() * 3}s`,
        size: Math.random() * 4 + 1,
      }));
    setStars(newStars);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[150px]" />
      </div>

      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: parseFloat(star.animationDelay),
          }}
        />
      ))}

      <div className="relative z-10 h-full backdrop-blur-[100px]">
        <Snow />
        <Garland />
        <Parallax pages={13}>
          <ParallaxLayer offset={0} speed={0.1} factor={3}>
            <div className="absolute inset-0">
              <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-violet-500/10 to-transparent blur-[80px] animate-float-slow" />
              <div className="absolute top-[45%] right-[15%] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-blue-500/15 to-transparent blur-[100px] animate-float" />
              <div className="absolute bottom-[20%] left-[25%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-purple-500/10 to-transparent blur-[90px] animate-float-slower" />
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={0.5}>
            <div className="h-screen flex flex-col items-center justify-center gap-8">
              <motion.h1
                className="text-6xl text-white font-bold text-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Happy New Year 2025! ❤️
              </motion.h1>
              <motion.div
                className="relative w-[300px] h-[300px] mb-8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src="https://imgs.search.brave.com/9Phb6sPMv0FsLDD470m0XovB12y-ib8UK3ygawRjZ0Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waW9u/ZWVyaHVudC5ydS91/cGxvYWQvbWVkaWEv/c29iYWtpLzM4Mi8v/NjZhNTRmMmYzYjFh/Zi5qcGc"
                  alt="New Year Image"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
              <motion.p
                className="text-xl text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Scroll down ↓
              </motion.p>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={0.8}>
            <div className="h-screen w-full flex items-center justify-center">
              <motion.div
                className="w-[800px] h-[800px] relative"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
              ></motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1.5} speed={0.7}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="max-w-2xl text-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl text-white font-bold mb-6">
                  Looking Back at 2024
                </h2>
                <p className="text-xl text-white/90">
                  This year was simply unforgettable, every minute, every second
                  by your side was filled with emotions and memories. I am glad
                  that we spent this year together and became even closer!
                </p>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={1}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="max-w-2xl bg-white/15 backdrop-blur-lg rounded-2xl p-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl text-white font-bold mb-6">
                  My Beloved!
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  In this new year I wish you all the best, I wish you health
                  and most importantly strength to all your family and most
                  importantly to you. You are the most precious thing I have...
                </p>
                <motion.div>
                  <motion.button
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full text-white font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowMessage(true);
                      throwConfetti();
                    }}
                  >
                    Show
                  </motion.button>

                  <AnimatePresence>
                    {showMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 1 }}
                        className="absolute mt-20 bg-white/15 backdrop-blur-lg rounded-2xl p-6 text-center max-w-md"
                        onClick={() => setShowMessage(false)}
                      >
                        <motion.p
                          className="text-white text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          You are my greatest happiness in life! Every day next
                          to you is filled with joy and love. I am grateful to
                          fate for giving me you! ❤️
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={0.9}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {["Warmth", "Love", "Emotions"].map((text, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/15 backdrop-blur-md rounded-xl p-6 text-center"
                    initial={{ y: 50 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <h3 className="text-2xl text-white font-bold mb-3 sm:text-wrap">
                      {text}
                    </h3>
                    <p className="text-white/80">Lets make it happen in 2024</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={5} speed={1.1}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl text-white font-bold mb-6">
                  My journey continues, with - you
                </h2>
                <p className="text-2xl text-white/90">
                  Every step with you is a blessing
                </p>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={6} speed={1.3}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl text-white font-bold mb-8 text-center">
                  My plans for 2025
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "To give more love to you ",
                    "To make you happy",
                    "To make you smile",
                    "To make you laugh",
                  ].map((wish, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center"
                      initial={{ x: -50 }}
                      whileInView={{ x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-white">{wish}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={7} speed={1.4}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <h2 className="text-6xl text-white font-bold mb-6">2025</h2>
                <p className="text-2xl text-white/90 mb-8">
                  Our year of endless possibilities
                </p>
                <motion.button
                  className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Lets make memories together!!!
                </motion.button>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={8} speed={1.2}>
            <div className="h-screen flex flex-col items-center justify-center gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl text-white font-bold mb-4">
                  And remember...
                </h2>
                <p className="text-xl text-white/80">Your love is my greatest treasure ❤️</p>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={9} speed={1.5}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="max-w-2xl text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl text-white font-bold mb-6">
                  Our Special Moments
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Наши прогулки",
                    "Наши улыбки",
                    "Наши объятия",
                    "Наши мечты"
                  ].map((moment, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/15 backdrop-blur-lg rounded-xl p-6"
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-lg md:text-xl text-white">{moment}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={10} speed={1.6}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="max-w-3xl text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-3xl md:text-4xl text-white font-bold mb-8">
                  Together We Will Create
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <motion.div
                    className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-xl text-white font-bold mb-3">New Stories</h3>
                    <p className="text-white/80">Every day - a new chapter of our story</p>
                  </motion.div>
                  <motion.div
                    className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-xl text-white font-bold mb-3">Bright Moments</h3>
                    <p className="text-white/80">Lets fill this year with unforgettable memories</p>
                  </motion.div>
                  <motion.div
                    className="bg-white/20 backdrop-blur-lg rounded-2xl p-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-xl text-white font-bold mb-3">Happy Future</h3>
                    <p className="text-white/80">Lets build it together, step by step</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={11} speed={1.7}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl text-white font-bold mb-6">
                  Happy New Year 2025! 🎄
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  Let this year be filled with love and joy
                </p>
              </motion.div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={12} speed={1.8}>
            <div className="h-screen flex flex-col items-center justify-center p-8">
              <motion.div
                className="max-w-2xl text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-3xl md:text-5xl text-white font-bold mb-6">
                 I love you ❤️
                </h2>
                <p className="text-lg md:text-xl text-white/90">
                  Thank you for being in my life
                </p>
              </motion.div>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </main>
  );
}
