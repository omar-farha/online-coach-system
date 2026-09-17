/**
 * Temporary stock fitness photography (Pexels, free to use) shown until the
 * Coach uploads real branding/media. Swap any of these for real image URLs
 * or Supabase Storage URLs — every consumer just reads from this map.
 */
function pexels(id: string, w = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const STOCK_IMAGES = {
  heroAthlete: pexels("2261477", 1400),
  heroBackdrop: pexels("1552242", 1920),
  aboutCoach: pexels("6111616", 1200),
  weightPlates: pexels("1954524", 1200),
  gymInterior: pexels("2247179", 1920),
  training1: pexels("1229356", 1200),
  training2: pexels("2261485", 1200),
  training3: pexels("3768916", 1200),
  training4: pexels("2827392", 1200),
  womanTraining1: pexels("3837781", 1200),
  womanTraining2: pexels("4162451", 1200),
  womanTraining3: pexels("4162487", 1200),
  womanTraining4: pexels("4162438", 1200),
  dumbbells: pexels("1954528", 1200),
  barbellClose: pexels("1638324", 1200),
  gymEquipment: pexels("1552252", 1200),
  gymBench: pexels("1552249", 1200),
  boxing: pexels("2827392", 1200),
  stretching: pexels("3838388", 1200),
  clientPortalHero: pexels("6455870", 1600),
  testimonial1: pexels("3838389", 400),
  testimonial2: pexels("1547248", 400),
  testimonial3: pexels("949128", 400),
} as const;

export type StockImageKey = keyof typeof STOCK_IMAGES;
