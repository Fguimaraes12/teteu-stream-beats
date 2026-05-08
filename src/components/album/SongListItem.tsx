import { memo } from "react";
import type { SongWithAlbum } from "../../types/music";

interface SongListItemProps {
  song: SongWithAlbum;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onSelect: (song: SongWithAlbum) => void;
}

export const SongListItem = memo(function SongListItem({
  song,
  index,
  isActive,
  isPlaying,
  onSelect,
}: SongListItemProps) {
  return (
    <li>
      <button
        onClick={() => onSelect(song)}
        className={`w-full text-left px-5 py-3 transition-all duration-200 border-l-2 ${
          isActive
            ? "border-[#c9a96e] bg-white/[0.04] text-[#f0e8dc]"
            : "border-transparent text-[#888] hover:text-[#e8e0d4] hover:bg-white/[0.02]"
        }`}
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <span
            className={`text-[0.6rem] w-4 text-right flex-shrink-0 ${
              isActive ? "text-[#c9a96e]" : "text-[#444]"
            }`}
          >
            {isActive && isPlaying ? "♪" : index + 1}
          </span>
          <div className="min-w-0">
            <p className="text-xs truncate">{song.title}</p>
            {song.genre && (
              <p className="text-[0.6rem] text-[#555] mt-0.5 truncate">
                {song.genre}
              </p>
            )}
          </div>
        </div>
      </button>
    </li>
  );
});
