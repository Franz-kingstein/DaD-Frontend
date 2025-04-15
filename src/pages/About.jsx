import React from 'react';
import { motion } from 'framer-motion';

// ✅ Image Imports (relative to /src/assets or wherever you placed them)
import FranzImg from '../assests/Franz_c.png';
import SharonImg from '../assests/Sharon_c.png';

const fadeInPage = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const paragraphVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const avatarCardVariant = {
  hidden: { scale: 0.9, opacity: 0, y: 30 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const About = () => {
  const creators = [
    {
      name: 'Franz Kingstein',
      img: FranzImg, // ✅ used import
      cardVariants: slideInLeft,
      paragraphs: [
        'Franz is the architectural brain behind D.A.D. As a passionate <span class="text-green-400 font-semibold">MERN Stack Developer</span>, he combines artistic UI design with strong backend architecture.',
        'With a year of experience developing scalable web applications, Franz handled the complete frontend and server-side design. From building interactive maps to real-time data visualization using modern libraries, Franz ensured every pixel and endpoint runs smoothly.',
        'His strength lies in turning raw requirements into intuitive features. Franz believes that tech should not only solve problems but inspire exploration—and D.A.D is a testimony to that belief.',
        "When he's not coding, you'll find him exploring UI/UX trends, building open-source tools, or crafting new digital experiences that blur the line between data and design.",
      ],
    },
    {
      name: 'Sharon Dev',
      img: SharonImg, // ✅ used import
      cardVariants: slideInRight,
      paragraphs: [
        'Sharon is the data guardian of this project. As an experienced <span class="text-green-400 font-semibold">Database Administrator & Quality Tester</span>, he ensures every dataset in D.A.D is reliable, accurate, and optimized.',
        'With a strong foundation in MongoDB, indexing, and schema design, Sharon built the disaster data pipeline that powers the platform. His meticulous testing approach guarantees that data rendering, geolocation, and filtering work flawlessly across the board.',
        'Sharon\'s commitment to precision goes beyond simple validation—he identifies edge cases, anticipates user behaviors, and builds systems that hold up under pressure.',
        "He is passionate about clean data, scalable architecture, and stress-free debugging. Without his backend resilience and QA precision, D.A.D wouldn't be the robust platform it is today.",
      ],
    },
  ];

  return (
    <motion.div
      className="bg-black text-green-400 min-h-screen p-4 sm:p-6 lg:p-12"
      variants={fadeInPage}
      initial="hidden"
      animate="visible"
    >
      {/* 🌐 About the Project */}
      <motion.section className="mb-20" variants={slideInLeft}>
        <motion.h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-600">
            🌪️ About the Project
          </span>
        </motion.h2>
        <div className="h-1 bg-gradient-to-r from-green-500 to-transparent w-full mb-6" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            "<strong>D.A.D — Disaster Analysis Description</strong> is an interactive platform designed to empower users with comprehensive disaster data awareness...",
            "Our mission is to bridge the gap between raw data and human understanding...",
            "Whether you're a researcher, student, journalist, or policymaker...",
            "D.A.D’s dynamic interface allows you to interact with historical disaster data...",
            "In addition, the platform offers the ability to visualize disaster data across multiple dimensions...",
            "In a world filled with uncertainty, data is a crucial ally—and D.A.D transforms that data into actionable insights...",
          ].map((text, i) => (
            <motion.p
              key={i}
              className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-green-300 mb-8"
              dangerouslySetInnerHTML={{ __html: text }}
              variants={paragraphVariant}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* 👨‍💻 About the Creators */}
      <section>
        <motion.h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-600">
            🧑‍💼 About the Creators
          </span>
        </motion.h2>
        <div className="h-1 bg-gradient-to-r from-green-500 to-transparent w-full mb-10" />

        {creators.map((creator, i) => (
          <motion.div
            key={i}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center mb-20`}
            variants={creator.cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="relative w-full lg:w-96"
              variants={avatarCardVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="min-h-[30rem] bg-gradient-to-br from-green-900 to-green-800 rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_6px_rgba(34,197,94,0.5)]">
                <div className="p-4 text-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-green-100">
                    {creator.name}
                  </h3>
                </div>
                <div className="flex-grow overflow-hidden">
                  <img
                    src={creator.img}
                    alt={creator.name}
                    className="w-full h-full object-cover object-center rounded-b-xl"
                  />
                </div>
              </div>
            </motion.div>

            <div
              className={`${i % 2 === 0 ? 'lg:ml-10' : 'lg:mr-10'
                } mt-8 lg:mt-0 w-full lg:w-[calc(100%-26rem)]`}
            >
              {creator.paragraphs.map((p, j) => (
                <motion.p
                  key={j}
                  className="text-lg sm:text-xl lg:text-2xl text-green-300 mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p }}
                  variants={paragraphVariant}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </section>

    </motion.div>
  );
};

export default About;
