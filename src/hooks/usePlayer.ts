import { useEffect, useRef, useState, useCallback } from "react";
import type { SongWithAlbum } from "../types/music";

export function usePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<SongWithAlbum[]>([]);

  const [currentSong, setCurrentSong] = useState<SongWithAlbum | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setElapsed(audio.currentTime);
      setProgress(
        audio.duration ? (audio.currentTime / audio.duration) * 100 : 0,
      );
    });
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("ended", () => {
      if (audio.loop) return;
      setCurrentSong((prev) => {
        const queue = queueRef.current;
        if (!prev || queue.length === 0) return prev;
        const idx = queue.findIndex((s) => s.id === prev.id);
        const next = queue[(idx + 1) % queue.length];
        audio.src = next.url ?? "";
        audio.play();
        return next;
      });
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = isLooping;
  }, [isLooping]);

  const playSong = useCallback(
    (song: SongWithAlbum, queue: SongWithAlbum[]) => {
      queueRef.current = queue;
      setCurrentSong(song);
      setElapsed(0);
      setProgress(0);
      const audio = audioRef.current;
      if (audio && song.url) {
        audio.src = song.url;
        audio.play();
      }
    },
    [],
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.paused ? audio.play() : audio.pause();
  }, []);

  const playNext = useCallback(() => {
    const audio = audioRef.current;
    setCurrentSong((prev) => {
      const queue = queueRef.current;
      if (!prev || queue.length === 0) return prev;
      const idx = queue.findIndex((s) => s.id === prev.id);
      const next = queue[(idx + 1) % queue.length];
      if (audio && next.url) {
        audio.src = next.url;
        audio.play();
      }
      return next;
    });
  }, []);

  const playPrev = useCallback(() => {
    const audio = audioRef.current;
    setCurrentSong((prev) => {
      const queue = queueRef.current;
      if (!prev || queue.length === 0) return prev;
      const idx = queue.findIndex((s) => s.id === prev.id);
      const prevSong = queue[(idx - 1 + queue.length) % queue.length];
      if (audio && prevSong.url) {
        audio.src = prevSong.url;
        audio.play();
      }
      return prevSong;
    });
  }, []);

  const toggleLoop = useCallback(() => setIsLooping((v) => !v), []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  }, []);

  return {
    currentSong,
    isPlaying,
    progress,
    elapsed,
    duration,
    isLooping,
    playSong,
    togglePlay,
    playNext,
    playPrev,
    toggleLoop,
    seek,
  };
}
