import { memo } from "react";

interface AlbumArtProps {
  title: string;
  coverUrl?: string | null;
}

export const AlbumArt = memo(function AlbumArt({
  title,
  coverUrl,
}: AlbumArtProps) {
  return (
    <div
      className="album-card w-full aspect-square rounded-4xl overflow-hidden relative mb-8 shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #111 0%, #1c1c1c 100%)",
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 60%)",
        }}
      />
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-serif text-[8rem] font-light text-[rgba(201,169,110,0.15)] select-none leading-none">
          {title.charAt(0).toUpperCase()}
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
  );
});
