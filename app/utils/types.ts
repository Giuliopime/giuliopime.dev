export interface FeedEntry {
  date: Date;
  name: string;
  type: string;
  path: string;
}

export type RelayEntryType =
  | "book"
  | "film"
  | "serie"
  | "video"
  | "blog"
  | "article"
  | "individual"
  | "website";

export interface RelayEntry {
  type: RelayEntryType;
  title: string;
  description: string;
  url: string;
  date_added: string;
}
