'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Beaker, Wrench as WrenchIcon, Play, Pause, RotateCcw, Timer, GraduationCap } from 'lucide-react';
import StatusBar from '@/components/StatusBar';
import { useLocaleStore } from '@/store/localeStore';
import { scheduleMonths, programs, subjectColors } from '@/data/schedule-data';
import type { Month, Week, WeekDay } from '@/data/schedule-data';

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

/* ========== PERSISTENT TIMER ========== */
const TIMER_RUNNING_KEY = 'robotuy-timer-running';
const TIMER_START_KEY = 'robotuy-timer-start';
const TIMER_ELAPSED_KEY = 'robotuy-timer-elapsed';
const TIMER_DURATION = 3 * 60 * 60;

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

  useEffect(() => {
    setSeconds(calcCurrent());
    setRunning(getStoredRunning());
  }, [calcCurrent]);

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
      const cur = calcCurrent();
      localStorage.setItem(TIMER_ELAPSED_KEY, String(cur));
      localStorage.setItem(TIMER_RUNNING_KEY, 'false');
      setRunning(false);
      setSeconds(cur);
    } else {
      if (seconds >= TIMER_DURATION) return;
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

  return { seconds, remaining: TIMER_DURATION - seconds, running, progress: seconds / TIMER_DURATION, toggle, reset };
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
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: done ? '#22c55e' : '#fff', letterSpacing: '-0.02em' }}>
          {done ? '0:00:00' : formatTime(remaining)}
        </div>
        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
          {done ? 'Session complete' : running ? 'Study session running' : '3h study timer'}
        </div>
      </div>
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

          return (
            <div key={i} style={{
              background: isToday ? '#0c255a' : '#041540',
              border: isToday ? '2px solid #3b82f6' : '1px solid #1a1a1a',
              borderRadius: 12, padding: '10px 6px', textAlign: 'center',
              minHeight: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              opacity: isWeekend ? 0.4 : 1,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: isToday ? '#3b82f6' : '#666', letterSpacing: '0.04em' }}>
                {dayNames[i]}
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isToday ? '#3b82f6' : 'transparent',
                color: isToday ? '#fff' : '#ccc',
                fontSize: 14, fontWeight: 700,
              }}>
                {d.getDate()}
              </div>
              {schedule && !isWeekend ? (
                <>
                  <div style={{
                    width: 6, height: 6, borderRadius: 3, background: subjectColor, marginTop: 2,
                  }} />
                  <div style={{ fontSize: 9, fontWeight: 700, color: subjectColor, letterSpacing: '0.03em' }}>
                    {schedule.subject}
                  </div>
                  <div style={{ fontSize: 8, color: '#666' }}>{schedule.hours}h</div>
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

      {/* Today's detail card */}
      {(() => {
        const todayDow = today.getDay() === 0 ? 6 : today.getDay() - 1;
        if (weekOffset !== 0) return null;
        const sched = getSubjectForDayOfWeek(planMonth, todayDow);
        if (!sched) return (
          <div style={{
            background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, padding: '14px 16px',
            textAlign: 'center', color: '#666', fontSize: 13,
          }}>
            {locale === 'sk' ? 'Dnes je voľný deň' : "Today is a day off"}
          </div>
        );
        return (
          <div style={{
            background: '#041540', border: '1px solid #3b82f6', borderRadius: 14, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              {locale === 'sk' ? 'Dnes' : 'Today'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 8, height: 8, borderRadius: 4, flexShrink: 0,
                background: subjectColors[sched.subject] || '#555',
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                  {locale === 'sk' ? sched.labelSK : sched.label}
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>{sched.hours}h - {sched.subject}</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Weekly plan blocks (from schedule data) */}
      <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
        {locale === 'sk' ? 'Týždenný plán' : 'Weekly plan'}
      </div>
      {planMonth.weeks.map(w => (
        <WeekPlanCard key={w.weekNum} week={w} locale={locale} />
      ))}
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
  const today = useMemo(() => new Date(), []);
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const calDays = useMemo(() => getCalendarDays(calYear, calMonth), [calYear, calMonth]);
  const dayNames = locale === 'sk' ? DAY_NAMES_SK : DAY_NAMES_EN;
  const monthNames = locale === 'sk' ? MONTH_NAMES_SK : MONTH_NAMES_EN;

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };
  const goToday = () => { setCalMonth(today.getMonth()); setCalYear(today.getFullYear()); };

  const isCurrentMonth = calMonth === today.getMonth() && calYear === today.getFullYear();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Month nav */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, padding: '8px 12px',
      }}>
        <button onClick={prevMonth}><ChevronLeft size={18} color="#888" /></button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
            {monthNames[calMonth]} {calYear}
          </span>
          {!isCurrentMonth && (
            <button onClick={goToday} style={{
              marginLeft: 8, fontSize: 10, color: '#3b82f6', fontWeight: 600,
              background: 'rgba(59,130,246,0.1)', padding: '2px 8px', borderRadius: 6,
            }}>
              {locale === 'sk' ? 'Dnes' : 'Today'}
            </button>
          )}
        </div>
        <button onClick={nextMonth}><ChevronRight size={18} color="#888" /></button>
      </div>

      {/* Calendar grid */}
      <div style={{
        background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14,
        overflow: 'hidden',
      }}>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #1a1a1a' }}>
          {dayNames.map((name, i) => (
            <div key={name} style={{
              textAlign: 'center', padding: '8px 0', fontSize: 10, fontWeight: 700,
              color: i >= 5 ? '#444' : '#666', letterSpacing: '0.04em',
            }}>
              {name}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {calDays.map((d, i) => {
            if (!d) return <div key={`empty-${i}`} style={{ padding: '10px 4px', minHeight: 52 }} />;

            const isToday = isSameDay(d, today);
            const dow = i % 7; // 0=Mon
            const isWeekend = dow >= 5;
            const schedule = getSubjectForDayOfWeek(planMonth, dow);
            const subjectColor = schedule ? (subjectColors[schedule.subject] || '#555') : undefined;

            return (
              <div key={i} style={{
                padding: '6px 4px', minHeight: 52, textAlign: 'center',
                borderRight: dow < 6 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                background: isToday ? 'rgba(59,130,246,0.08)' : 'transparent',
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 13, margin: '0 auto',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isToday ? '#3b82f6' : 'transparent',
                  color: isToday ? '#fff' : isWeekend ? '#444' : '#ccc',
                  fontSize: 12, fontWeight: isToday ? 800 : 500,
                }}>
                  {d.getDate()}
                </div>
                {subjectColor && !isWeekend && (
                  <div style={{
                    width: 5, height: 5, borderRadius: 3, background: subjectColor,
                    margin: '3px auto 0',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, padding: '0 4px',
      }}>
        {[...new Set(planMonth.weeks[0]?.days.map(d => d.subject) || [])].map(subj => (
          <div key={subj} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: subjectColors[subj] || '#555' }} />
            <span style={{ fontSize: 10, color: '#888' }}>{subj}</span>
          </div>
        ))}
      </div>

      {/* Plan weeks as list under calendar */}
      <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
        {locale === 'sk' ? 'Plán mesiaca' : 'Month plan'}
      </div>
      {planMonth.weeks.map(w => (
        <div key={w.weekNum} style={{
          background: '#041540', border: '1px solid #1a1a1a', borderRadius: 14, padding: '14px 16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Week {w.weekNum}</div>
            <div style={{ fontSize: 11, color: '#666' }}>
              {w.days.reduce((a, d) => a + d.hours, 0)}h {locale === 'sk' ? 'celkovo' : 'total'}
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#aaa', marginBottom: 6 }}>
            {locale === 'sk' ? w.focusSK : w.focus}
          </div>
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
        <div style={{ marginBottom: 20 }}>
          <StudyTimer />
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
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#010d33', borderRadius: 10, padding: 3 }}>
          {(['weekly', 'monthly'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: view === v ? '#041540' : 'transparent',
              color: view === v ? '#fff' : '#666',
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
      </div>
    </div>
  );
}
