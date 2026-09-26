export type AnswerValue = string | string[];

export interface AllAnswers {
  // Chapter 2
  whyGuess?: string;

  // Chapter 3
  freeTime?: string[];
  personalityType?: string;
  perfectWeekend?: string;
  talkAboutHours?: string;

  // Chapter 4
  musicGenre?: string;
  musicArtistSong?: string;
  movieGenre?: string;
  foodNeverTired?: string;
  drinkPreference?: string;

  // Chapter 5
  friendshipValues?: string[];
  feelAppreciated?: string;
  appreciatedQuality?: string;

  // Chapter 6
  guyAttention?: string[];

  // Chapter 7
  attractiveBeyondLooks?: string;
  likePersonality?: string;
  putsOff?: string;
  partnerType?: string;
  ambitionImportance?: number;

  // Chapter 8
  dateType?: string;
  dayOrEvening?: string;
  fancyOrSimple?: string;
  plannedOrSpontaneous?: string;

  // Chapter 9
  questionForChris?: string;
}

export interface SharedAnswerRecord {
  answers: AllAnswers;
  question_for_chris: string | null;
  final_response: string | null;
  date_response: string | null;
}

export type ChapterId =
  | 'intro'
  | 'why'
  | 'basicSettings'
  | 'importantResearch'
  | 'personality'
  | 'dangerousTerritory'
  | 'realQuestions'
  | 'dateLab'
  | 'yvoneAsks'
  | 'confession'
  | 'theQuestion'
  | 'finale';

export type ScreenId = string;
