'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Beaker, Wrench as WrenchIcon, Play, Pause, RotateCcw, Timer, GraduationCap, BookOpen, Check } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { useLocaleStore } from '@/store/localeStore';
import { useUserStore } from '@/store/userStore';
import { scheduleMonths, programs, subjectColors } from '@/data/schedule-data';
import type { Month, Week, WeekDay } from '@/data/schedule-data';
import { projectTopics } from '@/data/myprojects-topics';
import Link from 'next/link';

/* ========== DATE HELPERS ========== */

const DAY_NAMES_SK = ['PO', 'UT', 'ST', 'ŠT', 'PI', 'SO', 'NE'];
const DAY_NAMES_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTH_NAMES_SK = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];
const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay() === 0 ? 6 : first.getDay() - 1; // Monday = 0
  const days: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

/** Map day-of-week (0=Mon..4=Fri) to schedule plan subjects for a given plan month.
 *  Uses the FIRST week of the plan month as the daily template. */
function getSubjectForDayOfWeek(planMonth: Month | undefined, dayOfWeek: number): WeekDay | null {
  if (!planMonth) return null;
  if (dayOfWeek >= 5) return null; // weekend
  const week = planMonth.weeks[0];
  if (!week || !week.days) return null;
  if (dayOfWeek >= week.days.length) return null;
  return week.days[dayOfWeek];
}

/* ========== STUDY HISTORY ========== */
const HISTORY_KEY = 'robotuy-study-history';

type StudyHistory = Record<string, number>; // "2026-09-03" -> seconds

/* Track which days had lesson completions */
const LESSON_DATES_KEY = 'robotuy-lesson-dates';

function getLessonDates(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(LESSON_DATES_KEY) || '{}'); } catch { return {}; }
}

function getLessonsForDate(dateStr: string): number {
  return getLessonDates()[dateStr] || 0;
}

function getHistory(): StudyHistory {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}'); } catch { return {}; }
}

function saveToHistory(dateStr: string, totalSeconds: number) {
  const h = getHistory();
  h[dateStr] = totalSeconds;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}

function getHistoryForDate(dateStr: string): number {
  return getHistory()[dateStr] || 0;
}

/* ========== CLOCK IN/OUT TIMER ========== */
const TIMER_RUNNING_KEY = 'robotuy-timer-running';
const TIMER_START_KEY = 'robotuy-timer-start';
const TIMER_ELAPSED_KEY = 'robotuy-timer-elapsed';
const TIMER_DURATION = 3 * 60 * 60;
const TIMER_DATE_KEY = 'robotuy-timer-date';

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function dateToStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function useStudyTimer() {
  const getStoredElapsed = () => {
    if (typeof window === 'undefined') return 0;
    // Save previous day and reset if day changed
    const storedDate = localStorage.getItem(TIMER_DATE_KEY);
    if (storedDate && storedDate !== getTodayStr()) {
      const prevElapsed = parseInt(localStorage.getItem(TIMER_ELAPSED_KEY) || '0', 10);
      if (prevElapsed > 0) saveToHistory(storedDate, prevElapsed);
      localStorage.setItem(TIMER_ELAPSED_KEY, '0');
      localStorage.setItem(TIMER_RUNNING_KEY, 'false');
      localStorage.removeItem(TIMER_START_KEY);
      localStorage.setItem(TIMER_DATE_KEY, getTodayStr());
      return 0;
    }
    if (!storedDate) localStorage.setItem(TIMER_DATE_KEY, getTodayStr());
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
    return elapsed + (now - start);
  }, []);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSeconds(calcCurrent());
    setRunning(getStoredRunning());
  }, [calcCurrent]);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setSeconds(calcCurrent());
    }, 1000);
    return () => clearInterval(iv);
  }, [running, calcCurrent]);

  const clockIn = () => {
    if (running) return;
    localStorage.setItem(TIMER_DATE_KEY, getTodayStr());
    localStorage.setItem(TIMER_START_KEY, String(Math.floor(Date.now() / 1000)));
    localStorage.setItem(TIMER_RUNNING_KEY, 'true');
    setRunning(true);
  };

  const clockOut = () => {
    if (!running) return;
    const cur = calcCurrent();
    localStorage.setItem(TIMER_ELAPSED_KEY, String(cur));
    localStorage.setItem(TIMER_RUNNING_KEY, 'false');
    // Save to history on every clock out
    saveToHistory(getTodayStr(), cur);
    setRunning(false);
    setSeconds(cur);
  };

  const reset = () => {
    localStorage.setItem(TIMER_ELAPSED_KEY, '0');
    localStorage.setItem(TIMER_RUNNING_KEY, 'false');
    localStorage.removeItem(TIMER_START_KEY);
    localStorage.setItem(TIMER_DATE_KEY, getTodayStr());
    saveToHistory(getTodayStr(), 0);
    setSeconds(0);
    setRunning(false);
  };

  const remaining = TIMER_DURATION - seconds;
  return { seconds, remaining, running, progress: Math.min(seconds / TIMER_DURATION, 1), clockIn, clockOut, reset, done: seconds >= TIMER_DURATION };
}

