/**
 * Egyptian Arabic labels for ExerciseDB's fixed body part / target muscle /
 * equipment vocabulary, used only for the picker's filter chips — exercise
 * names themselves stay in English (universal gym terminology), consistent
 * with the "don't auto-translate 3rd-party data" rule, but this taxonomy is
 * small and fixed enough to hand-translate for a much better Arabic UX.
 */
const TERMS_AR: Record<string, string> = {
  // body parts
  back: "الظهر",
  cardio: "كارديو",
  chest: "الصدر",
  "lower arms": "أسفل الدراع",
  "lower legs": "أسفل الرجل",
  neck: "الرقبة",
  shoulders: "الأكتاف",
  "upper arms": "الدراعين",
  "upper legs": "الرجلين",
  waist: "البطن",

  // targets / muscles
  abductors: "عضلات الفخذ الخارجية",
  abs: "البطن",
  adductors: "عضلات الفخذ الداخلية",
  biceps: "البايسبس",
  calves: "السمانة",
  "cardiovascular system": "الجهاز الدوري",
  delts: "الأكتاف",
  forearms: "الساعد",
  glutes: "عضلات المؤخرة",
  hamstrings: "خلف الفخذ",
  lats: "عضلات الظهر الجانبية",
  "levator scapulae": "عضلة الكتف الرافعة",
  pectorals: "الصدر",
  quads: "مقدمة الفخذ",
  "serratus anterior": "عضلات الصدر الجانبية",
  spine: "العمود الفقري",
  traps: "الترابيس",
  triceps: "التراي سيبس",
  "upper back": "أعلى الظهر",

  // equipment
  assisted: "بمساعدة",
  band: "حبل مطاطي",
  barbell: "بار",
  "body weight": "وزن الجسم",
  "bosu ball": "كورة بوسو",
  cable: "كابل",
  dumbbell: "دمبل",
  "elliptical machine": "جهاز إليبتيكال",
  "ez barbell": "بار EZ",
  hammer: "هامر",
  kettlebell: "كيتل بيل",
  "leverage machine": "جهاز رافعة",
  machine: "جهاز",
  "medicine ball": "كورة طبية",
  "olympic barbell": "بار أوليمبي",
  "resistance band": "حبل مقاومة",
  roller: "رولر",
  rope: "حبل",
  "skierg machine": "جهاز سكي إرج",
  "sled machine": "جهاز سليد",
  "smith machine": "جهاز سميث",
  "stability ball": "كورة توازن",
  "stationary bike": "عجلة ثابتة",
  "stepmill machine": "جهاز ستيب ميل",
  tire: "كاوتش",
  "trap bar": "بار تراب",
  "upper body ergometer": "جهاز أرجومتر",
  weighted: "بأوزان",
  "wheel roller": "عجلة تمرين",
};

export function translateExerciseTerm(term: string, locale: "en" | "ar"): string {
  if (locale !== "ar") return term;
  return TERMS_AR[term.toLowerCase()] ?? term;
}
