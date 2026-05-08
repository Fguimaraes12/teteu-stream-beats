"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getSongsByAlbum } from "../../../services/songService";
import type { SongWithAlbum } from "../../../types/music";
import { usePlayer } from "../../../hooks/usePlayer";
import { Sidebar } from "../../../components/album/Sidebar";
import { AlbumArt } from "../../../components/album/AlbumArt";
import { ProgressBar } from "../../../components/album/ProgressBar";
import { PlayerControls } from "../../../components/album/PlayerControls";
import { GlobalPlayer } from "../../../components/album/GlobalPlayer";

export default function AlbumPage() {
  const params = useParams();
  const albumId = typeof params.name === "string" ? params.name : undefined;

  const player = usePlayer();
  const {
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
  } = player;

  const [songs, setSongs] = useState<SongWithAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const albumName = songs[0]?.album.title ?? "";
  const albumCover = songs[0]?.album.cover_url ?? null;

  useEffect(() => {
    if (!albumId || albumId === "undefined") return;
    getSongsByAlbum(albumId)
      .then(setSongs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [albumId]);

  const handleSelectSong = useCallback(
    (song: SongWithAlbum) => {
      playSong(song, songs);
      setIsSidebarOpen(false);
    },
    [playSong, songs],
  );

  const toggleSidebar = useCallback(() => setIsSidebarOpen((v) => !v), []);

  return (
    <main className="min-h-screen bg-[#080808] text-[#e8e0d4] font-mono flex relative overflow-hidden pb-16">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(180,140,90,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(100,80,160,0.06) 0%, transparent 60%)",
        }}
      />

      <Sidebar
        albumName={albumName}
        songs={songs}
        loading={loading}
        isOpen={isSidebarOpen}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onToggle={toggleSidebar}
        onSelectSong={handleSelectSong}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 min-w-0">
        {!currentSong ? (
          <div className="text-center fade-up">
            <span className="text-[4rem] text-[#c9a96e]/20 leading-none block mb-6">
              ◈
            </span>
            <p className="text-[#444] text-xs tracking-[0.3em] uppercase">
              Selecione uma faixa
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md fade-up">
            <AlbumArt title={currentSong.album.title} coverUrl={albumCover} />

            <div className="border border-[#ffffff15] rounded-4xl p-5 bg-[#fcfcfc10]">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-[#f0e8dc] leading-tight">
                  {currentSong.title}
                </h2>
                <p className="text-[0.7rem] text-[#888] tracking-wide mt-1">
                  {currentSong.album.artist}
                </p>
                {currentSong.genre && (
                  <p className="text-[0.6rem] text-[#c9a96e]/60 tracking-widest uppercase mt-1">
                    {currentSong.genre}
                  </p>
                )}
              </div>

              <ProgressBar
                progress={progress}
                elapsed={elapsed}
                duration={duration}
                onSeek={seek}
              />

              <PlayerControls
                isPlaying={isPlaying}
                isLooping={isLooping}
                onTogglePlay={togglePlay}
                onToggleLoop={toggleLoop}
                onNext={playNext}
                onPrev={playPrev}
              />
            </div>
          </div>
        )}
      </div>

      <GlobalPlayer player={player} />
    </main>
  );
}
