import { Language } from './translations';

export interface OptionalSceneCopy {
  title: string;
  subtitle: string;
  teacherPrompt: string;
  instruction: string;
  correct: string;
  incorrect: string;
  reveal: string;
  yes?: string;
  no?: string;
  countStep?: string;
  compareStep?: string;
  differencePrompt?: string;
  differenceAnswer?: string;
}

interface OptionalPracticeCopy {
  label: string;
  scenes: OptionalSceneCopy[];
}

export const OPTIONAL_PRACTICE: Record<Language, OptionalPracticeCopy> = {
  ar: {
    label: 'تدريب إضافي',
    scenes: [
      {
        title: 'العد السريع', subtitle: 'عُدَّ التفاح واختر الرقم الصحيح.',
        teacherPrompt: 'قل: عُدَّ الأشياء واحدةً واحدة، ثم اختر الرقم الصحيح.',
        instruction: 'عُدَّ الأشياء. كم عددها؟', correct: 'أحسنت! الإجابة صحيحة.',
        incorrect: 'حاول مرة أخرى.', reveal: 'سبع تفاحات',
      },
      {
        title: 'أيهما أكثر؟', subtitle: 'قارن بين مجموعتين من التفاح.',
        teacherPrompt: 'قل: عُدَّ المجموعتين، ثم اختر المجموعة التي فيها أشياء أكثر.',
        instruction: 'أيهما أكثر؟', correct: 'أحسنت! اخترت المجموعة الأكثر.',
        incorrect: 'عُدَّ المجموعتين مرة أخرى.', reveal: '٧ أكثر من ٤',
      },
      {
        title: 'أيهما أقل؟', subtitle: 'قارن بين مجموعتين من كرات القدم.',
        teacherPrompt: 'قل: عُدَّ المجموعتين، ثم اختر المجموعة التي فيها أشياء أقل.',
        instruction: 'أيهما أقل؟', correct: 'أحسنت! اخترت المجموعة الأقل.',
        incorrect: 'عُدَّ المجموعتين مرة أخرى.', reveal: '٣ أقل من ٦',
      },
      {
        title: 'متساويان أم لا؟', subtitle: 'قارن بين مجموعتين من المكعبات.',
        teacherPrompt: 'قل: عُدَّ المجموعتين. هل العددان متساويان؟',
        instruction: 'هل العددان متساويان؟', correct: 'أحسنت! متساويان.',
        incorrect: 'عُدَّ المجموعتين مرة أخرى.', reveal: 'متساويان', yes: 'نعم', no: 'لا',
      },
      {
        title: 'التحدي المختلط', subtitle: 'عُدَّ، ثم قارن، ثم أوجد الفرق.',
        teacherPrompt: 'قل: عُدَّ أولًا، ثم قارن بين العددين.',
        instruction: 'عُدَّ الأشياء.', correct: 'أحسنت! ثمانية أكثر من ستة.',
        incorrect: 'عُدَّ المجموعتين مرة أخرى.', reveal: '٨ أكثر من ٦',
        countStep: 'عُدَّ الأشياء.', compareStep: 'أيهما أكثر؟',
        differencePrompt: 'كم يزيد ٨ عن ٦؟', differenceAnswer: 'الإجابة: ٢',
      },
    ],
  },
  en: {
    label: 'Extra Practice',
    scenes: [
      {
        title: 'Quick Count', subtitle: 'Count the apples and choose the correct number.',
        teacherPrompt: 'Say: Count the objects one by one, then choose the correct number.',
        instruction: 'Count the objects. How many are there?', correct: 'Correct! Well done.',
        incorrect: 'Try again.', reveal: 'Seven apples',
      },
      {
        title: 'Which Has More?', subtitle: 'Compare two groups of apples.',
        teacherPrompt: 'Say: Count both groups, then choose the group with more objects.',
        instruction: 'Which has more?', correct: 'Correct! You chose the group with more objects.',
        incorrect: 'Count both groups again.', reveal: '7 is more than 4.',
      },
      {
        title: 'Which Has Less?', subtitle: 'Compare two groups of footballs.',
        teacherPrompt: 'Say: Count both groups, then choose the group with fewer objects.',
        instruction: 'Which has fewer?', correct: 'Correct! You chose the group with fewer objects.',
        incorrect: 'Count both groups again.', reveal: '3 is less than 6.',
      },
      {
        title: 'Equal or Not?', subtitle: 'Compare two groups of building blocks.',
        teacherPrompt: 'Say: Count both groups. Are the numbers equal?',
        instruction: 'Are they equal?', correct: 'Correct! They are equal.',
        incorrect: 'Count both groups again.', reveal: 'They are equal.', yes: 'Yes', no: 'No',
      },
      {
        title: 'Mixed Challenge', subtitle: 'Count, compare, then find the difference.',
        teacherPrompt: 'Say: Count first, then compare the two numbers.',
        instruction: 'Count the objects.', correct: 'Correct! Eight is more than six.',
        incorrect: 'Count both groups again.', reveal: '8 is more than 6.',
        countStep: 'Count the objects.', compareStep: 'Which has more?',
        differencePrompt: 'How many more is 8 than 6?', differenceAnswer: 'Answer: 2',
      },
    ],
  },
  zh: {
    label: '额外练习',
    scenes: [
      {
        title: '快速数数', subtitle: '数苹果并选择正确的数字。',
        teacherPrompt: '说：一个一个数，然后选择正确的数字。',
        instruction: '数一数，一共有多少个？', correct: '答对了！',
        incorrect: '再试一次。', reveal: '7 个苹果',
      },
      {
        title: '哪边更多？', subtitle: '比较两组苹果。',
        teacherPrompt: '说：数一数两组物品，然后选择更多的一组。',
        instruction: '哪边更多？', correct: '答对了！你选择了更多的一组。',
        incorrect: '再数一数两组物品。', reveal: '7 比 4 多。',
      },
      {
        title: '哪边更少？', subtitle: '比较两组足球。',
        teacherPrompt: '说：数一数两组物品，然后选择更少的一组。',
        instruction: '哪边更少？', correct: '答对了！你选择了更少的一组。',
        incorrect: '再数一数两组物品。', reveal: '3 比 6 少。',
      },
      {
        title: '一样多吗？', subtitle: '比较两组积木。',
        teacherPrompt: '说：数一数两组。它们一样多吗？',
        instruction: '它们一样多吗？', correct: '答对了！它们一样多。',
        incorrect: '再数一数两组物品。', reveal: '一样多。', yes: '是', no: '不是',
      },
      {
        title: '综合挑战', subtitle: '先数数，再比较，最后找出相差几个。',
        teacherPrompt: '说：先数一数，再比较两个数字。',
        instruction: '数一数。', correct: '答对了！8 比 6 多。',
        incorrect: '再数一数两组物品。', reveal: '8 比 6 多。',
        countStep: '数一数。', compareStep: '哪边更多？',
        differencePrompt: '8 比 6 多几个？', differenceAnswer: '答案：2',
      },
    ],
  },
};
