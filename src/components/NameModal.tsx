'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useLocaleStore } from '@/store/localeStore';
import { s } from '@/data/strings';
import Byte from './Byte';
import { ArrowRight, Coffee, Zap, CupSoda, GlassWater, Leaf, Ban } from 'lucide-react';

const DRINKS = [
  { id: 'coffee' as const, Icon: Coffee, en: 'Coffee', sk: 'Káva' },
  { id: 'tea' as const, Icon: Leaf, en: 'Tea', sk: 'Čaj' },
  { id: 'energy' as const, Icon: Zap, en: 'Energy', sk: 'Energy' },
  { id: 'juice' as const, Icon: CupSoda, en: 'Juice', sk: 'Džús' },
  { id: 'water' as const, Icon: GlassWater, en: 'Water', sk: 'Voda' },
  { id: 'water' as const, Icon: Ban, en: 'Nothing', sk: 'Nič' },
];

const PATHS = [
  { id: 'foundations', titleEn: 'Robotics Foundations', titleSk: 'Základy robotiky', subtitleEn: 'I want to understand how robots work.', subtitleSk: 'Chcem pochopiť, ako fungujú roboty.', equipment: { hat: 'hat-graduation', glasses: 'glasses-cool', accessory: 'acc-crystal', aura: 'aura-green' } },
  { id: 'software', titleEn: 'Software Engineer', titleSk: 'Softvérový inžinier', subtitleEn: 'I want to program robots.', subtitleSk: 'Chcem programovať roboty.', equipment: { hat: 'hat-beanie', glasses: 'glasses-round', accessory: 'acc-medal', aura: 'aura-blue' } },
  { id: 'vision', titleEn: 'Computer Vision', titleSk: 'Počítačové videnie', subtitleEn: 'I want robots to see the world.', subtitleSk: 'Chcem, aby roboty videli svet.', equipment: { hat: 'hat-pilot', glasses: 'glasses-laser', antenna: 'ant-diamond', aura: 'aura-galaxy' } },
  { id: 'ai', titleEn: 'AI Robotics', titleSk: 'AI robotika', subtitleEn: 'I want to give robots intelligence.', subtitleSk: 'Chcem dať robotom inteligenciu.', equipment: { hat: 'hat-galaxy', glasses: 'glasses-frost', antenna: 'ant-lightning', aura: 'aura-cosmic' } },
  { id: 'embedded', titleEn: 'Embedded Systems', titleSk: 'Embedded systémy', subtitleEn: 'I want to build robot electronics.', subtitleSk: 'Chcem vytvárať elektroniku robotov.', equipment: { hat: 'hat-headband', glasses: 'glasses-cool', accessory: 'acc-chain', aura: 'aura-fire' } },
  { id: 'mechanical', titleEn: 'Mechanical Engineer', titleSk: 'Strojársky inžinier', subtitleEn: 'I want to design robot bodies.', subtitleSk: 'Chcem navrhovať telá robotov.', equipment: { hat: 'hat-cowboy', glasses: 'glasses-aviator', accessory: 'acc-bowtie', aura: 'aura-earth' } },
  { id: 'design', titleEn: 'Industrial Design', titleSk: 'Priemyselný dizajn', subtitleEn: 'I want to make robots beautiful.', subtitleSk: 'Chcem, aby boli roboty krásne.', equipment: { hat: 'hat-party', glasses: 'glasses-mono', accessory: 'acc-scarf', aura: 'aura-air' } },
  { id: 'integrator', titleEn: 'Robotics Integrator', titleSk: 'Robotický integrátor', subtitleEn: 'I want to deploy robots in factories.', subtitleSk: 'Chcem nasadzovať roboty vo fabrikách.', equipment: { hat: 'hat-samurai', glasses: 'glasses-golden', accessory: 'acc-wings-gold', aura: 'aura-golden' } },
  { id: 'master', titleEn: 'Robot Master', titleSk: 'Robot Master', subtitleEn: 'I want to master everything.', subtitleSk: 'Chcem ovládnuť všetko.', equipment: { hat: 'hat-golden-crown', glasses: 'glasses-golden', accessory: 'acc-wings-gold', aura: 'aura-golden' } },
];

