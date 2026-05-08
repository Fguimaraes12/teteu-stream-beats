import { supabase } from "../lib/supabase";
import type { Album, SongWithAlbum } from "../types/music";

export async function getAlbums(): Promise<Album[]> {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getSongsByAlbum(
  albumId: string,
): Promise<SongWithAlbum[]> {
  if (!albumId || albumId === "undefined") return [];
  const { data, error } = await supabase
    .from("songs")
    .select(
      `
      id,
      album_id,
      title,
      genre,
      duration_seconds,
      url,
      created_at,
      album:albums (
        id,
        title,
        artist,
        release_year,
        cover_url,
        created_at
      )
    `,
    )
    .eq("album_id", albumId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data.map((song) => ({
    ...song,
    album: Array.isArray(song.album) ? song.album[0] : song.album,
  })) as SongWithAlbum[];
}

export async function deleteSong(id: string): Promise<void> {
  const { error } = await supabase.from("songs").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteAlbum(id: string): Promise<void> {
  const { error } = await supabase.from("albums").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
