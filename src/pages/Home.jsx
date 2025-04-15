const Home = () => {
  return (
    <div className="relative w-110 h-screen bg-black overflow-hidden">
      {/* 🎥 YouTube Background Embed (replaces video) */}
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://www.youtube.com/embed/nydwk87iEuM?si=r8OB1OcdhNkjYNxi&autoplay=1&mute=1&loop=1&playlist=nydwk87iEuM"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* 🖤 Black overlay for contrast — now lighter */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-10" />

      {/* 💎 Glassmorphic Text Box */}
      <div className="relative z-20 flex items-center justify-center h-full px-6">
        <div className="backdrop-blur-md bg-black/40 rounded-2xl p-8 shadow-xl border border-white/20">
          <h1 className="text-green-400 text-4xl md:text-6xl font-extrabold text-center leading-snug">
            Our project is D.A.D<br />Disaster Analysis Description
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
