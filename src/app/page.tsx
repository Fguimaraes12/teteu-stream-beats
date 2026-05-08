"use client";
import { useEffect, useState, useCallback } from "react";
import { getAlbums, getSongsByAlbum } from "../services/songService";
import type { Album, SongWithAlbum } from "../types/music";
import { usePlayer } from "../hooks/usePlayer";
import { Sidebar } from "../components/album/Sidebar";
import { AlbumArt } from "../components/album/AlbumArt";
import { ProgressBar } from "../components/album/ProgressBar";
import { PlayerControls } from "../components/album/PlayerControls";
import { MiniPlayer } from "../components/album/MiniPlayer";

export default function Page() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<SongWithAlbum[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
  } = usePlayer();

  useEffect(() => {
    getAlbums()
      .then(setAlbums)
      .catch(console.error)
      .finally(() => setLoadingAlbums(false));
  }, []);

  const handleSelectAlbum = useCallback((album: Album) => {
    setSelectedAlbum(album);
    setLoadingSongs(true);
    setSongs([]);
    setIsSidebarOpen(true);
    getSongsByAlbum(album.id)
      .then(setSongs)
      .catch(console.error)
      .finally(() => setLoadingSongs(false));
  }, []);

  const handleSelectSong = useCallback(
    (song: SongWithAlbum) => {
      playSong(song, songs);
      setIsSidebarOpen(false);
    },
    [playSong, songs],
  );

  const handleBack = useCallback(() => {
    setSelectedAlbum(null);
    setSongs([]);
  }, []);

  const toggleSidebar = useCallback(() => setIsSidebarOpen((v) => !v), []);

  // ── VIEW: Player ─────────────────────────────────────
  if (selectedAlbum) {
    const albumCover = selectedAlbum.cover_url ?? null;

    return (
      <main className="min-h-screen bg-[#080808] text-[#e8e0d4] font-mono flex relative overflow-hidden">
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(180,140,90,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(100,80,160,0.06) 0%, transparent 60%)",
          }}
        />
        <Sidebar
          albumName={selectedAlbum.title}
          songs={songs}
          loading={loadingSongs}
          isOpen={isSidebarOpen}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onToggle={toggleSidebar}
          onSelectSong={handleSelectSong}
          onBack={handleBack}
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
      </main>
    );
  }

  // ── VIEW: Acervo ─────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#080808] text-[#e8e0d4] font-mono p-8">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(180,140,90,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(100,80,160,0.06) 0%, transparent 60%)",
        }}
      />

      <div
        className={`relative z-10 max-w-4xl mx-auto ${currentSong ? "pb-28" : ""}`}
      >
        <div className="mb-12 pt-4">
          <h1 className="font-serif text-4xl text-[#f0e8dc] mb-1">Acervo</h1>
          <p className="text-[0.65rem] text-[#555] tracking-[0.3em] uppercase">
            Sua biblioteca musical
          </p>
        </div>

        {loadingAlbums ? (
          <div className="flex gap-1.5 justify-center py-24">
            {[0, 0.2, 0.4].map((delay, i) => (
              <span
                key={i}
                className="loading-dot w-1 h-1 rounded-full bg-[#c9a96e]"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-[4rem] text-[#c9a96e]/20 leading-none block mb-6">
              ◈
            </span>
            <p className="text-[#444] text-xs tracking-[0.3em] uppercase">
              Nenhum álbum encontrado
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => handleSelectAlbum(album)}
                className="album-card text-left group"
              >
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden relative mb-3 shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #111 0%, #1c1c1c 100%)",
                    boxShadow:
                      "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 60%)",
                    }}
                  />
                  {album.cover_url ? (
                    <img
                      src={album.cover_url}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-serif text-[4rem] font-light text-[rgba(201,169,110,0.15)] select-none leading-none">
                      {album.title.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div
                    className="card-shine absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                    }}
                  />
                </div>
                <p className="text-xs text-[#e8e0d4] truncate group-hover:text-[#c9a96e] transition-colors">
                  {album.title}
                </p>
                <p className="text-[0.6rem] text-[#555] truncate mt-0.5">
                  {album.artist}
                </p>
                {album.release_year && (
                  <p className="text-[0.55rem] text-[#444] mt-0.5">
                    {album.release_year}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {currentSong && (
        <MiniPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          isLooping={isLooping}
          progress={progress}
          elapsed={elapsed}
          duration={duration}
          onTogglePlay={togglePlay}
          onToggleLoop={toggleLoop}
          onNext={playNext}
          onPrev={playPrev}
          onSeek={seek}
          onClickSong={handleSelectAlbum}
        />
      )}
    </main>
  );
}
