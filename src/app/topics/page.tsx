'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { projectTopics } from '@/data/myprojects-topics';
import { projects as interactiveProjects } from '@/data/projects/index';
import StatusBar from '@/components/StatusBar';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, ArrowLeft, BookOpen, Code, PenTool, Lightbulb, X, Zap, Trophy, Calculator, KeyRound, ListTodo, GraduationCap, BookText } from 'lucide-react';
import { bookChapters } from '@/data/book-content';
import { useLocaleStore } from '@/store/localeStore';
import { s } from '@/data/strings';
import type { Exercise, InteractiveProject } from '@/types';

const iconMap: Record<string, string> = {
  smartphone: '📱', database: '🗄', shield: '🔐', 'credit-card': '💳',
  'message-square': '💬', camera: '📸', zap: '⚡', 'git-branch': '🌿',
  code: '{}', layers: '📦', bell: '🔔', 'map-pin': '📍',
  'hard-drive': '💾', sparkles: '✦', robot: '🤖',
};

// EN translations for SK topic titles/descriptions
const topicEN: Record<string, { title: string; desc: string }> = {
  'modern-robotics': { title: 'Modern Robotics', desc: 'Mechanics, Planning, and Control Specialization' },
};

const typeIcons: Record<string, any> = {
  explain: BookOpen, mcq: Lightbulb, fill: Code, write: PenTool,
};

/* ========== EXERCISE MODAL ========== */

