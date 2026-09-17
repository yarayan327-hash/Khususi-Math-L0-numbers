export type Language = 'ar' | 'en' | 'zh';

export const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function formatNumber(num: number | string, lang: Language): string {
  const str = String(num);
  if (lang === 'ar') {
    return str.replace(/\d/g, (d) => EASTERN_ARABIC_DIGITS[parseInt(d, 10)] ?? d);
  }
  return str;
}

export function getNumberWord(num: number, lang: Language): string {
  const words: Record<number, Record<Language, string>> = {
    0: { ar: 'صِفْر', en: 'Zero', zh: '零' },
    1: { ar: 'وَاحِد', en: 'One', zh: '一' },
    2: { ar: 'اثْنَان', en: 'Two', zh: '二' },
    3: { ar: 'ثَلَاثَة', en: 'Three', zh: '三' },
    4: { ar: 'أَرْبَعَة', en: 'Four', zh: '四' },
    5: { ar: 'خَمْسَة', en: 'Five', zh: '五' },
    6: { ar: 'سِتَّة', en: 'Six', zh: '六' },
    7: { ar: 'سَبْعَة', en: 'Seven', zh: '七' },
    8: { ar: 'ثَمَانِيَة', en: 'Eight', zh: '八' },
    9: { ar: 'تِسْعَة', en: 'Nine', zh: '九' },
    10: { ar: 'عَشَرَة', en: 'Ten', zh: '十' },
  };

  return words[num]?.[lang] ?? String(num);
}

export interface Translations {
  // Brand & Header
  appTitle: string;
  courseBadge: string;
  scenePrefix: string;
  ofPrefix: string;
  sceneTooltip: string;
  muteAudio: string;
  unmuteAudio: string;
  fullscreen: string;

  // Teacher Bar
  teacherGuide: string;
  btnReset: string;
  btnPrev: string;
  btnNext: string;
  btnNextScene: string;
  btnRestart: string;

  // Scenes Metadata (title, subtitle, teacherPrompt)
  scenes: Array<{
    title: string;
    subtitle: string;
    teacherPrompt: string;
  }>;

  // Scene 1 Discover 1 to 5
  scene1: {
    instructionCar: string;
    instructionApples: string;
    instructionBlocks: string;
    instructionOranges: string;
    instructionFootballs: string;
    touchToCount: string;
    cardRevealPrefix: string;
    countedOf: (curr: string, total: string) => string;
  };

  // Scene 2 Fast Recognition
  scene2: {
    instruction: string;
    tapNumber: string;
    successOrder: string;
    tryAgain: string;
  };

  // Scene 3 Basket Drag (Oranges)
  scene3: {
    instruction: string;
    counterLabel: string;
    successMsg: string;
    inBasket: string;
    successBasket: string;
  };

  // Scene 4 Hidden Footballs
  scene4: {
    instruction: string;
    counterLabel: string;
    hint: string;
    successMsg: string;
    ballsFound: string;
    successFound: string;
  };

  // Scene 5 Number Path
  scene5: {
    instruction: string;
    hint: string;
    targetSlot: string;
    successMsg: string;
    successPath: string;
  };

  // Scene 6 Matching Challenge (Cars)
  scene6: {
    instruction: string;
    hint: string;
    countedPrompt: (count: string) => string;
    successMsg: string;
    carTooltip: string;
    carsCounted: (count: string) => string;
    touchCarsPrompt: string;
    successCars: string;
  };

  // Scene 7 Plate Comparison
  scene7: {
    instructionMore: string;
    instructionLess: string;
    instructionEqual: string;
    areTheyEqual: string;
    btnYes: string;
    btnNo: string;
    feedbackEqual: string;
    equationEqual: string;
    whichHasFewer: string;
    revealedLess: string;
    revealedLessMath: string;
    whichHasMore: string;
    revealedMore: string;
    revealedMoreMath: string;
    badgeMore: string;
    badgeLess: string;
    badgeEqual: string;
    btnEqual: string;
    correctMsgMore: string;
    correctMsgLess: string;
    correctMsgEqual: string;
    whichIsMore: string;
    whichIsLess: string;
    areEqual: string;
    more: string;
    less: string;
    equal: string;
    successMore: string;
    successLess: string;
    successEqual: string;
  };

