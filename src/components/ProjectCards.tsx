"use client";

import React from 'react';
import Image from 'next/image';

export default function ProjectCards({ data }: any) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const publicImageId = data?.publicImgId;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicImageId}`;
  console.log(data?.title, imageUrl);

  return (
    <div className="relative w-full rounded-xl overflow-hidden group mb-5">
      {imageUrl ? (
        <div className="relative w-full h-full"> {/* 16:9 Aspect Ratio */}
          <Image
            src={imageUrl}
            alt={data?.title || 'Project Image'}
            width={1000} /* Can be any value; Next.js will calculate height dynamically */
            height={0} /* Height will be calculated based on the image aspect ratio */
            className="z-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 z-10 transition-all"></div>
        </div>
      ) : (
        <p>Loading image...</p>
      )}
      <div className="content absolute bottom-0 left-0 z-50 opacity-0 group-hover:opacity-100 text-white p-4 transition-all duration-300">
        <h1 className='text-3xl font-bold tracking-tighter'>{data?.title}</h1>
        <p>{data?.description}</p>
        <div className='flex mt-3'>
          {data.technologies.map((name: any) => (
            <div className='text-[12px] rounded-3xl px-2 py-1 bg-zinc-600'>{name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
