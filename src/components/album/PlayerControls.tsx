import { memo } from "react";
import { Play, Pause } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  isLooping: boolean;
  onTogglePlay: () => void;
  onToggleLoop: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PlayerControls = memo(function PlayerControls({
  isPlaying,
  isLooping,
  onTogglePlay,
  onToggleLoop,
  onNext,
  onPrev,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-8">
      <button
        onClick={onToggleLoop}
        title="Loop"
        className={`transition-colors text-lg ${
          isLooping
            ? "text-[#c9a96e] cursor-pointer"
            : "text-[#444] hover:text-[#888] cursor-pointer"
        }`}
      >
        ↻
      </button>
      <button
        onClick={onPrev}
        className="text-[#888] hover:text-[#f0e8dc] transition-colors text-3xl cursor-pointer"
      >
        ⏮
      </button>
      <button onClick={onTogglePlay} className="text-[#e8e0d4] cursor-pointer">
        {isPlaying ? (
          <Pause fill="currentColor" strokeWidth={0} size={30} />
        ) : (
          <Play fill="currentColor" strokeWidth={0} size={30} />
        )}
      </button>
      <button
        onClick={onNext}
        className="text-[#888] hover:text-[#f0e8dc] transition-colors text-3xl cursor-pointer"
      >
        ⏭
      </button>
      <div className="w-6" />
    </div>
  );
});
