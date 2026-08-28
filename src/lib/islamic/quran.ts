/**
 * A small set of well-known ayahs relevant to pilgrims (patience, trust in
 * Allah, Hajj/Umrah). Standard reference-style translation, not a
 * specific published translation verbatim — verify against a Mushaf/
 * published translation (e.g. Sahih International) before print use.
 */
export interface QuranVerse {
  arabic: string;
  translation: string;
  reference: string;
}

export const verses: QuranVerse[] = [
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "So, surely with hardship comes ease.",
    reference: "Qur'an 94:5",
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translation: "And whoever relies upon Allah — then He is sufficient for him.",
    reference: "Qur'an 65:3",
  },
  {
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    translation: "Allah does not burden a soul beyond what it can bear.",
    reference: "Qur'an 2:286",
  },
  {
    arabic: "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ",
    translation: "And complete the Hajj and Umrah for Allah.",
    reference: "Qur'an 2:196",
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    reference: "Qur'an 94:6",
  },
  {
    arabic: "وَبَشِّرِ الصَّابِرِينَ",
    translation: "And give good tidings to the patient.",
    reference: "Qur'an 2:155",
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Indeed, Allah is with the patient.",
    reference: "Qur'an 2:153",
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    translation: "And say: My Lord, increase me in knowledge.",
    reference: "Qur'an 20:114",
  },
];

export function verseOfTheDay(date: Date = new Date()): QuranVerse {
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      86_400_000,
  );
  return verses[dayOfYear % verses.length];
}
