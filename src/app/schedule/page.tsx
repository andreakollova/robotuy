'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Beaker, Wrench as WrenchIcon, Play, Pause, RotateCcw, Timer, GraduationCap, BookOpen, Check, ChevronDown } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { useLocaleStore } from '@/store/localeStore';
import { useUserStore } from '@/store/userStore';
import { scheduleMonths, programs, subjectColors } from '@/data/schedule-data';
import type { Month, Week, WeekDay } from '@/data/schedule-data';
import { projectTopics } from '@/data/myprojects-topics';
import Link from 'next/link';

/* ================================================================
   DATE HELPERS
   ================================================================ */

const DAY_NAMES_SK = ['PO', 'UT', 'ST', 'ST', 'PI', 'SO', 'NE'];
const DAY_NAMES_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

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

function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function dateToStr(d: Date) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function formatTime(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  return h + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

function formatDuration(secs: number) {
  const hrs = secs / 3600;
  if (hrs >= 1) return Math.floor(hrs) + 'h ' + Math.floor((hrs % 1) * 60) + 'm';
  return Math.floor(secs / 60) + 'm';
}

function getSubjectForDayOfWeek(planMonth: Month | undefined, dayOfWeek: number): WeekDay | null {
  if (!planMonth) return null;
  if (dayOfWeek >= 5) return null;
  const week = planMonth.weeks[0];
  if (!week || !week.days) return null;
  if (dayOfWeek >= week.days.length) return null;
  return week.days[dayOfWeek];
}

/* ================================================================
   STUDY HISTORY (localStorage)
   ================================================================ */

const HISTORY_KEY = 'robotuy-study-history';
const LESSON_DATES_KEY = 'robotuy-lesson-dates';
const COURSE_HISTORY_KEY = 'robotuy-course-history'; // "2026-09-03" -> course code

type StudyHistory = Record<string, number>;
type CourseHistory = Record<string, string>; // date -> course code

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

function getLessonDates(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(LESSON_DATES_KEY) || '{}'); } catch { return {}; }
}

function getLessonsForDate(dateStr: string): number {
  return getLessonDates()[dateStr] || 0;
}

function getCourseHistory(): CourseHistory {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(COURSE_HISTORY_KEY) || '{}'); } catch { return {}; }
}

function saveCourseForDate(dateStr: string, courseCode: string) {
  const h = getCourseHistory();
  h[dateStr] = courseCode;
  localStorage.setItem(COURSE_HISTORY_KEY, JSON.stringify(h));
}

/* ================================================================
   CLOCK IN/OUT TIMER HOOK
   ================================================================ */

const TIMER_RUNNING_KEY = 'robotuy-timer-running';
const TIMER_START_KEY = 'robotuy-timer-start';
const TIMER_ELAPSED_KEY = 'robotuy-timer-elapsed';
const TIMER_DATE_KEY = 'robotuy-timer-date';
const TIMER_COURSE_KEY = 'robotuy-timer-course';
const TIMER_DURATION = 3 * 60 * 60;

