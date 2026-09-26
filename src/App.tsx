import { useState, useCallback } from 'react';
import { AmbientGlow, FloatingParticles } from '@/components/effects/FloatingParticles';
import { EasterEggs, useChrisTap } from '@/components/effects/EasterEggs';
import { SystemStatus } from '@/components/effects/SystemStatus';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScreenTransition } from '@/components/ui/ScreenTransition';

import { IntroScreen } from '@/components/screens/IntroScreen';
import { WhyScreen } from '@/components/screens/WhyScreen';
import { QuestionFlow } from '@/components/screens/QuestionFlow';
import { DangerousTerritory } from '@/components/screens/DangerousTerritory';
import { DateLabConclusion } from '@/components/screens/DateLabConclusion';
import { YvoneAsks } from '@/components/screens/YvoneAsks';
import { Confession } from '@/components/screens/Confession';
import { TheQuestion } from '@/components/screens/TheQuestion';
import { Finale } from '@/components/screens/Finale';
import { AnswerPrivacy } from '@/components/screens/AnswerPrivacy';

import {
  basicSettingsQuestions,
  importantResearchQuestions,
  personalityQuestions,
  realQuestionsQuestions,
  dateLabQuestions,
} from '@/lib/questions';
import { useSavedState } from '@/lib/storage';
import type { AllAnswers } from '@/lib/types';

type Screen =
  | 'intro'
  | 'why'
  | 'basicSettings'
  | 'importantResearch'
  | 'personality'
  | 'dangerousTerritory'
  | 'realQuestions'
  | 'dateLab'
  | 'dateLabEnd'
  | 'yvoneAsks'
  | 'confession'
  | 'theQuestion'
  | 'finale'
  | 'answerPrivacy';

const SCREEN_ORDER: Screen[] = [
  'intro',
  'why',
  'basicSettings',
  'importantResearch',
  'personality',
  'dangerousTerritory',
  'realQuestions',
  'dateLab',
  'dateLabEnd',
  'yvoneAsks',
  'confession',
  'theQuestion',
];

function getProgress(screen: Screen, finalResponse: string | null): number {
  const idx = SCREEN_ORDER.indexOf(screen);
  if (screen === 'theQuestion' && finalResponse) return 95;
  if (screen === 'finale') return 100;
  if (screen === 'answerPrivacy') return 100;
  if (idx === -1) return 100;
  const base = (idx / (SCREEN_ORDER.length - 1)) * 90;
  return Math.round(base);
}

