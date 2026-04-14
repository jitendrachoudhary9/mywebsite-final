import  { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,  useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Heart,  Pause, Play, Calendar, Camera, BookOpen, Gift, ChevronRight, X, Home as HomeIcon,  } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Shared Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] animate-float text-rose-300/30"
          style={{
            left: heart.left,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

const Typewriter = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayedText}</span>;
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        onClick={togglePlay}
        className="glass p-4 rounded-full text-rose-600 hover:scale-110 transition-transform shadow-lg"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-6 shadow-lg border border-rose-200">
        <Link to="/" className="text-rose-500 hover:scale-110 transition-transform flex items-center gap-2 font-medium">
          <HomeIcon size={20} /> Home
        </Link>
        <div className="w-px h-4 bg-rose-200" />
        <Link to="/story" className="text-rose-400 hover:text-rose-600 transition-colors">Story</Link>
        <Link to="/gallery" className="text-rose-400 hover:text-rose-600 transition-colors">Gallery</Link>
        <Link to="/letter" className="text-rose-400 hover:text-rose-600 transition-colors">Letter</Link>
        <Link to="/special-date" className="text-rose-400 hover:text-rose-600 transition-colors">Special Date</Link>
      </div>
    </nav>
  );
};

// --- Pages ---

const HomePage = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <div className="mb-6 inline-block glass p-4 rounded-full text-rose-500 animate-pulse">
          <Heart size={48} fill="currentColor" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-shadow-glow">
          Jitendra <span className="text-rose-400">❤️</span> Priyanka
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-widest text-rose-600 mb-12">
          <Typewriter text="Forever Together, Always & Forever..." delay={150} />
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Link to="/story" className="glass p-6 rounded-3xl hover:bg-rose-100 transition-colors group">
            <BookOpen className="mx-auto mb-3 text-rose-500 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-rose-700">Our Story</span>
          </Link>
          <Link to="/gallery" className="glass p-6 rounded-3xl hover:bg-rose-100 transition-colors group">
            <Camera className="mx-auto mb-3 text-rose-500 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-rose-700">Gallery</span>
          </Link>
          <Link to="/letter" className="glass p-6 rounded-3xl hover:bg-rose-100 transition-colors group">
            <Gift className="mx-auto mb-3 text-rose-500 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-rose-700">Love Letter</span>
          </Link>
          <Link to="/special-date" className="glass p-6 rounded-3xl hover:bg-rose-100 transition-colors group">
            <Calendar className="mx-auto mb-3 text-rose-500 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-rose-700">Special Date</span>
          </Link>
        </div>
      </motion.div>
      
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/romantic/1920/1080?blur=4"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

