import type { Question } from '@/components/screens/QuestionFlow';

export const basicSettingsQuestions: Question[] = [
  {
    id: 'freeTime',
    title: "What do you usually enjoy doing when you're completely free?",
    type: 'multi',
    options: [
      { label: 'Movies/series', emoji: '🎬' },
      { label: 'Music', emoji: '🎵' },
      { label: 'Going out', emoji: '🌆' },
      { label: 'Staying home', emoji: '🏠' },
      { label: 'Sports', emoji: '⚽' },
      { label: 'Reading', emoji: '📚' },
      { label: 'Gaming', emoji: '🎮' },
      { label: 'Creating something', emoji: '🎨' },
      { label: 'Other', emoji: '✨' },
    ],
  },
  {
    id: 'personalityType',
    title: 'Are you more…',
    type: 'single',
    options: [
      { label: 'Introvert', emoji: '🌙' },
      { label: 'Extrovert', emoji: '☀️' },
      { label: 'Somewhere in between', emoji: '🌗' },
      { label: 'Depends who I\'m with 😂', emoji: '🎭' },
    ],
  },
  {
    id: 'perfectWeekend',
    title: 'Perfect weekend?',
    type: 'single',
    options: [
      { label: 'Going somewhere new', emoji: '🧭' },
      { label: 'Staying home and relaxing', emoji: '🛋️' },
      { label: 'Friends + good food', emoji: '🍽️' },
      { label: 'Movie/series marathon', emoji: '🍿' },
      { label: 'Something spontaneous', emoji: '🎲' },
      { label: 'Other', emoji: '✨' },
    ],
  },
  {
    id: 'talkAboutHours',
    title: "What's something you could talk about for hours?",
    type: 'text',
    placeholder: "Go on, I'm listening…",
    optional: true,
  },
];

export const importantResearchQuestions: Question[] = [
  {
    id: 'musicGenre',
    title: "What's your current favourite type of music?",
    type: 'single',
    options: [
      { label: 'Pop', emoji: '🎤' },
      { label: 'R&B / Soul', emoji: '🎷' },
      { label: 'Hip-hop', emoji: '🎧' },
      { label: 'Rock', emoji: '🎸' },
      { label: 'Afrobeats', emoji: '🥁' },
      { label: 'Electronic / Dance', emoji: '💿' },
      { label: 'Indie / Alternative', emoji: '🎚️' },
      { label: 'Classical', emoji: '🎻' },
      { label: 'Other', emoji: '✨' },
    ],
  },
  {
    id: 'musicArtistSong',
    title: 'Any artist or song you have on repeat right now?',
    type: 'text',
    placeholder: 'Artist – Song (optional)',
    optional: true,
  },
  {
    id: 'movieGenre',
    title: 'Movie night. What are we watching?',
    type: 'single',
    options: [
      { label: 'Comedy', emoji: '😂' },
      { label: 'Romance', emoji: '💗' },
      { label: 'Horror', emoji: '👻' },
      { label: 'Action', emoji: '💥' },
      { label: 'Animation', emoji: '🎨' },
      { label: 'Thriller', emoji: '🔪' },
      { label: 'Anything as long as it\'s good', emoji: '✅' },
    ],
  },
  {
    id: 'foodNeverTired',
    title: 'Food question because priorities matter 😂',
    subtitle: 'What food could you probably never get tired of?',
    type: 'text',
    placeholder: 'That one dish…',
    optional: true,
  },
  {
    id: 'drinkPreference',
    title: 'Tea, coffee, juice or something else?',
    type: 'single',
    options: [
      { label: 'Tea', emoji: '🍵' },
      { label: 'Coffee', emoji: '☕' },
      { label: 'Juice', emoji: '🧃' },
      { label: 'Water honestly', emoji: '💧' },
      { label: 'Something else', emoji: '✨' },
    ],
  },
];

export const personalityQuestions: Question[] = [
  {
    id: 'friendshipValues',
    title: "What matters most to you in a friendship or relationship?",
    subtitle: 'Choose up to 3',
    type: 'multi',
    maxSelections: 3,
    options: [
      { label: 'Honesty' },
      { label: 'Loyalty' },
      { label: 'Communication' },
      { label: 'Respect' },
      { label: 'Humor' },
      { label: 'Ambition' },
      { label: 'Kindness' },
      { label: 'Understanding' },
      { label: 'Trust' },
      { label: 'Supporting each other' },
    ],
  },
  {
    id: 'feelAppreciated',
    title: 'What makes you feel appreciated?',
    type: 'single',
    options: [
      { label: 'Someone actually listening to me', emoji: '👂' },
      { label: 'Spending time together', emoji: '⏰' },
      { label: 'Thoughtful messages', emoji: '💬' },
      { label: 'Small surprises', emoji: '🎁' },
      { label: 'Helping me when I need it', emoji: '🤝' },
      { label: 'Encouragement', emoji: '📣' },
      { label: 'Other', emoji: '✨' },
    ],
  },
  {
    id: 'appreciatedQuality',
    title: 'What is one quality you really appreciate in people?',
    type: 'text',
    placeholder: 'Tell me…',
    optional: true,
  },
];

