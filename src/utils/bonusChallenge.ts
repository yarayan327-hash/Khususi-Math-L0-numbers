import { Language } from './translations';

export interface BonusSceneCopy {
  title: string;
  subtitle: string;
  instruction: string;
  correct: string;
  incorrect: string;
  reveal: string;
  followUp?: string;
  followUpAnswer?: string;
}

interface BonusChallengeCopy {
  label: string;
  labelSubtitle: string;
  teacherPrompt: string;
  leftGroup: string;
  rightGroup: string;
  scenes: BonusSceneCopy[];
}

export const BONUS_CHALLENGE: Record<Language, BonusChallengeCopy> = {
  ar: {
    label: 'تحدي إضافي',
    labelSubtitle: 'للطالب المستعد لتحدٍّ أكبر',
    teacherPrompt: 'إذا أنهى الطالب الدرس بسرعة، استخدم هذا التحدي لاختبار قدرته على العد والمقارنة بعد العدد ١٠. لا يلزم إكمال هذا الجزء.',
    leftGroup: 'المجموعة اليسرى',
    rightGroup: 'المجموعة اليمنى',
    scenes: [
      { title: 'العد بعد ١٠', subtitle: 'تحدٍّ اختياري للعد المنظم.', instruction: 'كم عدد التفاحات؟', correct: 'أحسنت! العدد هو ١٢.', incorrect: 'حاول مرة أخرى.', reveal: '١٢' },
      { title: 'عُدَّ مجموعة أكبر', subtitle: 'تحدٍّ اختياري للعد المنظم.', instruction: 'عُدَّ الأشياء. كم عددها؟', correct: 'أحسنت! العدد هو ١٥.', incorrect: 'حاول مرة أخرى.', reveal: '١٥' },
      { title: 'قارن بعد ١٠', subtitle: 'قارن الكميتين دون أرقام.', instruction: 'أيهما أكثر؟', correct: 'أحسنت! اخترت المجموعة الأكثر.', incorrect: 'عُدَّ المجموعتين مرة أخرى.', reveal: '١٤ أكثر من ١٢' },
      { title: 'التحدي الخارق', subtitle: 'قارن ثم فكّر في الفرق.', instruction: 'أيهما أقل؟', correct: 'أحسنت! اخترت المجموعة الأقل.', incorrect: 'عُدَّ المجموعتين مرة أخرى.', reveal: '١٣ أقل من ١٦', followUp: 'كم يزيد ١٦ عن ١٣؟', followUpAnswer: 'الإجابة: ٣' },
    ],
  },
  en: {
    label: 'Bonus Challenge',
    labelSubtitle: 'For students ready for a bigger challenge',
    teacherPrompt: 'If the student finishes early, use this challenge to test counting and comparison beyond 10. This section does not need to be completed.',
    leftGroup: 'Left group',
    rightGroup: 'Right group',
    scenes: [
      { title: 'Count Beyond 10', subtitle: 'An optional structured counting challenge.', instruction: 'How many apples are there?', correct: 'Well done! The total is 12.', incorrect: 'Try again.', reveal: '12' },
      { title: 'Count a Larger Group', subtitle: 'An optional structured counting challenge.', instruction: 'Count the objects. How many are there?', correct: 'Well done! The total is 15.', incorrect: 'Try again.', reveal: '15' },
      { title: 'Compare Beyond 10', subtitle: 'Compare the quantities without number clues.', instruction: 'Which has more?', correct: 'Correct! You chose the group with more objects.', incorrect: 'Count both groups again.', reveal: '14 is more than 12.' },
      { title: 'Final Super Challenge', subtitle: 'Compare, then reason about the difference.', instruction: 'Which has fewer?', correct: 'Correct! You chose the group with fewer objects.', incorrect: 'Count both groups again.', reveal: '13 is less than 16.', followUp: 'How many more is 16 than 13?', followUpAnswer: 'Answer: 3' },
    ],
  },
  zh: {
    label: '进阶挑战',
    labelSubtitle: '适合学有余力的学生',
    teacherPrompt: '如果学生提前完成课程，可使用本部分测试其对10以上数量的计数和比较能力。本部分无需必须完成。',
    leftGroup: '左边的一组',
    rightGroup: '右边的一组',
    scenes: [
      { title: '数到10以上', subtitle: '可选的结构化计数挑战。', instruction: '一共有多少个苹果？', correct: '答对了！一共有12个。', incorrect: '再试一次。', reveal: '12' },
      { title: '数更大的一组', subtitle: '可选的结构化计数挑战。', instruction: '数一数，一共有多少个？', correct: '答对了！一共有15个。', incorrect: '再试一次。', reveal: '15' },
      { title: '比较10以上的数量', subtitle: '不看数字，直接比较数量。', instruction: '哪边更多？', correct: '答对了！你选择了更多的一组。', incorrect: '再数一数两组物品。', reveal: '14 比 12 多。' },
      { title: '终极进阶挑战', subtitle: '比较数量，再思考相差几个。', instruction: '哪边更少？', correct: '答对了！你选择了更少的一组。', incorrect: '再数一数两组物品。', reveal: '13 比 16 少。', followUp: '16 比 13 多几个？', followUpAnswer: '答案：3' },
    ],
  },
};
