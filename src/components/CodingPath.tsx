'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useLocaleStore } from '@/store/localeStore';
import { s } from '@/data/strings';
import { fetchModulesWithLessons, ModuleWithLessons } from '@/lib/curriculum-api';
import { useRouter } from 'next/navigation';
import Byte from './Byte';
import {
  BookOpen, Code, ChevronDown, Check, Play, Terminal,
  Variable, Keyboard, GitBranch, Layers, Braces, Hash,
  List, Database, Repeat, Cpu, Zap, Shield, Globe, Server,
  FileCode, FolderOpen, Bug, Gauge, Lock, Package, Wrench,
  Puzzle, PenTool, Search, Filter, Clock, Bell, Settings,
  RefreshCw, Box, Lightbulb, Star, Heart, Eye, Sparkles,
  ArrowDownCircle, ArrowUpCircle, Gift, Bot, Cog, Brain,
  Camera, Factory, Palette, CircuitBoard,
} from 'lucide-react';

// Rotating icon set for lesson nodes
const LESSON_ICONS = [
  Variable, Keyboard, Braces, Hash, List, Layers, Database,
  Repeat, Cpu, Zap, Shield, Globe, Server, FileCode, FolderOpen,
  Bug, Gauge, Lock, Package, Wrench, Puzzle, PenTool, Search,
  Filter, Clock, Bell, Settings, RefreshCw, Box, Lightbulb,
  Star, Eye, Sparkles, Code, GitBranch, Terminal,
];

// === CHARACTER PATHS ===
interface CharacterPath {
  id: string;
  emoji?: string;
  titleEn: string;
  titleSk: string;
  subtitleEn: string;
  subtitleSk: string;
  descEn: string;
  descSk: string;
  modules: number[];
  equipment: Record<string, string>;
}

