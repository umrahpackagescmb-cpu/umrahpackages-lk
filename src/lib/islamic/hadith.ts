/**
 * Widely-cited, uncontested hadith only — commonly-used English renderings
 * with their standard collection reference. Verify wording against a
 * primary translation (e.g. sunnah.com) before print use.
 */
export interface Hadith {
  text: string;
  source: string;
}

export const hadiths: Hadith[] = [
  { text: "Actions are judged by intentions, and every person will get what they intended.", source: "Sahih al-Bukhari & Sahih Muslim" },
  { text: "None of you truly believes until he loves for his brother what he loves for himself.", source: "Sahih al-Bukhari & Sahih Muslim" },
  { text: "The best among you are those who learn the Qur'an and teach it.", source: "Sahih al-Bukhari" },
  { text: "Whoever believes in Allah and the Last Day should speak good or remain silent.", source: "Sahih al-Bukhari & Sahih Muslim" },
  { text: "The strong person is not the one who overcomes people through his strength, but the one who controls himself while in anger.", source: "Sahih al-Bukhari & Sahih Muslim" },
  { text: "Whoever performs Hajj for the sake of Allah and does not commit any obscenity or transgression will return as pure of sin as the day his mother bore him.", source: "Sahih al-Bukhari" },
  { text: "The believer's shade on the Day of Resurrection will be his charity.", source: "Sunan al-Tirmidhi" },
  { text: "Make things easy and do not make them difficult; cheer people up and do not repel them.", source: "Sahih al-Bukhari" },
  { text: "The most beloved of deeds to Allah are those that are most consistent, even if small.", source: "Sahih al-Bukhari & Sahih Muslim" },
  { text: "Whoever removes a hardship from a believer in this world, Allah will remove from him a hardship on the Day of Resurrection.", source: "Sahih Muslim" },
  { text: "The Umrah to the next Umrah is an expiation for what is between them, and the reward of an accepted Hajj is nothing but Paradise.", source: "Sahih al-Bukhari & Sahih Muslim" },
  { text: "Cleanliness is half of faith.", source: "Sahih Muslim" },
];

export function hadithOfTheDay(date: Date = new Date()): Hadith {
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      86_400_000,
  );
  return hadiths[dayOfYear % hadiths.length];
}
