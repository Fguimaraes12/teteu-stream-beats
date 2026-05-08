import { memo, useMemo } from "react";
import type { SongWithAlbum } from "../../types/music";
import { SongListItem } from "./SongListItem";

interface SidebarProps {
  albumName: string;
  songs: SongWithAlbum[];
  loading: boolean;
  isOpen: boolean;
  currentSong: SongWithAlbum | null;
  isPlaying: boolean;
  onToggle: () => void;
  onSelectSong: (song: SongWithAlbum) => void;
  onBack: () => void;
}

export const Sidebar = memo(function Sidebar({
  albumName,
  songs,
  loading,
  isOpen,
  currentSong,
  isPlaying,
  onToggle,
  onSelectSong,
  onBack,
}: SidebarProps) {
  const trackCount = useMemo(
    () => `${songs.length} ${songs.length === 1 ? "faixa" : "faixas"}`,
    [songs.length],
  );

  const visibleStyle = {
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.4s ease",
    pointerEvents: isOpen ? "auto" : "none",
  } as React.CSSProperties;

  const hiddenStyle = {
    opacity: isOpen ? 0 : 1,
    transition: "opacity 0.4s ease",
    pointerEvents: isOpen ? "none" : "auto",
  } as React.CSSProperties;

  return (
    <aside
      className="relative z-10 flex-shrink-0 flex flex-col border-r border-white/[0.06] overflow-hidden transition-all duration-500 ease-in-out"
      style={{ width: isOpen ? "300px" : "56px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-8 pb-6 border-b border-white/[0.06]">
        <button
          onClick={onBack}
          className={`text-[#555] hover:text-[#c9a96e] transition-all duration-300 text-xs tracking-widest uppercase overflow-hidden whitespace-nowrap ${
            isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
          }`}
        >
          ← Acervo
        </button>
        <button
          onClick={onToggle}
          className="ml-auto text-[#555] hover:text-[#c9a96e] transition-colors text-lg leading-none"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {/* Album title */}
      <div className="relative">
        <div className="px-5 py-5" style={visibleStyle}>
          <p className="font-serif text-xl text-[#f0e8dc] leading-tight">
            {albumName}
          </p>
          <p className="text-[0.6rem] text-[#555] tracking-[0.2em] uppercase mt-1">
            {trackCount}
          </p>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={hiddenStyle}
        >
          <p
            className="font-serif text-[#c9a96e]/40 text-sm tracking-widest whitespace-nowrap"
            style={{ transform: "rotate(-90deg)" }}
          >
            {albumName}
          </p>
        </div>
      </div>

      {/* Song list */}
      <div className="flex-1 overflow-y-auto" style={visibleStyle}>
        {loading ? (
          <div className="flex gap-1.5 justify-center py-12">
            {[0, 0.2, 0.4].map((delay, i) => (
              <span
                key={i}
                className="loading-dot w-1 h-1 rounded-full bg-[#c9a96e]"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        ) : (
          <ul className="pb-4">
            {songs.map((song, index) => (
              <SongListItem
                key={song.id}
                song={song}
                index={index}
                isActive={currentSong?.id === song.id}
                isPlaying={isPlaying}
                onSelect={onSelectSong}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
});
