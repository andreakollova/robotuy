'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useLocaleStore } from '@/store/localeStore';
import { projectTopics } from '@/data/myprojects-topics';
import StatusBar from '@/components/StatusBar';
import { ArrowLeft, Check, ChevronRight, Zap, BookOpen, Lightbulb, Code, X, Play, Loader2, GraduationCap, HelpCircle, BookText, RotateCcw, Trophy, AlertCircle } from 'lucide-react';
import { bookChapters } from '@/data/book-content';
import type { Exercise } from '@/types';

export default function TopicLessonPage() {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  const router = useRouter();
  const { locale } = useLocaleStore();
  const { completeLesson, completedLessons } = useUserStore();

  const topic = projectTopics.find(t => t.id === topicId);
  const lesson = topic?.lessons.find(l => l.id === lessonId);
  const [activeExIdx, setActiveExIdx] = useState(0);
  const [tab, setTab] = useState<'lesson' | 'quiz' | 'book'>(lesson?.content ? 'lesson' : 'quiz');
  const [expandedBookSection, setExpandedBookSection] = useState<string | null>(null);
  const bookChapter = bookChapters.find(ch => ch.courseId === lessonId);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [quizDone, setQuizDone] = useState(false);

  // Attempt history stored in localStorage
  const attemptsKey = `robotuy-attempts-${topicId}-${lessonId}`;
  const [attempts, setAttempts] = useState<{ correct: number; total: number; wrongIds: string[]; date: string }[]>([]);
  useEffect(() => {
    try { const saved = localStorage.getItem(attemptsKey); if (saved) setAttempts(JSON.parse(saved)); } catch {}
  }, [attemptsKey]);

  useEffect(() => {
    if (tab !== 'lesson') { setScrollProgress(0); return; }
    const handleScroll = () => {
      const scrollTop = Math.max(window.scrollY, window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    const t = setInterval(handleScroll, 200);
    handleScroll();
    return () => { window.removeEventListener('scroll', handleScroll); document.removeEventListener('scroll', handleScroll); clearInterval(t); };
  }, [tab]);

  if (!topic || !lesson) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-hint)' }}>
        Not found
      </div>
    );
  }

  const exercise = lesson.exercises[activeExIdx];
  const exKey = topic.id + '-' + exercise?.id;
  const totalDone = lesson.exercises.filter(e => completedLessons.includes(topic.id + '-' + e.id)).length;

  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {/* Scroll progress bar — right side */}
      {tab === 'lesson' && (
        <div style={{
          position: 'fixed', right: 10, top: 70, bottom: 70, width: 4, zIndex: 999,
          background: 'rgba(79,42,133,0.1)', borderRadius: 4,
        }}>
          <div style={{
            width: '100%', borderRadius: 4,
            background: '#4f2a85',
            height: `${Math.max(scrollProgress * 100, 1)}%`,
            transition: 'height 0.1s ease-out',
          }} />
        </div>
      )}
      <StatusBar />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px 20px 120px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => router.push('/topics')}
            style={{ background: 'none', border: 'none', color: 'var(--text-hint)', cursor: 'pointer', padding: 4, display: 'flex' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {topic.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: '#4f2a85', margin: 0 }}>{lesson.title}</h1>
              {topic.id === 'modern-robotics' && <img src="/northwestern-logo.png" alt="" style={{ height: 16, objectFit: 'contain', opacity: 0.6 }} />}
            </div>
          </div>
          <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>
            {totalDone}/{lesson.exercises.length}
          </span>
        </div>

        {/* Lesson / Quiz / Book tab switcher */}
        {lesson.content && (
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: 'var(--bg-card)', borderRadius: 12, padding: 3, border: '1px solid var(--border)' }}>
            {(['lesson', 'quiz', 'book'] as const).map(t => {
              const icon = t === 'lesson' ? <GraduationCap size={14} /> : t === 'quiz' ? <HelpCircle size={14} /> : <BookText size={14} />;
              const label = t === 'lesson' ? 'Lesson' : t === 'quiz' ? `Quiz (${lesson.exercises.length})` : 'Book';
              const show = t !== 'book' || !!lesson.bookPage;
              if (!show) return null;
              return (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  background: tab === t ? 'var(--bg-raised)' : 'transparent',
                  color: tab === t ? 'var(--text)' : 'var(--text-hint)',
                  fontWeight: 600, fontSize: 12.5, transition: 'all 0.2s',
                }}>
                  {icon} {label}
                </button>
              );
            })}
          </div>
        )}

        {/* LESSON CONTENT TAB */}
        {tab === 'lesson' && lesson.content && (
          <div className="lesson-content" style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.75, marginBottom: 32, background: '#fff', borderRadius: 16, padding: '24px 28px', border: '1px solid var(--border)' }}>
            {(() => {
              let inRecap = false;
              let inSummary = false;
              return lesson.content!.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (trimmed === ':::recap') { inRecap = true; return <div key={i} style={{ margin: '10px 0 0', padding: '10px 16px 0', background: 'rgba(34,197,94,0.04)', borderRadius: '12px 12px 0 0', borderTop: '2px solid rgba(34,197,94,0.25)', borderLeft: '1px solid rgba(34,197,94,0.1)', borderRight: '1px solid rgba(34,197,94,0.1)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><RotateCcw size={12} color="var(--green)" /><span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Opakovanie z predchádzajúcej lekcie</span></div></div>; }
              if (trimmed === ':::summary') { inSummary = true; return <div key={i} style={{ margin: '10px 0 0', padding: '10px 16px 0', background: 'rgba(79,42,133,0.04)', borderRadius: '12px 12px 0 0', borderTop: '2px solid rgba(79,42,133,0.25)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BookOpen size={12} color="#4f2a85" /><span style={{ fontSize: 10, fontWeight: 700, color: '#4f2a85', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Zhrnutie lekcie</span></div></div>; }
              if (trimmed === ':::') { if (inRecap) { inRecap = false; return <div key={i} style={{ padding: '0 16px 8px', background: 'rgba(34,197,94,0.04)', borderLeft: '1px solid rgba(34,197,94,0.1)', borderRight: '1px solid rgba(34,197,94,0.1)', borderBottom: '2px solid rgba(34,197,94,0.25)', borderRadius: '0 0 12px 12px', marginBottom: 10 }} />; } if (inSummary) { inSummary = false; return <div key={i} style={{ padding: '0 16px 8px', background: 'rgba(79,42,133,0.04)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)', borderBottom: '2px solid rgba(79,42,133,0.25)', borderRadius: '0 0 12px 12px', marginBottom: 10 }} />; } }
              if (inRecap && trimmed.startsWith('## ')) return <div key={i} style={{ padding: '4px 16px 0', background: 'rgba(34,197,94,0.04)', borderLeft: '1px solid rgba(34,197,94,0.1)', borderRight: '1px solid rgba(34,197,94,0.1)' }}><h2 style={{ fontSize: 15, fontWeight: 700, color: '#4f2a85', margin: '6px 0 2px', lineHeight: 1.3, paddingLeft: 10, borderLeft: '3px solid #22c55e', opacity: 0.75 }}>{trimmed.slice(3)}</h2></div>;
              if (inRecap && trimmed === '---') return <div key={i} style={{ padding: '0 16px', background: 'rgba(34,197,94,0.04)', borderLeft: '1px solid rgba(34,197,94,0.1)', borderRight: '1px solid rgba(34,197,94,0.1)' }}><hr style={{ border: 'none', borderTop: '1px solid rgba(34,197,94,0.12)', margin: '6px 0' }} /></div>;
              if (inRecap) {
                const recapImgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                if (recapImgMatch) return <div key={i} style={{ padding: '4px 16px', background: 'rgba(34,197,94,0.04)', borderLeft: '1px solid rgba(34,197,94,0.1)', borderRight: '1px solid rgba(34,197,94,0.1)' }}><img src={recapImgMatch[2]} alt={recapImgMatch[1]} style={{ width: '100%', borderRadius: 8, opacity: 0.85 }} /></div>;
                if (!trimmed) return <div key={i} style={{ height: 2, background: 'rgba(34,197,94,0.04)', borderLeft: '1px solid rgba(34,197,94,0.1)', borderRight: '1px solid rgba(34,197,94,0.1)' }} />;
                const recapFormatted = trimmed.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: 'var(--text-secondary)' }}>{part.slice(2, -2)}</strong>;
                  return part;
                });
                return <div key={i} style={{ padding: '0 16px', background: 'rgba(34,197,94,0.04)', borderLeft: '1px solid rgba(34,197,94,0.1)', borderRight: '1px solid rgba(34,197,94,0.1)' }}><p style={{ margin: '2px 0', fontSize: 13, color: 'var(--text-hint)', lineHeight: 1.65 }}>{recapFormatted}</p></div>;
              }
              if (inSummary) {
                if (trimmed.startsWith('## ')) return <div key={i} style={{ padding: '4px 16px 0', background: 'rgba(79,42,133,0.04)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)' }}><h2 style={{ fontSize: 15, fontWeight: 700, color: '#4f2a85', margin: '6px 0 2px', lineHeight: 1.3, paddingLeft: 10, borderLeft: '3px solid #4f2a85', opacity: 0.75 }}>{trimmed.slice(3)}</h2></div>;
                if (trimmed === '---') return <div key={i} style={{ padding: '0 16px', background: 'rgba(79,42,133,0.04)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)' }}><hr style={{ border: 'none', borderTop: '1px solid rgba(79,42,133,0.12)', margin: '6px 0' }} /></div>;
                const summaryImgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                if (summaryImgMatch) return <div key={i} style={{ padding: '4px 16px', background: 'rgba(79,42,133,0.04)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)' }}><img src={summaryImgMatch[2]} alt={summaryImgMatch[1]} style={{ width: '100%', borderRadius: 8, opacity: 0.85 }} /></div>;
                if (!trimmed) return <div key={i} style={{ height: 2, background: 'rgba(79,42,133,0.04)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)' }} />;
                const summaryFormatted = trimmed.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: 'var(--text-secondary)' }}>{part.slice(2, -2)}</strong>;
                  return part;
                });
                if (trimmed.startsWith('- ')) { const content = trimmed.slice(2); const sf = content.split(/(\*\*[^*]+\*\*)/).map((part, j) => { if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: 'var(--text-secondary)' }}>{part.slice(2, -2)}</strong>; return part; }); return <div key={i} style={{ padding: '0 16px', background: 'rgba(79,42,133,0.04)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)' }}><div style={{ display: 'flex', gap: 8, margin: '2px 0', paddingLeft: 8 }}><span style={{ color: '#4f2a85', flexShrink: 0 }}>-</span><span style={{ fontSize: 13, color: 'var(--text-hint)', lineHeight: 1.65 }}>{sf}</span></div></div>; }
                return <div key={i} style={{ padding: '0 16px', background: 'rgba(79,42,133,0.04)', borderLeft: '1px solid rgba(79,42,133,0.1)', borderRight: '1px solid rgba(79,42,133,0.1)' }}><p style={{ margin: '2px 0', fontSize: 13, color: 'var(--text-hint)', lineHeight: 1.65 }}>{summaryFormatted}</p></div>;
              }
              if (!trimmed) return <div key={i} style={{ height: inRecap ? 4 : 6 }} />;
              if (trimmed.startsWith('# ')) return <h1 key={i} style={{ fontSize: 22, fontWeight: 800, color: '#4f2a85', margin: '10px 0 8px', lineHeight: 1.3 }}>{trimmed.slice(2)}</h1>;
              if (trimmed.startsWith('## ')) return <h2 key={i} style={{ fontSize: 17, fontWeight: 700, color: '#4f2a85', margin: '12px 0 6px', lineHeight: 1.3, paddingLeft: 10, borderLeft: '3px solid #22c55e' }}>{trimmed.slice(3)}</h2>;
              if (trimmed.startsWith('### ')) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: '#4f2a85', margin: '10px 0 4px' }}>{trimmed.slice(4)}</h3>;
              if (trimmed === '---') return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />;
              if (trimmed.startsWith('> ')) return <div key={i} style={{ borderLeft: '3px solid #4f2a85', padding: '8px 12px', margin: '10px 0', background: 'rgba(79,42,133,0.05)', borderRadius: '0 8px 8px 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{trimmed.slice(2).split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--text)' }}>{part}</strong> : part)}</div>;
              if (trimmed.startsWith('- ')) {
                const content = trimmed.slice(2);
                const formatted = content.split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--text)' }}>{part}</strong> : part);
                return <div key={i} style={{ display: 'flex', gap: 8, margin: '3px 0', paddingLeft: 8 }}><span style={{ color: '#4f2a85', flexShrink: 0 }}>-</span><span>{formatted}</span></div>;
              }
              if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) return <div key={i} style={{ background: 'rgba(79,42,133,0.05)', padding: '10px 14px', borderRadius: 8, margin: '8px 0', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#4f2a85', overflowX: 'auto', border: '1px solid var(--border)' }}>{trimmed.slice(2, -2)}</div>;
              const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
              if (imgMatch) return <img key={i} src={imgMatch[2]} alt={imgMatch[1]} style={{ width: '100%', borderRadius: 10, margin: '10px 0' }} />;
              if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) return <p key={i} style={{ fontSize: 11, color: 'var(--text-hint)', fontStyle: 'italic', margin: '0 0 12px', lineHeight: 1.5 }}>{trimmed.slice(1, -1)}</p>;
              const formatted = trimmed.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: 'var(--text)' }}>{part.slice(2, -2)}</strong>;
                if (part.startsWith('`') && part.endsWith('`')) return <code key={j} style={{ background: 'rgba(79,42,133,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#4f2a85', fontFamily: 'var(--font-mono)', border: '1px solid rgba(79,42,133,0.15)' }}>{part.slice(1, -1)}</code>;
                return part;
              });
              return <p key={i} style={{ margin: '4px 0', ...(inRecap ? { fontSize: 13.5, color: 'var(--text-hint)' } : {}) }}>{formatted}</p>;
            });
            })()}
            {/* YouTube Video Embed */}
            {lesson.videoUrl && (() => {
              const match = lesson.videoUrl!.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?#]+)/);
              const videoId = match?.[1];
              if (!videoId) return null;
              return (
                <div style={{ margin: '28px 0 16px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Play size={14} color="#22c55e" /> Video k lekcii
                  </div>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })()}
            {lesson.exercises.length > 0 && (
              <button
                onClick={() => setTab('quiz')}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: '#22c55e', color: 'var(--btn-primary-text)', fontWeight: 700, fontSize: 15, marginTop: 16,
                }}
              >
                {locale === 'sk' ? 'Prejsť na otázky' : 'Go to Quiz'} ({lesson.exercises.length})
              </button>
            )}
          </div>
        )}

        {/* QUIZ TAB */}
        {tab === 'quiz' && quizDone && (() => {
          const total = lesson.exercises.length;
          const lastAttempt = attempts[attempts.length - 1];
          const correct = lastAttempt?.correct ?? (total - wrongIds.size);
          const pct = Math.round((correct / total) * 100);
          const grade = pct >= 90 ? '1' : pct >= 75 ? '2' : pct >= 50 ? '3' : pct >= 30 ? '4' : '5';
          const gradeLabel = grade === '1' ? 'Výborný' : grade === '2' ? 'Chválitebný' : grade === '3' ? 'Dobrý' : grade === '4' ? 'Dostatočný' : 'Nedostatočný';
          const gradeColor = grade <= '2' ? 'var(--green)' : grade === '3' ? '#f59e0b' : '#dc2626';
          const passed = pct >= 50;
          const wrongExercises = lesson.exercises.filter(ex => (lastAttempt?.wrongIds ?? Array.from(wrongIds)).includes(ex.id));

          return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
              {/* Score card */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '32px 28px', border: '1px solid var(--border)', textAlign: 'center', marginBottom: 20 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: passed ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.08)', border: `3px solid ${gradeColor}` }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: gradeColor }}>{pct}%</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: gradeColor, marginBottom: 4 }}>{gradeLabel}</div>
                <div style={{ fontSize: 14, color: 'var(--text-hint)', marginBottom: 16 }}>
                  {locale === 'sk' ? `Známka ${grade}` : `Grade ${grade}`} - {correct}/{total} {locale === 'sk' ? 'správnych' : 'correct'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <div><span style={{ fontWeight: 700, color: 'var(--green)' }}>{correct}</span> {locale === 'sk' ? 'správne' : 'correct'}</div>
                  <div><span style={{ fontWeight: 700, color: '#dc2626' }}>{total - correct}</span> {locale === 'sk' ? 'nesprávne' : 'wrong'}</div>
                </div>

                {/* Attempt history */}
                {attempts.length > 0 && (
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-hint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                      {locale === 'sk' ? 'História pokusov' : 'Attempt History'}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {attempts.map((a, i) => {
                        const aPct = Math.round((a.correct / a.total) * 100);
                        const aGrade = aPct >= 90 ? '1' : aPct >= 75 ? '2' : aPct >= 50 ? '3' : aPct >= 30 ? '4' : '5';
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, padding: '6px 12px', borderRadius: 8, background: i === attempts.length - 1 ? 'rgba(79,42,133,0.06)' : 'transparent' }}>
                            <span style={{ fontWeight: 700, color: '#4f2a85', minWidth: 70 }}>Pokus {i + 1}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{aPct}%</span>
                            <span style={{ color: 'var(--text-hint)' }}>({a.correct}/{a.total})</span>
                            <span style={{ color: 'var(--text-hint)', fontSize: 11, marginLeft: 'auto' }}>{locale === 'sk' ? `Známka ${aGrade}` : `Grade ${aGrade}`}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Wrong answers list */}
              {wrongExercises.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', border: '1px solid var(--border)', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <AlertCircle size={16} color="#dc2626" />
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#dc2626' }}>
                      {locale === 'sk' ? 'Nesprávne odpovede' : 'Wrong answers'} ({wrongExercises.length})
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {wrongExercises.map((ex, i) => (
                      <div key={ex.id} style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.12)' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                          {i + 1}. {ex.prompt.length > 80 ? ex.prompt.slice(0, 80) + '...' : ex.prompt}
                        </div>
                        {ex.correctAnswer && (
                          <div style={{ fontSize: 12, color: 'var(--green)' }}>
                            {locale === 'sk' ? 'Správna odpoveď' : 'Correct answer'}: {ex.correctAnswer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Retake button */}
              <button
                onClick={() => {
                  setQuizDone(false);
                  setActiveExIdx(0);
                  setWrongIds(new Set());
                }}
                style={{
                  width: '100%', padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: '#4f2a85', fontWeight: 700, fontSize: 15,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
                className="purple-btn"
              >
                <RotateCcw size={16} color="#fff" />
                {locale === 'sk' ? `Skúsiť znova (Pokus ${attempts.length + 1})` : `Try again (Attempt ${attempts.length + 1})`}
              </button>
            </motion.div>
          );
        })()}

        {tab === 'quiz' && !quizDone && <>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 28 }}>
          {lesson.exercises.map((ex, i) => {
            const done = completedLessons.includes(topic.id + '-' + ex.id);
            const isWrong = wrongIds.has(ex.id);
            return (
              <div
                key={ex.id}
                onClick={() => setActiveExIdx(i)}
                style={{
                  flex: 1, height: 3, borderRadius: 2, cursor: 'pointer',
                  background: isWrong ? '#dc2626' : done ? 'var(--green)' : i === activeExIdx ? 'var(--text)' : 'var(--border)',
                }}
              />
            );
          })}
        </div>

        {/* Exercise content */}
        <AnimatePresence mode="wait">
          {exercise && (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ExerciseView
                exercise={exercise}
                topicId={topic.id}
                locale={locale}
                onComplete={(wasCorrect: boolean) => {
                  completeLesson(exKey, exercise.xp);
                  if (!wasCorrect) setWrongIds(prev => new Set(prev).add(exercise.id));
                }}
                onNext={() => {
                  if (activeExIdx < lesson.exercises.length - 1) {
                    setActiveExIdx(activeExIdx + 1);
                  } else {
                    // Quiz finished — save attempt
                    const total = lesson.exercises.length;
                    const correct = total - wrongIds.size;
                    const attempt = { correct, total, wrongIds: Array.from(wrongIds), date: new Date().toISOString() };
                    const newAttempts = [...attempts, attempt];
                    setAttempts(newAttempts);
                    try { localStorage.setItem(attemptsKey, JSON.stringify(newAttempts)); } catch {}
                    setQuizDone(true);
                  }
                }}
                isLast={activeExIdx === lesson.exercises.length - 1}
                isDone={completedLessons.includes(exKey)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>}

        {/* BOOK TAB */}
        {tab === 'book' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href={`https://hades.mech.northwestern.edu/images/7/7f/MR.pdf${lesson.bookPage ? '#page=' + lesson.bookPage : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px',
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14,
                textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              <BookText size={20} color="var(--green)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#4f2a85' }}>Modern Robotics — Full Book (PDF)</div>
                <div style={{ fontSize: 12, color: 'var(--text-hint)', marginTop: 2 }}>Kevin M. Lynch & Frank C. Park{lesson.bookPage ? ` — strana ${lesson.bookPage}` : ''}</div>
              </div>
              <ChevronRight size={16} color="var(--text-dim)" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== EXERCISE VIEW ========== */

function ExerciseView({ exercise, topicId, locale, onComplete, onNext, isLast, isDone }: {
  exercise: Exercise;
  topicId: string;
  locale: 'en' | 'sk';
  onComplete: (wasCorrect: boolean) => void;
  onNext: () => void;
  isLast: boolean;
  isDone: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(isDone ? 'correct' : null);
  const [showExplanation, setShowExplanation] = useState(isDone);

  const [writeCode, setWriteCode] = useState(exercise.codeSnippet ?? '');
  const [writeRun, setWriteRun] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle');
  const [writeMsg, setWriteMsg] = useState('');

  const typeIcon = exercise.type === 'explain' ? BookOpen : exercise.type === 'mcq' ? Lightbulb : Code;
  const typeLabel = exercise.type === 'explain' ? (locale === 'sk' ? 'Vysvetlenie' : 'Explanation')
    : exercise.type === 'mcq' ? 'Quiz'
    : exercise.type === 'write' ? (locale === 'sk' ? 'Napíš kód' : 'Write code')
    : (locale === 'sk' ? 'Doplň kód' : 'Fill code');

  const handleWriteRun = async () => {
    if (writeRun === 'running') return;
    setWriteRun('running'); setWriteMsg('');
    await new Promise(r => setTimeout(r, 700));
    const ok = exercise.testCases?.every(tc => {
      if (tc.expected.startsWith('contains:')) {
        return writeCode.includes(tc.expected.replace('contains:', '').trim());
      }
      return true;
    }) ?? true;
    if (ok) {
      setWriteRun('passed');
      setWriteMsg(locale === 'sk' ? 'Spravne!' : 'Correct!');
      if (!isDone) setTimeout(onComplete, 800);
    } else {
      setWriteRun('failed');
      const tc = exercise.testCases?.find(tc => tc.expected.startsWith('contains:') && !writeCode.includes(tc.expected.replace('contains:', '').trim()));
      setWriteMsg(tc?.description || (locale === 'sk' ? 'Nespravne, skus znova' : 'Not quite, try again'));
    }
  };

  const handleSubmitMcq = () => {
    if (!selected) return;
    if (selected === exercise.correctAnswer) {
      setShowResult('correct');
      if (!isDone) onComplete(true);
    } else {
      setShowResult('wrong');
      if (!isDone) onComplete(false);
    }
  };

  const handleSubmitFill = () => {
    if (!exercise.blanks) return;
    const allCorrect = exercise.blanks.every(b => fillAnswers[b.id] === b.correct);
    if (allCorrect) {
      setShowResult('correct');
      if (!isDone) onComplete(true);
    } else {
      setShowResult('wrong');
      if (!isDone) onComplete(false);
    }
  };

  const handleMarkRead = () => {
    setShowResult('correct');
    setShowExplanation(true);
    if (!isDone) onComplete(true);
  };

  const handleRetry = () => {
    setShowResult(null);
    setSelected(null);
    setFillAnswers({});
  };

  const handleNext = () => {
    setShowResult(null);
    setSelected(null);
    setFillAnswers({});
    setShowExplanation(false);
    onNext();
  };

  return (
    <div>
      {/* Type badge + XP */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        {(() => { const Icon = typeIcon; return <Icon size={14} color="var(--green)" />; })()}
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {typeLabel}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
          <Zap size={11} /> +{exercise.xp} XP
        </span>
      </div>

      {/* Prompt / Question */}
      <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', lineHeight: 1.4, marginBottom: 20 }}>
        {exercise.prompt}
      </h2>

      {/* Code snippet */}
      {exercise.codeSnippet && (
        <pre style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
          padding: '16px 18px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7,
          overflow: 'auto', marginBottom: 20, fontFamily: 'JetBrains Mono, Fira Code, monospace',
          whiteSpace: 'pre-wrap',
        }}>
          {exercise.codeSnippet}
        </pre>
      )}

      {/* EXPLAIN type */}
      {exercise.type === 'explain' && exercise.explanation && (
        <>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14,
            padding: '20px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.9 }}>
              {exercise.explanation.split('\n\n').map((para, i) => {
                const parts = para.split('**');
                return (
                  <p key={i} style={{ margin: '0 0 12px' }}>
                    {parts.map((part, j) =>
                      j % 2 === 1
                        ? <strong key={j} style={{ color: 'var(--text)', fontWeight: 700 }}>{part}</strong>
                        : <span key={j}>{part}</span>
                    )}
                  </p>
                );
              })}
            </div>
          </div>
          {!isDone && showResult !== 'correct' && (
            <button onClick={handleMarkRead} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: 'var(--btn-primary)', color: 'var(--btn-primary-text)', fontWeight: 700, fontSize: 15,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {locale === 'sk' ? 'Rozumiem' : 'Got it'} <Check size={16} />
            </button>
          )}
        </>
      )}

      {/* MCQ type */}
      {exercise.type === 'mcq' && exercise.options && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {exercise.options.map((opt, i) => {
              const isSelected = selected === opt;
              const isCorrect = showResult && opt === exercise.correctAnswer;
              const isWrong = showResult === 'wrong' && isSelected && opt !== exercise.correctAnswer;
              const label = String.fromCharCode(65 + i);
              return (
                <button
                  key={opt}
                  onClick={() => { if (!showResult) setSelected(opt); }}
                  style={{
                    padding: '14px 16px', borderRadius: 12, textAlign: 'left',
                    fontSize: 14, fontWeight: 500, cursor: showResult ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: isCorrect ? 'rgba(22,163,74,0.1)' : isWrong ? 'rgba(220,38,38,0.08)' : isSelected ? 'var(--bg-surface)' : 'var(--bg)',
                    border: `1.5px solid ${isCorrect ? 'var(--green)' : isWrong ? '#dc2626' : isSelected ? 'var(--text-dim)' : 'var(--border)'}`,
                    color: isCorrect ? 'var(--green)' : isWrong ? '#dc2626' : 'var(--text)',
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isCorrect ? 'var(--green)' : isWrong ? '#dc2626' : isSelected ? 'var(--bg-raised)' : 'var(--bg-surface)',
                    color: isCorrect || isWrong ? '#fff' : 'var(--text-hint)',
                    fontSize: 11, fontWeight: 700,
                  }}>
                    {isCorrect ? <Check size={12} strokeWidth={3} /> : label}
                  </div>
                  {opt}
                </button>
              );
            })}
          </div>

          {showResult && exercise.explanation && (
            <div style={{
              background: showResult === 'correct' ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.06)',
              border: `1px solid ${showResult === 'correct' ? 'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.2)'}`,
              borderRadius: 12, padding: '14px 16px', marginBottom: 12,
            }}>
              <p style={{ fontSize: 13, color: showResult === 'correct' ? 'var(--green)' : '#dc2626', margin: 0, lineHeight: 1.6 }}>
                {exercise.explanation}
              </p>
            </div>
          )}

          {!showResult && (
            <button onClick={handleSubmitMcq} disabled={!selected} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: selected ? 'var(--btn-primary)' : 'var(--border)',
              color: selected ? 'var(--btn-primary-text)' : 'var(--text-dim)', fontWeight: 700, fontSize: 15,
              border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
            }}>
              {locale === 'sk' ? 'Odoslať' : 'Submit'}
            </button>
          )}
          {showResult === 'wrong' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {!isLast && (
                <button onClick={handleRetry} style={{
                  width: '100%', padding: '14px', borderRadius: 12,
                  background: 'var(--bg-surface)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: 14,
                  border: '1px solid var(--border)', cursor: 'pointer',
                }}>
                  {locale === 'sk' ? 'Skúsiť znova' : 'Try again'}
                </button>
              )}
              <button onClick={handleNext} className={isLast ? 'purple-btn' : ''} style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: isLast ? '#4f2a85' : 'var(--btn-primary)', color: isLast ? '#fff' : 'var(--btn-primary-text)', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                {isLast ? (locale === 'sk' ? 'Zobraziť výsledky' : 'Show results') : (locale === 'sk' ? 'Ďalej' : 'Next')} {isLast ? <Trophy size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          )}
        </>
      )}

      {/* FILL type */}
      {exercise.type === 'fill' && exercise.blanks && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            {exercise.blanks.map(blank => (
              <div key={blank.id}>
                <div style={{ fontSize: 11, color: 'var(--text-hint)', marginBottom: 8, fontWeight: 600 }}>
                  {locale === 'sk' ? 'Vyber správnu odpoveď:' : 'Pick the correct answer:'}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {blank.options.map(opt => {
                    const isSel = fillAnswers[blank.id] === opt;
                    const isCorrectAnswer = showResult && opt === blank.correct;
                    const isWrongAnswer = showResult === 'wrong' && isSel && opt !== blank.correct;
                    return (
                      <button
                        key={opt}
                        onClick={() => { if (!showResult) setFillAnswers(prev => ({ ...prev, [blank.id]: opt })); }}
                        style={{
                          padding: '10px 16px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                          cursor: showResult ? 'default' : 'pointer',
                          fontFamily: 'JetBrains Mono, Fira Code, monospace',
                          background: isCorrectAnswer ? 'rgba(22,163,74,0.1)' : isWrongAnswer ? 'rgba(220,38,38,0.08)' : isSel ? 'var(--bg-raised)' : 'var(--bg)',
                          border: `1.5px solid ${isCorrectAnswer ? 'var(--green)' : isWrongAnswer ? '#dc2626' : isSel ? 'var(--text-dim)' : 'var(--border)'}`,
                          color: isCorrectAnswer ? 'var(--green)' : isWrongAnswer ? '#dc2626' : 'var(--text)',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!showResult && (
            <button
              onClick={handleSubmitFill}
              disabled={exercise.blanks.some(b => !fillAnswers[b.id])}
              style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: exercise.blanks.every(b => fillAnswers[b.id]) ? 'var(--btn-primary)' : 'var(--border)',
                color: exercise.blanks.every(b => fillAnswers[b.id]) ? 'var(--btn-primary-text)' : 'var(--text-dim)',
                fontWeight: 700, fontSize: 15, border: 'none',
                cursor: exercise.blanks.every(b => fillAnswers[b.id]) ? 'pointer' : 'not-allowed',
              }}
            >
              {locale === 'sk' ? 'Odoslať' : 'Submit'}
            </button>
          )}
          {showResult === 'wrong' && (
            <button onClick={handleRetry} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: 'var(--bg-surface)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: 14,
              border: '1px solid var(--border)', cursor: 'pointer',
            }}>
              {locale === 'sk' ? 'Skúsiť znova' : 'Try again'}
            </button>
          )}
        </>
      )}

      {/* WRITE type */}
      {exercise.type === 'write' && (
        <>
          <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${writeRun === 'passed' ? 'rgba(22,163,74,0.3)' : writeRun === 'failed' ? 'rgba(220,38,38,0.2)' : 'var(--border)'}`, marginBottom: 16, transition: 'border-color 0.2s' }}>
            <div style={{ background: 'var(--bg-card)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #1a1a1a' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
              <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace' }}>python</span>
            </div>
            <textarea
              value={writeCode}
              onChange={e => { setWriteCode(e.target.value); setWriteRun('idle'); }}
              onKeyDown={e => {
                if (e.key !== 'Tab') return;
                e.preventDefault();
                const s = e.currentTarget.selectionStart, en = e.currentTarget.selectionEnd;
                setWriteCode(writeCode.substring(0, s) + '    ' + writeCode.substring(en));
              }}
              spellCheck={false} autoCapitalize="none" autoCorrect="off"
              rows={Math.max(5, writeCode.split('\n').length + 1)}
              style={{
                width: '100%', padding: '14px 16px', background: 'var(--bg)', border: 'none', outline: 'none',
                color: 'var(--text-secondary)', fontSize: 13, fontFamily: 'JetBrains Mono, Fira Code, monospace',
                lineHeight: 1.7, resize: 'vertical', minHeight: 120,
              }}
            />
          </div>

          {writeMsg && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex', gap: 8, padding: '12px 14px', borderRadius: 12, marginBottom: 12,
                background: writeRun === 'passed' ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.06)',
                border: `1px solid ${writeRun === 'passed' ? 'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.2)'}`,
              }}>
              {writeRun === 'passed' ? <Check size={14} color="var(--green)" /> : <X size={14} color="#dc2626" />}
              <span style={{ fontSize: 13, color: writeRun === 'passed' ? 'var(--green)' : '#ff9090' }}>{writeMsg}</span>
            </motion.div>
          )}

          {writeRun !== 'passed' && (
            <button onClick={handleWriteRun} disabled={writeRun === 'running' || !writeCode.trim()}
              style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: writeCode.trim() ? 'var(--btn-primary)' : 'var(--border)',
                color: writeCode.trim() ? 'var(--btn-primary-text)' : 'var(--text-dim)',
                fontWeight: 700, fontSize: 15, border: 'none',
                cursor: writeCode.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
              {writeRun === 'running' ? <><Loader2 size={16} className="animate-spin" />{locale === 'sk' ? 'Kontrolujem...' : 'Checking...'}</>
                : <><Play size={16} />{locale === 'sk' ? 'Spustiť' : 'Run code'}</>}
            </button>
          )}
        </>
      )}

      {/* Success + Next */}
      {(showResult === 'correct' || writeRun === 'passed') && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 16 }}
        >
          <div style={{
            padding: '14px 16px', borderRadius: 12, marginBottom: 12,
            background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.3)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Check size={16} color="var(--green)" />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>
              {locale === 'sk' ? 'Správne!' : 'Correct!'} +{exercise.xp} XP
            </span>
          </div>
          <button onClick={handleNext} className={isLast ? 'purple-btn' : ''} style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: isLast ? '#4f2a85' : 'var(--btn-primary)', color: isLast ? '#fff' : 'var(--btn-primary-text)', fontWeight: 700, fontSize: 15,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {isLast ? (locale === 'sk' ? 'Zobraziť výsledky' : 'Show results') : (locale === 'sk' ? 'Ďalej' : 'Next')} {isLast ? <Trophy size={16} /> : <ChevronRight size={16} />}
          </button>
        </motion.div>
      )}
    </div>
  );
}
