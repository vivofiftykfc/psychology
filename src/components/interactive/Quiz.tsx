import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronRight, RotateCcw } from "lucide-react";
import { QuizQuestion } from "../../types/content";

interface Props {
  questions: QuizQuestion[];
  chapterSlug: string;
}

export default function Quiz({ questions, chapterSlug }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean[]>(Array(questions.length).fill(false));
  const [correct, setCorrect] = useState<boolean[]>(Array(questions.length).fill(false));
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (answered[currentQ]) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const isCorrect = selected === q.correctIndex;
    const newAnswered = [...answered];
    const newCorrect = [...correct];
    newAnswered[currentQ] = true;
    newCorrect[currentQ] = isCorrect;
    setAnswered(newAnswered);
    setCorrect(newCorrect);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(Array(questions.length).fill(false));
    setCorrect(Array(questions.length).fill(false));
    setFinished(false);
  };

  if (finished) {
    const score = correct.filter(Boolean).length;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-divider bg-surface p-8 text-center"
      >
        <p className="font-display text-3xl text-accent">
          {score} / {questions.length}
        </p>
        <p className="mt-3 text-text-secondary">
          {score === questions.length
            ? "完美！你对本章内容有深入的理解。"
            : score >= questions.length * 0.7
            ? "不错！你对本章有很好的掌握。"
            : "继续加油！重温相关内容会有所帮助。"}
        </p>
        <button
          onClick={handleRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-sm border border-divider px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent-dim hover:text-accent"
        >
          <RotateCcw size={14} />
          重新作答
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl tracking-tight">章节测验</h3>
        <span className="text-xs text-text-muted">
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      <div className="rounded-sm border border-divider bg-surface p-6">
        <p className="text-sm leading-relaxed">{q.question}</p>

        <div className="mt-5 space-y-2">
          {q.options.map((opt, idx) => {
            let borderColor = "border-divider";
            let bgColor = "";
            if (answered[currentQ]) {
              if (idx === q.correctIndex) {
                borderColor = "border-success";
                bgColor = "bg-success/5";
              } else if (idx === selected && !correct[currentQ]) {
                borderColor = "border-error";
                bgColor = "bg-error/5";
              }
            } else if (idx === selected) {
              borderColor = "border-accent-dim";
              bgColor = "bg-accent/5";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered[currentQ]}
                className={`flex w-full items-center gap-3 rounded-sm border ${borderColor} ${bgColor} px-4 py-3 text-left text-sm transition-colors ${
                  !answered[currentQ] ? "hover:border-accent-dim cursor-pointer" : ""
                }`}
              >
                <span className="text-xs text-text-muted">{String.fromCharCode(65 + idx)}.</span>
                <span className="flex-1">{opt}</span>
                {answered[currentQ] && idx === q.correctIndex && (
                  <Check size={16} className="text-success shrink-0" />
                )}
                {answered[currentQ] && idx === selected && !correct[currentQ] && (
                  <X size={16} className="text-error shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {answered[currentQ] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-sm border border-divider p-4"
            >
              <p className="text-xs text-text-muted">
                {correct[currentQ] ? "✓ 正确！" : "✗ 不正确。"}{" "}
                {q.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex justify-end gap-3">
          {!answered[currentQ] ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-base transition-colors hover:bg-accent-glow disabled:opacity-30"
            >
              确认
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-sm border border-divider px-4 py-2 text-sm text-text-secondary transition-colors hover:border-accent-dim hover:text-accent"
            >
              {currentQ < questions.length - 1 ? "下一题" : "查看结果"}
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
