'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Beaker, Wrench as WrenchIcon, Play, Pause, RotateCcw, Timer, GraduationCap } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { useLocaleStore } from '@/store/localeStore';
import { scheduleMonths, programs, subjectColors } from '@/data/schedule-data';
import type { Month, Week } from '@/data/schedule-data';

/* ========== PERSISTENT TIMER (survives page navigation) ========== */
const TIMER_KEY = 'robotuy-study-timer';
const TIMER_RUNNING_KEY = 'robotuy-timer-running';
const TIMER_START_KEY = 'robotuy-timer-start';
const TIMER_ELAPSED_KEY = 'robotuy-timer-elapsed';
const TIMER_DURATION = 3 * 60 * 60; // 3 hours in seconds

function useStudyTimer() {
  const getStoredElapsed = () => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem(TIMER_ELAPSED_KEY) || '0', 10);
  };
  const getStoredRunning = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(TIMER_RUNNING_KEY) === 'true';
  };
  const getStoredStart = () => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem(TIMER_START_KEY) || '0', 10);
  };

  const calcCurrent = useCallback(() => {
    const wasRunning = getStoredRunning();
    const elapsed = getStoredElapsed();
    if (!wasRunning) return elapsed;
    const start = getStoredStart();
    const now = Math.floor(Date.now() / 1000);
    return Math.min(elapsed + (now - start), TIMER_DURATION);
  }, []);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // Init from localStorage
  useEffect(() => {
    setSeconds(calcCurrent());
    setRunning(getStoredRunning());
  }, [calcCurrent]);

  // Tick
  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      const cur = calcCurrent();
      setSeconds(cur);
      if (cur >= TIMER_DURATION) {
        setRunning(false);
        localStorage.setItem(TIMER_RUNNING_KEY, 'false');
        localStorage.setItem(TIMER_ELAPSED_KEY, String(TIMER_DURATION));
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [running, calcCurrent]);

  const toggle = () => {
    if (running) {
      // Pause
      const cur = calcCurrent();
      localStorage.setItem(TIMER_ELAPSED_KEY, String(cur));
      localStorage.setItem(TIMER_RUNNING_KEY, 'false');
      setRunning(false);
      setSeconds(cur);
    } else {
      // Start
      if (seconds >= TIMER_DURATION) return; // already done
      localStorage.setItem(TIMER_START_KEY, String(Math.floor(Date.now() / 1000)));
      localStorage.setItem(TIMER_RUNNING_KEY, 'true');
      setRunning(true);
    }
  };

  const reset = () => {
    localStorage.setItem(TIMER_ELAPSED_KEY, '0');
    localStorage.setItem(TIMER_RUNNING_KEY, 'false');
    localStorage.removeItem(TIMER_START_KEY);
    setSeconds(0);
    setRunning(false);
  };

  const remaining = TIMER_DURATION - seconds;
  const progress = seconds / TIMER_DURATION;

  return { seconds, remaining, running, progress, toggle, reset };
}

function formatTime(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

/* ========== COMPONENTS ========== */

function StudyTimer() {
  const { remaining, running, progress, toggle, reset } = useStudyTimer();
  const done = remaining <= 0;

  return (
    <div style={{
      background: '#041540', border: '1px solid #1a1a1a', borderRadius: 16,
      padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
    }}>
      {/* Circular progress */}
      <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
        <svg width={56} height={56} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={28} cy={28} r={24} fill="none" stroke="#1a1a1a" strokeWidth={4} />
          <circle cx={28} cy={28} r={24} fill="none"
            stroke={done ? '#22c55e' : running ? '#3b82f6' : '#555'}
            strokeWidth={4} strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 24}
            strokeDashoffset={2 * Math.PI * 24 * (1 - progress)}
          />
        </svg>
        <Timer size={18} color={running ? '#3b82f6' : '#888'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      </div>
      {/* Time display */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: done ? '#22c55e' : '#fff', letterSpacing: '-0.02em' }}>
          {done ? '0:00:00' : formatTime(remaining)}
        </div>
        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
          {done ? 'Session complete' : running ? 'Study session running' : '3h study timer'}
        </div>
      </div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={toggle} style={{
          width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: running ? '#1a1a1a' : done ? '#1a1a1a' : '#3b82f6',
          opacity: done && !running ? 0.4 : 1,
        }}>
          {running ? <Pause size={18} color="#fff" /> : <Play size={18} color="#fff" />}
        </button>
        <button onClick={reset} style={{
          width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#1a1a1a',
        }}>
          <RotateCcw size={16} color="#888" />
        </button>
      </div>
    </div>
  );
}

