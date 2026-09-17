import React, { useState } from 'react';
import { LessonCanvas } from './components/common/LessonCanvas';
import { HeaderBar } from './components/common/HeaderBar';
import { TeacherBar } from './components/common/TeacherBar';
import { Scene1Discover1to5 } from './components/scenes/Scene1Discover1to5';
import { Scene2FastRecognition } from './components/scenes/Scene2FastRecognition';
import { Scene3BasketDrag } from './components/scenes/Scene3BasketDrag';
import { Scene4HiddenFootballs } from './components/scenes/Scene4HiddenFootballs';
import { Scene5NumberPath } from './components/scenes/Scene5NumberPath';
import { Scene6MatchingChallenge } from './components/scenes/Scene6MatchingChallenge';
import { Scene7PlateComparison } from './components/scenes/Scene7PlateComparison';
import { Scene8DiscoverZero } from './components/scenes/Scene8DiscoverZero';
import { Scene9Celebration } from './components/scenes/Scene9Celebration';
import { OptionalPracticeScene } from './components/scenes/OptionalPracticeScene';
import { BonusChallengeScene } from './components/scenes/BonusChallengeScene';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SceneMeta } from './types';
import { OPTIONAL_PRACTICE } from './utils/optionalPractice';
import { BONUS_CHALLENGE } from './utils/bonusChallenge';

const SCENES_DATA: SceneMeta[] = [
  {
    id: 1,
    title: 'استكشاف الأعداد ١ إلى ٥',
    subtitle: 'الكمية إلى الرقم تدريجياً (سيارة، تفاح، مكعبات، برتقال، كرات)',
    totalStages: 5,
    teacherPrompt: 'قل للطالب: عُدّ الأشياء الجميلة، ثم انظر إلى الرقم الذي يظهر!',
  },
  {
    id: 2,
    title: 'تعرّف سريع على الأرقام',
    subtitle: 'المس الأرقام من ١ إلى ٥ بالترتيب',
    totalStages: 1,
    teacherPrompt: 'قل: المس الأرقام بالترتيب: ١ ثم ٢ ثم ٣ ثم ٤ ثم ٥!',
  },
  {
    id: 3,
    title: 'البرتقال في السلة',
    subtitle: 'اسحب ٤ برتقالات إلى السلة',
    totalStages: 1,
    teacherPrompt: 'قل: اسحب أربع برتقالات وضعها داخل السلة.',
  },
  {
    id: 4,
    title: 'البحث عن الكرات',
    subtitle: 'جِد ٥ كرات في ساحة الملعب',
    totalStages: 1,
    teacherPrompt: 'قل: ابحث عن الكرات الخمس المختبئة في الملعب والمسها!',
  },
  {
    id: 5,
    title: 'مسار الأرقام',
    subtitle: 'أكمل الرقم الناقص في مسار الأحجار',
    totalStages: 1,
    teacherPrompt: 'قل: اسحب الرقم الناقص ٣ ليصبح المسار مكتملاً من ١ إلى ٥.',
  },
  {
    id: 6,
    title: 'تحدي المطابقة',
    subtitle: 'طابق عدد السيارات بالرقم الصحيح',
    totalStages: 1,
    teacherPrompt: 'قل: كم سيارة في الموقف؟ عُدّها ثم اختر الرقم المطابق.',
  },
  {
    id: 7,
    title: 'أكثر أم أقل؟',
    subtitle: 'مقارنة الكميات بين المجموعات (تفاح، أقلام، سيارات)',
    totalStages: 3,
    teacherPrompt: 'قل: أيهما أكثر؟ أيهما أقل؟ هل هما متساويان؟',
  },
  {
    id: 8,
    title: 'اكتشاف الصفر ٠',
    subtitle: 'عندما يفرغ الصحن تماماً',
    totalStages: 1,
    teacherPrompt: 'قل: عندما لا يبقى أي تمر على الصحن، ما هو الرقم؟ إنه الصفر!',
  },
  {
    id: 9,
    title: 'أنا أعرف الأرقام!',
    subtitle: 'احتفال بإتمام رحلة الأعداد من ٠ إلى ١٠',
    totalStages: 1,
    teacherPrompt: 'احتفل مع الطالب: «أنا أعرف الأرقام من ٠ إلى ١٠!»',
  },
  {
    id: 10,
    title: 'العد السريع',
    subtitle: 'عُدَّ التفاح واختر الرقم الصحيح.',
    totalStages: 1,
    teacherPrompt: 'قل: عُدَّ الأشياء واحدةً واحدة، ثم اختر الرقم الصحيح.',
  },
  {
    id: 11,
    title: 'أيهما أكثر؟',
    subtitle: 'قارن بين مجموعتين من التفاح.',
    totalStages: 1,
    teacherPrompt: 'قل: عُدَّ المجموعتين، ثم اختر المجموعة التي فيها أشياء أكثر.',
  },
  {
    id: 12,
    title: 'أيهما أقل؟',
    subtitle: 'قارن بين مجموعتين من كرات القدم.',
    totalStages: 1,
    teacherPrompt: 'قل: عُدَّ المجموعتين، ثم اختر المجموعة التي فيها أشياء أقل.',
  },
  {
    id: 13,
    title: 'متساويان أم لا؟',
    subtitle: 'قارن بين مجموعتين من المكعبات.',
    totalStages: 1,
    teacherPrompt: 'قل: عُدَّ المجموعتين. هل العددان متساويان؟',
  },
  {
    id: 14,
    title: 'التحدي المختلط',
    subtitle: 'عُدَّ، ثم قارن، ثم أوجد الفرق.',
    totalStages: 2,
    teacherPrompt: 'قل: عُدَّ أولًا، ثم قارن بين العددين.',
  },
  ...BONUS_CHALLENGE.ar.scenes.map((scene, index) => ({
    id: index + 15,
    title: scene.title,
    subtitle: scene.subtitle,
    totalStages: 1,
    teacherPrompt: BONUS_CHALLENGE.ar.teacherPrompt,
  })),
];

