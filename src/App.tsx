import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Music, 
  Volume2, 
  VolumeX, 
  Heart, 
  Send, 
  Gift, 
  Shirt,
  ChevronDown
} from 'lucide-react';

// Target date: May 10, 2026, 00:00:00
const TARGET_DATE = new Date('2026-05-10T00:00:00').getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance <= 0) {
        setTimeLeft(prev => ({ ...prev, isToday: true }));
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isToday: false
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isToday) {
    return (
      <div className="py-8">
        <motion.p 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="text-4xl sm:text-5xl font-display text-deep-pink font-bold tracking-tighter"
        >
          ¡¡¡ES HOY!!!
        </motion.p>
      </div>
    );
  }

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center px-2 sm:px-4">
      <span className="text-3xl sm:text-4xl font-display text-deep-pink">{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-widest opacity-60">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center gap-2 py-8">
      <TimeUnit value={timeLeft.days} label="Días" />
      <div className="text-2xl opacity-30 mt-[-20px]">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="text-2xl opacity-30 mt-[-20px]">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="text-2xl opacity-30 mt-[-20px]">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const FIXED_VOLUME = 0.09; // 9% volume

  // Attempt to play music immediately and on first interaction
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = FIXED_VOLUME;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay was likely blocked by the browser
            setIsPlaying(false);
          });
      }
    };

    // Try playing immediately
    startMusic();

    // Fallback: play on first interaction if it was blocked
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        startMusic();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.volume = FIXED_VOLUME;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Playback error:", err));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-soft-pink">
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        src="audio_taylor.mp3" 
      />

      {/* Music Toggle Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <button 
          onClick={toggleMusic}
          className="p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/20 text-deep-pink transition-transform active:scale-90"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img 
            src="img_alay_fondo.jpeg" 
            alt="Quinceañera" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pastel-pink via-transparent to-black/20" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end items-center pb-10 px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-6xl sm:text-8xl font-serif italic text-white drop-shadow-lg mb-2">
              Alay
            </h1>
            <div className="h-[1px] w-24 bg-white/60 mx-auto mb-4" />
            <p className="text-2xl sm:text-3xl font-display text-white tracking-[0.3em] uppercase drop-shadow-md">
              XV Años
            </p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-white/80"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* Date & Countdown Section */}
      <section className="py-10 px-6 bg-white/30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="flex justify-center mb-6">
            <Calendar className="text-deep-pink opacity-40" size={40} />
          </div>
          <h2 className="text-4xl font-serif italic mb-2">Domingo</h2>
          <p className="text-2xl font-display tracking-widest text-deep-pink mb-8">10.05.26</p>
          
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-white/40">
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2">Faltan tan solo</p>
            <CountdownTimer />
          </div>
        </motion.div>
      </section>

      {/* Location Section */}
      <section className="py-10 px-6 bg-pastel-pink/50 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="flex justify-center mb-6">
            <MapPin className="text-deep-pink opacity-40" size={40} />
          </div>
          <h2 className="text-3xl font-serif italic mb-4">Ubicación</h2>
          <p className="text-lg mb-2">Espacio Liam</p>
          <p className="text-sm opacity-60 mb-8 italic">Carola lorenzini 7056, Dorrego</p>
          
          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-lg mb-8 border-4 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.872262576892!2d-58.610078099999996!3d-34.7839909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc57951956b75%3A0x174904ae35ccf436!2sEspacio%20Liam!5e0!3m2!1ses-419!2sar!4v1772389936106!5m2!1ses-419!2sar" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            />
          </div>
          
          <a 
            href="https://maps.app.goo.gl/w3Tu3My1ziW4gDLo8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-deep-pink rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 font-medium"
          >
            Cómo llegar <Send size={18} />
          </a>
        </motion.div>
      </section>

      {/* Motivational Phrase */}
      <section className="py-12 px-10 text-center bg-white/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Heart className="absolute top-10 left-10 animate-float" size={100} />
          <Heart className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1s' }} size={80} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-2xl sm:text-3xl font-serif italic leading-relaxed text-gray-700">
            "Hay momentos en la vida que son irrepetibles, pero compartirlos con las personas que más queremos los hace inolvidables. Gracias por ser parte de mi historia."
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <Heart className="text-deep-pink fill-deep-pink" size={12} />
            <Heart className="text-deep-pink fill-deep-pink" size={12} />
            <Heart className="text-deep-pink fill-deep-pink" size={12} />
          </div>
        </motion.div>
      </section>

      {/* Schedule & Dress Code */}
      <section className="py-10 px-6 bg-pastel-pink/30 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center glass-card p-10 rounded-[40px]"
        >
          <Clock className="mx-auto mb-4 text-deep-pink opacity-40" size={32} />
          <h3 className="text-2xl font-serif italic mb-2">Horario</h3>
          <p className="text-lg font-display text-deep-pink tracking-tighter">12:00 a 20:00 Hs</p>
          <p className="text-xs opacity-50 mt-2 uppercase tracking-widest">Recepción y Fiesta</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center glass-card p-10 rounded-[40px]"
        >
          <Shirt className="mx-auto mb-4 text-deep-pink opacity-40" size={32} />
          <h3 className="text-2xl font-serif italic mb-2">Vestimenta</h3>
          <p className="text-lg font-display text-deep-pink uppercase tracking-tighter">Elegante Sport</p>
          <p className="text-xs opacity-50 mt-2 uppercase tracking-widest">Dress Code</p>
        </motion.div>
      </section>

      {/* Gift Section */}
      <section className="py-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Gift className="mx-auto mb-6 text-deep-pink opacity-40" size={40} />
          <h2 className="text-3xl font-serif italic mb-6">Regalos</h2>
          <p className="text-lg italic text-gray-600 mb-8">
            "Mi mejor regalo es tu presencia, pero si algo me quieres obsequiar..."
          </p>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-sm">
            <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Alias de la Quinceañera</p>
            <p className="text-xl font-display text-deep-pink select-all cursor-pointer">Alay.ibz</p>
          </div>
        </motion.div>
      </section>

      {/* RSVP Section */}
      <section className="py-10 px-6 bg-deep-pink/10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto glass-card p-12 rounded-[50px] border-2 border-white shadow-xl"
        >
          <h2 className="text-3xl font-serif italic mb-4">Confirmar Asistencia</h2>
          <p className="text-gray-600 mb-10">
            Es muy importante para mí contar con tu presencia en esta noche tan especial. Por favor, confirmá antes del 20 de Abril.
          </p>
          <a 
            href="https://wa.me/5491137651757?text=Hola!%20Confirmo%20mi%20asistencia%20a%20los%20XV%20de%20Alay" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-4 bg-deep-pink text-white rounded-full shadow-lg hover:bg-deep-pink/90 transition-all active:scale-95 font-bold tracking-widest uppercase text-sm"
          >
            Confirmar por WhatsApp
          </a>
        </motion.div>
      </section>

      {/* Final Phrase & Footer */}
      <footer className="py-10 px-6 text-center bg-pastel-pink">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-3xl font-serif italic text-gray-800 mb-12">
            ¡Te espero para celebrar juntos!
          </p>
          <div className="h-[1px] w-12 bg-deep-pink/30 mx-auto mb-8" />
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">
            Alay XV • 2026
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