export default function NameModal() {
  const { name, setName, setFavDrink } = useUserStore();
  const { locale } = useLocaleStore();
  const [value, setValue] = useState('');
  const [step, setStep] = useState<'name' | 'path' | 'drink' | 'done'>('name');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  if (name) return null;

  const handleNameSubmit = () => {
    if (!value.trim()) return;
    setStep('path');
  };

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    localStorage.setItem('robotuy-path', pathId);
    setStep('drink');
  };

  const handleSkipPath = () => {
    setStep('drink');
  };

  const handleDrinkSelect = (drinkId: 'coffee' | 'tea' | 'energy' | 'juice' | 'water') => {
    setFavDrink(drinkId);
    setStep('done');
    setTimeout(() => { setName(value.trim()); window.scrollTo(0, 0); }, 600);
  };

  const handleSkipDrink = () => {
    setStep('done');
    setTimeout(() => { setName(value.trim()); window.scrollTo(0, 0); }, 600);
  };

  return (
    <AnimatePresence>
      {step !== 'done' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(1,13,51,0.9)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 24px', overflow: 'auto',
          }}
        >
          <AnimatePresence mode="wait">
            {step === 'name' && (
              <motion.div
                key="name"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                style={{
                  background: '#161616', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: '40px 32px', maxWidth: 400, width: '100%',
                  textAlign: 'center', boxShadow: '0 24px 80px rgba(1,13,51,0.8)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                  <Byte mood="happy" size={100} />
                </div>
                <h2 style={{ fontWeight: 700, fontSize: 22, color: '#EDEDED', marginBottom: 8 }}>
                  {s('heyImByte', locale)}
                </h2>
                <p style={{ fontSize: 14, color: '#999', marginBottom: 32, lineHeight: 1.6 }}>
                  {s('illTeachYou', locale)}
                </p>
                <input
                  type="text"
                  placeholder={s('yourName', locale)}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNameSubmit()}
                  autoFocus
                  style={{
                    width: '100%', background: '#010d33', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12, padding: '14px 16px', fontSize: 15, color: '#EDEDED',
                    outline: 'none', fontFamily: 'DM Sans, sans-serif', marginBottom: 12,
                    transition: 'border-color 0.15s', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.28)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                <motion.button
                  onClick={handleNameSubmit}
                  disabled={!value.trim()}
                  whileHover={value.trim() ? { scale: 1.02 } : {}}
                  whileTap={value.trim() ? { scale: 0.97 } : {}}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12,
                    background: value.trim() ? '#EDEDED' : '#041540',
                    color: value.trim() ? '#010d33' : '#3A3A3A',
                    fontWeight: 700, fontSize: 15, border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    cursor: value.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  {locale === 'sk' ? 'Pokračovať' : 'Continue'}
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}

            {step === 'path' && (
              <motion.div
                key="path"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                style={{
                  background: '#161616', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: '32px 28px', maxWidth: 440, width: '100%',
                  textAlign: 'center', boxShadow: '0 24px 80px rgba(1,13,51,0.8)',
                }}
              >
                <h2 style={{ fontWeight: 700, fontSize: 20, color: '#EDEDED', marginBottom: 6 }}>
                  {locale === 'sk' ? `${value.trim()}, vyber si cestu` : `${value.trim()}, choose your path`}
                </h2>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
                  {locale === 'sk' ? 'Vždy to môžeš zmeniť neskôr.' : 'You can always change it later.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PATHS.map(path => (
                    <motion.button
                      key={path.id}
                      onClick={() => handlePathSelect(path.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
                        background: '#000a2b', border: '1px solid #0c255a', borderRadius: 14,
                        cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        <Byte mood="happy" size={44} equipment={path.equipment} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>
                          {locale === 'sk' ? path.titleSk : path.titleEn}
                        </div>
                        <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
                          {locale === 'sk' ? path.subtitleSk : path.subtitleEn}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={handleSkipPath}
                  style={{ marginTop: 16, background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}
                >
                  {locale === 'sk' ? 'Preskočiť' : 'Skip for now'}
                </button>
              </motion.div>
            )}

            {step === 'drink' && (
              <motion.div
                key="drink"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                style={{
                  background: '#161616', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24, padding: '32px 28px', maxWidth: 400, width: '100%',
                  textAlign: 'center', boxShadow: '0 24px 80px rgba(1,13,51,0.8)',
                }}
              >
                <h2 style={{ fontWeight: 700, fontSize: 20, color: '#EDEDED', marginBottom: 6 }}>
                  {locale === 'sk' ? 'Čo si dáš pri učení?' : "What's your study drink?"}
                </h2>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>
                  {locale === 'sk' ? 'Za každý modul dostaneš odmenu podľa tvojho výberu.' : 'You\'ll earn rewards based on your choice.'}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {DRINKS.map(drink => (
                    <motion.button
                      key={drink.id}
                      onClick={() => handleDrinkSelect(drink.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                        padding: '14px 8px', background: '#000a2b', border: '1px solid #0c255a',
                        borderRadius: 14, cursor: 'pointer',
                      }}
                    >
                      <motion.div animate={{ y: [0, -1, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: DRINKS.indexOf(drink) * 0.4 }}>
                        <drink.Icon size={28} color="#fff" strokeWidth={1.5} />
                      </motion.div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#ccc' }}>
                        {locale === 'sk' ? drink.sk : drink.en}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={handleSkipDrink}
                  style={{ marginTop: 16, background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}
                >
                  {locale === 'sk' ? 'Preskočiť' : 'Skip'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