function ExerciseModal({ exercise, topicId, onClose, locale }: {
  exercise: Exercise;
  topicId: string;
  onClose: () => void;
  locale: 'en' | 'sk';
}) {
  const { completeLesson, completedLessons } = useUserStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const exKey = topicId + '-' + exercise.id;
  const alreadyDone = completedLessons.includes(exKey);

  const handleSubmitMcq = () => {
    if (!selected) return;
    if (selected === exercise.correctAnswer) {
      setShowResult('correct');
      completeLesson(exKey, exercise.xp);
    } else {
      setShowResult('wrong');
    }
  };

  const handleSubmitFill = () => {
    if (!exercise.blanks) return;
    const allCorrect = exercise.blanks.every(b => fillAnswers[b.id] === b.correct);
    if (allCorrect) {
      setShowResult('correct');
      completeLesson(exKey, exercise.xp);
    } else {
      setShowResult('wrong');
    }
  };

  const handleMarkRead = () => {
    setShowResult('correct');
    completeLesson(exKey, exercise.xp);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, overflow: 'auto',
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: -10 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#111', border: '1px solid #222', borderRadius: 20,
          padding: '28px 24px', maxWidth: 540, width: '100%', maxHeight: '85vh',
          overflow: 'auto', position: 'relative',
        }}
      >
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 12,
          background: '#1a1a1a', border: '1px solid #333', borderRadius: 8,
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#888',
        }}>
          <X size={14} />
        </button>

        {/* Type badge + XP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase',
            letterSpacing: '0.08em', background: 'rgba(74,222,128,0.1)',
            padding: '4px 10px', borderRadius: 6,
          }}>
            {exercise.type === 'explain' ? (locale === 'sk' ? 'Vysvetlenie' : 'Explanation')
              : exercise.type === 'mcq' ? 'Quiz'
              : exercise.type === 'fill' ? (locale === 'sk' ? 'Doplň kód' : 'Fill code')
              : (locale === 'sk' ? 'Napíš kód' : 'Write code')}
          </span>
          <span style={{ fontSize: 11, color: '#888', display: 'flex', alignItems: 'center', gap: 3 }}>
            <Zap size={11} /> +{exercise.xp} XP
          </span>
          {alreadyDone && (
            <span style={{ fontSize: 10, color: '#4ade80', fontWeight: 600, marginLeft: 'auto' }}>
              <Check size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {locale === 'sk' ? 'Hotové' : 'Done'}
            </span>
          )}
        </div>

        {/* Prompt */}
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#eee', marginBottom: 16, lineHeight: 1.4 }}>
          {exercise.prompt}
        </h3>

        {/* Code snippet */}
        {exercise.codeSnippet && (
          <pre style={{
            background: '#010d33', border: '1px solid #1a1a1a', borderRadius: 12,
            padding: '16px 18px', fontSize: 13, color: '#ccc', lineHeight: 1.7,
            overflow: 'auto', marginBottom: 16, fontFamily: 'JetBrains Mono, Fira Code, monospace',
            whiteSpace: 'pre-wrap',
          }}>
            {exercise.codeSnippet}
          </pre>
        )}

        {/* EXPLAIN type */}
        {exercise.type === 'explain' && exercise.explanation && (
          <>
            <div style={{
              background: '#010d33', border: '1px solid #1a1a1a', borderRadius: 12,
              padding: '16px 18px', marginBottom: 20,
            }}>
              <div style={{ fontSize: 14, color: '#bbb', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {exercise.explanation.split('**').map((part, i) =>
                  i % 2 === 1
                    ? <strong key={i} style={{ color: '#fff' }}>{part}</strong>
                    : <span key={i}>{part}</span>
                )}
              </div>
            </div>
            {!alreadyDone && showResult !== 'correct' && (
              <button onClick={handleMarkRead} style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: '#4ade80', color: '#000', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer',
              }}>
                {locale === 'sk' ? 'Rozumiem - hotové' : 'Got it - mark as done'}
              </button>
            )}
          </>
        )}

        {/* MCQ type */}
        {exercise.type === 'mcq' && exercise.options && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {exercise.options.map(opt => {
                const isSelected = selected === opt;
                const isCorrect = showResult && opt === exercise.correctAnswer;
                const isWrong = showResult === 'wrong' && isSelected && opt !== exercise.correctAnswer;
                return (
                  <button
                    key={opt}
                    onClick={() => { if (!showResult) setSelected(opt); }}
                    style={{
                      padding: '12px 16px', borderRadius: 10, textAlign: 'left',
                      fontSize: 13, fontWeight: 500, cursor: showResult ? 'default' : 'pointer',
                      background: isCorrect ? 'rgba(74,222,128,0.1)' : isWrong ? 'rgba(239,68,68,0.1)' : isSelected ? '#1a1a1a' : '#010d33',
                      border: `1.5px solid ${isCorrect ? '#4ade80' : isWrong ? '#ef4444' : isSelected ? '#555' : '#1a1a1a'}`,
                      color: isCorrect ? '#4ade80' : isWrong ? '#ef4444' : '#ccc',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showResult === 'wrong' && exercise.explanation && (
              <div style={{ background: '#1a0000', border: '1px solid #7f1d1d', borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <p style={{ fontSize: 12, color: '#fca5a5', margin: 0, lineHeight: 1.6 }}>{exercise.explanation}</p>
              </div>
            )}
            {showResult === 'correct' && exercise.explanation && (
              <div style={{ background: '#052e16', border: '1px solid #166534', borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <p style={{ fontSize: 12, color: '#86efac', margin: 0, lineHeight: 1.6 }}>{exercise.explanation}</p>
              </div>
            )}

            {!showResult && (
              <button onClick={handleSubmitMcq} disabled={!selected} style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: selected ? '#4ade80' : '#1a1a1a',
                color: selected ? '#000' : '#555', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
              }}>
                {locale === 'sk' ? 'Odoslať' : 'Submit'}
              </button>
            )}
            {showResult === 'wrong' && (
              <button onClick={() => { setShowResult(null); setSelected(null); }} style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: '#222', color: '#ccc', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer',
              }}>
                {locale === 'sk' ? 'Skúsiť znova' : 'Try again'}
              </button>
            )}
          </>
        )}

        {/* FILL type */}
        {exercise.type === 'fill' && exercise.blanks && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {exercise.blanks.map(blank => (
                <div key={blank.id}>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 6, fontWeight: 600 }}>
                    {locale === 'sk' ? 'Vyber správnu odpoveď:' : 'Pick the correct answer:'}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {blank.options.map(opt => {
                      const isSel = fillAnswers[blank.id] === opt;
                      const isCorrectAnswer = showResult && opt === blank.correct;
                      const isWrongAnswer = showResult === 'wrong' && isSel && opt !== blank.correct;
                      return (
                        <button
                          key={opt}
                          onClick={() => { if (!showResult) setFillAnswers(prev => ({ ...prev, [blank.id]: opt })); }}
                          style={{
                            padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                            cursor: showResult ? 'default' : 'pointer',
                            fontFamily: 'JetBrains Mono, Fira Code, monospace',
                            background: isCorrectAnswer ? 'rgba(74,222,128,0.15)' : isWrongAnswer ? 'rgba(239,68,68,0.15)' : isSel ? '#222' : '#010d33',
                            border: `1.5px solid ${isCorrectAnswer ? '#4ade80' : isWrongAnswer ? '#ef4444' : isSel ? '#666' : '#1a1a1a'}`,
                            color: isCorrectAnswer ? '#4ade80' : isWrongAnswer ? '#ef4444' : '#ccc',
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
                  background: exercise.blanks.every(b => fillAnswers[b.id]) ? '#4ade80' : '#1a1a1a',
                  color: exercise.blanks.every(b => fillAnswers[b.id]) ? '#000' : '#555',
                  fontWeight: 700, fontSize: 14, border: 'none',
                  cursor: exercise.blanks.every(b => fillAnswers[b.id]) ? 'pointer' : 'not-allowed',
                }}
              >
                {locale === 'sk' ? 'Odoslať' : 'Submit'}
              </button>
            )}
            {showResult === 'wrong' && (
              <button onClick={() => { setShowResult(null); setFillAnswers({}); }} style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: '#222', color: '#ccc', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer',
              }}>
                {locale === 'sk' ? 'Skúsiť znova' : 'Try again'}
              </button>
            )}
          </>
        )}

        {/* Success state */}
        {showResult === 'correct' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 12, textAlign: 'center' }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: '#4ade80', marginBottom: 8 }}>
              {locale === 'sk' ? 'Správne!' : 'Correct!'} +{exercise.xp} XP
            </div>
            <button onClick={onClose} style={{
              padding: '10px 24px', borderRadius: 10, background: '#1a1a1a',
              border: '1px solid #333', color: '#ccc', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>
              {locale === 'sk' ? 'Zavrieť' : 'Close'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function TopicsPage() {
  const { completedLessons } = useUserStore();
  const router = useRouter();
  const { locale } = useLocaleStore();
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [activeExercise, setActiveExercise] = useState<{ exercise: Exercise; topicId: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'lesson' | 'book'>('lesson');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const activeTopic = projectTopics.find(t => t.id === openTopic);

  // Exercise modal
  const exerciseModal = activeExercise && (
    <AnimatePresence>
      <ExerciseModal
        key={activeExercise.exercise.id}
        exercise={activeExercise.exercise}
        topicId={activeExercise.topicId}
        onClose={() => setActiveExercise(null)}
        locale={locale}
      />
    </AnimatePresence>
  );

  // Topic detail view
  if (activeTopic) {
    return (
      <div className="page-shell" style={{ minHeight: '100vh', background: '#010d33', paddingBottom: 80 }}>
        {exerciseModal}
        <StatusBar />
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 20px' }}>
          <button
            onClick={() => setOpenTopic(null)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, marginBottom: 20, padding: 0 }}
          >
            <ArrowLeft size={16} />
            {locale === 'sk' ? 'Späť na témy' : 'Back to topics'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            {activeTopic.id === 'modern-robotics'
              ? <img src="/northwestern-logo.png" alt="Northwestern" style={{ height: 32, objectFit: 'contain' }} />
              : <span style={{ fontSize: 32 }}>{iconMap[activeTopic.icon] ?? '◆'}</span>}
            <div>
              <h1 style={{ fontWeight: 800, fontSize: 22, color: '#fff', margin: 0 }}>{activeTopic.title}</h1>
              <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0' }}>{activeTopic.description}</p>
            </div>
          </div>

          {/* ═══ LESSON / BOOK TAB SWITCHER ═══ */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: '#000a2b', borderRadius: 12, padding: 3 }}>
            <button
              onClick={() => setActiveTab('lesson')}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: activeTab === 'lesson' ? '#0c255a' : 'transparent',
                color: activeTab === 'lesson' ? '#fff' : '#666',
                fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
              }}
            >
              <GraduationCap size={15} />
              Lesson
            </button>
            <button
              onClick={() => setActiveTab('book')}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: activeTab === 'book' ? '#0c255a' : 'transparent',
                color: activeTab === 'book' ? '#fff' : '#666',
                fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
              }}
            >
              <BookText size={15} />
              Book
            </button>
          </div>

          {activeTab === 'lesson' ? (
            /* ═══ LESSON TAB - courses with exercises ═══ */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activeTopic.lessons.map((lesson, li) => {
                const exercises = lesson.exercises;
                const done = exercises.filter(e => completedLessons.includes(activeTopic.id + '-' + e.id)).length;
                const allDone = done === exercises.length && exercises.length > 0;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => exercises.length > 0 ? router.push(`/topics/${activeTopic.id}/${lesson.id}`) : null}
                    style={{ background: '#010d33', border: `1px solid ${allDone ? 'rgba(74,222,128,0.2)' : '#1a1a1a'}`, borderRadius: 14, overflow: 'hidden', cursor: exercises.length > 0 ? 'pointer' : 'default', transition: 'border-color 0.15s' }}
                  >
                    <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: allDone ? '#4ade80' : '#111', border: allDone ? 'none' : '1px solid #222',
                      }}>
                        {allDone ? <Check size={18} color="#052e16" strokeWidth={3} /> : <span style={{ fontSize: 14, fontWeight: 700, color: '#888' }}>{li + 1}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: allDone ? '#4ade80' : '#ddd' }}>{lesson.title}</div>
                        <div style={{ fontSize: 11, color: '#777', marginTop: 2 }}>
                          {exercises.length > 0
                            ? `${done}/${exercises.length} ${locale === 'sk' ? 'hotových' : 'done'}`
                            : (locale === 'sk' ? 'Čoskoro' : 'Coming soon')}
                        </div>
                      </div>
                      {exercises.length > 0 && <ChevronRight size={16} color="#333" />}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ═══ BOOK TAB - chapter content ═══ */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(() => {
                const chapter = bookChapters.find(ch => activeTopic.lessons.some(l => l.id === ch.courseId));
                if (!chapter) return <p style={{ color: '#666', fontSize: 13 }}>{locale === 'sk' ? 'Obsah knihy bude čoskoro.' : 'Book content coming soon.'}</p>;
                return chapter.sections.map((section) => {
                  const isOpen = expandedSection === section.id;
                  return (
                    <div key={section.id} style={{ background: '#000a2b', borderRadius: 14, border: '1px solid #0c255a', overflow: 'hidden' }}>
                      <button
                        onClick={() => setExpandedSection(isOpen ? null : section.id)}
                        style={{
                          width: '100%', padding: '16px', display: 'flex', alignItems: 'center', gap: 12,
                          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                        }}
                      >
                        <BookOpen size={16} color={isOpen ? '#22c55e' : '#555'} />
                        <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: isOpen ? '#fff' : '#ccc' }}>{section.title}</span>
                        <ChevronRight size={16} color="#555" style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ padding: '0 16px 20px', color: '#ccc', fontSize: 14, lineHeight: 1.8 }}
                        >
                          {section.content.split('\n').map((line, i) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <div key={i} style={{ height: 12 }} />;
                            // Images
                            const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                            if (imgMatch) return <img key={i} src={imgMatch[2]} alt={imgMatch[1]} style={{ width: '100%', borderRadius: 10, margin: '12px 0' }} />;
                            // Image captions
                            if (trimmed.startsWith('*') && trimmed.endsWith('*')) return <p key={i} style={{ fontSize: 11, color: '#777', fontStyle: 'italic', margin: '0 0 16px', lineHeight: 1.5 }}>{trimmed.slice(1, -1)}</p>;
                            // Headers
                            if (trimmed.startsWith('### ')) return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '24px 0 12px' }}>{trimmed.slice(4)}</h3>;
                            // Blockquotes / definitions
                            if (trimmed.startsWith('> ')) return <div key={i} style={{ borderLeft: '3px solid #22c55e', padding: '8px 12px', margin: '12px 0', background: 'rgba(34,197,94,0.06)', borderRadius: '0 8px 8px 0', fontSize: 13, color: '#ddd', lineHeight: 1.7 }}>{trimmed.slice(2).split(/\*\*([^*]+)\*\*/).map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#fff' }}>{part}</strong> : part)}</div>;
                            // Code blocks
                            if (trimmed === '```') return null;
                            if (trimmed.startsWith('```')) return null;
                            // Table rows
                            if (trimmed.startsWith('|')) {
                              const cells = trimmed.split('|').filter(Boolean).map(c => c.trim());
                              if (cells.every(c => /^[-:]+$/.test(c))) return null;
                              return <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: 1, margin: '2px 0', fontSize: 12 }}>{cells.map((cell, ci) => <div key={ci} style={{ padding: '6px 8px', background: '#041540', color: '#ccc', fontWeight: i === 0 ? 700 : 400 }}>{cell}</div>)}</div>;
                            }
                            // Inline formatting
                            const formatted = trimmed.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/).map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) return <strong key={j} style={{ color: '#fff' }}>{part.slice(2, -2)}</strong>;
                              if (part.startsWith('`') && part.endsWith('`')) return <code key={j} style={{ background: '#041540', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#4ade80', fontFamily: 'var(--font-mono)' }}>{part.slice(1, -1)}</code>;
                              return part;
                            });
                            // List items
                            if (trimmed.startsWith('- ')) return <div key={i} style={{ display: 'flex', gap: 8, margin: '4px 0', paddingLeft: 4 }}><span style={{ color: '#22c55e' }}>-</span><span>{formatted.slice(0).map((f, fi) => typeof f === 'string' ? f.replace(/^- /, '') : f)}</span></div>;
                            return <p key={i} style={{ margin: '4px 0' }}>{formatted}</p>;
                          })}
                        </motion.div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Topics grid
  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#010d33', paddingBottom: 80 }}>
      <StatusBar />

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 20px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {projectTopics.map((topic, i) => {
            const done = topic.lessons.flatMap(l => l.exercises).filter(e =>
              completedLessons.includes(topic.id + '-' + e.id)
            ).length;
            const total = topic.lessons.flatMap(l => l.exercises).length;

            return (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenTopic(topic.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  padding: '16px', borderRadius: 16, textAlign: 'left',
                  cursor: 'pointer', border: 'none',
                  background: '#010d33',
                  outline: '1.5px solid #1a1a1a',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  {topic.id === 'modern-robotics'
                    ? <img src="/northwestern-logo.png" alt="Northwestern" style={{ height: 24, objectFit: 'contain' }} />
                    : <span style={{ fontSize: 24, lineHeight: 1 }}>
                        {iconMap[topic.icon] ?? '◆'}
                      </span>}
                  {done > 0 && (
                    <span style={{ fontSize: 10, color: '#4ade80', fontWeight: 700 }}>
                      {done}/{total}
                    </span>
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: 13, color: '#ccc', marginBottom: 4 }}>
                  {locale === 'en' && topicEN[topic.id] ? topicEN[topic.id].title : topic.title}
                </div>
                <div style={{ fontSize: 11, color: '#777', lineHeight: 1.4, marginBottom: 10 }}>
                  {locale === 'en' && topicEN[topic.id] ? topicEN[topic.id].desc : topic.description}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontSize: 10, color: '#555' }}>
                    {topic.lessons.length} {s('lessons', locale)} - {total} {s('exercises', locale)}
                  </span>
                  <ChevronRight size={14} color="#333" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