function useStudyTimer() {
  const getStoredElapsed = () => {
    if (typeof window === 'undefined') return 0;
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
  const [course, setCourse] = useState<string>('');

  useEffect(() => {
    setSeconds(calcCurrent());
    setRunning(getStoredRunning());
    setCourse(localStorage.getItem(TIMER_COURSE_KEY) || '');
  }, [calcCurrent]);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => { setSeconds(calcCurrent()); }, 1000);
    return () => clearInterval(iv);
  }, [running, calcCurrent]);

  const clockIn = (courseCode: string) => {
    if (running) return;
    localStorage.setItem(TIMER_DATE_KEY, getTodayStr());
    localStorage.setItem(TIMER_START_KEY, String(Math.floor(Date.now() / 1000)));
    localStorage.setItem(TIMER_RUNNING_KEY, 'true');
    localStorage.setItem(TIMER_COURSE_KEY, courseCode);
    saveCourseForDate(getTodayStr(), courseCode);
    setCourse(courseCode);
    setRunning(true);
  };

  const clockOut = () => {
    if (!running) return;
    const cur = calcCurrent();
    localStorage.setItem(TIMER_ELAPSED_KEY, String(cur));
    localStorage.setItem(TIMER_RUNNING_KEY, 'false');
    saveToHistory(getTodayStr(), cur);
    setRunning(false);
    setSeconds(cur);
  };

  const reset = () => {
    localStorage.setItem(TIMER_ELAPSED_KEY, '0');
    localStorage.setItem(TIMER_RUNNING_KEY, 'false');
    localStorage.removeItem(TIMER_START_KEY);
    localStorage.removeItem(TIMER_COURSE_KEY);
    localStorage.setItem(TIMER_DATE_KEY, getTodayStr());
    saveToHistory(getTodayStr(), 0);
    setSeconds(0);
    setRunning(false);
    setCourse('');
  };

  const remaining = TIMER_DURATION - seconds;
  return {
    seconds, remaining, running, course,
    progress: Math.min(seconds / TIMER_DURATION, 1),
    clockIn, clockOut, reset,
    done: seconds >= TIMER_DURATION,
  };
}

/* ================================================================
   CARD WRAPPER
   ================================================================ */

