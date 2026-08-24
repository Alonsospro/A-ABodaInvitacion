import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Guest } from './types';
import { AccessCodeModal } from './components/AccessCodeModal';
import { HeaderHero } from './components/HeaderHero';
import { PhotoSeparator } from './components/PhotoSeparator';
import { CountdownBlock } from './components/CountdownBlock';
import { DressCodeBlock } from './components/DressCodeBlock';
import { ItineraryBlock } from './components/ItineraryBlock';
import { LocationsBlock } from './components/LocationsBlock';
import { PhotoGalleryBlock } from './components/PhotoGalleryBlock';
import { GiftBlock } from './components/GiftBlock';
import { AdultsOnlyBlock } from './components/AdultsOnlyBlock';
import { RsvpBlock } from './components/RsvpBlock';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { AppsScriptSetupModal } from './components/AppsScriptSetupModal';
import { weddingAudio } from './services/audioService';

export default function App() {
  // Always start with null so every page refresh prompts for the access code
  const [guest, setGuest] = useState<Guest | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleUnlock = (authenticatedGuest: Guest) => {
    setGuest(authenticatedGuest);
    // Start music on user interaction
    weddingAudio.startAudio();
  };

  const handleUpdateGuest = (updatedGuest: Guest) => {
    setGuest(updatedGuest);
  };

  const handleLogout = () => {
    setGuest(null);
    weddingAudio.pause();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825] font-sans-clean selection:bg-[#C5A059]/20 selection:text-[#2C2825] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!guest ? (
          <AccessCodeModal
            key="access-screen"
            onUnlock={handleUnlock}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        ) : (
          <motion.main
            key="invitation-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* 1. Header Hero with f1.jpg */}
            <HeaderHero guest={guest} />

            {/* Separator 1 (f2.jpg) */}
            <PhotoSeparator
              imageIndex={1}
              quote="Dos almas con un mismo pensamiento, dos corazones que laten como uno solo."
            />

            {/* 2. Countdown Block */}
            <CountdownBlock />

            {/* Separator 2 (f3.jpg) */}
            <PhotoSeparator
              imageIndex={2}
              quote="El amor verdadero no tiene final feliz, porque el amor verdadero nunca termina."
            />

            {/* 3. Dress Code Block */}
            <DressCodeBlock />

            {/* Separator 3 (f4.jpg) */}
            <PhotoSeparator
              imageIndex={3}
              quote="Hoy comienza la mejor de nuestras aventuras juntos."
            />

            {/* 4. Itinerary Block */}
            <ItineraryBlock />

            {/* Separator 4 (f5.jpg) */}
            <PhotoSeparator
              imageIndex={4}
              quote="Celebrar el amor es celebrar la vida junto a quienes amamos."
            />

            {/* 5. Locations Block */}
            <LocationsBlock />

            {/* Separator 5 (f6.jpg) */}
            <PhotoSeparator
              imageIndex={5}
              quote="Donde reina el amor, sobran las palabras."
            />

            {/* 6. Photo Gallery Block */}
            <PhotoGalleryBlock />

            {/* Separator 6 (f7.jpg) */}
            <PhotoSeparator
              imageIndex={6}
              quote="Gracias por acompañarnos y ser parte de nuestra historia."
            />

            {/* 7. Gift / Present Block */}
            <GiftBlock />

            {/* Separator 7 (f8.jpg) */}
            <PhotoSeparator
              imageIndex={7}
              quote="Un paso más cerca de nuestro 'para siempre'."
            />

            {/* 8. Adults Only Block */}
            <AdultsOnlyBlock />

            {/* 9. RSVP Confirmation Block (Column C passes) */}
            <RsvpBlock guest={guest} onUpdateGuest={handleUpdateGuest} />

            {/* Footer */}
            <Footer
              onOpenSettings={() => setIsSettingsOpen(true)}
              onChangeCode={handleLogout}
            />

            {/* Floating Music Player */}
            <MusicPlayer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Google Apps Script Configuration Modal */}
      <AppsScriptSetupModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
