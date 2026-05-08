import { memo } from "react";

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

interface ProgressBarProps {
  progress: number;
  elapsed: number;
  duration: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ProgressBar = memo(function ProgressBar({
  progress,
  elapsed,
  duration,
  onSeek,
}: ProgressBarProps) {
  return (
    <div className="mb-5">
      <div
        className="w-full h-px bg-white/[0.08] relative cursor-pointer group"
        onClick={onSeek}
      >
        <div
          className="absolute left-0 top-0 h-full bg-[#c9a96e] transition-all"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress}% - 4px)` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-[0.6rem] text-[#444] tabular-nums">
        <span>{formatDuration(elapsed)}</span>
        <span>{duration ? formatDuration(duration) : "--:--"}</span>
      </div>
    </div>
  );
});