function ProgramsThisMonth({ codes, locale }: { codes: string[]; locale: 'en' | 'sk' }) {
  if (codes.length === 0) return (
    <div style={{ background: '#041540', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px', textAlign: 'center', color: '#888', fontSize: 13 }}>
      {locale === 'sk' ? 'Ziadne kurzy - plny focus na finalny projekt' : 'No courses - full focus on final project'}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {codes.map(code => {
        const p = programs.find(pr => pr.code === code);
        if (!p) return null;
        return (
          <div key={code} style={{
            background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14,
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: '#010d33',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              border: '1px solid #1a1a1a',
            }}>
              <img src={p.logo} alt={p.university} style={{ width: 22, height: 22, objectFit: 'contain' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{p.university} - {p.hours}</div>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: p.color, background: `${p.color}15`,
              padding: '3px 8px', borderRadius: 6, letterSpacing: '0.04em',
            }}>
              {p.code}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WeeklyCalendar({ week, locale }: { week: Week; locale: 'en' | 'sk' }) {
  return (
    <div style={{ background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, overflow: 'hidden' }}>
      {/* Week header */}
      <div style={{
        padding: '10px 16px', borderBottom: '1px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
          Week {week.weekNum}
        </div>
        <div style={{ fontSize: 11, color: '#888' }}>
          {locale === 'sk' ? week.focusSK : week.focus}
        </div>
      </div>
      {/* Day grid */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {week.days.map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px',
            borderBottom: i < week.days.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ width: 28, fontSize: 11, fontWeight: 700, color: '#888', flexShrink: 0 }}>
              {locale === 'sk' ? d.day : d.dayEN}
            </div>
            <div style={{
              width: 6, height: 6, borderRadius: 3, flexShrink: 0,
              background: subjectColors[d.subject] || '#555',
            }} />
            <div style={{ fontSize: 12, color: '#ccc', flex: 1 }}>
              {locale === 'sk' ? d.labelSK : d.label}
            </div>
            <div style={{ fontSize: 11, color: '#666' }}>{d.hours}h</div>
          </div>
        ))}
      </div>
      {/* Lab / Project */}
      {(week.lab || week.project) && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid #1a1a1a', background: '#010d33' }}>
          {week.project ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <WrenchIcon size={14} color="#22c55e" style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 600, lineHeight: 1.5 }}>
                {locale === 'sk' ? week.projectSK : week.project}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Beaker size={14} color="#888" style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5 }}>
                {locale === 'sk' ? week.labSK : week.lab}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ========== MAIN PAGE ========== */

export default function SchedulePage() {
  const { locale } = useLocaleStore();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  const month = scheduleMonths[selectedMonth];

  return (
    <div className="page-shell">
      <StatusBar />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 16px 140px' }}>
        {/* Header */}
        <div style={{ paddingTop: 16, marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.03em' }}>
            {locale === 'sk' ? 'Rozvrh' : 'Schedule'}
          </h1>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
            {locale === 'sk' ? '12-mesacny plan robotiky - 15h/tyzden' : '12-month robotics plan - 15h/week'}
          </p>
        </div>

        {/* Study Timer */}
        <div style={{ marginBottom: 20 }}>
          <StudyTimer />
        </div>

        {/* Month selector */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, padding: '10px 16px',
        }}>
          <button onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
            style={{ opacity: selectedMonth === 0 ? 0.3 : 1 }}>
            <ChevronLeft size={20} color="#888" />
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              {locale === 'sk' ? `Mesiac ${month.month}` : `Month ${month.month}`}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginTop: 2 }}>
              {locale === 'sk' ? month.titleSK : month.title}
            </div>
          </div>
          <button onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}
            style={{ opacity: selectedMonth === 11 ? 0.3 : 1 }}>
            <ChevronRight size={20} color="#888" />
          </button>
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#010d33', borderRadius: 10, padding: 3 }}>
          {(['weekly', 'monthly'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: view === v ? '#041540' : 'transparent',
              color: view === v ? '#fff' : '#666',
              transition: 'all 0.15s',
            }}>
              {v === 'weekly'
                ? (locale === 'sk' ? 'Tyzdenny' : 'Weekly')
                : (locale === 'sk' ? 'Mesacny' : 'Monthly')
              }
            </button>
          ))}
        </div>

        {/* Active programs this month */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <GraduationCap size={14} />
            {locale === 'sk' ? 'Aktivne programy tento mesiac' : 'Active programs this month'}
          </div>
          <ProgramsThisMonth codes={month.activeCourses} locale={locale} />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={`${selectedMonth}-${view}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'weekly' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {month.weeks.map(w => (
                  <WeeklyCalendar key={w.weekNum} week={w} locale={locale} />
                ))}
              </div>
            ) : (
              /* Monthly list view */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {month.weeks.map(w => (
                  <div key={w.weekNum} style={{
                    background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, padding: '14px 16px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                        Week {w.weekNum}
                      </div>
                      <div style={{ fontSize: 11, color: '#666' }}>
                        {w.days.reduce((a, d) => a + d.hours, 0)}h {locale === 'sk' ? 'celkovo' : 'total'}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#aaa', marginBottom: 6 }}>
                      {locale === 'sk' ? w.focusSK : w.focus}
                    </div>
                    {/* Subject pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {[...new Set(w.days.map(d => d.subject))].map(subj => (
                        <span key={subj} style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                          background: `${subjectColors[subj] || '#555'}20`,
                          color: subjectColors[subj] || '#888',
                          letterSpacing: '0.04em',
                        }}>
                          {subj}
                        </span>
                      ))}
                    </div>
                    {w.project && (
                      <div style={{ marginTop: 8, fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
                        {locale === 'sk' ? w.projectSK : w.project}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Milestone */}
        {month.milestone && (
          <div style={{
            marginTop: 20, padding: '14px 16px', borderRadius: 14,
            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Milestone
            </div>
            <div style={{ fontSize: 13, color: '#ccc' }}>
              {locale === 'sk' ? month.milestoneSK : month.milestone}
            </div>
          </div>
        )}

        {/* Month subtitle */}
        <div style={{ marginTop: 12, fontSize: 12, color: '#555', textAlign: 'center' }}>
          {locale === 'sk' ? month.subtitleSK : month.subtitle}
        </div>
      </div>
    </div>
  );
}
