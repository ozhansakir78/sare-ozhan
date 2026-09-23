import type { TopicStudyNote } from '@/types/study';
import type { LgsCourseKey } from '@/types/exam';

import { MATEMATIK_NOTES } from './study-notes/matematik';
import { FEN_NOTES } from './study-notes/fen';
import { TURKCE_NOTES } from './study-notes/turkce';
import { INKILAP_NOTES } from './study-notes/inkilap';
import { DIN_NOTES } from './study-notes/din';
import { INGILIZCE_NOTES } from './study-notes/ingilizce';

/**
 * LGS Müfredatındaki TÜM 53 konunun eksiksiz, özgün ve pedagojik ders notları
 */
export const FEATURED_STUDY_NOTES: TopicStudyNote[] = [
  ...MATEMATIK_NOTES,
  ...FEN_NOTES,
  ...TURKCE_NOTES,
  ...INKILAP_NOTES,
  ...DIN_NOTES,
  ...INGILIZCE_NOTES,
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9ğüşıöç]/gi, '')
    .trim();
}

/**
 * Verilen konu adı ve ders anahtarına göre özel hazırlanmış LGS konu notunu getirir.
 * Sıfır genel şablon; her konunun kendine has MEB kuralları, tuzakları ve örnek soruları döner.
 */
export function getStudyNoteByTopicName(topicName: string, courseKey?: string): TopicStudyNote {
  const normTopic = normalize(topicName);

  // 1. Aynı ders içinde birebir veya içerik eşleşmesi
  const courseNotes = FEATURED_STUDY_NOTES.filter((n) => !courseKey || n.courseKey === courseKey);
  const exactInCourse = courseNotes.find((n) => normalize(n.topicName) === normTopic);
  if (exactInCourse) return exactInCourse;

  const partialInCourse = courseNotes.find(
    (n) => normalize(n.topicName).includes(normTopic) || normTopic.includes(normalize(n.topicName))
  );
  if (partialInCourse) return partialInCourse;

  // 2. Ders genelinde kelime bazlı eşleşme (Örn: "Dönüşüm", "Eşitsizlikler", "DNA")
  const wordInCourse = courseNotes.find((n) => {
    const words = normTopic.split(/[\s-]+/).filter((w) => w.length >= 3);
    const noteNorm = normalize(n.topicName);
    return words.some((w) => noteNorm.includes(w));
  });
  if (wordInCourse) return wordInCourse;

  // 3. Genel liste içinde ara
  const generalMatch = FEATURED_STUDY_NOTES.find(
    (n) => normalize(n.topicName).includes(normTopic) || normTopic.includes(normalize(n.topicName))
  );
  if (generalMatch) return generalMatch;

  // 4. Eşleşme bulunamazsa o dersin ilk özgün konusunu döndür
  const fallbackNote = courseNotes[0] || FEATURED_STUDY_NOTES[0];
  return fallbackNote;
}

export function getAllFeaturedNotes(): TopicStudyNote[] {
  return FEATURED_STUDY_NOTES;
}
