export type ZiyarahRegion = "makkah" | "madinah";

export interface ZiyarahSite {
  id: string;
  name: string;
  arabicOrAltName?: string;
  region: ZiyarahRegion;
  summary: string;
  description: string;
}

/**
 * Well-known historical/religious sites pilgrims commonly visit on an
 * optional Ziyarah (visit) tour around Makkah and Madinah. This is
 * well-established, widely published information — kept to mainstream,
 * non-disputed historical framing, with "traditionally understood" /
 * "commonly associated with" phrasing where a claim is a matter of
 * historical tradition rather than a bare fact. No specific current entry
 * fees, opening hours, or tour prices are included, since these are set by
 * local authorities and tour operators and change over time.
 */
export const ziyarahSites: ZiyarahSite[] = [
  {
    id: "jabal-al-nour",
    name: "Jabal al-Nour",
    arabicOrAltName: "Mount of Light — Cave of Hira",
    region: "makkah",
    summary: "The mountain holding the Cave of Hira, traditionally understood as the site of the first revelation.",
    description:
      "Jabal al-Nour (\"Mountain of Light\") rises on the outskirts of Makkah and is home to the Cave of Hira, a small cave near its summit. It is traditionally understood to be where the Prophet Muhammad (peace be upon him) received the first revelation of the Quran. Reaching the cave involves a steep climb of roughly two hours up a rocky trail, so it is a physically demanding stop reserved for pilgrims who are fit enough to make the ascent.",
  },
  {
    id: "jabal-thawr",
    name: "Jabal Thawr",
    arabicOrAltName: "Cave of Thawr",
    region: "makkah",
    summary: "A mountain south of Makkah whose cave is associated with the Hijrah (migration) narrative.",
    description:
      "Jabal Thawr sits south of the Haram and contains the Cave of Thawr, commonly associated with the account of the Prophet Muhammad (peace be upon him) and Abu Bakr (may Allah be pleased with him) sheltering there for three nights during the migration (Hijrah) from Makkah to Madinah. The climb is even steeper and longer than Jabal al-Nour's, and many tour groups view the mountain from a distance rather than making the ascent.",
  },
  {
    id: "mina-arafat-muzdalifah",
    name: "Mina, Arafat & Muzdalifah",
    region: "makkah",
    summary: "The plains east of Makkah central to the Hajj rites, often included on a general Ziyarah tour.",
    description:
      "Mina, Arafat, and Muzdalifah are the three areas east of Makkah where the core rites of Hajj take place each year — the standing (Wuquf) at Arafat, the overnight stay at Muzdalifah, and the days spent at Mina. These sites are primarily significant during the Hajj season itself, but Umrah pilgrims visiting outside Hajj are often taken through the area on a general Ziyarah tour to see the plains and understand their role in Hajj.",
  },
  {
    id: "quba-mosque",
    name: "Quba Mosque",
    arabicOrAltName: "Masjid Quba",
    region: "madinah",
    summary: "Widely described as the first mosque built in Islam, on the outskirts of Madinah.",
    description:
      "Quba Mosque, on the southern edge of Madinah, is widely described as the first mosque built in Islam, with its foundation traditionally linked to the Prophet Muhammad's (peace be upon him) arrival at Madinah during the Hijrah. It has since been rebuilt and expanded many times and today is a large, active mosque that welcomes visitors alongside its role as a regular place of worship for the local community.",
  },
  {
    id: "masjid-al-qiblatain",
    name: "Masjid al-Qiblatain",
    arabicOrAltName: "Mosque of the Two Qiblas",
    region: "madinah",
    summary: "The mosque notable for the historical change in the direction of prayer, from Jerusalem to Makkah.",
    description:
      "Masjid al-Qiblatain (\"Mosque of the Two Qiblas\") in Madinah is notable as the traditional site associated with the change in the direction of prayer (Qibla) from Al-Aqsa in Jerusalem to the Kaaba in Makkah. The mosque's design has historically referenced both directions, making it a popular stop for pilgrims interested in this well-known turning point in early Islamic history.",
  },
  {
    id: "mount-uhud",
    name: "Mount Uhud",
    region: "madinah",
    summary: "The mountain and battlefield associated with the Battle of Uhud and its martyrs.",
    description:
      "Mount Uhud lies just north of Madinah and is the site associated with the Battle of Uhud, fought in the early years of Islam. A cemetery at the foot of the mountain holds the graves of the martyrs of the battle, including Hamza ibn Abd al-Muttalib (may Allah be pleased with him), the Prophet's uncle. Many Ziyarah tours stop here so pilgrims can view the site and reflect on its history, typically from outside the fenced cemetery area.",
  },
  {
    id: "al-baqi",
    name: "Al-Baqi Cemetery",
    arabicOrAltName: "Jannat al-Baqi",
    region: "madinah",
    summary: "The historic cemetery beside Masjid an-Nabawi, viewed respectfully from outside.",
    description:
      "Al-Baqi is the historic cemetery adjoining Masjid an-Nabawi in Madinah, the resting place of many companions of the Prophet Muhammad (peace be upon him) and members of his family. Public entry and specific practices at Al-Baqi can be restricted and vary over time, set by the local authorities who manage the site, so pilgrims typically view the cemetery respectfully from outside its walls rather than entering. Ask your group leader or agency about the current access rules on the day.",
  },
  {
    id: "seven-mosques",
    name: "The Seven Mosques",
    arabicOrAltName: "Masajid Sab'ah",
    region: "madinah",
    summary: "A cluster of small historic mosques in Madinah, commonly linked to the Battle of the Trench.",
    description:
      "The Seven Mosques (Masajid Sab'ah) are a cluster of small, historic mosques in Madinah, commonly associated with the positions held by the Prophet Muhammad (peace be upon him) and his companions during the Battle of the Trench (Khandaq). Several of the original structures have been rebuilt over the centuries, and the cluster remains a popular short stop on Ziyarah tours for its connection to that period of early Islamic history.",
  },
];

export function sitesByRegion(region: ZiyarahRegion): ZiyarahSite[] {
  return ziyarahSites.filter((s) => s.region === region);
}