export const dangerousTerritoryQuestions: Question[] = [
  {
    id: 'guyAttention',
    title: 'What kind of guy usually catches your attention?',
    subtitle: 'Pick all that apply',
    type: 'multi',
    options: [
      { label: 'Funny', emoji: '😂' },
      { label: 'Intelligent', emoji: '🧠' },
      { label: 'Confident', emoji: '😎' },
      { label: 'Calm', emoji: '🧊' },
      { label: 'Ambitious', emoji: '🚀' },
      { label: 'Caring', emoji: '🤗' },
      { label: 'Romantic', emoji: '🌹' },
      { label: 'Respectful', emoji: '🤝' },
      { label: 'Hardworking', emoji: '💪' },
      { label: 'Adventurous', emoji: '🗺️' },
      { label: 'Good communicator', emoji: '💬' },
      { label: 'Someone I can be myself around', emoji: '🎭' },
      { label: 'Other', emoji: '✨' },
    ],
  },
];

export const realQuestionsQuestions: Question[] = [
  {
    id: 'attractiveBeyondLooks',
    title: 'What makes someone attractive to you beyond appearance?',
    type: 'text',
    placeholder: 'Your thoughts…',
    optional: true,
  },
  {
    id: 'likePersonality',
    title: 'What is something that immediately makes you like someone\'s personality?',
    type: 'text',
    placeholder: 'Tell me…',
    optional: true,
  },
  {
    id: 'putsOff',
    title: 'What is something that immediately puts you off?',
    type: 'text',
    placeholder: 'Go on…',
    optional: true,
  },
  {
    id: 'partnerType',
    title: 'Would you rather have someone who…',
    type: 'single',
    options: [
      { label: 'Makes me laugh constantly', emoji: '😂' },
      { label: 'Has deep conversations with me', emoji: '💭' },
      { label: 'Pushes me toward my goals', emoji: '🎯' },
      { label: 'Is peaceful and easy to be around', emoji: '☮️' },
      { label: 'Honestly, a mixture', emoji: '🌈' },
    ],
  },
  {
    id: 'ambitionImportance',
    title: 'How important is ambition to you?',
    type: 'slider',
    sliderMinLabel: 'Not a huge deal',
    sliderMaxLabel: 'Very important',
  },
];

export const dateLabQuestions: Question[] = [
  {
    id: 'dateType',
    title: 'If someone wanted to take you somewhere, what would actually sound fun?',
    type: 'single',
    options: [
      { label: 'Food date', emoji: '🍕' },
      { label: 'Coffee + talking', emoji: '☕' },
      { label: 'Movie', emoji: '🎬' },
      { label: 'Walk somewhere nice', emoji: '🚶' },
      { label: 'Games/activity date', emoji: '🎮' },
      { label: 'Adventure somewhere', emoji: '🗺️' },
      { label: 'Something simple and spontaneous', emoji: '✨' },
      { label: 'Surprise me', emoji: '🎁' },
    ],
  },
  {
    id: 'dayOrEvening',
    title: 'Day or evening?',
    type: 'single',
    options: [
      { label: 'Day', emoji: '☀️' },
      { label: 'Evening', emoji: '🌙' },
      { label: 'Either', emoji: '🌗' },
    ],
  },
  {
    id: 'fancyOrSimple',
    title: 'Fancy or simple?',
    type: 'single',
    options: [
      { label: 'Fancy', emoji: '✨' },
      { label: 'Simple', emoji: '😌' },
      { label: 'Somewhere in between', emoji: '🎯' },
    ],
  },
  {
    id: 'plannedOrSpontaneous',
    title: 'Planned or spontaneous?',
    type: 'single',
    options: [
      { label: 'Planned', emoji: '📋' },
      { label: 'Spontaneous', emoji: '🎲' },
      { label: 'A bit of both', emoji: '🔀' },
    ],
  },
];
