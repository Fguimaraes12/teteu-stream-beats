// app/page.tsx
"use client";
import { usePlayer } from "../hooks/usePlayer";

export default function Home() {
  const { play, LoopMusic, songs, audioRef, setToggleLoop, toggleLoop } =
    usePlayer();

  return (
    <div>
      <audio ref={audioRef} onEnded={LoopMusic} controls />
      {songs.map((song) => (
        <div key={song.id}>
          <button onClick={() => play(song)} className="p-1 text-green-500">
            Play
          </button>
          <button
            onClick={() => setToggleLoop(!toggleLoop)}
            className={toggleLoop ? "p-1 text-green-500" : "p-1 text-red-500"}
          >
            LOOP
          </button>
          {song.title} — {song.artist}
        </div>
      ))}
    </div>
  );
}