  // Scene 8 Discover Zero
  scene8: {
    instruction: string;
    hint: string;
    remaining: (count: string) => string;
    plateEmpty: string;
    zeroLabel: string;
    allGone: string;
    empty: string;
    successZero: string;
  };

  // Scene 9 Celebration
  scene9: {
    title: string;
    subtitle: string;
    btnRestart: string;
    wellDone: string;
    iKnowNumbers: string;
    restartCourse: string;
    successCelebration: string;
  };

  // Semantic Containers (Pencil Case, Toy Box, etc.)
  containers: {
    pencilCaseLabel: string;
    inPencilCase: (curr: string, total: string) => string;
    pencilInstruction: string;
    toyBoxLabel: string;
    inToyBox: (curr: string, total: string) => string;
    blocksInstruction: string;
    parkingLabel: string;
    inParking: (curr: string, total: string) => string;
    carsInstruction: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    appTitle: 'عالم الأرقام',
    courseBadge: 'الأعداد من ٠ إلى ١٠',
    scenePrefix: 'المرحلة',
    ofPrefix: 'من',
    sceneTooltip: 'المشهد',
    muteAudio: 'كتم الصوت',
    unmuteAudio: 'تشغيل الصوت',
    fullscreen: 'ملء الشاشة',

    teacherGuide: 'دليل المعلم',
    btnReset: 'إعادة المحاولة',
    btnPrev: 'السابق',
    btnNext: 'التالي',
    btnNextScene: 'المشهد التالي',
    btnRestart: 'البداية',

    scenes: [
      {
        title: 'استكشاف الأعداد ١ إلى ٥',
        subtitle: 'الكمية إلى الرقم تدريجياً (سيارة، تفاح، مكعبات، برتقال، كرات)',
        teacherPrompt: 'قل للطالب: عُدّ الأشياء الجميلة، ثم انظر إلى الرقم الذي يظهر!',
      },
      {
        title: 'تعرّف سريع على الأرقام',
        subtitle: 'المس الأرقام من ١ إلى ٥ بالترتيب',
        teacherPrompt: 'قل: المس الأرقام بالترتيب: ١ ثم ٢ ثم ٣ ثم ٤ ثم ٥!',
      },
      {
        title: 'البرتقال في السلة',
        subtitle: 'اسحب ٤ برتقالات إلى السلة',
        teacherPrompt: 'قل: اسحب أربع برتقالات وضعها داخل السلة.',
      },
      {
        title: 'البحث عن الكرات',
        subtitle: 'جِد ٥ كرات في ساحة الملعب',
        teacherPrompt: 'قل: ابحث عن الكرات الخمس المختبئة في الملعب والمسها!',
      },
      {
        title: 'مسار الأرقام',
        subtitle: 'أكمل الرقم الناقص في مسار الأحجار',
        teacherPrompt: 'قل: اسحب الرقم الناقص ٣ ليصبح المسار مكتملاً من ١ إلى ٥.',
      },
      {
        title: 'تحدي المطابقة',
        subtitle: 'طابق عدد السيارات بالرقم الصحيح',
        teacherPrompt: 'قل: كم سيارة في الموقف؟ عُدّها ثم اختر الرقم المطابق.',
      },
      {
        title: 'أكثر أم أقل؟',
        subtitle: 'مقارنة الكميات بين المجموعات (تفاح، أقلام، سيارات)',
        teacherPrompt: 'قل: أيهما أكثر؟ أيهما أقل؟ هل هما متساويان؟',
      },
      {
        title: 'اكتشاف الصفر ٠',
        subtitle: 'عندما يفرغ الصحن تماماً',
        teacherPrompt: 'قل: عندما لا يبقى أي تمر على الصحن، ما هو الرقم؟ إنه الصفر!',
      },
      {
        title: 'أنا أعرف الأرقام!',
        subtitle: 'احتفال بإتمام رحلة الأعداد من ٠ إلى ١٠',
        teacherPrompt: 'احتفل مع الطالب: «أنا أعرف الأرقام من ٠ إلى ١٠!»',
      },
    ],

    scene1: {
      instructionCar: 'عُدَّ السَّيَّارَات!',
      instructionApples: 'عُدَّ التُّفَّاح!',
      instructionBlocks: 'عُدَّ المُكَعَّبَات!',
      instructionOranges: 'عُدَّ البُرْتُقَال!',
      instructionFootballs: 'عُدَّ الكُرَات!',
      touchToCount: 'المس لعدّها!',
      cardRevealPrefix: 'رائع! هذا هو الرقم',
      countedOf: (curr, total) => `${curr} / ${total}`,
    },

    scene2: {
      instruction: 'المَسِ الأَرْقَامَ بِالتَّرْتِيبِ: ١ ← ٥',
      tapNumber: 'المس الرقم:',
      successOrder: 'ممتاز! أنهيت الترتيب من ١ إلى ٥',
      tryAgain: 'حاول ثانية!',
    },

    scene3: {
      instruction: 'ضَعْ ٤ بُرْتُقَالَاتٍ فِي السَّلَّةِ',
      counterLabel: 'في السلة:',
      successMsg: 'أربعة في السلة! أحسنت',
      inBasket: 'في السلة',
      successBasket: 'أربعة في السلة! أحسنت',
    },

    scene4: {
      instruction: 'ابْحَثْ عَنِ الكُرَاتِ الخَمْسِ فِي المَلْعَبِ!',
      counterLabel: 'الكرات المكتشفة:',
      hint: 'المس الكرات المختبئة في الملعب لعدّها',
      successMsg: 'وجدت كل الكرات الخمس! ممتاز',
      ballsFound: 'الكرات',
      successFound: 'وجدت خمس كرات! أحسنت',
    },

    scene5: {
      instruction: 'أَكْمِلِ الرَّقْمَ النَّاقِصَ فِي المَسَارِ!',
      hint: 'اسحب الرقم ٣ إلى مكانه الصحيح على الحجر',
      targetSlot: 'ضع هنا',
      successMsg: 'المسار مكتمل من ١ إلى ٥! رائع',
      successPath: 'ثلاثة! أحسنت',
    },

    scene6: {
      instruction: 'عُدَّ السَّيَّارَات!',
      hint: 'المس السيارات لعدّها، ثم اختر الرقم المطابق',
      countedPrompt: (c) => `${c} سيارات تم عدّها — كم عددها الإجمالي؟`,
      successMsg: 'ثلاث سيارات! أحسنت يا بطل',
      carTooltip: 'المس السيارة لعدّها',
      carsCounted: (c) => `${c} سيارات تم عدّها — كم عددها الإجمالي؟`,
      touchCarsPrompt: 'المس السيارات لعدّها، ثم اختر الرقم المطابق',
      successCars: 'ثلاث سيارات! أحسنت يا بطل',
    },

    scene7: {
      instructionMore: 'أَيُّهُمَا أَكْثَرُ؟',
      instructionLess: 'أَيُّهُمَا أَقَلُّ؟',
      instructionEqual: 'هَلْ هُمَا مُتَسَاوِيَانِ؟',
      areTheyEqual: 'هَلْ هُمَا مُتَسَاوِيَانِ؟',
      btnYes: 'نَعَم',
      btnNo: 'لَا',
      feedbackEqual: 'مُتَسَاوِيَانِ! ✓',
      equationEqual: '٤ = ٤',
      whichHasFewer: 'أَيُّهُمَا أَقَلُّ؟',
      revealedLess: '٣ أَقَلُّ مِنْ ٦',
      revealedLessMath: '٣ < ٦',
      whichHasMore: 'أَيُّهُمَا أَكْثَرُ؟',
      revealedMore: '٥ أَكْثَرُ مِنْ ٢',
      revealedMoreMath: '٥ > ٢',
      badgeMore: 'أكثر!',
      badgeLess: 'أقل!',
      badgeEqual: 'متساويان: ٤ = ٤',
      btnEqual: 'مُتَسَاوِيَانِ!',
      correctMsgMore: 'صحيح! ٥ أكثر من ٢',
      correctMsgLess: 'صحيح! ٣ أقل من ٦',
      correctMsgEqual: 'ممتاز! الكميتان متساويتان ٤ = ٤',
      whichIsMore: 'أَيُّهُمَا أَكْثَرُ؟',
      whichIsLess: 'أَيُّهُمَا أَقَلُّ؟',
      areEqual: 'هَلْ هُمَا مُتَسَاوِيَانِ؟',
      more: 'أَكْثَر',
      less: 'أَقَلّ',
      equal: 'مُتَسَاوِيَانِ!',
      successMore: 'أكثر! ممتاز',
      successLess: 'أقل! ممتاز',
      successEqual: 'متساويان! أحسنت',
    },

    scene8: {
      instruction: 'كُلْ حَبَّاتِ التَّمْرِ لِتَكْتَشِفَ الرَّقْمَ الصِّفْر!',
      hint: 'المس حبات التمر لتناولها واحدة تلو الأخرى',
      remaining: (count) => `المتبقي: ${count}`,
      plateEmpty: 'الصَّحْنُ فَارِغٌ! لَا شَيْءَ عَلَى الصَّحْنِ',
      zeroLabel: 'صِفْر',
      allGone: 'ما بقي شيء!',
      empty: 'فَارِغ',
      successZero: 'ما بقي شيء! صِفْر',
    },

    scene9: {
      title: 'أَنَا أَعْرِفُ الأَرْقَامَ!',
      subtitle: 'أتممت رحلة الأعداد من ٠ إلى ١٠ بنجاح باهر!',
      btnRestart: 'إِعَادَةُ الدَّرْسِ',
      wellDone: 'أَحْسَنْتَ!',
      iKnowNumbers: 'أَنَا أَعْرِفُ الأَرْقَام!',
      restartCourse: 'ابدأ الدرس من جديد',
      successCelebration: 'أحسنت! أنا أعرف الأرقام!',
    },

    containers: {
      pencilCaseLabel: 'مِقْلَمَة',
      inPencilCase: (curr, total) => `في المقلمة: ${curr} / ${total}`,
      pencilInstruction: 'ضَعْ ٤ أَقْلَامٍ فِي المِقْلَمَةِ',
      toyBoxLabel: 'صُنْدُوقُ الأَلْعَاب',
      inToyBox: (curr, total) => `في الصندوق: ${curr} / ${total}`,
      blocksInstruction: 'ضَعْ ٣ مُكَعَّبَاتٍ فِي صُنْدُوقِ الأَلْعَابِ',
      parkingLabel: 'مَوْقِفُ السَّيَّارَات',
      inParking: (curr, total) => `في الموقف: ${curr} / ${total}`,
      carsInstruction: 'أَوْقِفْ ٣ سَيَّارَاتٍ فِي المَوْقِفِ',
    },
  },

