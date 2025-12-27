import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
interface IProps {
  imageUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
  imageStyle?: string;
}

function Metric({
  imageUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
  imageStyle,
}: IProps) {
  const metricContent = (
    <>
      <Image
        src={imageUrl}
        width={16}
        height={16}
        alt={alt}
        className={`rounded-full object-contain ${imageStyle}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>{value}</p>
      <span
        className={cn(
          `small-regular line-clamp-1`,
          isAuthor ? "max-sm:hidden" : ""
        )}
      >
        {title}
      </span>
    </>
  );
  return href ? (
    <Link href={href} className="flex items-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex items-center gap-1">{metricContent}</div>
  );
}

export default Metric;