const Card = ({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { style?: React.CSSProperties }) => (
  <div style={{
    background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, ...style,
  }} {...props}>
    {children}
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {children}
  </div>
);

/* ================================================================
   STUDY TIMER COMPONENT
   ================================================================ */

function StudyTimer({ locale }: { locale: 'en' | 'sk' }) {
  const { seconds, remaining, running, course, progress, clockIn, clockOut, reset, done } = useStudyTimer();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showSelector, setShowSelector] = useState(false);

  // Get all unique course codes from programs (not LAB)
  const courseOptions = programs;
  const activeCourse = running ? programs.find(p => p.code === course) : null;

  return (
    <Card style={{ border: running ? '1px solid #3b82f6' : '1px solid #1a1a1a', padding: '14px 16px', transition: 'border-color 0.3s' }}>
      {/* Timer display row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        {/* Progress circle */}
        <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
          <svg width={48} height={48} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={24} cy={24} r={20} fill="none" stroke="#1a1a1a" strokeWidth={3} />
            <circle cx={24} cy={24} r={20} fill="none"
              stroke={done ? '#22c55e' : running ? '#3b82f6' : '#555'}
              strokeWidth={3} strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={2 * Math.PI * 20 * (1 - progress)}
            />
          </svg>
          {activeCourse ? (
            <img src={activeCourse.logo} alt="" style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 22, height: 22, objectFit: 'contain', borderRadius: 4,
            }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <Timer size={16} color={done ? '#22c55e' : running ? '#3b82f6' : '#888'}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          )}
        </div>

        {/* Countdown */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 22, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '-0.02em',
            color: done ? '#22c55e' : remaining < 0 ? '#22c55e' : '#fff',
          }}>
            {remaining >= 0 ? formatTime(remaining) : '-' + formatTime(Math.abs(remaining))}
          </div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>
            {running && activeCourse
              ? activeCourse.code + ' - ' + (locale === 'sk' ? 'Clocked in' : 'Clocked in')
              : running ? 'Clocked in'
              : seconds === 0 ? (locale === 'sk' ? '3h denny ciel' : '3h daily goal')
              : done ? (locale === 'sk' ? 'Ciel splneny!' : 'Goal reached!')
              : (locale === 'sk' ? 'Pozastavene' : 'Paused')
            }
          </div>
        </div>

        {/* Today total */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: '#fff', letterSpacing: '-0.02em' }}>
            {formatTime(seconds)}
          </div>
          <div style={{ fontSize: 10, color: '#666' }}>{locale === 'sk' ? 'dnes' : 'today'}</div>
        </div>
      </div>

      {/* Course selector (shown before clocking in) */}
      {!running && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            {locale === 'sk' ? 'Vyber kurz' : 'Select course'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {courseOptions.map(p => {
              const isActive = selectedCourse === p.code;
              return (
                <button key={p.code} onClick={() => setSelectedCourse(p.code)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 10px', borderRadius: 8,
                  background: isActive ? (p.color + '30') : '#010d33',
                  border: isActive ? ('1px solid ' + p.color) : '1px solid #1a1a1a',
                  transition: 'all 0.15s', cursor: 'pointer',
                }}>
                  <img src={p.logo} alt="" style={{ width: 16, height: 16, objectFit: 'contain', borderRadius: 3 }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? p.color : '#888', letterSpacing: '0.03em' }}>
                    {p.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        {!running ? (
          <button onClick={() => { if (selectedCourse) clockIn(selectedCourse); }}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 13, fontWeight: 700,
              background: !selectedCourse ? '#333' : done ? '#22c55e' : '#3b82f6',
              color: '#fff', letterSpacing: '0.02em',
              opacity: !selectedCourse ? 0.5 : 1,
              cursor: !selectedCourse ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}>
            {seconds > 0 ? 'Clock In Again' : 'Clock In'}
          </button>
        ) : (
          <button onClick={clockOut} style={{
            flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 13, fontWeight: 700,
            background: '#dc2626', color: '#fff', letterSpacing: '0.02em',
          }}>
            Clock Out
          </button>
        )}
        {seconds > 0 && !running && (
          <button onClick={reset} style={{
            width: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#1a1a1a',
          }}>
            <RotateCcw size={13} color="#666" />
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 10, height: 3, borderRadius: 2, background: '#1a1a1a', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2, transition: 'width 1s linear',
          width: Math.min(progress * 100, 100) + '%',
          background: done ? '#22c55e' : running ? '#3b82f6' : '#555',
        }} />
      </div>
    </Card>
  );
}

/* ================================================================
   STUDY STATS
   ================================================================ */

function StudyStats({ locale }: { locale: 'en' | 'sk' }) {
  const [history, setHistory] = useState<StudyHistory>({});
  const [courseHist, setCourseHist] = useState<CourseHistory>({});

  useEffect(() => {
    setHistory(getHistory());
    setCourseHist(getCourseHistory());
  }, []);

  const entries = Object.entries(history)
    .filter(([, secs]) => secs > 0)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 14);

  const totalAllTime = entries.reduce((sum, [, secs]) => sum + secs, 0);
  const daysStudied = entries.length;

  // This week
  const now = new Date();
  const monday = getMonday(now);
  let weekTotal = 0;
  const weekByCourse: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const ds = dateToStr(d);
    const secs = getHistoryForDate(ds);
    weekTotal += secs;
    const c = courseHist[ds];
    if (c && secs > 0) {
      weekByCourse[c] = (weekByCourse[c] || 0) + secs;
    }
  }
  // Add today's live time
  const todayLive = typeof window !== 'undefined' ? parseInt(localStorage.getItem(TIMER_ELAPSED_KEY) || '0', 10) : 0;
  const todayInHistory = getHistoryForDate(getTodayStr());
  if (todayLive > todayInHistory) weekTotal += (todayLive - todayInHistory);

  if (daysStudied === 0) return null;

  // Top course entries for this week
  const weekCourseEntries = Object.entries(weekByCourse).sort(([, a], [, b]) => b - a).slice(0, 4);

  return (
    <Card style={{ padding: '14px 16px' }}>
      {/* Summary row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1, background: '#010d33', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
            {formatTime(totalAllTime)}
          </div>
          <div style={{ fontSize: 9, color: '#666', marginTop: 1 }}>{locale === 'sk' ? 'celkovo' : 'all time'}</div>
        </div>
        <div style={{ flex: 1, background: '#010d33', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
            {formatTime(weekTotal)}
          </div>
          <div style={{ fontSize: 9, color: '#666', marginTop: 1 }}>{locale === 'sk' ? 'tento tyzden' : 'this week'}</div>
        </div>
        <div style={{ flex: 0.6, background: '#010d33', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#3b82f6', fontFamily: "'JetBrains Mono', monospace" }}>
            {daysStudied}
          </div>
          <div style={{ fontSize: 9, color: '#666', marginTop: 1 }}>{locale === 'sk' ? 'dni' : 'days'}</div>
        </div>
      </div>

      {/* Course breakdown this week */}
      {weekCourseEntries.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {weekCourseEntries.map(([code, secs]) => {
            const color = subjectColors[code] || '#555';
            return (
              <div key={code} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: color + '15', border: '1px solid ' + color + '30',
                borderRadius: 8, padding: '4px 8px',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.02em' }}>{code}:</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#ccc' }}>{formatDuration(secs)}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Day-by-day list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {entries.map(([dateStr, secs]) => {
          const d = new Date(dateStr + 'T00:00:00');
          const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
          const dayName = locale === 'sk' ? DAY_NAMES_SK[dayIdx] : DAY_NAMES_EN[dayIdx];
          const met = secs >= TIMER_DURATION;
          const dayCourse = courseHist[dateStr];
          const courseColor = dayCourse ? (subjectColors[dayCourse] || '#555') : '#555';
          return (
            <div key={dateStr} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: 4, flexShrink: 0,
                background: dayCourse ? courseColor : (met ? '#22c55e' : '#3b82f6'),
              }} />
              <div style={{ fontSize: 11, color: '#888', width: 26, flexShrink: 0 }}>{dayName}</div>
              <div style={{ fontSize: 11, color: '#aaa', flex: 1 }}>
                {d.getDate()}.{d.getMonth() + 1}.
                {dayCourse && <span style={{ color: courseColor, fontWeight: 600, marginLeft: 6 }}>{dayCourse}</span>}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: met ? '#22c55e' : '#fff' }}>
                {formatDuration(secs)}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ================================================================
   WEEKLY CALENDAR VIEW
   ================================================================ */

function WeekCalendarView({ planMonth, locale }: { planMonth: Month; locale: 'en' | 'sk' }) {
  const today = useMemo(() => new Date(), []);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [courseHist, setCourseHist] = useState<CourseHistory>({});

  useEffect(() => { setCourseHist(getCourseHistory()); }, []);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Week nav */}
      <Card style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
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
      </Card>

      {/* 7-day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
        {weekDays.map((d, i) => {
          const isToday = isSameDay(d, today);
          const isWeekend = i >= 5;
          const schedule = getSubjectForDayOfWeek(planMonth, i);
          const subjectColor = schedule ? (subjectColors[schedule.subject] || '#555') : '#333';
          const ds = dateToStr(d);
          const historyVal = getHistoryForDate(ds);
          const liveToday = isToday ? parseInt((typeof window !== 'undefined' ? localStorage.getItem(TIMER_ELAPSED_KEY) : null) || '0', 10) : 0;
          const studied = Math.max(historyVal, liveToday);
          const metGoal = studied >= TIMER_DURATION;
          const lessonsCompleted = getLessonsForDate(ds);
          const hadActivity = studied > 0 || lessonsCompleted > 0;
          const dayCourse = courseHist[ds];
          const dayCourseColor = dayCourse ? (subjectColors[dayCourse] || '#555') : null;
          const isSelected = selectedDay === i;

          return (
            <div key={i} onClick={() => setSelectedDay(isSelected ? null : i)} style={{
              background: isToday && hadActivity ? 'rgba(34,197,94,0.08)' : isToday ? '#0c255a' : hadActivity ? 'rgba(34,197,94,0.06)' : '#041540',
              border: isSelected && !isToday ? '2px solid #fff'
                : isToday && hadActivity ? '2px solid #22c55e'
                : isToday ? '2px solid #3b82f6'
                : hadActivity ? '1px solid rgba(34,197,94,0.3)'
                : '1px solid #1a1a1a',
              borderRadius: 12, padding: '8px 4px', textAlign: 'center',
              minHeight: 84, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              opacity: isWeekend && !hadActivity ? 0.4 : 1,
              cursor: 'pointer', transition: 'border-color 0.15s',
            }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: isToday && hadActivity ? '#22c55e' : isToday ? '#3b82f6' : '#666', letterSpacing: '0.04em' }}>
                {dayNames[i]}
              </div>
              <div style={{
                width: 26, height: 26, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isToday && hadActivity ? '#22c55e' : isToday ? '#3b82f6' : hadActivity ? '#22c55e' : 'transparent',
                color: hadActivity || isToday ? '#fff' : '#ccc',
                fontSize: 13, fontWeight: 700,
              }}>
                {d.getDate()}
              </div>
              {/* Course dot */}
              {dayCourseColor && studied > 0 && (
                <div style={{ width: 6, height: 6, borderRadius: 3, background: dayCourseColor }} />
              )}
              {studied > 0 ? (
                <div style={{ fontSize: 8, fontWeight: 700, color: metGoal ? '#22c55e' : '#3b82f6' }}>
                  {formatDuration(studied)}
                </div>
              ) : lessonsCompleted > 0 ? (
                <div style={{ fontSize: 8, fontWeight: 700, color: '#22c55e' }}>
                  {lessonsCompleted} {lessonsCompleted === 1 ? 'lesson' : 'lessons'}
                </div>
              ) : schedule && !isWeekend ? (
                <>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: subjectColor, marginTop: 1 }} />
                  <div style={{ fontSize: 8, fontWeight: 700, color: subjectColor, letterSpacing: '0.03em' }}>
                    {schedule.subject}
                  </div>
                </>
              ) : isWeekend ? (
                <div style={{ fontSize: 8, color: '#444', marginTop: 3 }}>
                  {locale === 'sk' ? 'Volno' : 'Off'}
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
        const dayLabel = isShowingToday ? (locale === 'sk' ? 'Dnes' : 'Today') : dayNames[dayIdx] + ' ' + dayDate.getDate() + '.' + (dayDate.getMonth() + 1) + '.';

        const prog = sched ? programs.find(p => p.code === sched.subject) : null;
        const currentWeekNum = Math.ceil((dayDate.getDate() + (new Date(dayDate.getFullYear(), dayDate.getMonth(), 1).getDay() || 7) - 1) / 7);
        const weekData = planMonth.weeks[Math.min(currentWeekNum - 1, planMonth.weeks.length - 1)] || planMonth.weeks[0];

        if (!sched) return (
          <Card style={{ padding: '12px 16px', textAlign: 'center', color: '#666', fontSize: 13 }}>
            {dayLabel} - {locale === 'sk' ? 'volny den' : 'day off'}
          </Card>
        );

        const borderColor = isShowingToday ? '#3b82f6' : subjectColors[sched.subject] || '#555';

        return (
          <Card style={{ border: '1px solid ' + borderColor, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: borderColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                {dayLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {prog && (
                  <div style={{
                    width: 28, height: 28, borderRadius: 7, background: '#010d33',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    border: '1px solid #1a1a1a', overflow: 'hidden',
                  }}>
                    <img src={prog.logo} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                    {locale === 'sk' ? sched.labelSK : sched.label}
                  </div>
                  <div style={{ fontSize: 11, color: '#888' }}>{sched.hours}h - {sched.subject}</div>
                </div>
              </div>
            </div>

            {/* Link to course */}
            {prog?.link && (
              <a href={prog.link} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', padding: '8px 14px', borderBottom: '1px solid #1a1a1a',
                fontSize: 12, color: '#3b82f6', fontWeight: 600, textDecoration: 'none',
              }}>
                {locale === 'sk' ? 'Otvorit kurz na Coursera' : 'Open course on Coursera'} {'->'}
              </a>
            )}

            {/* Lab/project info */}
            {sched.subject === 'LAB' && weekData && (weekData.lab || weekData.project) && (
              <div style={{ padding: '10px 14px', background: '#010d33' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: weekData.project ? '#22c55e' : '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
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

            {sched.subject !== 'LAB' && weekData && (weekData.lab || weekData.project) && (
              <div style={{ padding: '8px 14px', borderTop: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: 10, color: '#555', marginBottom: 3 }}>
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
          </Card>
        );
      })()}
    </div>
  );
}

/* ================================================================
   COMPLETED LESSONS
   ================================================================ */

function CompletedLessons({ locale }: { locale: 'en' | 'sk' }) {
  const { completedLessons } = useUserStore();

  const allLessons = useMemo(() => {
    const lessons: { id: string; title: string; topicId: string; exerciseCount: number }[] = [];
    for (const topic of projectTopics) {
      for (const lesson of topic.lessons) {
        lessons.push({ id: lesson.id, title: lesson.title, topicId: topic.id, exerciseCount: lesson.exercises?.length || 0 });
      }
    }
    return lessons;
  }, []);

  const lessonProgress = useMemo(() => {
    return allLessons.map(lesson => {
      const prefix = lesson.topicId + '-' + lesson.id;
      const done = completedLessons.filter(id => id.startsWith(prefix)).length;
      return { ...lesson, done, completed: done >= lesson.exerciseCount && lesson.exerciseCount > 0 };
    });
  }, [allLessons, completedLessons]);

  const completedCount = lessonProgress.filter(l => l.completed).length;
  const nextLesson = lessonProgress.find(l => !l.completed);
  const recentCompleted = lessonProgress.filter(l => l.completed).slice(-5).reverse();

  return (
    <Card style={{ overflow: 'hidden' }}>
      {/* Next lesson */}
      {nextLesson && (
        <Link href={'/topics'} style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '10px 14px', borderBottom: '1px solid #1a1a1a',
            background: 'rgba(59,130,246,0.06)',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
              {locale === 'sk' ? 'Nasledujuca lekcia' : 'Next lesson'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{nextLesson.title}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>
              {nextLesson.done}/{nextLesson.exerciseCount} {locale === 'sk' ? 'cviceni' : 'exercises'}
            </div>
          </div>
        </Link>
      )}

      {/* Completed header */}
      <div style={{
        padding: '8px 14px',
        borderBottom: recentCompleted.length > 0 ? '1px solid #1a1a1a' : 'none',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Check size={13} color="#22c55e" />
        <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {locale === 'sk' ? 'Dokoncene' : 'Completed'}
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
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px',
              borderBottom: i < recentCompleted.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
            }}>
              <Check size={11} color="#22c55e" />
              <div style={{ fontSize: 11, color: '#ccc', flex: 1 }}>{lesson.title}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ================================================================
   MONTHLY CALENDAR VIEW
   ================================================================ */

function MonthCalendarView({ planMonth, locale }: { planMonth: Month; locale: 'en' | 'sk' }) {
  const dayNames = locale === 'sk' ? DAY_NAMES_SK.slice(0, 5) : DAY_NAMES_EN.slice(0, 5);
  const sampleWeek = planMonth.weeks[0];
  if (!sampleWeek) return null;

  const courseCodes = [...new Set(sampleWeek.days.filter(d => d.subject !== 'LAB').map(d => d.subject))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionLabel>{locale === 'sk' ? 'Vzorovy tyzden' : 'Sample week'}</SectionLabel>

      {/* Sample week - 5 day cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {sampleWeek.days.map((d, i) => {
          const p = programs.find(pr => pr.code === d.subject);
          const color = subjectColors[d.subject] || '#555';
          return (
            <Card key={i} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, fontSize: 10, fontWeight: 800, color: '#666', textAlign: 'center', flexShrink: 0 }}>
                {dayNames[i]}
              </div>
              {p ? (
                <div style={{
                  width: 28, height: 28, borderRadius: 7, background: '#010d33',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  border: '1px solid #1a1a1a', overflow: 'hidden',
                }}>
                  <img src={p.logo} alt={p.university} style={{ width: 18, height: 18, objectFit: 'contain' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              ) : (
                <div style={{
                  width: 28, height: 28, borderRadius: 7, background: color + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: 4, background: color }} />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>
                  {locale === 'sk' ? d.labelSK : d.label}
                </div>
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, color, background: color + '15',
                padding: '2px 7px', borderRadius: 6, letterSpacing: '0.04em',
              }}>
                {d.subject}
              </div>
              <div style={{ fontSize: 11, color: '#666', flexShrink: 0 }}>{d.hours}h</div>
            </Card>
          );
        })}
      </div>

      {/* Total hours */}
      <div style={{
        textAlign: 'center', fontSize: 12, color: '#888',
        padding: '6px 0', borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {sampleWeek.days.reduce((a, d) => a + d.hours, 0)}h / {locale === 'sk' ? 'tyzden' : 'week'}
      </div>

      {/* Courses with logos */}
      <SectionLabel>{locale === 'sk' ? 'Kurzy tento mesiac' : 'Courses this month'}</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {courseCodes.map(code => {
          const p = programs.find(pr => pr.code === code);
          if (!p) return null;
          const Wrapper = p.link ? 'a' : 'div';
          const linkProps = p.link ? { href: p.link, target: '_blank' as const, rel: 'noopener noreferrer' } : {};
          return (
            <Wrapper key={code} {...(linkProps as any)} style={{
              background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14,
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
              textDecoration: 'none',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, background: '#010d33',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                border: '1px solid #1a1a1a', overflow: 'hidden',
              }}>
                <img src={p.logo} alt={p.university} style={{ width: 24, height: 24, objectFit: 'contain' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontSize: 10, color: '#888' }}>{p.university} - {p.hours}</div>
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, color: p.color, background: p.color + '15',
                padding: '2px 7px', borderRadius: 6, letterSpacing: '0.04em',
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

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function SchedulePage() {
  const { locale } = useLocaleStore();
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  // Use month 1 as the default plan context (for schedule data reference)
  const month = scheduleMonths[0];

  return (
    <div className="page-shell">
      <StatusBar />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 16px 140px' }}>
        {/* Header */}
        <div style={{ paddingTop: 16, marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#EDEDED', letterSpacing: '-0.03em' }}>
            {locale === 'sk' ? 'Rozvrh' : 'Schedule'}
          </h1>
          <p style={{ fontSize: 12, color: '#888', marginTop: 3 }}>
            {locale === 'sk' ? '12-mesacny plan robotiky - 15h/tyzden' : '12-month robotics plan - 15h/week'}
          </p>
        </div>

        {/* Study Timer */}
        <div style={{ marginBottom: 10 }}>
          <StudyTimer locale={locale} />
        </div>

        {/* Study Stats */}
        <div style={{ marginBottom: 14 }}>
          <StudyStats locale={locale} />
        </div>

        {/* View toggle */}
        <div style={{
          display: 'flex', gap: 4, marginBottom: 14,
          background: '#041540', border: '1px solid #1a1a1a', borderRadius: 10, padding: 3,
        }}>
          {(['weekly', 'monthly'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: view === v ? '#0c255a' : 'transparent',
              color: view === v ? '#fff' : '#666',
              transition: 'all 0.15s',
            }}>
              {v === 'weekly'
                ? (locale === 'sk' ? 'Tyzden' : 'Weekly')
                : (locale === 'sk' ? 'Mesiac' : 'Monthly')
              }
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={view}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'weekly'
              ? <WeekCalendarView planMonth={month} locale={locale} />
              : <MonthCalendarView planMonth={month} locale={locale} />
            }
          </motion.div>
        </AnimatePresence>

        {/* Completed Lessons */}
        <div style={{ marginTop: 14 }}>
          <CompletedLessons locale={locale} />
        </div>
      </div>
    </div>
  );
}