  en: {
    appTitle: 'World of Numbers',
    courseBadge: 'Numbers 0 to 10',
    scenePrefix: 'Scene',
    ofPrefix: 'of',
    sceneTooltip: 'Scene',
    muteAudio: 'Mute Audio',
    unmuteAudio: 'Unmute Audio',
    fullscreen: 'Fullscreen',

    teacherGuide: 'Teacher Guide',
    btnReset: 'Reset',
    btnPrev: 'Previous',
    btnNext: 'Next',
    btnNextScene: 'Next Scene',
    btnRestart: 'Start Over',

    scenes: [
      {
        title: 'Discover Numbers 1 to 5',
        subtitle: 'Quantity to numeral progression (car, apples, blocks, oranges, balls)',
        teacherPrompt: 'Ask student: Count the items, then look at the number that appears!',
      },
      {
        title: 'Fast Number Recognition',
        subtitle: 'Tap numbers 1 to 5 in order',
        teacherPrompt: 'Say: Tap the numbers in order: 1, then 2, then 3, then 4, then 5!',
      },
      {
        title: 'Oranges in the Basket',
        subtitle: 'Drag 4 oranges into the basket',
        teacherPrompt: 'Say: Drag four oranges and put them into the basket.',
      },
      {
        title: 'Find the Balls',
        subtitle: 'Find 5 balls on the sports pitch',
        teacherPrompt: 'Say: Find the five hidden footballs on the field and tap them!',
      },
      {
        title: 'Number Path',
        subtitle: 'Complete the missing number on the stone path',
        teacherPrompt: 'Say: Drag the missing number 3 to complete the path from 1 to 5.',
      },
      {
        title: 'Matching Challenge',
        subtitle: 'Match the number of cars to the correct numeral',
        teacherPrompt: 'Say: How many cars in the parking? Count them, then choose the matching number.',
      },
      {
        title: 'More or Less?',
        subtitle: 'Compare quantities between groups (apples, pencils, cars)',
        teacherPrompt: 'Say: Which is more? Which is less? Are they equal?',
      },
      {
        title: 'Discover Zero 0',
        subtitle: 'When the plate is completely empty',
        teacherPrompt: 'Say: When no dates remain on the plate, what is the number? It is zero!',
      },
      {
        title: 'I Know the Numbers!',
        subtitle: 'Celebration of completing numbers 0 to 10',
        teacherPrompt: "Celebrate with student: 'I know numbers 0 to 10!'",
      },
    ],

    scene1: {
      instructionCar: 'Count the cars!',
      instructionApples: 'Count the apples!',
      instructionBlocks: 'Count the blocks!',
      instructionOranges: 'Count the oranges!',
      instructionFootballs: 'Count the balls!',
      touchToCount: 'Touch to count!',
      cardRevealPrefix: 'Great! This is number',
      countedOf: (curr, total) => `${curr} / ${total}`,
    },

    scene2: {
      instruction: 'Tap numbers in order: 1 → 5',
      tapNumber: 'Tap number:',
      successOrder: 'Excellent! You finished 1 to 5 in order!',
      tryAgain: 'Try again!',
    },

    scene3: {
      instruction: 'Put 4 oranges in the basket.',
      counterLabel: 'In the basket:',
      successMsg: 'Four oranges in the basket! Well done!',
      inBasket: 'In basket',
      successBasket: 'Four in the basket! Well done!',
    },

    scene4: {
      instruction: 'Find the 5 balls on the field!',
      counterLabel: 'Found balls:',
      hint: 'Tap the hidden balls on the field to count them',
      successMsg: 'You found all 5 balls! Excellent!',
      ballsFound: 'Balls',
      successFound: 'You found five balls! Well done!',
    },

    scene5: {
      instruction: 'Complete the missing number in the path!',
      hint: 'Drag number 3 to its place on the stone',
      targetSlot: 'Place here',
      successMsg: 'The path is complete from 1 to 5! Wonderful!',
      successPath: 'Three! Well done!',
    },

    scene6: {
      instruction: 'Count the cars!',
      hint: 'Tap cars to count them, then choose the matching number',
      countedPrompt: (c) => `${c} cars counted — what is the total number?`,
      successMsg: 'Three cars! Well done champion!',
      carTooltip: 'Tap car to count',
      carsCounted: (c) => `${c} cars counted — what is the total number?`,
      touchCarsPrompt: 'Tap cars to count them, then choose the matching number',
      successCars: 'Three cars! Well done champion!',
    },

    scene7: {
      instructionMore: 'Which is more?',
      instructionLess: 'Which has fewer?',
      instructionEqual: 'Are they equal?',
      areTheyEqual: 'Are they equal?',
      btnYes: 'YES',
      btnNo: 'NO',
      feedbackEqual: 'Equal! ✓',
      equationEqual: '4 = 4',
      whichHasFewer: 'Which has fewer?',
      revealedLess: '3 is less than 6.',
      revealedLessMath: '3 < 6',
      whichHasMore: 'Which is more?',
      revealedMore: '5 is more than 2.',
      revealedMoreMath: '5 > 2',
      badgeMore: 'More!',
      badgeLess: 'Less!',
      badgeEqual: 'Equal: 4 = 4',
      btnEqual: 'Equal!',
      correctMsgMore: 'Correct! 5 is more than 2',
      correctMsgLess: 'Correct! 3 is less than 6',
      correctMsgEqual: 'Excellent! Both quantities are equal: 4 = 4',
      whichIsMore: 'Which is more?',
      whichIsLess: 'Which has fewer?',
      areEqual: 'Are they equal?',
      more: 'MORE',
      less: 'LESS',
      equal: 'Equal! ✓',
      successMore: 'More! Excellent!',
      successLess: '3 is less than 6! Excellent!',
      successEqual: 'Equal! Well done!',
    },

    scene8: {
      instruction: 'Eat the dates to discover the number zero!',
      hint: 'Tap the dates to eat them one by one',
      remaining: (count) => `Remaining: ${count}`,
      plateEmpty: 'The plate is empty! Nothing on the plate',
      zeroLabel: 'Zero',
      allGone: 'Nothing left!',
      empty: 'EMPTY',
      successZero: 'Nothing left! Zero!',
    },

    scene9: {
      title: 'I Know the Numbers!',
      subtitle: 'You completed the numbers 0 to 10 with great success!',
      btnRestart: 'Restart Lesson',
      wellDone: 'WELL DONE!',
      iKnowNumbers: 'I KNOW NUMBERS!',
      restartCourse: 'Restart Course',
      successCelebration: 'Well done! I know the numbers!',
    },

    containers: {
      pencilCaseLabel: 'Pencil Case',
      inPencilCase: (curr, total) => `In the pencil case: ${curr} / ${total}`,
      pencilInstruction: 'Put 4 pencils in the pencil case.',
      toyBoxLabel: 'Toy Box',
      inToyBox: (curr, total) => `In the toy box: ${curr} / ${total}`,
      blocksInstruction: 'Put 3 blocks in the toy box.',
      parkingLabel: 'Parking Bay',
      inParking: (curr, total) => `In the parking: ${curr} / ${total}`,
      carsInstruction: 'Park 3 cars.',
    },
  },

