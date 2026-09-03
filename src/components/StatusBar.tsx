'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '@/store/userStore';
import { useLocaleStore } from '@/store/localeStore';
import { Flame, Zap, Settings, Timer } from 'lucide-react';
import Link from 'next/link';

/* Persistent timer - reads from same localStorage keys as Schedule page */
const TIMER_RUNNING_KEY = 'robotuy-timer-running';
const TIMER_START_KEY = 'robotuy-timer-start';
const TIMER_ELAPSED_KEY = 'robotuy-timer-elapsed';
const TIMER_DURATION = 3 * 60 * 60;

function useTimerDisplay() {
  const calc = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    const running = localStorage.getItem(TIMER_RUNNING_KEY) === 'true';
    const elapsed = parseInt(localStorage.getItem(TIMER_ELAPSED_KEY) || '0', 10);
    if (!running) return elapsed;
    const start = parseInt(localStorage.getItem(TIMER_START_KEY) || '0', 10);
    const now = Math.floor(Date.now() / 1000);
    return Math.min(elapsed + (now - start), TIMER_DURATION);
  }, []);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSeconds(calc());
    setRunning(localStorage.getItem(TIMER_RUNNING_KEY) === 'true');
  }, [calc]);

  useEffect(() => {
    const iv = setInterval(() => {
      const isRunning = localStorage.getItem(TIMER_RUNNING_KEY) === 'true';
      setRunning(isRunning);
      setSeconds(calc());
    }, 1000);
    return () => clearInterval(iv);
  }, [calc]);

  const remaining = TIMER_DURATION - seconds;
  const active = running || seconds > 0;
  return { remaining, running, active, done: remaining <= 0 };
}

function fmtShort(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function StatusBar() {
  const { streak, xp } = useUserStore();
  const { locale } = useLocaleStore();
  const { remaining, running, active, done } = useTimerDisplay();

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: '#010d33',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      paddingTop: 'env(safe-area-inset-top, 0px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 44 }}>

        {/* Left: Streak + XP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Flame size={14} color={streak > 0 ? '#EDEDED' : '#3A3A3A'} fill={streak > 0 ? '#EDEDED' : 'none'} />
            <span style={{ fontWeight: 600, fontSize: 13, color: streak > 0 ? '#EDEDED' : '#3A3A3A' }}>
              {streak}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Zap size={13} color="#EDEDED" fill="#EDEDED" />
            <span style={{ fontWeight: 600, fontSize: 13, color: '#EDEDED' }}>
              {xp.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Center: Logo (mobile only) */}
        <Link href="/" className="mobile-logo-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img src="/logorobotuy.png" alt="Robotuy" style={{ height: 18, objectFit: 'contain' }} />
        </Link>

        {/* Right: Timer + Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {active && (
            <Link href="/schedule" style={{
              display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none',
            }}>
              <Timer size={12} color={running ? '#3b82f6' : done ? '#22c55e' : '#555'} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, fontWeight: 600, letterSpacing: '-0.01em',
                color: done ? '#22c55e' : running ? '#9CA3AF' : '#555',
              }}>
                {done ? '0:00:00' : fmtShort(remaining)}
              </span>
            </Link>
          )}
          <Link href="/settings" style={{ display: 'flex' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#0c255a',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Settings size={14} color="#6E6E6E" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
