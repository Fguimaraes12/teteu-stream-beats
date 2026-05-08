export interface Album {
  id: string;
  title: string;
  artist: string;
  release_year: number | null;
  cover_url: string | null;
  created_at: string;
}

export interface Song {
  id: string;
  album_id: string;
  title: string;
  genre: string | null;
  duration_seconds: number | null;
  url: string | null;
  created_at: string;
}

export interface SongWithAlbum extends Song {
  album: Album;
}
