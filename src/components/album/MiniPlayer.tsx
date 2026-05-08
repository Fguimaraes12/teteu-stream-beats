"use client";
import { memo } from "react";
import { Play, Pause } from "lucide-react";
import type { SongWithAlbum } from "../../types/music";
import type { Album } from "../../types/music";

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

interface MiniPlayerProps {
  currentSong: SongWithAlbum;
  isPlaying: boolean;
  isLooping: boolean;
  progress: number;
  elapsed: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleLoop: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickSong: (album: Album) => void;
}

export const MiniPlayer = memo(function MiniPlayer({
  currentSong,
  isPlaying,
  isLooping,
  progress,
  elapsed,
  duration,
  onTogglePlay,
  onToggleLoop,
  onNext,
  onPrev,
  onSeek,
  onClickSong,
}: MiniPlayerProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(20, 20, 20, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Barra de progresso no topo */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.06] cursor-pointer"
          onClick={onSeek}
        >
          <div
            className="h-full bg-[#c9a96e] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          {/* Controles esquerdos */}
          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              className="text-[#888] hover:text-[#f0e8dc] transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>
            <button
              onClick={onTogglePlay}
              className="w-8 h-8 rounded-full bg-[#c9a96e] flex items-center justify-center text-[#080808] hover:bg-[#d4b47a] transition-colors"
            >
              {isPlaying ? (
                <Pause fill="currentColor" strokeWidth={0} size={14} />
              ) : (
                <Play fill="currentColor" strokeWidth={0} size={14} />
              )}
            </button>
            <button
              onClick={onNext}
              className="text-[#888] hover:text-[#f0e8dc] transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 18l8.5-6L6 6v12zm8.5-6v6H17V6h-2.5v6z" />
              </svg>
            </button>
          </div>

          {/* Info da música */}
          <button
            onClick={() => onClickSong(currentSong.album as Album)}
            className="flex items-center gap-2.5 min-w-0 flex-1 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex-shrink-0 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
              }}
            >
              {currentSong.album.cover_url ? (
                <img
                  src={currentSong.album.cover_url}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center font-serif text-sm text-[rgba(201,169,110,0.4)]">
                  {currentSong.title.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[0.7rem] text-[#f0e8dc] truncate group-hover:text-[#c9a96e] transition-colors leading-tight">
                {currentSong.title}
              </p>
              <p className="text-[0.55rem] text-[#555] truncate leading-tight mt-0.5">
                {currentSong.album.artist}
              </p>
            </div>
          </button>

          {/* Loop + tempo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onToggleLoop}
              className={`text-sm transition-colors ${isLooping ? "text-[#c9a96e]" : "text-[#444] hover:text-[#888]"}`}
            >
              ↻
            </button>
            <span className="text-[0.55rem] text-[#444] tabular-nums">
              {formatDuration(elapsed)}/
              {duration ? formatDuration(duration) : "--:--"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