const PATHS: CharacterPath[] = [
  {
    id: 'foundations',
    titleEn: 'Robotics Foundations',
    titleSk: 'Základy robotiky',
    subtitleEn: 'I want to understand how robots work.',
    subtitleSk: 'Chcem pochopiť, ako fungujú roboty.',
    descEn: 'Mandatory foundation for everyone. Sensors, actuators, electronics, communication.',
    descSk: 'Povinný základ pre všetkých. Senzory, aktuátory, elektronika, komunikácia.',
    modules: Array.from({ length: 30 }, (_, i) => i + 1),
    equipment: { hat: 'hat-graduation', glasses: 'glasses-cool', accessory: 'acc-crystal', aura: 'aura-green' },
  },
  {
    id: 'software',
    titleEn: 'Robotics Software Engineer',
    titleSk: 'Softvérový inžinier',
    subtitleEn: 'I want to program robots.',
    subtitleSk: 'Chcem programovať roboty.',
    descEn: 'Python, C++, ROS2, navigation, SLAM, simulation.',
    descSk: 'Python, C++, ROS2, navigácia, SLAM, simulácia.',
    modules: Array.from({ length: 32 }, (_, i) => i + 31),
    equipment: { hat: 'hat-beanie', glasses: 'glasses-round', accessory: 'acc-medal', aura: 'aura-blue' },
  },
  {
    id: 'vision',
    titleEn: 'Computer Vision Engineer',
    titleSk: 'Počítačové videnie',
    subtitleEn: 'I want robots to see the world.',
    subtitleSk: 'Chcem, aby roboty videli svet.',
    descEn: 'OpenCV, YOLO, depth cameras, visual SLAM, AI vision.',
    descSk: 'OpenCV, YOLO, hĺbkové kamery, vizuálny SLAM, AI videnie.',
    modules: Array.from({ length: 30 }, (_, i) => i + 63),
    equipment: { hat: 'hat-pilot', glasses: 'glasses-laser', antenna: 'ant-diamond', aura: 'aura-galaxy' },
  },
  {
    id: 'ai',
    titleEn: 'AI Robotics Engineer',
    titleSk: 'AI robotický inžinier',
    subtitleEn: 'I want to give robots intelligence.',
    subtitleSk: 'Chcem dať robotom inteligenciu.',
    descEn: 'Machine learning, deep learning, reinforcement learning, LLM, planning.',
    descSk: 'Strojové učenie, hlboké učenie, posilňovacie učenie, LLM, plánovanie.',
    modules: Array.from({ length: 30 }, (_, i) => i + 93),
    equipment: { hat: 'hat-galaxy', glasses: 'glasses-frost', antenna: 'ant-lightning', aura: 'aura-cosmic' },
  },
  {
    id: 'embedded',
    titleEn: 'Embedded Systems Engineer',
    titleSk: 'Embedded inžinier',
    subtitleEn: 'I want to build robot electronics.',
    subtitleSk: 'Chcem vytvárať elektroniku robotov.',
    descEn: 'Arduino, ESP32, STM32, FreeRTOS, motor drivers, PCB.',
    descSk: 'Arduino, ESP32, STM32, FreeRTOS, ovládače motorov, PCB.',
    modules: Array.from({ length: 30 }, (_, i) => i + 123),
    equipment: { hat: 'hat-headband', glasses: 'glasses-cool', accessory: 'acc-chain', aura: 'aura-fire' },
  },
  {
    id: 'mechanical',
    titleEn: 'Mechanical Robotics Engineer',
    titleSk: 'Strojársky inžinier',
    subtitleEn: 'I want to design robot bodies.',
    subtitleSk: 'Chcem navrhovať telá robotov.',
    descEn: 'CAD, 3D printing, CNC, gears, joints, chassis design.',
    descSk: 'CAD, 3D tlač, CNC, prevody, kĺby, návrh podvozku.',
    modules: Array.from({ length: 30 }, (_, i) => i + 153),
    equipment: { hat: 'hat-cowboy', glasses: 'glasses-aviator', accessory: 'acc-bowtie', aura: 'aura-earth' },
  },
  {
    id: 'design',
    titleEn: 'Industrial Design for Robotics',
    titleSk: 'Priemyselný dizajn',
    subtitleEn: 'I want to make robots beautiful and human-friendly.',
    subtitleSk: 'Chcem, aby boli roboty krásne a priateľské.',
    descEn: 'Sketching, CMF, HRI, Blender, prototyping, branding.',
    descSk: 'Skicovanie, CMF, HRI, Blender, prototypovanie, branding.',
    modules: Array.from({ length: 32 }, (_, i) => i + 183),
    equipment: { hat: 'hat-party', glasses: 'glasses-mono', accessory: 'acc-scarf', aura: 'aura-air' },
  },
  {
    id: 'integrator',
    titleEn: 'Robotics Integrator',
    titleSk: 'Robotický integrátor',
    subtitleEn: 'I want to deploy robots in factories.',
    subtitleSk: 'Chcem nasadzovať roboty vo fabrikách.',
    descEn: 'PLC, ABB, KUKA, FANUC, SCADA, factory automation.',
    descSk: 'PLC, ABB, KUKA, FANUC, SCADA, automatizácia výroby.',
    modules: Array.from({ length: 30 }, (_, i) => i + 215),
    equipment: { hat: 'hat-samurai', glasses: 'glasses-golden', accessory: 'acc-wings-gold', aura: 'aura-golden' },
  },
];

