"use client";
import { memo } from "react";
import Link from "next/link";
import { Play, Pause } from "lucide-react";
import type { SongWithAlbum } from "../../types/music";

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

interface GlobalPlayerProps {
  player: {
    currentSong: SongWithAlbum | null;
    isPlaying: boolean;
    progress: number;
    elapsed: number;
    duration: number;
    isLooping: boolean;
    togglePlay: () => void;
    playNext: () => void;
    playPrev: () => void;
    toggleLoop: () => void;
    seek: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
}

export const GlobalPlayer = memo(function GlobalPlayer({
  player,
}: GlobalPlayerProps) {
  const {
    currentSong,
    isPlaying,
    progress,
    elapsed,
    duration,
    isLooping,
    togglePlay,
    playNext,
    playPrev,
    toggleLoop,
    seek,
  } = player;

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#080808]/90 backdrop-blur-md px-6 py-3">
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-white/[0.08] cursor-pointer group"
        onClick={seek}
      >
        <div
          className="h-full bg-[#c9a96e] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-4 max-w-screen-xl mx-auto">
        {/* Song info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #111 0%, #1c1c1c 100%)",
            }}
          >
            {currentSong.album.cover_url ? (
              <img
                src={currentSong.album.cover_url}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-serif text-lg text-[rgba(201,169,110,0.4)]">
                {currentSong.title.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#f0e8dc] truncate">
              {currentSong.title}
            </p>
            <p className="text-[0.6rem] text-[#555] truncate">
              {currentSong.album.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={toggleLoop}
            className={`text-base transition-colors ${isLooping ? "text-[#c9a96e]" : "text-[#444] hover:text-[#888]"}`}
          >
            ↻
          </button>
          <button
            onClick={playPrev}
            className="text-[#888] hover:text-[#f0e8dc] transition-colors text-xl"
          >
            ⏮
          </button>
          <button onClick={togglePlay} className="text-[#e8e0d4]">
            {isPlaying ? (
              <Pause fill="currentColor" strokeWidth={0} size={26} />
            ) : (
              <Play fill="currentColor" strokeWidth={0} size={26} />
            )}
          </button>
          <button
            onClick={playNext}
            className="text-[#888] hover:text-[#f0e8dc] transition-colors text-xl"
          >
            ⏭
          </button>
        </div>

        {/* Time */}
        <div className="text-[0.6rem] text-[#444] tabular-nums flex-1 text-right">
          {formatDuration(elapsed)} /{" "}
          {duration ? formatDuration(duration) : "--:--"}
        </div>
      </div>
    </div>
  );
});
