// components/BackgroundIntro.jsx
const BackgroundIntro = () => {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* 🎥 Video as background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/Resources/backgroundhome.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
  
        {/* 🟩 Overlay text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
          <h1 className="text-green-400 text-4xl md:text-6xl font-extrabold text-center px-4">
            Our project is D.A.D — Disaster Analysis Description
          </h1>
        </div>
      </div>
    );
  };
  
  export default BackgroundIntro;
  