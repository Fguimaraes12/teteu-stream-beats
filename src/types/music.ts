export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  genre: string | null;
  duration_seconds: number | null;
  release_year: number | null;
  url: string | null;
  created_at: string;
}