function LessonApp() {
  const { t, formatNum, language } = useLanguage();
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [subStage, setSubStage] = useState<number>(0);
  const [isSceneCompleted, setIsSceneCompleted] = useState<boolean>(false);
  const [optionalResetVersion, setOptionalResetVersion] = useState<number>(0);

  const baseMeta = SCENES_DATA[currentScene - 1];
  const localizedScene = currentScene <= 9
    ? t.scenes[currentScene - 1]
    : currentScene <= 14
    ? OPTIONAL_PRACTICE[language].scenes[currentScene - 10]
    : {
        ...BONUS_CHALLENGE[language].scenes[currentScene - 15],
        teacherPrompt: BONUS_CHALLENGE[language].teacherPrompt,
      };
  const activeMeta = {
    ...baseMeta,
    title: localizedScene?.title || baseMeta.title,
    subtitle: localizedScene?.subtitle || baseMeta.subtitle,
    teacherPrompt: localizedScene?.teacherPrompt || baseMeta.teacherPrompt,
  };

  const handleNext = () => {
    setIsSceneCompleted(false);

    // If active scene has multiple stages, advance internal sub-stage
    if (subStage < activeMeta.totalStages - 1) {
      setSubStage((prev) => prev + 1);
    } else {
      // Advance to next scene
      if (currentScene < SCENES_DATA.length) {
        setCurrentScene((prev) => prev + 1);
        setSubStage(0);
      } else {
        setCurrentScene(1);
        setSubStage(0);
      }
    }
  };

  const handlePrev = () => {
    setIsSceneCompleted(false);
    if (subStage > 0) {
      setSubStage((prev) => prev - 1);
    } else if (currentScene > 1) {
      const prevMeta = SCENES_DATA[currentScene - 2];
      setCurrentScene((prev) => prev - 1);
      setSubStage(prevMeta.totalStages - 1);
    }
  };

  const handleReset = () => {
    setSubStage(0);
    setIsSceneCompleted(false);
    if (currentScene >= 10) setOptionalResetVersion((prev) => prev + 1);
  };

  const handleSelectScene = (sceneNum: number) => {
    setCurrentScene(sceneNum);
    setSubStage(0);
    setIsSceneCompleted(false);
  };

  const handleTaskComplete = () => {
    setIsSceneCompleted(true);
  };

  return (
    <LessonCanvas>
      {/* 1. Fixed Top Header & Progress */}
      <HeaderBar
        currentScene={currentScene}
        totalScenes={SCENES_DATA.length}
        onSelectScene={handleSelectScene}
        sceneTitle={activeMeta.title}
        optionalStartScene={10}
      />

      {/* 2. Main Interactive Learning Canvas (Center 65%) */}
      <main className="relative flex-1 w-full overflow-hidden flex flex-col items-center justify-center">
        {currentScene === 1 && (
          <Scene1Discover1to5
            stage={subStage}
            setStage={setSubStage}
            onComplete={handleTaskComplete}
          />
        )}

        {currentScene === 2 && (
          <Scene2FastRecognition onComplete={handleTaskComplete} />
        )}

        {currentScene === 3 && (
          <Scene3BasketDrag onComplete={handleTaskComplete} />
        )}

        {currentScene === 4 && (
          <Scene4HiddenFootballs onComplete={handleTaskComplete} />
        )}

        {currentScene === 5 && (
          <Scene5NumberPath onComplete={handleTaskComplete} />
        )}

        {currentScene === 6 && (
          <Scene6MatchingChallenge onComplete={handleTaskComplete} />
        )}

        {currentScene === 7 && (
          <Scene7PlateComparison
            stage={subStage}
            setStage={setSubStage}
            onComplete={handleTaskComplete}
          />
        )}

        {currentScene === 8 && (
          <Scene8DiscoverZero onComplete={handleTaskComplete} />
        )}

        {currentScene === 9 && (
          <Scene9Celebration onRestart={() => handleSelectScene(1)} />
        )}

        {currentScene >= 10 && currentScene <= 14 && (
          <OptionalPracticeScene
            key={`${currentScene}-${subStage}-${optionalResetVersion}`}
            scene={currentScene as 10 | 11 | 12 | 13 | 14}
            stage={subStage}
            onComplete={handleTaskComplete}
          />
        )}

        {currentScene >= 15 && currentScene <= 18 && (
          <BonusChallengeScene
            key={`${currentScene}-${optionalResetVersion}`}
            scene={currentScene as 15 | 16 | 17 | 18}
            onComplete={handleTaskComplete}
          />
        )}
      </main>

      {/* 3. Stable Bottom Teacher Control Bar */}
      <TeacherBar
        onNext={handleNext}
        onPrev={currentScene > 1 || subStage > 0 ? handlePrev : undefined}
        onReset={handleReset}
        isCompleted={isSceneCompleted}
        teacherPrompt={activeMeta.teacherPrompt}
        stageInfo={
          activeMeta.totalStages > 1
            ? `${formatNum(subStage + 1)} / ${formatNum(activeMeta.totalStages)}`
            : undefined
        }
        nextLabel={
          subStage < activeMeta.totalStages - 1
            ? t.btnNext
            : currentScene === SCENES_DATA.length
            ? t.btnRestart
            : t.btnNextScene
        }
      />
    </LessonCanvas>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <LessonApp />
    </LanguageProvider>
  );
}
