export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiaryType = Omit<DiaryEntry, "id">;

export type Diary = DiaryEntry | NewDiaryType;
