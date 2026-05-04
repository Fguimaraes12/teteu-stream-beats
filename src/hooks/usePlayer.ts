import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Song } from "../types/music";

export function usePlayer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [toggleLoop, setToggleLoop] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    supabase
      .from("songs")
      .select("*")
      .then(({ data }) => {
        if (data) setSongs(data);
      });
  }, []);

  function play(song: Song) {
    if (!audioRef.current || !song.url) return;
    audioRef.current.src = song.url;
    audioRef.current.play();
  }

  function LoopMusic() {
    const currentTime = audioRef.current?.currentTime;
    const duration = audioRef.current?.duration;

    if (toggleLoop) {
      if (currentTime === duration) {
        audioRef.current?.play();
      }
    }
  }

  return { play, LoopMusic, songs, audioRef, setToggleLoop, toggleLoop };
}
