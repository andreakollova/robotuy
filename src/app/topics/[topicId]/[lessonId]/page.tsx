'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useLocaleStore } from '@/store/localeStore';
import { projectTopics } from '@/data/myprojects-topics';
import StatusBar from '@/components/StatusBar';
import { ArrowLeft, Check, ChevronRight, Zap, BookOpen, Lightbulb, Code, X, Play, Loader2, GraduationCap, HelpCircle } from 'lucide-react';
import type { Exercise } from '@/types';

export default function TopicLessonPage() {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  const router = useRouter();
  const { locale } = useLocaleStore();
  const { completeLesson, completedLessons } = useUserStore();

  const topic = projectTopics.find(t => t.id === topicId);
  const lesson = topic?.lessons.find(l => l.id === lessonId);
  const [activeExIdx, setActiveExIdx] = useState(0);
  const [tab, setTab] = useState<'lesson' | 'quiz'>(lesson?.content ? 'lesson' : 'quiz');

  if (!topic || !lesson) {
    return (
      <div style={{ minHeight: '100vh', background: '#010d33', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
        Not found
      </div>
    );
  }

  const exercise = lesson.exercises[activeExIdx];
  const exKey = topic.id + '-' + exercise?.id;
  const totalDone = lesson.exercises.filter(e => completedLessons.includes(topic.id + '-' + e.id)).length;

  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#010d33', paddingBottom: 80 }}>
      <StatusBar />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px 20px 120px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => router.push('/topics')}
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4, display: 'flex' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#555', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {topic.title}
            </div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>{lesson.title}</h1>
          </div>
          <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>
            {totalDone}/{lesson.exercises.length}
          </span>
        </div>

        {/* Lesson / Quiz tab switcher */}
        {lesson.content && (
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: '#000a2b', borderRadius: 12, padding: 3 }}>
            <button
              onClick={() => setTab('lesson')}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: tab === 'lesson' ? '#0c255a' : 'transparent',
                color: tab === 'lesson' ? '#fff' : '#666',
                fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
              }}
            >
              <GraduationCap size={15} />
              Lesson
            </button>
            <button
              onClick={() => setTab('quiz')}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: tab === 'quiz' ? '#0c255a' : 'transparent',
                color: tab === 'quiz' ? '#fff' : '#666',
                fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
              }}
            >
              <HelpCircle size={15} />
              Quiz ({lesson.exercises.length})
            </button>
          </div>
        )}

        {/* LESSON CONTENT TAB */}
        {tab === 'lesson' && lesson.content && (
          <div style={{ color: '#d4d4d4', fontSize: 15.5, lineHeight: 1.75, marginBottom: 32 }}>
            {lesson.content.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={i} style={{ height: 6 }} />;
              if (trimmed.startsWith('# ')) return <h1 key={i} style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '16px 0 10px', lineHeight: 1.3 }}>{trimmed.slice(2)}</h1>;
              if (trimmed.startsWith('## ')) return <h2 key={i} style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '20px 0 8px', lineHeight: 1.3 }}>{trimmed.slice(3)}</h2>;
              if (trimmed.startsWith('### ')) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: '#ddd', margin: '14px 0 6px' }}>{trimmed.slice(4)}</h3>;
              if (trimmed === '---') return <hr key={i} style={{ border: 'none', borderTop: '1px solid #0c255a', margin: '18px 0' }} />;
              if (trimmed.startsWith('> ')) return <div key={i} style={{ borderLeft: '3px solid #22c55e', padding: '8px 12px', margin: '10px 0', background: 'rgba(34,197,94,0.06)', borderRadius: '0 8px 8px 0', fontSize: 14, color: '#ddd', lineHeight: 1.65 }}>{trimmed.slice(2).split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#fff' }}>{part}</strong> : part)}</div>;
              if (trimmed.startsWith('- ')) {
                const content = trimmed.slice(2);
                const formatted = content.split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#fff' }}>{part}</strong> : part);
                return <div key={i} style={{ display: 'flex', gap: 8, margin: '3px 0', paddingLeft: 8 }}><span style={{ color: '#22c55e', flexShrink: 0 }}>-</span><span>{formatted}</span></div>;
              }
              if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) return <div key={i} style={{ background: '#041540', padding: '10px 14px', borderRadius: 8, margin: '8px 0', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#4ade80', overflowX: 'auto' }}>{trimmed.slice(2, -2)}</div>;
              const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
              if (imgMatch) return <img key={i} src={imgMatch[2]} alt={imgMatch[1]} style={{ width: '100%', borderRadius: 10, margin: '10px 0' }} />;
              if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) return <p key={i} style={{ fontSize: 11, color: '#777', fontStyle: 'italic', margin: '0 0 12px', lineHeight: 1.5 }}>{trimmed.slice(1, -1)}</p>;
              const formatted = trimmed.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: '#fff' }}>{part.slice(2, -2)}</strong>;
                if (part.startsWith('`') && part.endsWith('`')) return <code key={j} style={{ background: '#041540', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#4ade80', fontFamily: 'var(--font-mono)' }}>{part.slice(1, -1)}</code>;
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
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
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
                  background: '#22c55e', color: '#000', fontWeight: 700, fontSize: 15, marginTop: 16,
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
        <span style={{ fontSize: 11, color: '#555', display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
          <Zap size={11} /> +{exercise.xp} XP
        </span>
      </div>

      {/* Prompt / Question */}
      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.4, marginBottom: 20 }}>
        {exercise.prompt}
      </h2>

      {/* Code snippet */}
      {exercise.codeSnippet && (
        <pre style={{
          background: '#111', border: '1px solid #1a1a1a', borderRadius: 12,
          padding: '16px 18px', fontSize: 13, color: '#ccc', lineHeight: 1.7,
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
            background: '#010d33', border: '1px solid #1a1a1a', borderRadius: 14,
            padding: '20px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 15, color: '#bbb', lineHeight: 1.9 }}>
              {exercise.explanation.split('\n\n').map((para, i) => {
                const parts = para.split('**');
                return (
                  <p key={i} style={{ margin: '0 0 12px' }}>
                    {parts.map((part, j) =>
                      j % 2 === 1
                        ? <strong key={j} style={{ color: '#fff', fontWeight: 700 }}>{part}</strong>
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
              background: '#EDEDED', color: '#000', fontWeight: 700, fontSize: 15,
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
                    color: isCorrect || isWrong ? '#000' : '#888',
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
              background: selected ? '#EDEDED' : '#1a1a1a',
              color: selected ? '#000' : '#555', fontWeight: 700, fontSize: 15,
              border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
            }}>
              {locale === 'sk' ? 'Odoslať' : 'Submit'}
            </button>
          )}
          {showResult === 'wrong' && (
            <button onClick={handleRetry} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: '#041540', color: '#ccc', fontWeight: 700, fontSize: 14,
              border: '1px solid #222', cursor: 'pointer',
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
                <div style={{ fontSize: 11, color: '#888', marginBottom: 8, fontWeight: 600 }}>
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
                background: exercise.blanks.every(b => fillAnswers[b.id]) ? '#EDEDED' : '#1a1a1a',
                color: exercise.blanks.every(b => fillAnswers[b.id]) ? '#000' : '#555',
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
              background: '#041540', color: '#ccc', fontWeight: 700, fontSize: 14,
              border: '1px solid #222', cursor: 'pointer',
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
            <div style={{ background: '#111', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #1a1a1a' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
              <span style={{ marginLeft: 8, fontSize: 10, color: '#555', fontFamily: 'JetBrains Mono, monospace' }}>python</span>
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
                width: '100%', padding: '14px 16px', background: '#010d33', border: 'none', outline: 'none',
                color: '#ccc', fontSize: 13, fontFamily: 'JetBrains Mono, Fira Code, monospace',
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
                background: writeCode.trim() ? '#EDEDED' : '#1a1a1a',
                color: writeCode.trim() ? '#000' : '#555',
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
              background: '#EDEDED', color: '#000', fontWeight: 700, fontSize: 15,
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