// Syllabus groups for visual structure
const SYLLABUS = [
  // Path 1: Robotics Foundations (1-30)
  { titleEn: 'Getting Started', titleSk: 'Začíname s robotikou',
    modules: [1, 2, 3, 4, 5, 6] },
  { titleEn: 'Sensors & Actuators', titleSk: 'Senzory a aktuátory',
    modules: [7, 8, 9, 10] },
  { titleEn: 'Power & Electronics', titleSk: 'Napájanie a elektronika',
    modules: [11, 12, 13, 14, 15] },
  { titleEn: 'Communication', titleSk: 'Komunikácia',
    modules: [16, 17, 18, 19, 20, 21, 22] },
  { titleEn: 'Sensing the World', titleSk: 'Vnímanie sveta',
    modules: [23, 24, 25, 26, 27] },
  { titleEn: 'Architecture & Future', titleSk: 'Architektúra a budúcnosť',
    modules: [28, 29, 30] },

  // Path 2: Software Engineer (31-62)
  { titleEn: 'Programming Basics', titleSk: 'Základy programovania',
    modules: [31, 32, 33, 34, 35] },
  { titleEn: 'Software Engineering', titleSk: 'Softvérové inžinierstvo',
    modules: [36, 37, 38, 39, 40] },
  { titleEn: 'ROS2 & Platforms', titleSk: 'ROS2 a platformy',
    modules: [41, 42, 43, 44, 45, 46, 47] },
  { titleEn: 'ROS2 Advanced', titleSk: 'ROS2 pokročilé',
    modules: [48, 49, 50, 51, 52] },
  { titleEn: 'Navigation & Planning', titleSk: 'Navigácia a plánovanie',
    modules: [53, 54, 55, 56, 57] },
  { titleEn: 'DevOps & Final', titleSk: 'DevOps a finále',
    modules: [58, 59, 60, 61, 62] },

  // Path 3: Computer Vision (63-92)
  { titleEn: 'Image Basics', titleSk: 'Základy obrazu',
    modules: [63, 64, 65, 66, 67, 68] },
  { titleEn: 'Image Processing', titleSk: 'Spracovanie obrazu',
    modules: [69, 70, 71, 72] },
  { titleEn: 'Object Detection', titleSk: 'Detekcia objektov',
    modules: [73, 74, 75, 76, 77] },
  { titleEn: '3D Vision', titleSk: '3D videnie',
    modules: [78, 79, 80, 81] },
  { titleEn: 'Tracking & SLAM', titleSk: 'Tracking a SLAM',
    modules: [82, 83, 84, 85, 86, 87] },
  { titleEn: 'AI & Robot Vision', titleSk: 'AI a robot videnie',
    modules: [88, 89, 90, 91, 92] },

  // Path 4: AI Robotics (93-122)
  { titleEn: 'AI Fundamentals', titleSk: 'Základy AI',
    modules: [93, 94, 95, 96, 97] },
  { titleEn: 'Deep Learning', titleSk: 'Hlboké učenie',
    modules: [98, 99, 100, 101] },
  { titleEn: 'Robot Intelligence', titleSk: 'Inteligencia robota',
    modules: [102, 103, 104, 105, 106, 107] },
  { titleEn: 'Voice & Language', titleSk: 'Hlas a jazyk',
    modules: [108, 109, 110] },
  { titleEn: 'AI Navigation & Manipulation', titleSk: 'AI navigácia a manipulácia',
    modules: [111, 112, 113, 114, 115] },
  { titleEn: 'Advanced AI & Final', titleSk: 'Pokročilé AI a finále',
    modules: [116, 117, 118, 119, 120, 121, 122] },

  // Path 5: Embedded Systems (123-152)
  { titleEn: 'Electronics Basics', titleSk: 'Základy elektroniky',
    modules: [123, 124, 125, 126, 127, 128] },
  { titleEn: 'Tools & Boards', titleSk: 'Nástroje a dosky',
    modules: [129, 130, 131, 132, 133, 134] },
  { titleEn: 'Programming Embedded', titleSk: 'Programovanie embedded',
    modules: [135, 136, 137, 138, 139, 140, 141] },
  { titleEn: 'Communication & RTOS', titleSk: 'Komunikácia a RTOS',
    modules: [142, 143, 144, 145] },
  { titleEn: 'Drivers & Power', titleSk: 'Ovládače a napájanie',
    modules: [146, 147, 148, 149] },
  { titleEn: 'Embedded Project', titleSk: 'Embedded projekt',
    modules: [150, 151, 152] },

  // Path 6: Mechanical (153-182)
  { titleEn: 'Mechanics Fundamentals', titleSk: 'Základy mechaniky',
    modules: [153, 154, 155, 156, 157, 158] },
  { titleEn: 'Transmission', titleSk: 'Prevody',
    modules: [159, 160] },
  { titleEn: 'Materials', titleSk: 'Materiály',
    modules: [161, 162, 163, 164] },
  { titleEn: 'CAD & Manufacturing', titleSk: 'CAD a výroba',
    modules: [165, 166, 167, 168, 169, 170] },
  { titleEn: 'Robot Mechanics', titleSk: 'Mechanika robotov',
    modules: [171, 172, 173, 174, 175, 176] },
  { titleEn: 'Design & Project', titleSk: 'Návrh a projekt',
    modules: [177, 178, 179, 180, 181, 182] },

  // Path 7: Industrial Design (183-214)
  { titleEn: 'Design Foundations', titleSk: 'Základy dizajnu',
    modules: [183, 184, 185, 186, 187, 188] },
  { titleEn: 'Design for Manufacturing', titleSk: 'Dizajn pre výrobu',
    modules: [189, 190, 191, 192] },
  { titleEn: 'Robot Emotions & Interaction', titleSk: 'Emócie a interakcia',
    modules: [193, 194, 195, 196, 197, 198, 199] },
  { titleEn: 'UX & UI', titleSk: 'UX a UI',
    modules: [200, 201, 202] },
  { titleEn: '3D Tools', titleSk: '3D nástroje',
    modules: [203, 204, 205, 206, 207] },
  { titleEn: 'Prototyping & Final', titleSk: 'Prototypovanie a finále',
    modules: [208, 209, 210, 211, 212, 213, 214] },

  // Path 8: Integrator (215-244)
  { titleEn: 'PLC & Controllers', titleSk: 'PLC a riadenie',
    modules: [215, 216, 217] },
  { titleEn: 'Industrial Robots', titleSk: 'Priemyselné roboty',
    modules: [218, 219, 220, 221, 222] },
  { titleEn: 'Safety & Vision', titleSk: 'Bezpečnosť a videnie',
    modules: [223, 224] },
  { titleEn: 'Applications', titleSk: 'Aplikácie',
    modules: [225, 226, 227, 228] },
  { titleEn: 'Industry 4.0', titleSk: 'Priemysel 4.0',
    modules: [229, 230, 231, 232, 233, 234] },
  { titleEn: 'Deployment & Maintenance', titleSk: 'Nasadenie a údržba',
    modules: [235, 236, 237, 238, 239, 240, 241, 242, 243, 244] },
];

