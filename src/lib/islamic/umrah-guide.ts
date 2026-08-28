/**
 * Step-by-step Umrah ritual guide content.
 *
 * This describes the general sequence of Umrah rites the way the large
 * majority of pilgrims are taught and practice them. A handful of details
 * (e.g. exact wording of intention, whether to jog between the Safa/Marwah
 * markers) have minor differences of opinion between schools of thought —
 * where that's the case we keep the description general rather than picking
 * a side. For a specific fiqh question, pilgrims should ask their group's
 * Maulavi/scholar — see the Maulavi Directory link on the guide page.
 *
 * Arabic text below is limited to a small set of extremely well-known,
 * uncontested phrases (Talbiyah, the Umrah intention, and two widely-cited
 * duas). As with the rest of the site's dua content, verify diacritics
 * against a printed source before using this for print materials.
 */

/**
 * Supported guide languages. "en" is the canonical, primary-maintained
 * source of truth (this file). "ta" and "si" are good-faith translations
 * in src/lib/islamic/umrah-guide-translations.ts — not yet reviewed by a
 * native speaker or scholar; the guide UI shows a notice whenever one of
 * them is selected.
 */
export type GuideLocale = "en" | "ta" | "si";

export interface GuideDua {
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface GuideStep {
  id: string;
  order: number;
  title: string;
  shortLabel: string;
  summary: string;
  details: string[];
  dua?: GuideDua;
  tip?: string;
}

export const umrahGuideSteps: GuideStep[] = [
  {
    id: "preparation",
    order: 1,
    title: "Before Ihram: Preparation",
    shortLabel: "Preparation",
    summary: "Ghusl, grooming, and getting dressed before you enter the sacred state of Ihram.",
    details: [
      "Take a full bath (ghusl) if you're able to — this is sunnah before entering Ihram, even outside of the days you'd normally need one.",
      "Trim your nails and remove underarm and other body hair beforehand, since you won't be able to once you're in Ihram.",
      "Men may apply non-alcohol-based perfume to the body (not to the Ihram cloth itself) before entering Ihram — this is allowed even though wearing perfume during Ihram itself is not.",
      "Men wear the two unstitched white Ihram sheets (an izar for the lower body, a rida draped over the shoulders) and simple sandals that leave the top of the foot uncovered.",
      "Women wear their normal modest, loose-fitting clothing in any colour — Ihram does not require white for women. The face and hands stay uncovered; a headscarf is worn as usual, but a niqab and gloves are not worn during Ihram.",
      "All of this is normally done before or at the Miqat — the boundary point set for your route into Makkah. Most package flights and airport procedures are timed around this, so follow your agency's briefing on when to change.",
    ],
    tip: "Ask your agency exactly when your flight or route reaches the Miqat — for many Sri Lankan pilgrims this is announced on the plane before landing in Jeddah or Madinah.",
  },
  {
    id: "niyyah",
    order: 2,
    title: "Niyyah & Talbiyah",
    shortLabel: "Intention",
    summary: "Make your intention for Umrah at the Miqat, then recite the Talbiyah until you begin Tawaf.",
    details: [
      "At the Miqat, make your intention (niyyah) specifically for Umrah. The intention is primarily in the heart — saying it aloud is a common practice to help focus it, not a requirement.",
      "From this moment, you are in the sacred state of Ihram and its restrictions apply: no cutting hair or nails, no perfume, no marital relations, no hunting, and — for men — no stitched clothing or covering the head.",
      "Recite the Talbiyah frequently from this point — many pilgrims repeat it during the whole journey into Makkah — and continue until you begin Tawaf.",
    ],
    dua: {
      arabic: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
      transliteration: "Labbayka Allahumma 'Umrah.",
      translation: "Here I am, O Allah, [in response to Your call], performing Umrah.",
    },
    tip: "The Talbiyah below is the main one to memorize — you'll say it over and over from here until Tawaf begins.",
  },
  {
    id: "talbiyah",
    order: 3,
    title: "The Talbiyah",
    shortLabel: "Talbiyah",
    summary: "The core recitation of Ihram — repeated often on the way to Masjid al-Haram.",
    details: [
      "There's no fixed count — recite it as often as you comfortably can, especially when your surroundings change (boarding transport, seeing the Haram for the first time, joining a crowd).",
      "Men are encouraged to say it audibly; women recite it quietly enough for those beside them to hear, without raising their voice.",
      "Keep reciting it right up until you're about to start your first circuit of Tawaf.",
    ],
    dua: {
      arabic:
        "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
      transliteration:
        "Labbayk Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.",
      translation:
        "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner.",
    },
  },
  {
    id: "enter-masjid",
    order: 4,
    title: "Enter Masjid al-Haram",
    shortLabel: "Enter the Haram",
    summary: "Step in with your right foot and make the dua for entering a mosque.",
    details: [
      "Enter with your right foot first, as with any mosque, and lower your gaze and voice out of respect for those around you.",
      "Any gate into Masjid al-Haram is valid — with the scale of crowds today, follow the signage and staff directing your entry point rather than trying to reach a specific gate.",
      "Once inside and the Kaaba comes into view, many pilgrims pause for a moment of quiet dua before moving toward the Tawaf area.",
    ],
    dua: {
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      transliteration: "Allahumma-ftah li abwaba rahmatik.",
      translation: "O Allah, open the gates of Your mercy for me.",
    },
  },
  {
    id: "tawaf",
    order: 5,
    title: "Tawaf — Seven Circuits of the Kaaba",
    shortLabel: "Tawaf",
    summary: "Circle the Kaaba seven times, keeping it on your left, starting and ending at the Black Stone corner.",
    details: [
      "Begin level with the Black Stone (Hajar al-Aswad). If you can reach it safely, touch or kiss it; if not — which is normal given the crowds — simply face it, raise your hand toward it, and say 'Bismillahi Allahu Akbar.' Never push or endanger yourself or others to reach it.",
      "Walk seven full circuits, keeping the Kaaba on your left the whole time, ending back at the Black Stone corner after each circuit.",
      "Men perform Idtiba for the whole of Tawaf — passing the rida (upper Ihram cloth) under the right arm and over the left shoulder, leaving the right shoulder bare.",
      "Men also perform Ramal — brisk, short steps — for the first three circuits only, if it's safe and not overly crowded to do so; the remaining four circuits are walked normally. Women do not perform Ramal.",
      "There's no single fixed dua for each circuit — recite Qur'an, dhikr, or personal dua freely. Many pilgrims recite the dua below between the Yemeni Corner and the Black Stone on every circuit.",
    ],
    dua: {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
      translation: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    },
    tip: "If the mataf (Tawaf area) around the Kaaba is extremely crowded, it's completely valid to do your seven circuits from an upper floor — the ruling follows the circuit count, not the floor.",
  },
  {
    id: "maqam-ibrahim",
    order: 6,
    title: "Two Rak'ahs at Maqam Ibrahim",
    shortLabel: "Prayer",
    summary: "After Tawaf, cover your right shoulder again and pray two short rak'ahs.",
    details: [
      "As soon as you finish your seventh circuit, men should end Idtiba by covering the right shoulder again with the rida.",
      "Try to pray two rak'ahs behind or near Maqam Ibrahim if the crowd allows it — but if it's too packed to get close, any spot in Masjid al-Haram is valid for this prayer.",
      "A short recitation is enough; this isn't a lengthy prayer, and pilgrims commonly recite Surah Al-Kafirun in the first rak'ah and Surah Al-Ikhlas in the second, though any surah is fine.",
    ],
  },
  {
    id: "zamzam",
    order: 7,
    title: "Drink Zamzam Water",
    shortLabel: "Zamzam",
    summary: "Drink Zamzam water, ideally facing the Kaaba, and make dua as you drink.",
    details: [
      "Zamzam water is available throughout Masjid al-Haram from coolers and taps — drink as much as you comfortably want.",
      "It's recommended to face the Qibla while drinking and to make sincere personal dua, as this is considered a time when supplication is especially encouraged.",
      "There's no obligation attached to this step for the validity of your Umrah — it's a recommended practice, not a required ritual, so don't worry if the area is too crowded to reach right away.",
    ],
  },
  {
    id: "sai",
    order: 8,
    title: "Sa'i — Seven Trips Between Safa and Marwah",
    shortLabel: "Sa'i",
    summary: "Walk between the hills of Safa and Marwah seven times, starting at Safa and ending at Marwah.",
    details: [
      "Head to the Safa gate/area to begin. Facing the Kaaba, it's customary to recite takbir and a dua before setting off toward Marwah.",
      "Walking from Safa to Marwah counts as one trip, and Marwah back to Safa counts as the next — seven trips in total, finishing at Marwah (not back at Safa).",
      "Men jog or walk briskly for the short stretch between the two green markers along the path, where it's safe and uncrowded to do so; the rest of the walk is at a normal pace. Women walk the entire distance at a normal pace throughout.",
      "As with Tawaf, there's no single fixed dua — recite Qur'an, dhikr, or your own supplications freely between the two hills.",
    ],
    tip: "The Safa-Marwah gallery is fully air-conditioned and covered, with wheelchair lanes down the centre — a relatively easier stretch of the journey physically compared to Tawaf.",
  },
  {
    id: "halq-taqsir",
    order: 9,
    title: "Halq or Taqsir — Completing Umrah",
    shortLabel: "Halq/Taqsir",
    summary: "Shave or trim your hair to formally exit Ihram — this is the final step of Umrah.",
    details: [
      "Men choose between Halq (shaving the head completely) or Taqsir (trimming hair evenly all over the head to roughly a fingertip's length). Halq is considered more virtuous, but either is valid.",
      "Women trim a small amount — about a fingertip's length — from the ends of their hair. Women do not shave their heads.",
      "Licensed barbers are available right around Masjid al-Haram for men who want Halq or Taqsir done on the spot; women typically do this themselves or with a family member, in private.",
      "Once this is done, all Ihram restrictions are lifted — your Umrah is complete. It's customary to thank Allah and make dua that your Umrah is accepted.",
    ],
    tip: "If you're continuing straight into Hajj or performing another Umrah later in the same trip, ask your Maulavi/group leader how this affects your Ihram timing before you cut your hair.",
  },
];

export function totalSteps(): number {
  return umrahGuideSteps.length;
}
