// components/residences/ResidenceGallery.tsx
"use client";

import Image from "next/image";

interface ResidenceGalleryProps {
  images: string[];
  residenceName: string;
}

export default function ResidenceGallery({ images, residenceName }: ResidenceGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 h-[320px] md:h-[480px] rounded-[2.5rem] overflow-hidden relative group/gallery mb-12 shadow-xl bg-slate-100">
      <div className="md:col-span-2 md:row-span-2 relative h-full w-full overflow-hidden">
        <Image
          src={images[0]}
          alt={`${residenceName} Facade`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
          priority
        />
      </div>
      <div className="hidden md:block relative h-full w-full overflow-hidden">
        <Image
          src={images[1]}
          alt="Lobby interior"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
        />
      </div>
      <div className="hidden md:block relative h-full w-full overflow-hidden">
        <Image
          src={images[2]}
          alt="Garden common spaces"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
        />
      </div>
      <div className="hidden md:block relative h-full w-full overflow-hidden">
        <Image
          src={images[3]}
          alt="Security control panel"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
        />
      </div>
      <div className="hidden md:block relative h-full w-full overflow-hidden">
        <Image
          src={images[4]}
          alt="Building technical systems"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
        />
      </div>
    </div>
  );
}
