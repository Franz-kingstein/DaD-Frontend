import React from 'react';
import { motion } from 'framer-motion';

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
      img: '/Resources/Franz_c.png',
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
      img: '/Resources/Sharon_c.png',
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
      className="bg-black text-green-400 min-h-screen p-4 lg:p-8"
      variants={fadeInPage}
      initial="hidden"
      animate="visible"
    >
      {/* 🌐 About the Project */}
      <motion.section
        className="mb-20 max-w-full mx-auto"
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="text-7xl lg:text-8xl font-extrabold mb-4 relative inline-block leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-600">
            🌪️ About the Project
          </span>
        </motion.h2>
        <div className="h-1 bg-gradient-to-r from-green-500 to-transparent w-full mb-6"></div>

        <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {[
    "<strong>D.A.D — Disaster Analysis Description</strong> is an interactive platform designed to empower users with comprehensive disaster data awareness. From tropical cyclones to massive floods, this platform provides in-depth insights into India's disaster history—across visual, analytical, and geographical perspectives.",

"Our mission is to bridge the gap between raw data and human understanding. Using cutting-edge web technologies, we bring disaster data to life through maps, charts, and visualizations. D.A.D doesn’t just display where disasters have occurred; it enables you to explore them across time, type, and geography—giving you a deeper understanding of the patterns and impacts.",
"Whether you're a researcher, student, journalist, or policymaker, this tool helps you uncover hidden trends, identify high-risk zones, and analyze the broader impact of disasters like never before. With our intuitive map, advanced filtering system, and detailed visualizations, disaster analysis becomes both accessible and powerful.",
"D.A.D’s dynamic interface allows you to interact with historical disaster data in ways that traditional tools cannot match. You can track the evolution of disaster events over time, identify specific hotspots, and understand how different regions have been affected by various types of disasters. This level of interaction enables users to uncover insights that are essential for future preparedness and mitigation strategies.",
"In addition, the platform offers the ability to visualize disaster data across multiple dimensions—geographically, temporally, and by disaster type. This multi-layered approach helps users to gain a more holistic view of disaster impacts, allowing for better resource allocation, risk assessment, and policymaking. The advanced filtering system also ensures that you can zoom in on specific events, regions, or time periods to conduct more targeted analyses.",
"In a world filled with uncertainty, data is a crucial ally—and D.A.D transforms that data into actionable insights, helping you make informed decisions for the future."
  ].map((text, i) => (
    <motion.p
      key={i}
      className="text-3xl lg:text-4xl leading-relaxed text-green-300 mb-8"
      dangerouslySetInnerHTML={{ __html: text }}
      variants={paragraphVariant}
    />
  ))}
</motion.div>
      </motion.section>

      {/* 👨‍💻 About the Creators */}
      <section className="max-w-full mx-auto">
        <motion.h2 className="text-7xl lg:text-8xl font-extrabold mb-4 relative inline-block leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-600">
            🧑‍💼 About the Creators
          </span>
        </motion.h2>
        <div className="h-1 bg-gradient-to-r from-green-500 to-transparent w-full mb-10"></div>

        {creators.map((creator, i) => (
          <motion.div
            key={i}
            className={`flex flex-col ${
              i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center mb-16`}
            variants={creator.cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Avatar Card */}
            <motion.div
              className="relative w-full lg:w-96"
              variants={avatarCardVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-100 h-100 min-h-[30 rem] bg-gradient-to-br from-green-900 to-green-800 rounded-lg shadow-xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_0_30px_6px_rgba(34,197,94,0.5)]">
                <div className="p-4 text-center flex-shrink-0">
                  <h3 className="text-3xl lg:text-4xl font-bold text-green-100">{creator.name}</h3>
                </div>
                <div className="flex-grow relative">
                  <img
                    src={creator.img}
                    alt={creator.name}
                    className="absolute bottom-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Section */}
            <div className={`${i % 2 === 0 ? 'lg:ml-10' : 'lg:mr-10'} mt-8 lg:mt-0 w-full lg:w-[calc(100%-26rem)]`}>
              {creator.paragraphs.map((p, j) => (
                <motion.p
                  key={j}
                  className="text-2xl lg:text-3xl leading-relaxed text-green-300 mb-6"
                  variants={paragraphVariant}
                  dangerouslySetInnerHTML={{ __html: p }}
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
