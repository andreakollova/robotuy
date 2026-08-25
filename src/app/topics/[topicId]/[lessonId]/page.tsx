'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useLocaleStore } from '@/store/localeStore';
import { projectTopics } from '@/data/myprojects-topics';
import StatusBar from '@/components/StatusBar';
import { ArrowLeft, Check, ChevronRight, Zap, BookOpen, Lightbulb, Code, X, Play, Loader2, GraduationCap, HelpCircle, BookText } from 'lucide-react';
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
              <h1 style={{ fontSize: 18, fontWeight: 800, color: '#010d33', margin: 0 }}>{lesson.title}</h1>
              {topic.id === 'modern-robotics' && <img src="/northwestern-logo.png" alt="" style={{ height: 16, objectFit: 'contain', opacity: 0.6 }} />}
            </div>
          </div>
          <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>
            {totalDone}/{lesson.exercises.length}
          </span>
        </div>

        {/* Lesson / Quiz / Book tab switcher */}
        {lesson.content && (
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: 'var(--bg-card)', borderRadius: 12, padding: 3, border: '1px solid var(--border)' }}>
            {(['lesson', 'quiz', 'book'] as const).map(t => {
              const icon = t === 'lesson' ? <GraduationCap size={14} /> : t === 'quiz' ? <HelpCircle size={14} /> : <BookText size={14} />;
              const label = t === 'lesson' ? 'Lesson' : t === 'quiz' ? `Quiz (${lesson.exercises.length})` : 'Book';
              const show = t !== 'book' || !!bookChapter;
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
          <div className="lesson-content" style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.75, marginBottom: 32 }}>
            {lesson.content.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={i} style={{ height: 6 }} />;
              if (trimmed.startsWith('# ')) return <h1 key={i} style={{ fontSize: 22, fontWeight: 800, color: '#010d33', margin: '10px 0 8px', lineHeight: 1.3 }}>{trimmed.slice(2)}</h1>;
              if (trimmed.startsWith('## ')) return <h2 key={i} style={{ fontSize: 17, fontWeight: 700, color: '#010d33', margin: '12px 0 6px', lineHeight: 1.3, paddingLeft: 10, borderLeft: '3px solid var(--green)' }}>{trimmed.slice(3)}</h2>;
              if (trimmed.startsWith('### ')) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: '#010d33', margin: '10px 0 4px' }}>{trimmed.slice(4)}</h3>;
              if (trimmed === '---') return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />;
              if (trimmed.startsWith('> ')) return <div key={i} style={{ borderLeft: '3px solid var(--green)', padding: '8px 12px', margin: '10px 0', background: 'var(--green-bg)', borderRadius: '0 8px 8px 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{trimmed.slice(2).split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--text)' }}>{part}</strong> : part)}</div>;
              if (trimmed.startsWith('- ')) {
                const content = trimmed.slice(2);
                const formatted = content.split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--text)' }}>{part}</strong> : part);
                return <div key={i} style={{ display: 'flex', gap: 8, margin: '3px 0', paddingLeft: 8 }}><span style={{ color: 'var(--green)', flexShrink: 0 }}>-</span><span>{formatted}</span></div>;
              }
              if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) return <div key={i} style={{ background: 'var(--bg-card)', padding: '10px 14px', borderRadius: 8, margin: '8px 0', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green)', overflowX: 'auto', border: '1px solid var(--border)' }}>{trimmed.slice(2, -2)}</div>;
              const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
              if (imgMatch) return <img key={i} src={imgMatch[2]} alt={imgMatch[1]} style={{ width: '100%', borderRadius: 10, margin: '10px 0' }} />;
              if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) return <p key={i} style={{ fontSize: 11, color: 'var(--text-hint)', fontStyle: 'italic', margin: '0 0 12px', lineHeight: 1.5 }}>{trimmed.slice(1, -1)}</p>;
              const formatted = trimmed.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: 'var(--text)' }}>{part.slice(2, -2)}</strong>;
                if (part.startsWith('`') && part.endsWith('`')) return <code key={j} style={{ background: 'var(--bg-card)', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', border: '1px solid var(--border)' }}>{part.slice(1, -1)}</code>;
                return part;
              });
              return <p key={i} style={{ margin: '4px 0' }}>{formatted}</p>;
            })}
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
        {tab === 'quiz' && <>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 28 }}>
          {lesson.exercises.map((ex, i) => {
            const done = completedLessons.includes(topic.id + '-' + ex.id);
            return (
              <div
                key={ex.id}
                onClick={() => setActiveExIdx(i)}
                style={{
                  flex: 1, height: 3, borderRadius: 2, cursor: 'pointer',
                  background: done ? '#4ade80' : i === activeExIdx ? '#fff' : '#222',
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
                onComplete={() => {
                  completeLesson(exKey, exercise.xp);
                }}
                onNext={() => {
                  if (activeExIdx < lesson.exercises.length - 1) {
                    setActiveExIdx(activeExIdx + 1);
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
        {tab === 'book' && bookChapter && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bookChapter.sections.map((section) => {
              const isOpen = expandedBookSection === section.id;
              return (
                <div key={section.id} style={{ background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setExpandedBookSection(isOpen ? null : section.id)}
                    style={{
                      width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <BookOpen size={15} color={isOpen ? 'var(--green)' : 'var(--text-dim)'} />
                    <span style={{ flex: 1, fontWeight: 700, fontSize: 13.5, color: isOpen ? '#010d33' : 'var(--text-secondary)' }}>{section.title}</span>
                    <ChevronRight size={15} color="var(--text-dim)" style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ padding: '0 16px 20px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}
                    >
                      {section.content.split('\n').map((line, i) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <div key={i} style={{ height: 4 }} />;
                        const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                        if (imgMatch) return <img key={i} src={imgMatch[2]} alt={imgMatch[1]} style={{ width: '100%', borderRadius: 10, margin: '8px 0' }} />;
                        if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) return <p key={i} style={{ fontSize: 11, color: 'var(--text-hint)', fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.5 }}>{trimmed.slice(1, -1)}</p>;
                        if (trimmed.startsWith('### ')) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: '#010d33', margin: '14px 0 6px' }}>{trimmed.slice(4)}</h3>;
                        if (trimmed.startsWith('> ')) return <div key={i} style={{ borderLeft: '3px solid var(--green)', padding: '6px 10px', margin: '8px 0', background: 'var(--green-bg)', borderRadius: '0 8px 8px 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{trimmed.slice(2).split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#010d33' }}>{part}</strong> : part)}</div>;
                        if (trimmed.startsWith('- ')) return <div key={i} style={{ display: 'flex', gap: 6, margin: '2px 0', paddingLeft: 4 }}><span style={{ color: 'var(--green)' }}>-</span><span>{trimmed.slice(2)}</span></div>;
                        if (trimmed.startsWith('|')) {
                          const cells = trimmed.split('|').filter(Boolean).map(c => c.trim());
                          if (cells.every(c => /^[-:]+$/.test(c))) return null;
                          return <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: 1, margin: '2px 0', fontSize: 12 }}>{cells.map((cell, ci) => <div key={ci} style={{ padding: '5px 6px', background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}>{cell}</div>)}</div>;
                        }
                        const formatted = trimmed.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/).map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: '#010d33' }}>{part.slice(2, -2)}</strong>;
                          if (part.startsWith('`') && part.endsWith('`')) return <code key={j} style={{ background: 'var(--bg-surface)', padding: '1px 5px', borderRadius: 4, fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>{part.slice(1, -1)}</code>;
                          return part;
                        });
                        return <p key={i} style={{ margin: '3px 0' }}>{formatted}</p>;
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
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
  onComplete: () => void;
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
      if (!isDone) onComplete();
    } else {
      setShowResult('wrong');
    }
  };

  const handleSubmitFill = () => {
    if (!exercise.blanks) return;
    const allCorrect = exercise.blanks.every(b => fillAnswers[b.id] === b.correct);
    if (allCorrect) {
      setShowResult('correct');
      if (!isDone) onComplete();
    } else {
      setShowResult('wrong');
    }
  };

  const handleMarkRead = () => {
    setShowResult('correct');
    setShowExplanation(true);
    if (!isDone) onComplete();
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
        {(() => { const Icon = typeIcon; return <Icon size={14} color="#4ade80" />; })()}
        <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
                    background: isCorrect ? 'rgba(74,222,128,0.08)' : isWrong ? 'rgba(255,80,80,0.06)' : isSelected ? '#1a1a1a' : '#010d33',
                    border: `1.5px solid ${isCorrect ? 'rgba(74,222,128,0.5)' : isWrong ? 'rgba(255,80,80,0.3)' : isSelected ? '#444' : '#1a1a1a'}`,
                    color: isCorrect ? '#4ade80' : isWrong ? '#ff8080' : '#ccc',
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isCorrect ? '#4ade80' : isWrong ? '#ff8080' : isSelected ? '#333' : '#041540',
                    color: isCorrect || isWrong ? 'var(--btn-primary-text)' : 'var(--text-hint)',
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
              background: showResult === 'correct' ? 'rgba(74,222,128,0.05)' : 'rgba(255,80,80,0.05)',
              border: `1px solid ${showResult === 'correct' ? 'rgba(74,222,128,0.2)' : 'rgba(255,80,80,0.15)'}`,
              borderRadius: 12, padding: '14px 16px', marginBottom: 12,
            }}>
              <p style={{ fontSize: 13, color: showResult === 'correct' ? '#86efac' : '#fca5a5', margin: 0, lineHeight: 1.6 }}>
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
                          background: isCorrectAnswer ? 'rgba(74,222,128,0.1)' : isWrongAnswer ? 'rgba(255,80,80,0.1)' : isSel ? '#222' : '#010d33',
                          border: `1.5px solid ${isCorrectAnswer ? '#4ade80' : isWrongAnswer ? '#ff8080' : isSel ? '#555' : '#1a1a1a'}`,
                          color: isCorrectAnswer ? '#4ade80' : isWrongAnswer ? '#ff8080' : '#ccc',
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
          <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${writeRun === 'passed' ? 'rgba(74,222,128,0.2)' : writeRun === 'failed' ? 'rgba(255,80,80,0.2)' : '#1a1a1a'}`, marginBottom: 16, transition: 'border-color 0.2s' }}>
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
                background: writeRun === 'passed' ? 'rgba(74,222,128,0.06)' : 'rgba(255,80,80,0.06)',
                border: `1px solid ${writeRun === 'passed' ? 'rgba(74,222,128,0.2)' : 'rgba(255,80,80,0.15)'}`,
              }}>
              {writeRun === 'passed' ? <Check size={14} color="#4ade80" /> : <X size={14} color="#ff8080" />}
              <span style={{ fontSize: 13, color: writeRun === 'passed' ? '#4ade80' : '#ff9090' }}>{writeMsg}</span>
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
            background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Check size={16} color="#4ade80" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>
              {locale === 'sk' ? 'Správne!' : 'Correct!'} +{exercise.xp} XP
            </span>
          </div>
          {!isLast && (
            <button onClick={handleNext} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: 'var(--btn-primary)', color: 'var(--btn-primary-text)', fontWeight: 700, fontSize: 15,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {locale === 'sk' ? 'Ďalej' : 'Next'} <ChevronRight size={16} />
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