function formatTime(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

/* ========== COMPONENTS ========== */

function StudyTimer() {
  const { seconds, remaining, running, progress, clockIn, clockOut, reset, done } = useStudyTimer();

  return (
    <div style={{
      background: '#041540', border: `1px solid ${running ? '#3b82f6' : '#1a1a1a'}`,
      borderRadius: 16, padding: '16px 20px',
      transition: 'border-color 0.3s',
    }}>
      {/* Top row: circle + countdown + total */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
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
          <Timer size={18} color={running ? '#3b82f6' : done ? '#22c55e' : '#888'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        </div>
        <div style={{ flex: 1 }}>
          {/* Countdown from 3h (goes negative after) */}
          <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-0.02em', color: done ? '#22c55e' : remaining < 0 ? '#22c55e' : '#fff' }}>
            {remaining >= 0 ? formatTime(remaining) : '-' + formatTime(Math.abs(remaining))}
          </div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
            {running ? 'Clocked in' : seconds === 0 ? '3h daily goal' : done ? 'Goal reached!' : 'Paused'}
          </div>
        </div>
        {/* Total studied today */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: '#fff', letterSpacing: '-0.02em' }}>
            {formatTime(seconds)}
          </div>
          <div style={{ fontSize: 10, color: '#666' }}>today</div>
        </div>
      </div>

      {/* Clock In / Clock Out buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        {!running ? (
          <button onClick={clockIn} style={{
            flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 700,
            background: done ? '#22c55e' : '#3b82f6', color: '#fff', letterSpacing: '0.02em',
          }}>
            {seconds > 0 ? 'Clock In Again' : 'Clock In'}
          </button>
        ) : (
          <button onClick={clockOut} style={{
            flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 700,
            background: '#dc2626', color: '#fff', letterSpacing: '0.02em',
          }}>
            Clock Out
          </button>
        )}
        {seconds > 0 && !running && (
          <button onClick={reset} style={{
            width: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#1a1a1a',
          }}>
            <RotateCcw size={14} color="#666" />
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: '#1a1a1a', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2, transition: 'width 1s linear',
          width: `${Math.min(progress * 100, 100)}%`,
          background: done ? '#22c55e' : running ? '#3b82f6' : '#555',
        }} />
      </div>
    </div>
  );
}

function StudyStats({ locale }: { locale: 'en' | 'sk' }) {
  const [history, setHistory] = useState<StudyHistory>({});

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const entries = Object.entries(history)
    .filter(([, secs]) => secs > 0)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 14); // last 14 days with data

  const totalAllTime = entries.reduce((sum, [, secs]) => sum + secs, 0);
  const daysStudied = entries.length;

  // This week
  const now = new Date();
  const monday = getMonday(now);
  let weekTotal = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekTotal += getHistoryForDate(dateToStr(d));
  }
  // Add today's live time
  const todayLive = parseInt(localStorage.getItem(TIMER_ELAPSED_KEY) || '0', 10);
  const todayInHistory = getHistoryForDate(getTodayStr());
  if (todayLive > todayInHistory) weekTotal += (todayLive - todayInHistory);

  if (daysStudied === 0) return null;

  return (
    <div style={{
      background: '#041540', border: '1px solid #1a1a1a', borderRadius: 16, padding: '16px 20px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
        {locale === 'sk' ? 'Statistiky' : 'Stats'}
      </div>

      {/* Summary row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <div style={{ flex: 1, background: '#010d33', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
            {formatTime(totalAllTime)}
          </div>
          <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>{locale === 'sk' ? 'celkovo' : 'all time'}</div>
        </div>
        <div style={{ flex: 1, background: '#010d33', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
            {formatTime(weekTotal)}
          </div>
          <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>{locale === 'sk' ? 'tento tyzden' : 'this week'}</div>
        </div>
        <div style={{ flex: 1, background: '#010d33', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#3b82f6', fontFamily: "'JetBrains Mono', monospace" }}>
            {daysStudied}
          </div>
          <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>{locale === 'sk' ? 'dni' : 'days'}</div>
        </div>
      </div>

      {/* Day-by-day list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {entries.map(([dateStr, secs]) => {
          const d = new Date(dateStr + 'T00:00:00');
          const dayName = locale === 'sk' ? DAY_NAMES_SK[d.getDay() === 0 ? 6 : d.getDay() - 1] : DAY_NAMES_EN[d.getDay() === 0 ? 6 : d.getDay() - 1];
          const met = secs >= TIMER_DURATION;
          const hrs = secs / 3600;
          return (
            <div key={dateStr} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: met ? '#22c55e' : '#3b82f6', flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: '#888', width: 28, flexShrink: 0 }}>{dayName}</div>
              <div style={{ fontSize: 12, color: '#ccc', flex: 1 }}>
                {d.getDate()}.{d.getMonth() + 1}.
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: met ? '#22c55e' : '#fff' }}>
                {hrs >= 1 ? `${Math.floor(hrs)}h ${Math.floor((hrs % 1) * 60)}m` : `${Math.floor(secs / 60)}m`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProgramsThisMonth({ codes, locale }: { codes: string[]; locale: 'en' | 'sk' }) {
  if (codes.length === 0) return (
    <div style={{ background: '#041540', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px', textAlign: 'center', color: '#888', fontSize: 13 }}>
      {locale === 'sk' ? 'Žiadne kurzy - plný focus na finálny projekt' : 'No courses - full focus on final project'}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {codes.map(code => {
        const p = programs.find(pr => pr.code === code);
        if (!p) return null;
        const Wrapper = p.link ? 'a' : 'div';
        const linkProps = p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {};
        return (
          <Wrapper key={code} {...linkProps} style={{
            background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14,
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
            textDecoration: 'none', transition: 'border-color 0.15s',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: '#010d33',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              border: '1px solid #1a1a1a', overflow: 'hidden',
            }}>
              <img src={p.logo} alt={p.university} style={{ width: 28, height: 28, objectFit: 'contain' }}
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
          </Wrapper>
        );
      })}
    </div>
  );
}

/* ========== REAL WEEKLY CALENDAR ========== */

function WeekCalendarView({ planMonth, locale }: { planMonth: Month; locale: 'en' | 'sk' }) {
  const today = useMemo(() => new Date(), []);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null); // 0-6 index in weekDays

  const monday = useMemo(() => {
    const m = getMonday(today);
    m.setDate(m.getDate() + weekOffset * 7);
    return m;
  }, [today, weekOffset]);

  const weekDays = useMemo(() => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    return days;
  }, [monday]);

  const dayNames = locale === 'sk' ? DAY_NAMES_SK : DAY_NAMES_EN;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Week nav */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, padding: '8px 12px',
      }}>
        <button onClick={() => setWeekOffset(w => w - 1)}>
          <ChevronLeft size={18} color="#888" />
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
            {weekDays[0].getDate()}.{weekDays[0].getMonth() + 1}. - {weekDays[6].getDate()}.{weekDays[6].getMonth() + 1}.
          </span>
          {weekOffset !== 0 && (
            <button onClick={() => setWeekOffset(0)} style={{
              marginLeft: 8, fontSize: 10, color: '#3b82f6', fontWeight: 600,
              background: 'rgba(59,130,246,0.1)', padding: '2px 8px', borderRadius: 6,
            }}>
              {locale === 'sk' ? 'Dnes' : 'Today'}
            </button>
          )}
        </div>
        <button onClick={() => setWeekOffset(w => w + 1)}>
          <ChevronRight size={18} color="#888" />
        </button>
      </div>

      {/* 7-day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {weekDays.map((d, i) => {
          const isToday = isSameDay(d, today);
          const isWeekend = i >= 5;
          const schedule = getSubjectForDayOfWeek(planMonth, i);
          const subjectColor = schedule ? (subjectColors[schedule.subject] || '#555') : '#333';
          // For today, use live elapsed from localStorage (not just history)
          const historyVal = getHistoryForDate(dateToStr(d));
          const liveToday = isToday ? parseInt((typeof window !== 'undefined' ? localStorage.getItem(TIMER_ELAPSED_KEY) : null) || '0', 10) : 0;
          const studied = Math.max(historyVal, liveToday);
          const metGoal = studied >= TIMER_DURATION;
          const lessonsCompleted = getLessonsForDate(dateToStr(d));
          const hadActivity = studied > 0 || lessonsCompleted > 0;

          const isSelected = selectedDay === i;
          return (
            <div key={i} onClick={() => setSelectedDay(isSelected ? null : i)} style={{
              background: isToday && (metGoal || lessonsCompleted > 0) ? 'rgba(34,197,94,0.08)' : isToday ? '#0c255a' : (metGoal || lessonsCompleted > 0) ? 'rgba(34,197,94,0.06)' : '#041540',
              border: isSelected && !isToday ? '2px solid #fff' : isToday && (metGoal || lessonsCompleted > 0) ? '2px solid #22c55e' : isToday ? '2px solid #3b82f6' : (metGoal || lessonsCompleted > 0) ? '1px solid rgba(34,197,94,0.3)' : '1px solid #1a1a1a',
              borderRadius: 12, padding: '10px 6px', textAlign: 'center',
              minHeight: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              opacity: isWeekend && !hadActivity ? 0.4 : 1,
              cursor: 'pointer', transition: 'border-color 0.15s',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: isToday && hadActivity ? '#22c55e' : isToday ? '#3b82f6' : '#666', letterSpacing: '0.04em' }}>
                {dayNames[i]}
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isToday && hadActivity ? '#22c55e' : isToday ? '#3b82f6' : hadActivity ? '#22c55e' : 'transparent',
                color: hadActivity ? '#fff' : isToday ? '#fff' : '#ccc',
                fontSize: 14, fontWeight: 700,
              }}>
                {d.getDate()}
              </div>
              {studied > 0 ? (
                <div style={{ fontSize: 9, fontWeight: 700, color: metGoal ? '#22c55e' : '#3b82f6' }}>
                  {studied >= 3600 ? `${Math.floor(studied / 3600)}h${Math.floor((studied % 3600) / 60)}m` : `${Math.floor(studied / 60)}m`}
                </div>
              ) : lessonsCompleted > 0 ? (
                <div style={{ fontSize: 9, fontWeight: 700, color: '#22c55e' }}>
                  {lessonsCompleted} {lessonsCompleted === 1 ? 'lesson' : 'lessons'}
                </div>
              ) : schedule && !isWeekend ? (
                <>
                  <div style={{
                    width: 6, height: 6, borderRadius: 3, background: subjectColor, marginTop: 2,
                  }} />
                  <div style={{ fontSize: 9, fontWeight: 700, color: subjectColor, letterSpacing: '0.03em' }}>
                    {schedule.subject}
                  </div>
                </>
              ) : isWeekend ? (
                <div style={{ fontSize: 9, color: '#444', marginTop: 4 }}>
                  {locale === 'sk' ? 'Voľno' : 'Off'}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Selected day detail card */}
      {(() => {
        const dayIdx = selectedDay !== null ? selectedDay : (weekOffset === 0 ? (today.getDay() === 0 ? 6 : today.getDay() - 1) : null);
        if (dayIdx === null) return null;
        const isShowingToday = selectedDay === null;
        const sched = getSubjectForDayOfWeek(planMonth, dayIdx);
        const dayDate = weekDays[dayIdx];
        const dayLabel = isShowingToday ? (locale === 'sk' ? 'Dnes' : 'Today') : `${dayNames[dayIdx]} ${dayDate.getDate()}.${dayDate.getMonth() + 1}.`;

        // Find program for this day's subject
        const prog = sched ? programs.find(p => p.code === sched.subject) : null;
        // Find lab/project for this week
        const currentWeekNum = Math.ceil((dayDate.getDate() + (new Date(dayDate.getFullYear(), dayDate.getMonth(), 1).getDay() || 7) - 1) / 7);
        const weekData = planMonth.weeks[Math.min(currentWeekNum - 1, planMonth.weeks.length - 1)] || planMonth.weeks[0];

        if (!sched) return (
          <div style={{
            background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, padding: '14px 16px',
            textAlign: 'center', color: '#666', fontSize: 13,
          }}>
            {locale === 'sk' ? `${dayLabel} - volny den` : `${dayLabel} - day off`}
          </div>
        );

        const borderColor = isShowingToday ? '#3b82f6' : subjectColors[sched.subject] || '#555';

        return (
          <div style={{
            background: '#041540', border: `1px solid ${borderColor}`, borderRadius: 14, overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: borderColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                {dayLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {prog && (
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: '#010d33',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    border: '1px solid #1a1a1a', overflow: 'hidden',
                  }}>
                    <img src={prog.logo} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                    {locale === 'sk' ? sched.labelSK : sched.label}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>{sched.hours}h - {sched.subject}</div>
                </div>
              </div>
            </div>

            {/* Link to course */}
            {prog?.link && (
              <a href={prog.link} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', padding: '10px 16px', borderBottom: '1px solid #1a1a1a',
                fontSize: 12, color: '#3b82f6', fontWeight: 600, textDecoration: 'none',
              }}>
                {locale === 'sk' ? 'Otvorit kurz na Coursera' : 'Open course on Coursera'} →
              </a>
            )}

            {/* Lab/project for this week (shown on Friday/LAB days or when selected) */}
            {sched.subject === 'LAB' && weekData && (weekData.lab || weekData.project) && (
              <div style={{ padding: '12px 16px', background: '#010d33' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: weekData.project ? '#22c55e' : '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                  {weekData.project ? (locale === 'sk' ? 'Projekt' : 'Project') : 'Lab'}
                </div>
                <div style={{ fontSize: 12, color: weekData.project ? '#22c55e' : '#ccc', lineHeight: 1.6 }}>
                  {weekData.project
                    ? (locale === 'sk' ? weekData.projectSK : weekData.project)
                    : (locale === 'sk' ? weekData.labSK : weekData.lab)
                  }
                </div>
              </div>
            )}

            {/* If not LAB day, still show week's lab info as context */}
            {sched.subject !== 'LAB' && weekData && (weekData.lab || weekData.project) && (
              <div style={{ padding: '10px 16px', borderTop: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: 10, color: '#555', marginBottom: 4 }}>
                  {locale === 'sk' ? 'Lab tento tyzden:' : 'Lab this week:'}
                </div>
                <div style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>
                  {weekData.project
                    ? (locale === 'sk' ? weekData.projectSK : weekData.project)
                    : (locale === 'sk' ? weekData.labSK : weekData.lab)
                  }
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* This week's completed lessons */}
      <WeekLessonsCompleted locale={locale} />
    </div>
  );
}

function WeekLessonsCompleted({ locale }: { locale: 'en' | 'sk' }) {
  const { completedLessons } = useUserStore();

  // Get all lessons from projectTopics
  const allLessons = useMemo(() => {
    const lessons: { id: string; title: string; topicId: string; exerciseCount: number }[] = [];
    for (const topic of projectTopics) {
      for (const lesson of topic.lessons) {
        lessons.push({
          id: lesson.id,
          title: lesson.title,
          topicId: topic.id,
          exerciseCount: lesson.exercises?.length || 0,
        });
      }
    }
    return lessons;
  }, []);

  // For each lesson, count how many exercises are completed
  const lessonProgress = useMemo(() => {
    return allLessons.map(lesson => {
      const prefix = lesson.topicId + '-' + lesson.id;
      const done = completedLessons.filter(id => id.startsWith(prefix)).length;
      return { ...lesson, done, completed: done >= lesson.exerciseCount && lesson.exerciseCount > 0 };
    });
  }, [allLessons, completedLessons]);

  const completedCount = lessonProgress.filter(l => l.completed).length;
  const nextLesson = lessonProgress.find(l => !l.completed);

  // Recent completed (last 5)
  const recentCompleted = lessonProgress.filter(l => l.completed).slice(-5).reverse();

  return (
    <div style={{
      background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14,
      overflow: 'hidden', marginTop: 8,
    }}>
      {/* Next lesson to do */}
      {nextLesson && (
        <Link href={'/topics'} style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid #1a1a1a',
            background: 'rgba(59,130,246,0.06)',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              {locale === 'sk' ? 'Nasledujuca lekcia' : 'Next lesson'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
              {nextLesson.title}
            </div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
              {nextLesson.done}/{nextLesson.exerciseCount} {locale === 'sk' ? 'cviceni' : 'exercises'}
            </div>
          </div>
        </Link>
      )}

      {/* Completed lessons header */}
      <div style={{
        padding: '10px 16px', borderBottom: recentCompleted.length > 0 ? '1px solid #1a1a1a' : 'none',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Check size={14} color="#22c55e" />
        <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {locale === 'sk' ? 'Dokoncene lekcie' : 'Completed lessons'}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#22c55e' }}>
          {completedCount}/{allLessons.length}
        </div>
      </div>

      {/* Recent completed */}
      {recentCompleted.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {recentCompleted.map((lesson, i) => (
            <div key={lesson.id} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
              borderBottom: i < recentCompleted.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <Check size={12} color="#22c55e" />
              <div style={{ fontSize: 12, color: '#ccc', flex: 1 }}>{lesson.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeekPlanCard({ week, locale }: { week: Week; locale: 'en' | 'sk' }) {
  return (
    <div style={{ background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{
        padding: '10px 16px', borderBottom: '1px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Week {week.weekNum}</div>
        <div style={{ fontSize: 11, color: '#888' }}>{locale === 'sk' ? week.focusSK : week.focus}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {week.days.map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px',
            borderBottom: i < week.days.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ width: 28, fontSize: 11, fontWeight: 700, color: '#888', flexShrink: 0 }}>
              {locale === 'sk' ? d.day : d.dayEN}
            </div>
            <div style={{ width: 6, height: 6, borderRadius: 3, flexShrink: 0, background: subjectColors[d.subject] || '#555' }} />
            <div style={{ fontSize: 12, color: '#ccc', flex: 1 }}>{locale === 'sk' ? d.labelSK : d.label}</div>
            <div style={{ fontSize: 11, color: '#666' }}>{d.hours}h</div>
          </div>
        ))}
      </div>
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
              <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5 }}>{locale === 'sk' ? week.labSK : week.lab}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ========== REAL MONTHLY CALENDAR ========== */

function MonthCalendarView({ planMonth, locale }: { planMonth: Month; locale: 'en' | 'sk' }) {
  const dayNames = locale === 'sk' ? DAY_NAMES_SK.slice(0, 5) : DAY_NAMES_EN.slice(0, 5);
  const sampleWeek = planMonth.weeks[0];
  if (!sampleWeek) return null;

  // Unique courses in this month (not LAB)
  const courseCodes = [...new Set(sampleWeek.days.filter(d => d.subject !== 'LAB').map(d => d.subject))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Sample week label */}
      <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {locale === 'sk' ? 'Vzorový týždeň' : 'Sample week'}
      </div>

      {/* Sample week - 5 day cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sampleWeek.days.map((d, i) => {
          const p = programs.find(pr => pr.code === d.subject);
          const color = subjectColors[d.subject] || '#555';
          return (
            <div key={i} style={{
              background: '#041540', border: '1px solid #1a1a1a', borderRadius: 12,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, fontSize: 11, fontWeight: 800, color: '#666',
                textAlign: 'center', flexShrink: 0,
              }}>
                {dayNames[i]}
              </div>
              {p ? (
                <div style={{
                  width: 30, height: 30, borderRadius: 8, background: '#010d33',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  border: '1px solid #1a1a1a', overflow: 'hidden',
                }}>
                  <img src={p.logo} alt={p.university} style={{ width: 20, height: 20, objectFit: 'contain' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              ) : (
                <div style={{
                  width: 30, height: 30, borderRadius: 8, background: `${color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: color }} />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
                  {locale === 'sk' ? d.labelSK : d.label}
                </div>
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, color, background: `${color}15`,
                padding: '2px 8px', borderRadius: 6, letterSpacing: '0.04em',
              }}>
                {d.subject}
              </div>
              <div style={{ fontSize: 11, color: '#666', flexShrink: 0 }}>{d.hours}h</div>
            </div>
          );
        })}
      </div>

      {/* Total hours */}
      <div style={{
        textAlign: 'center', fontSize: 12, color: '#888',
        padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {sampleWeek.days.reduce((a, d) => a + d.hours, 0)}h / {locale === 'sk' ? 'týždeň' : 'week'}
      </div>

      {/* Courses with logos */}
      <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {locale === 'sk' ? 'Kurzy tento mesiac' : 'Courses this month'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {courseCodes.map(code => {
          const p = programs.find(pr => pr.code === code);
          if (!p) return null;
          const Wrapper = p.link ? 'a' : 'div';
          const linkProps = p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <Wrapper key={code} {...linkProps} style={{
              background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14,
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
              textDecoration: 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: '#010d33',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                border: '1px solid #1a1a1a', overflow: 'hidden',
              }}>
                <img src={p.logo} alt={p.university} style={{ width: 28, height: 28, objectFit: 'contain' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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
            </Wrapper>
          );
        })}
      </div>
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
            {locale === 'sk' ? '12-mesačný plán robotiky - 15h/týždeň' : '12-month robotics plan - 15h/week'}
          </p>
        </div>

        {/* Study Timer */}
        <div style={{ marginBottom: 12 }}>
          <StudyTimer />
        </div>

        {/* Study Stats */}
        <div style={{ marginBottom: 20 }}>
          <StudyStats locale={locale} />
        </div>

        {/* Plan month selector */}
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
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
          {(['weekly', 'monthly'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: view === v ? 'var(--bg-raised)' : 'transparent',
              color: view === v ? 'var(--text)' : 'var(--text-hint)',
              transition: 'all 0.15s',
            }}>
              {v === 'weekly'
                ? (locale === 'sk' ? 'Týždenný' : 'Weekly')
                : (locale === 'sk' ? 'Mesačný' : 'Monthly')
              }
            </button>
          ))}
        </div>

        {/* Active programs */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <GraduationCap size={14} />
            {locale === 'sk' ? 'Aktívne programy tento mesiac' : 'Active programs this month'}
          </div>
          <ProgramsThisMonth codes={month.activeCourses} locale={locale} />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={`${selectedMonth}-${view}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'weekly'
              ? <WeekCalendarView planMonth={month} locale={locale} />
              : <MonthCalendarView planMonth={month} locale={locale} />
            }
          </motion.div>
        </AnimatePresence>

        {/* Milestone removed */}
      </div>
    </div>
  );
}