  zh: {
    appTitle: '数字世界',
    courseBadge: '数字 0 到 10',
    scenePrefix: '第',
    ofPrefix: '关，共',
    sceneTooltip: '第',
    muteAudio: '静音',
    unmuteAudio: '开启声音',
    fullscreen: '全屏',

    teacherGuide: '教师指南',
    btnReset: '重试',
    btnPrev: '上一步',
    btnNext: '下一步',
    btnNextScene: '下一场景',
    btnRestart: '重新开始',

    scenes: [
      {
        title: '探索数字 1 到 5',
        subtitle: '从实物数量到数字的认识（小汽车、苹果、积木、橙子、足球）',
        teacherPrompt: '对学生说：数一数这些物品，然后看出现的数字！',
      },
      {
        title: '快速认数字',
        subtitle: '按顺序点击数字 1 到 5',
        teacherPrompt: '对学生说：按顺序点击数字：1，然后 2，3，4，5！',
      },
      {
        title: '把橙子放进篮子',
        subtitle: '把4个橙子放进篮子',
        teacherPrompt: '对学生说：拖动四个橙子放进篮子里。',
      },
      {
        title: '寻找足球',
        subtitle: '在球场上找出 5 个足球',
        teacherPrompt: '对学生说：在球场上找出五个隐藏的足球并点击它们！',
      },
      {
        title: '数字小径',
        subtitle: '在石径上补全缺失的数字',
        teacherPrompt: '对学生说：拖动缺失的数字 3，让路线从 1 到 5 完整。',
      },
      {
        title: '配对挑战',
        subtitle: '将汽车数量与正确数字配对',
        teacherPrompt: '对学生说：停车位里有几辆小汽车？数一数，然后选择对应的数字。',
      },
      {
        title: '多还是少？',
        subtitle: '比较两组物品的数量（苹果、铅笔、小汽车）',
        teacherPrompt: '对学生说：哪边更多？哪边更少？两边一样多吗？',
      },
      {
        title: '认识数字 0',
        subtitle: '当盘子里完全空了的时候',
        teacherPrompt: '对学生说：当盘子里没有椰枣时，是什么数字？是 0！',
      },
      {
        title: '我认识数字啦！',
        subtitle: '顺利完成 0 到 10 的数字探索之旅',
        teacherPrompt: '与学生一起庆祝：“我认识 0 到 10 的数字啦！”',
      },
    ],

    scene1: {
      instructionCar: '数一数小汽车！',
      instructionApples: '数一数苹果！',
      instructionBlocks: '数一数积木！',
      instructionOranges: '数一数橙子！',
      instructionFootballs: '数一数足球！',
      touchToCount: '点击数一数！',
      cardRevealPrefix: '太棒了！这是数字',
      countedOf: (curr, total) => `${curr} / ${total}`,
    },

    scene2: {
      instruction: '按顺序点击数字：1 → 5',
      tapNumber: '点击数字：',
      successOrder: '太棒了！你按顺序完成了 1 到 5！',
      tryAgain: '再试一次！',
    },

    scene3: {
      instruction: '把4个橙子放进篮子。',
      counterLabel: '篮子里：',
      successMsg: '4个橙子都在篮子里啦！真棒！',
      inBasket: '篮子里',
      successBasket: '4个都在篮子里啦！真棒！',
    },

    scene4: {
      instruction: '在球场上找出5个足球！',
      counterLabel: '已找到足球：',
      hint: '点击球场上隐藏的足球来数一数',
      successMsg: '你找到了全部5个足球！太棒了！',
      ballsFound: '足球',
      successFound: '你找到了5个足球！真棒！',
    },

    scene5: {
      instruction: '补全路线中缺失的数字！',
      hint: '将数字 3 拖动到石头上的正确位置',
      targetSlot: '放在这里',
      successMsg: '1 到 5 的路线完整啦！真棒！',
      successPath: '数字 3！真棒！',
    },

    scene6: {
      instruction: '数一数小汽车！',
      hint: '点击小汽车数一数，然后选择匹配的数字',
      countedPrompt: (c) => `已数出 ${c} 辆小汽车 — 一共有多少辆？`,
      successMsg: '3辆小汽车！太棒了小冠军！',
      carTooltip: '点击汽车数一数',
      carsCounted: (c) => `已数出 ${c} 辆小汽车 — 一共有多少辆？`,
      touchCarsPrompt: '点击小汽车数一数，然后选择匹配的数字',
      successCars: '3辆小汽车！太棒了小冠军！',
    },

    scene7: {
      instructionMore: '哪一组更多？',
      instructionLess: '哪一组更少？',
      instructionEqual: '它们一样多吗？',
      areTheyEqual: '它们一样多吗？',
      btnYes: '是',
      btnNo: '不是',
      feedbackEqual: '一样多！✓',
      equationEqual: '4 = 4',
      whichHasFewer: '哪一组更少？',
      revealedLess: '3比6少。',
      revealedLessMath: '3 < 6',
      whichHasMore: '哪一组更多？',
      revealedMore: '5比2多。',
      revealedMoreMath: '5 > 2',
      badgeMore: '更多！',
      badgeLess: '更少！',
      badgeEqual: '一样多：4 = 4',
      btnEqual: '一样多！',
      correctMsgMore: '答对啦！5 比 2 多',
      correctMsgLess: '答对啦！3 比 6 少',
      correctMsgEqual: '太棒了！两边一样多：4 = 4',
      whichIsMore: '哪一组更多？',
      whichIsLess: '哪一组更少？',
      areEqual: '它们一样多吗？',
      more: '更多',
      less: '更少',
      equal: '一样多！✓',
      successMore: '更多！太棒了！',
      successLess: '3比6少！太棒了！',
      successEqual: '一样多！真棒！',
    },

    scene8: {
      instruction: '吃掉椰枣，发现数字 0！',
      hint: '点击椰枣，一个一个吃掉它们',
      remaining: (count) => `剩余：${count}`,
      plateEmpty: '盘子空了！盘子里什么都没有了',
      zeroLabel: '零',
      allGone: '什么都没有啦！',
      empty: '空',
      successZero: '没有啦！数字 0！',
    },

    scene9: {
      title: '我认识数字啦！',
      subtitle: '你非常出色地完成了 0 到 10 的数字之旅！',
      btnRestart: '重新开始课程',
      wellDone: '太棒了！',
      iKnowNumbers: '我认识数字啦！',
      restartCourse: '重新开始课程',
      successCelebration: '太棒了！我认识数字啦！',
    },

    containers: {
      pencilCaseLabel: '铅笔盒',
      inPencilCase: (curr, total) => `铅笔盒里：${curr} / ${total}`,
      pencilInstruction: '把4支铅笔放进铅笔盒。',
      toyBoxLabel: '玩具箱',
      inToyBox: (curr, total) => `玩具箱里：${curr} / ${total}`,
      blocksInstruction: '把3块积木放进玩具箱。',
      parkingLabel: '停车场',
      inParking: (curr, total) => `停车场里：${curr} / ${total}`,
      carsInstruction: '把3辆小汽车停进停车位。',
    },
  },
};