const ALL_CODING_MODULES = SYLLABUS.flatMap(g => g.modules);

export default function CodingPath() {
  const { completedLessons, wrongQuestionIds } = useUserStore();
  const { locale } = useLocaleStore();
  const router = useRouter();
  const [dbModules, setDbModules] = useState<ModuleWithLessons[]>([]);
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
  const [selectedPath, setSelectedPath] = useState<string | null>(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('robotuy-path');
    return null;
  });
  const nextLessonRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [unlockModal, setUnlockModal] = useState<{ lessonId: number; title: string; step: 1 | 2 } | null>(null);

  useEffect(() => {
    fetchModulesWithLessons().then(mods => {
      const codingMods = mods.filter(m => ALL_CODING_MODULES.includes(m.module_number));
      setDbModules(codingMods);
      const saved = localStorage.getItem('robotuy-path');
      if (saved && saved !== 'all') {
        const open: Record<number, boolean> = {};
        codingMods.forEach(m => { open[m.id] = true; });
        setOpenModules(open);
      }
    });
  }, []);

  const selectPath = (pathId: string) => {
    setSelectedPath(pathId);
    localStorage.setItem('robotuy-path', pathId);
    const open: Record<number, boolean> = {};
    dbModules.forEach(m => { open[m.id] = true; });
    setOpenModules(open);
  };

  const toggleModule = (id: number) =>
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));

  const isAllMode = selectedPath === 'all';
  const activePath = isAllMode ? null : PATHS.find(p => p.id === selectedPath);
  const activeModuleNumbers = activePath ? activePath.modules : ALL_CODING_MODULES;

  const filteredGroups = SYLLABUS.map(group => ({
    ...group,
    modules: group.modules.filter(mn => activeModuleNumbers.includes(mn)),
  })).filter(g => g.modules.length > 0);

  const allLessons = dbModules
    .filter(m => activeModuleNumbers.includes(m.module_number))
    .flatMap(m => m.lessons);
  const doneCount = allLessons.filter(l => completedLessons.includes(`theory-${l.id}`)).length;

  // Path color mapping
  const getPathColor = (pathId?: string) => {
    switch (pathId) {
      case 'foundations': return '#4ade80';
      case 'software': return '#60a5fa';
      case 'vision': return '#a855f7';
      case 'ai': return '#f472b6';
      case 'embedded': return '#f97316';
      case 'mechanical': return '#a3a3a3';
      case 'design': return '#38bdf8';
      case 'integrator': return '#f59e0b';
      default: return '#f59e0b';
    }
  };

  // === PATH SELECTION SCREEN ===
  if (!selectedPath) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#041540', border: '1px solid #0c255a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={16} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>
              {locale === 'sk' ? 'Vyber si svoju cestu' : 'Choose your path'}
            </h2>
            <p style={{ fontSize: 12, color: '#888', marginTop: 1 }}>
              {locale === 'sk' ? 'Čo ťa zaujíma na robotike?' : 'What interests you about robotics?'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PATHS.map((path) => {
            const pathModules = dbModules.filter(m => path.modules.includes(m.module_number));
            const lessonCount = pathModules.reduce((sum, m) => sum + m.lessons.length, 0);

            return (
              <motion.button
                key={path.id}
                onClick={() => selectPath(path.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: '100%', padding: '20px', display: 'flex', alignItems: 'center', gap: 16,
                  background: '#000a2b', border: '1px solid #0c255a', borderRadius: 16,
                  cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s',
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <Byte mood="happy" size={56} equipment={path.equipment} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 4 }}>
                    {locale === 'sk' ? path.titleSk : path.titleEn}
                  </div>
                  <p style={{ fontSize: 13, color: '#aaa', margin: '0 0 6px', fontStyle: 'italic' }}>
                    &bdquo;{locale === 'sk' ? path.subtitleSk : path.subtitleEn}&ldquo;
                  </p>
                  <p style={{ fontSize: 12, color: '#666', margin: 0 }}>
                    {locale === 'sk' ? path.descSk : path.descEn}
                  </p>
                  <p style={{ fontSize: 11, color: '#555', margin: '6px 0 0', fontWeight: 600 }}>
                    {path.modules.length} {locale === 'sk' ? 'modulov' : 'modules'} · {lessonCount} {locale === 'sk' ? 'lekcií' : 'lessons'}
                  </p>
                </div>
                <Play size={16} color="#555" />
              </motion.button>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#0c255a' }} />
          <span style={{ fontSize: 12, color: '#555', fontWeight: 600 }}>
            {locale === 'sk' ? 'alebo' : 'or'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#0c255a' }} />
        </div>

        {/* Browse all */}
        <motion.button
          onClick={() => selectPath('all')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          style={{
            width: '100%', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#041540', border: '1px solid #0c255a', borderRadius: 12,
            cursor: 'pointer', fontSize: 14, color: '#888', fontWeight: 600,
          }}
        >
          <BookOpen size={16} />
          {locale === 'sk' ? 'Zobraziť všetky moduly' : 'Browse all modules'}
        </motion.button>
      </div>
    );
  }

  // === CURRICULUM VIEW ===
  if (dbModules.length === 0) return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <p style={{ color: '#555', fontSize: 13 }}>{locale === 'sk' ? 'Načítavam...' : 'Loading...'}</p>
    </div>
  );
  return (
    <div>
      {/* Path hero */}
      {activePath && (
        <div style={{ background: '#000a2b', border: '1px solid #0c255a', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Byte mood="happy" size={72} equipment={activePath.equipment} />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>
                {locale === 'sk' ? activePath.titleSk : activePath.titleEn}
              </h2>
              <p style={{ fontSize: 13, color: '#aaa', marginBottom: 8, fontStyle: 'italic' }}>
                &bdquo;{locale === 'sk' ? activePath.subtitleSk : activePath.subtitleEn}&ldquo;
              </p>
              <p style={{ fontSize: 11, color: '#555', fontWeight: 600, margin: '0 0 2px' }}>
                {activeModuleNumbers.length} {locale === 'sk' ? 'modulov' : 'modules'} · {allLessons.length} {locale === 'sk' ? 'lekcií' : 'lessons'} · <span style={{ color: getPathColor(activePath.id) }}>{doneCount} {locale === 'sk' ? (doneCount === 1 ? 'hotová' : doneCount >= 2 && doneCount <= 4 ? 'hotové' : 'hotových') : 'done'}</span>
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button
              onClick={() => { setSelectedPath(null); localStorage.removeItem('robotuy-path'); }}
              style={{
                flex: 1, padding: '10px', borderRadius: 10,
                background: '#041540', border: '1px solid #0c255a', color: '#888',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              {locale === 'sk' ? 'Zmeniť cestu' : 'Change path'}
            </button>
            {doneCount > 0 && (
              <button
                onClick={() => router.push('/practice')}
                style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: '#041540', border: '1px solid #0c255a', color: '#888',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <Repeat size={12} color="#888" />
                {locale === 'sk' ? 'Tréning' : 'Training'}
              </button>
            )}
          </div>
        </div>
      )}

      {!activePath && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#041540', border: '1px solid #0c255a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={16} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>
                {locale === 'sk' ? 'Všetky moduly' : 'All modules'}
              </h2>
              <p style={{ fontSize: 12, color: '#888', marginTop: 1 }}>
                {doneCount} / {allLessons.length} {locale === 'sk' ? (doneCount === 1 ? 'lekcia hotová' : doneCount >= 2 && doneCount <= 4 ? 'lekcie hotové' : 'lekcií hotových') : 'lessons done'}
              </p>
            </div>
          </div>
          <button
            onClick={() => { setSelectedPath(null); localStorage.removeItem('robotuy-path'); }}
            style={{
              width: '100%', padding: '10px', borderRadius: 10,
              background: '#041540', border: '1px solid #0c255a', color: '#888',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            {locale === 'sk' ? 'Zmeniť cestu' : 'Change path'}
          </button>
        </div>
      )}

      {/* Path trail */}
      {(() => {
        const pathLessons: { lesson: any; modTitle: string; groupTitle: string; isFirstInGroup: boolean }[] = [];
        filteredGroups.forEach(group => {
          const groupMods = group.modules.map(mn => dbModules.find(m => m.module_number === mn)).filter(Boolean) as ModuleWithLessons[];
          const groupTitle = locale === 'sk' ? group.titleSk : group.titleEn;
          let first = true;
          groupMods.forEach(mod => {
            const modTitle = locale === 'sk' && mod.title_sk ? mod.title_sk : mod.title;
            mod.lessons.forEach(lesson => {
              pathLessons.push({ lesson, modTitle, groupTitle, isFirstInGroup: first });
              first = false;
            });
          });
        });

        const nextIdx = pathLessons.findIndex(p => !completedLessons.includes(`theory-${p.lesson.id}`));
        const UNLOCK_AHEAD = 3;
        const pathColor = getPathColor(activePath?.id);

        return (
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
            {pathLessons.map((item, i) => {
              const done = completedLessons.includes(`theory-${item.lesson.id}`);
              const isNext = i === nextIdx;
              const unlocked = done || i < UNLOCK_AHEAD || (nextIdx >= 0 && i <= nextIdx + UNLOCK_AHEAD);
              const locked = !unlocked;
              const lessonTitle = locale === 'sk' && item.lesson.title_sk ? item.lesson.title_sk : item.lesson.title;

              const xPos = i % 2 === 0 ? 60 : 240;
              const prevXPos = i > 0 ? ((i - 1) % 2 === 0 ? 60 : 240) : 150;
              const nodeSize = isNext ? 58 : 48;
              const trailDone = done || isNext;
              const connectorH = 40;

              return (
                <div key={item.lesson.id} style={{ width: '100%' }}>
                  {item.isFirstInGroup && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: i === 0 ? '0 0 20px' : '28px 0 20px' }}>
                      <div style={{ flex: 1, height: 1, background: '#0c255a' }} />
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {item.groupTitle}
                      </span>
                      <div style={{ flex: 1, height: 1, background: '#0c255a' }} />
                    </div>
                  )}

                  {i > 0 && !item.isFirstInGroup && (
                    <div style={{ height: connectorH, position: 'relative' }}>
                      <svg viewBox="0 0 300 40" preserveAspectRatio="none" style={{ width: '100%', height: connectorH, display: 'block' }}>
                        <path
                          d={`M ${prevXPos} 0 C ${prevXPos} 20, ${xPos} 20, ${xPos} 40`}
                          stroke={trailDone ? '#0f2d6b' : '#0c255a'}
                          strokeWidth="3"
                          strokeDasharray={trailDone ? 'none' : '6 6'}
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    ref={isNext ? nextLessonRef : undefined}
                    style={{
                      display: 'flex',
                      justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                      paddingLeft: i % 2 === 0 ? 20 : 0,
                      paddingRight: i % 2 === 1 ? 20 : 0,
                    }}
                  >
                    <motion.button
                      onClick={() => {
                        if (!locked) {
                          router.push(`/theory/${item.lesson.id}`);
                        } else {
                          setUnlockModal({ lessonId: item.lesson.id, title: lessonTitle, step: 1 });
                        }
                      }}
                      whileHover={!locked ? { scale: 1.06 } : {}}
                      whileTap={!locked ? { scale: 0.95 } : {}}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.5) }}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                        cursor: locked ? 'default' : 'pointer',
                        opacity: locked ? 0.3 : 1,
                        background: 'none', border: 'none', padding: '4px 8px',
                      }}
                    >
                      {(() => {
                        const LessonIcon = LESSON_ICONS[i % LESSON_ICONS.length];
                        return (
                          <div style={{
                            width: nodeSize, height: nodeSize, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: done ? pathColor : isNext ? '#fff' : locked ? '#041540' : '#0c255a',
                            border: done || isNext ? 'none' : `2px solid ${locked ? '#0c255a' : '#0f2d6b'}`,
                            boxShadow: isNext ? '0 0 24px rgba(255,255,255,0.2), 0 0 48px rgba(255,255,255,0.05)' : done ? `0 0 12px ${pathColor}25` : 'none',
                            transition: 'all 0.2s',
                          }}>
                            {done
                              ? <Check size={22} color="#010d33" strokeWidth={3} />
                              : isNext
                                ? <Play size={20} color="#000" fill="#000" />
                                : <LessonIcon size={locked ? 14 : 18} color={locked ? '#0f2d6b' : '#666'} strokeWidth={1.8} />
                            }
                          </div>
                        );
                      })()}
                      <div style={{ textAlign: 'center', maxWidth: 140 }}>
                        <div style={{
                          fontWeight: isNext ? 700 : 500,
                          fontSize: isNext ? 12 : 11,
                          color: done ? '#888' : isNext ? '#fff' : locked ? '#0f2d6b' : '#aaa',
                          lineHeight: 1.3,
                        }}>
                          {lessonTitle}
                        </div>
                        {(() => {
                          const lessonNum = i + 1;
                          const getsReward = lessonNum === 1 || lessonNum === 3 || lessonNum % 5 === 0;
                          if (!getsReward) return null;
                          const badgeColor = done ? '#888' : pathColor;
                          return (
                            <div style={{
                              marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 4,
                              padding: '3px 10px', borderRadius: 20,
                              background: `${badgeColor}12`,
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              border: `1px solid ${badgeColor}25`,
                              boxShadow: done ? 'none' : `0 0 12px ${badgeColor}15, inset 0 1px 0 ${badgeColor}15`,
                            }}>
                              <Gift size={10} color={badgeColor} strokeWidth={2.5} />
                              <span style={{ fontSize: 9, fontWeight: 700, color: badgeColor, letterSpacing: '0.04em' }}>
                                {locale === 'sk' ? 'Odmena' : 'Reward'}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Scroll to next lesson button */}
      {nextLessonRef.current && !hasScrolled && (() => {
        const rect = nextLessonRef.current?.getBoundingClientRect();
        const isBelow = rect ? rect.top > window.innerHeight : true;
        const ArrowIcon = isBelow ? ArrowDownCircle : ArrowUpCircle;
        return (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              nextLessonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setHasScrolled(true);
            }}
            style={{
              position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
              padding: '10px 20px', borderRadius: 20,
              background: '#fff', color: '#000', fontWeight: 700, fontSize: 13,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            <ArrowIcon size={16} />
            {locale === 'sk' ? 'Pokračovať' : 'Continue'}
          </motion.button>
        );
      })()}

      {/* Unlock modal */}
      <AnimatePresence>
        {unlockModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUnlockModal(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#041540', border: '1px solid #0c255a', borderRadius: 16, padding: 24, maxWidth: 320, width: '100%', textAlign: 'center' }}
            >
              {unlockModal.step === 1 ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <Lock size={28} color="#f97316" />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 8px' }}>
                    {locale === 'sk' ? 'Odomknúť lekciu?' : 'Unlock lesson?'}
                  </h3>
                  <p style={{ color: '#888', fontSize: 13, lineHeight: 1.5, margin: '0 0 20px' }}>
                    {unlockModal.title}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setUnlockModal(null)}
                      style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#0c255a', border: '1px solid #0f2d6b', color: '#888', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                    >
                      {locale === 'sk' ? 'Zrušiť' : 'Cancel'}
                    </button>
                    <button
                      onClick={() => setUnlockModal({ ...unlockModal, step: 2 })}
                      style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#EDEDED', border: 'none', color: '#000', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                    >
                      {locale === 'sk' ? 'Odomknúť' : 'Unlock'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
                  <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 8px' }}>
                    {locale === 'sk' ? 'Si si istý/á?' : 'Are you sure?'}
                  </h3>
                  <p style={{ color: '#888', fontSize: 13, lineHeight: 1.5, margin: '0 0 20px' }}>
                    {locale === 'sk'
                      ? 'Táto lekcia môže obsahovať pojmy, ktoré si ešte neprebral/a v predchádzajúcich lekciách.'
                      : 'This lesson may contain concepts you have not covered in previous lessons.'}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setUnlockModal(null)}
                      style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#0c255a', border: '1px solid #0f2d6b', color: '#888', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                    >
                      {locale === 'sk' ? 'Späť' : 'Back'}
                    </button>
                    <button
                      onClick={() => { setUnlockModal(null); router.push(`/theory/${unlockModal.lessonId}`); }}
                      style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#f97316', border: 'none', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                    >
                      {locale === 'sk' ? 'Pokračovať' : 'Continue'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
