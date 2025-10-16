'use client';

import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import Checkbox from './Checkbox';
import { CommonButton } from './CommonButton';
import CommonInput from './CommonInput';
import Dialog from './dialog';

interface Question {
  id: number;
  text: string;
  required: boolean;
}

interface QuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (questions: Question[]) => void;
}

export default function Questionnaire({
  isOpen,
  onClose,
  onSubmit,
}: QuestionnaireProps) {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: '', required: false },
  ]);

  const addQuestion = () => {
    const nextId =
      questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions(prev => [...prev, { id: nextId, text: '', required: false }]);
  };

  const deleteQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestion = <K extends keyof Question>(
    id: number,
    key: K,
    value: Question[K]
  ) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(questions);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setQuestions([{ id: 1, text: '', required: false }]);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Questionnaire"
      discription="Ask guests questions when they RSVP via mobile app."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 px-6 py-4 font-diatype"
      >
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ui-neutralSurfaceOnColor">
                Question {index + 1}
              </span>

              <Checkbox
                label="Required"
                checked={q.required}
                onChange={checked => updateQuestion(q.id, 'required', checked)}
              />
            </div>

            <CommonInput
              placeholder="ex. What do you think about this event?"
              className="!bg-ui-neutralSurfaceBackground"
              value={q.text}
              onChange={e => updateQuestion(q.id, 'text', e.target.value)}
              rightIcon={
                questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteQuestion(q.id)}
                    className="flex items-center text-ui-neutralSurfaceOnColor transition-colors hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )
              }
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full rounded-full border border-ui-neuteralSurfaceSecondary bg-transparent py-2.5 font-diatype text-[15px] font-normal text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
        >
          + Add Question
        </button>

        <div className="flex justify-end gap-3 pt-4">
          <CommonButton
            type="button"
            onClick={handleClose}
            className="w-full max-w-[200px] border !border-ui-neuteralSurfaceSecondary bg-transparent py-3 font-diatype text-ui-neutralSurfaceOnColor hover:bg-ui-neuteralSurfaceSecondary hover:text-white"
          >
            Cancel
          </CommonButton>
          <CommonButton
            type="submit"
            className="w-full max-w-[200px] py-3 font-diatype"
          >
            Done
          </CommonButton>
        </div>
      </form>
    </Dialog>
  );
}
