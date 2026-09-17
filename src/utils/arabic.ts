export const EASTERN_ARABIC_DIGITS: string[] = [
  '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'
];

export const ARABIC_NUMBER_NAMES: string[] = [
  'صِفْر',
  'وَاحِد',
  'اثْنَان',
  'ثَلَاثَة',
  'أَرْبَعَة',
  'خَمْسَة',
  'سِتَّة',
  'سَبْعَة',
  'ثَمَانِيَة',
  'تِسْعَة',
  'عَشَرَة'
];

export function toEasternArabic(num: number): string {
  if (num === 10) return '١٠';
  if (num >= 0 && num <= 9) return EASTERN_ARABIC_DIGITS[num];
  return String(num).replace(/\d/g, (d) => EASTERN_ARABIC_DIGITS[parseInt(d, 10)]);
}

export function getArabicNumberName(num: number): string {
  if (num >= 0 && num <= 10) return ARABIC_NUMBER_NAMES[num];
  return toEasternArabic(num);
}
