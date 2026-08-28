/**
 * A small, carefully-scoped set of widely-known duas. Kept short and to
 * only the most famous/uncontested ones — verify Arabic diacritics against
 * a printed Mushaf/dua book before relying on this for print materials.
 */
export interface Dua {
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  occasion: string;
}

export const duas: Dua[] = [
  {
    title: "Dua for Travel",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
    translation:
      "Glory to Him who has subjected this to us, and we could never have it (by our efforts). And verily, to Our Lord we are returning.",
    occasion: "When setting out on a journey (Qur'an 43:13–14)",
  },
  {
    title: "Dua for Ease",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alul-hazna idha shi'ta sahla.",
    translation:
      "O Allah, there is no ease except in that which You have made easy, and You make the difficult easy if You will.",
    occasion: "When facing something difficult",
  },
  {
    title: "Dua Rabbana Atina",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    translation:
      "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    occasion: "General supplication (Qur'an 2:201)",
  },
  {
    title: "Dua for Entering the Masjid",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahumma-ftah li abwaba rahmatik.",
    translation: "O Allah, open the gates of Your mercy for me.",
    occasion: "When entering a mosque",
  },
  {
    title: "Dua for Forgiveness",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbi-ghfir li wa tub 'alayya innaka Antat-Tawwabur-Rahim.",
    translation: "My Lord, forgive me and accept my repentance; You are the Ever-Relenting, the Most Merciful.",
    occasion: "Seeking forgiveness",
  },
  {
    title: "Dua for Parents",
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi-rhamhuma kama rabbayani saghira.",
    translation: "My Lord, have mercy upon them as they raised me when I was small.",
    occasion: "General supplication (Qur'an 17:24)",
  },
  {
    title: "Dua When Breaking Fast",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahabaz-zama'u wabtallatil-'uruqu wa thabatal-ajru in sha'Allah.",
    translation: "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
    occasion: "At iftar (breaking the fast)",
  },
  {
    title: "Dua for Knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma.",
    translation: "My Lord, increase me in knowledge.",
    occasion: "General supplication (Qur'an 20:114)",
  },
];

export function duaOfTheDay(date: Date = new Date()): Dua {
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      86_400_000,
  );
  return duas[dayOfYear % duas.length];
}