export default function App() {
  const [state, setState] = useSavedState();
  const [screen, setScreen] = useState<Screen>(state.currentScreen as Screen);
  const [answers, setAnswers] = useState<AllAnswers>(
    state.answers as unknown as AllAnswers
  );
  const [finalResponse, setFinalResponse] = useState<string | null>(state.finalResponse);
  const [dateResponse, setDateResponse] = useState<string | null>(state.dateResponse);
  const [questionForChris, setQuestionForChris] = useState<string | null>(state.questionForChris);
  const [sharedWithChris, setSharedWithChris] = useState<boolean>(state.sharedWithChris);

  const chrisTap = useChrisTap();

  const updateAnswer = useCallback((key: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goTo = useCallback(
    (next: Screen) => {
      setScreen(next);
      setState({
        answers: answers as Record<string, unknown>,
        currentScreen: next,
        finalResponse,
        dateResponse,
        questionForChris,
        sharedWithChris,
      });
    },
    [answers, finalResponse, dateResponse, questionForChris, sharedWithChris, setState]
  );

  const persistAll = useCallback(
    (overrides?: {
      answers?: AllAnswers;
      finalResponse?: string | null;
      dateResponse?: string | null;
      questionForChris?: string | null;
      sharedWithChris?: boolean;
      screen?: Screen;
    }) => {
      const newAnswers = overrides?.answers ?? answers;
      const newFinal = overrides?.finalResponse ?? finalResponse;
      const newDate = overrides?.dateResponse ?? dateResponse;
      const newQuestion = overrides?.questionForChris ?? questionForChris;
      const newShared = overrides?.sharedWithChris ?? sharedWithChris;
      const newScreen = overrides?.screen ?? screen;

      setAnswers(newAnswers);
      setFinalResponse(newFinal);
      setDateResponse(newDate);
      setQuestionForChris(newQuestion);
      setSharedWithChris(newShared);

      setState({
        answers: newAnswers as Record<string, unknown>,
        currentScreen: newScreen,
        finalResponse: newFinal,
        dateResponse: newDate,
        questionForChris: newQuestion,
        sharedWithChris: newShared,
      });
    },
    [answers, finalResponse, dateResponse, questionForChris, sharedWithChris, screen, setState]
  );

  const showProgress = screen !== 'intro' && screen !== 'confession';

  return (
    <div className="min-h-[100dvh] bg-ink-900 relative overflow-x-hidden">
      <AmbientGlow />
      <FloatingParticles count={12} />

      {showProgress && (
        <div className="sticky top-0 z-30 bg-ink-900/60 backdrop-blur-md">
          <ProgressBar percent={getProgress(screen, finalResponse)} />
        </div>
      )}

      <div className="relative z-10">
        <ScreenTransition screenKey={screen}>
          {screen === 'intro' && <IntroScreen onContinue={() => goTo('why')} />}

          {screen === 'why' && (
            <WhyScreen
              onContinue={() => goTo('basicSettings')}
              onAnswer={(key, value) => updateAnswer(key, value)}
            />
          )}

          {screen === 'basicSettings' && (
            <QuestionFlow
              chapterTitle="Yvone: Basic Settings 😂"
              questions={basicSettingsQuestions}
              onComplete={(a) => {
                const merged = { ...answers, ...a } as AllAnswers;
                persistAll({ answers: merged, screen: 'importantResearch' });
                goTo('importantResearch');
              }}
              onBack={() => goTo('why')}
              initialAnswers={answers as Record<string, unknown>}
            />
          )}

          {screen === 'importantResearch' && (
            <QuestionFlow
              chapterTitle="Important Research 🔬"
              questions={importantResearchQuestions}
              onComplete={(a) => {
                const merged = { ...answers, ...a } as AllAnswers;
                persistAll({ answers: merged, screen: 'personality' });
                goTo('personality');
              }}
              onBack={() => goTo('basicSettings')}
              initialAnswers={answers as Record<string, unknown>}
            />
          )}

          {screen === 'personality' && (
            <QuestionFlow
              chapterTitle="Personality Check 🧠"
              questions={personalityQuestions}
              onComplete={(a) => {
                const merged = { ...answers, ...a } as AllAnswers;
                persistAll({ answers: merged, screen: 'dangerousTerritory' });
                goTo('dangerousTerritory');
              }}
              onBack={() => goTo('importantResearch')}
              initialAnswers={answers as Record<string, unknown>}
            />
          )}

          {screen === 'dangerousTerritory' && (
            <DangerousTerritory
              onComplete={(a) => {
                const merged = { ...answers, ...a } as AllAnswers;
                persistAll({ answers: merged, screen: 'realQuestions' });
                goTo('realQuestions');
              }}
              onBack={() => goTo('personality')}
              initialAnswers={answers as Record<string, unknown>}
            />
          )}

          {screen === 'realQuestions' && (
            <QuestionFlow
              chapterTitle="The Real Questions 💭"
              questions={realQuestionsQuestions}
              onComplete={(a) => {
                const merged = { ...answers, ...a } as AllAnswers;
                persistAll({ answers: merged, screen: 'dateLab' });
                goTo('dateLab');
              }}
              onBack={() => goTo('dangerousTerritory')}
              initialAnswers={answers as Record<string, unknown>}
            />
          )}

          {screen === 'dateLab' && (
            <QuestionFlow
              chapterTitle="Date Lab 😂"
              questions={dateLabQuestions}
              onComplete={(a) => {
                const merged = { ...answers, ...a } as AllAnswers;
                persistAll({ answers: merged, screen: 'dateLabEnd' });
                goTo('dateLabEnd');
              }}
              onBack={() => goTo('realQuestions')}
              initialAnswers={answers as Record<string, unknown>}
            />
          )}

          {screen === 'dateLabEnd' && (
            <DateLabConclusion onContinue={() => goTo('yvoneAsks')} />
          )}

          {screen === 'yvoneAsks' && (
            <YvoneAsks
              onContinue={() => goTo('confession')}
              onAnswer={(key, value) => {
                updateAnswer(key, value);
                setQuestionForChris(value);
                persistAll({ questionForChris: value });
              }}
              initialValue={questionForChris ?? undefined}
            />
          )}

          {screen === 'confession' && <Confession onContinue={() => goTo('theQuestion')} />}

          {screen === 'theQuestion' && (
            <TheQuestion
              onChoice={(choice) => {
                setFinalResponse(choice);
                persistAll({ finalResponse: choice });
              }}
              onDateChoice={(choice) => {
                setDateResponse(choice);
                persistAll({ dateResponse: choice });
                if (choice === 'yes' || choice === 'talk') {
                  setTimeout(() => goTo('finale'), 1500);
                } else if (choice === 'message') {
                  setTimeout(() => goTo('answerPrivacy'), 1500);
                }
              }}
              dateResponse={dateResponse}
            />
          )}

          {screen === 'finale' && (
            <Finale
              onMessageChris={() => goTo('answerPrivacy')}
            />
          )}

          {screen === 'answerPrivacy' && (
            <AnswerPrivacy
              answers={answers}
              questionForChris={questionForChris}
              finalResponse={finalResponse}
              dateResponse={dateResponse}
              onShared={() => {
                persistAll({ sharedWithChris: true });
              }}
              onKeepPrivate={() => {
                persistAll({ sharedWithChris: false });
              }}
            />
          )}
        </ScreenTransition>
      </div>

      {/* Easter Egg 4: System status (shown on finale screen) */}
      {screen === 'finale' && (
        <div className="relative z-10 pb-12 flex justify-center">
          <SystemStatus />
        </div>
      )}

      {/* Hidden Chris tap target — tapping "Chris" anywhere triggers the easter egg */}
      <ChrisTapHelper onTap={chrisTap} screen={screen} />

      <EasterEggs />
    </div>
  );
}

function ChrisTapHelper({ onTap, screen }: { onTap: () => void; screen: Screen }) {
  if (screen !== 'confession' && screen !== 'finale') return null;
  return (
    <button
      type="button"
      onClick={onTap}
      className="fixed top-2 left-2 z-40 text-transparent select-none"
      aria-hidden="true"
    >
      Chris
    </button>
  );
}