const StoryPage = () => {
  const storyTimeline = [
    { date: 'Apirl 7, 2023', title: 'First Meet', desc: 'The day our eyes first met at the   My Choching.', icon: <Heart /> },
    { date: 'Apirl 18, 2023', title: 'First Chat', desc: 'Hours of talking that felt like minutes.', icon: <BookOpen /> },
    { date: 'Apirl 24, 2023', title: 'First Date And Kiss', desc: 'A beautiful Day of My Life.', icon: <Camera /> },
    { date: 'Apirl 28, 2023', title: 'Special Moment', desc: 'When we realized we were meant for each other.', icon: <Gift /> },
  ];

  return (
    <section className="py-32 px-4 max-w-4xl mx-auto relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-4">
        <BookOpen className="text-rose-500" /> Our Story
      </h2>
      <div className="space-y-12">
        {storyTimeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="w-full md:w-1/2 glass p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-rose-400 font-mono text-sm mb-2 block">{item.date}</span>
              <h3 className="text-2xl font-bold mb-2 text-rose-700">{item.title}</h3>
              <p className="text-rose-600 leading-relaxed">{item.desc}</p>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 bg-rose-500 text-white rounded-full shadow-lg z-10">
              {item.icon}
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={`https://picsum.photos/seed/story${index}/600/400`}
                alt={item.title}
                className="rounded-3xl shadow-lg w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = [
    'https://picsum.photos/seed/love1/800/600',
    'https://picsum.photos/seed/love2/800/600',
    'https://picsum.photos/seed/love3/800/600',
    'https://picsum.photos/seed/love4/800/600',
    'https://picsum.photos/seed/love5/800/600',
    'https://picsum.photos/seed/love6/800/600',
  ];

  return (
    <section className="py-32 px-4 max-w-6xl mx-auto relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-4">
        <Camera className="text-rose-500" /> Our Moments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="cursor-zoom-in group relative overflow-hidden rounded-2xl shadow-md"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt={`Moment ${i + 1}`}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Heart className="text-white" fill="currentColor" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:scale-110 transition-transform">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Zoomed"
              className="max-w-full max-h-full rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const LetterPage = () => {
  const [showProposal, setShowProposal] = useState(false);
  
  const handleSurprise = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffb6c1'],
    });
    alert("You are the best thing that ever happened to me! ❤️");
  };

  return (
    <section className="py-32 px-4 max-w-3xl mx-auto relative z-10">
      <div className="glass p-12 rounded-[3rem] shadow-xl text-center border-rose-200 border-2 mb-12">
        <Heart className="mx-auto mb-8 text-rose-500" size={40} fill="currentColor" />
        <h2 className="text-3xl font-bold mb-8 text-rose-800">A Letter to You</h2>
        <div className="text-xl italic text-rose-700 leading-loose">
          <Typewriter 
            text="My dearest Priyanka, from the moment I met you, my life changed forever. You are the light in my darkness, the smile on my face, and the beat in my heart. Every second spent with you is a treasure I'll hold onto for eternity. I love you more than words can ever express."
            delay={50}
          />
        </div>
      </div>

      <div className="text-center space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">A Little Surprise?</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSurprise}
            className="bg-rose-100 text-rose-600 p-8 rounded-full shadow-inner border-2 border-rose-200 hover:bg-rose-200 transition-colors"
          >
            <Gift size={48} />
          </motion.button>
        </div>

        <div className="pt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProposal(true)}
            className="bg-gradient-to-r from-rose-400 to-rose-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-xl flex items-center gap-3 mx-auto"
          >
            Will You Be Mine Forever? <ChevronRight />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showProposal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-rose-900/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-lg w-full text-center relative"
            >
              <button 
                onClick={() => setShowProposal(false)}
                className="absolute top-6 right-6 text-rose-300 hover:text-rose-500"
              >
                <X size={24} />
              </button>
              <Heart className="mx-auto mb-6 text-rose-500" size={64} fill="currentColor" />
              <h2 className="text-4xl font-bold mb-6 text-rose-800">My Love,</h2>
              <p className="text-xl text-rose-600 mb-10 leading-relaxed">
                Every day with you is a dream come true. I want to spend the rest of my life making you happy.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    confetti({ particleCount: 200, spread: 100 });
                    alert("YAY! I'm the luckiest person alive! ❤️❤️❤️");
                    setShowProposal(false);
                  }}
                  className="bg-rose-500 text-white py-4 rounded-2xl font-bold text-xl hover:bg-rose-600 shadow-lg"
                >
                  Yes, Forever!
                </button>
                <button
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget;
                    btn.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
                  }}
                  className="text-rose-300 py-2 hover:text-rose-400 transition-transform duration-75"
                >
                  Maybe? (Try to click me!)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SpecialDatePage = () => {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date('2023-04-19T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      // Rough calculation for months and years
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const finalDays = remainingDays % 30;

      setTimeTogether({
        years,
        months,
        days: finalDays,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-4 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block glass p-6 rounded-full text-rose-500 mb-6"
        >
          <Calendar size={64} fill="currentColor" />
        </motion.div>
        <h2 className="text-5xl font-bold text-rose-800 mb-4">19 April 2023</h2>
        <p className="text-2xl text-rose-600 font-light italic">The most important date of our lives</p>
      </div>

      <div className="glass p-12 rounded-[3rem] shadow-2xl border-2 border-rose-200 text-center">
        <h3 className="text-3xl font-bold text-rose-700 mb-10">Time Spent Together</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Object.entries(timeTogether).map(([unit, value]) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center bg-white/50 p-6 rounded-3xl shadow-sm"
            >
              <span className="text-4xl font-bold text-rose-600">{value}</span>
              <span className="text-sm uppercase tracking-widest text-rose-400 mt-2">{unit}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-xl text-rose-600 leading-relaxed max-w-2xl mx-auto italic">
          "On this day, two souls became one. Every second since then has been a beautiful journey of love, laughter, and endless memories. 19th April isn't just a date; it's the beginning of our forever."
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-rose-50 text-rose-900 font-sans selection:bg-rose-200">
        <FloatingHearts />
        <MusicPlayer />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/special-date" element={<SpecialDatePage />} />
        </Routes>

        <footer className="py-12 text-center text-rose-400 relative z-10">
          <p className="flex items-center justify-center gap-2 text-lg">
            Made with <Heart size={20} fill="currentColor" className="text-rose-500 animate-pulse" /> for Jitendra & Priyanka
          </p>
          <p className="text-sm mt-2 opacity-60">© 2026 Forever Together</p>
        </footer>
      </div>
    </Router>
  );
}
