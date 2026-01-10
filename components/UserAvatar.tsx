import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import { Avatar, AvatarFallback } from "./ui/avatar";
interface Props {
  id: string;
  name?: string | null;
  imageURL?: string | null;
  className?: string;
}
function UserAvatar({
  id,
  name,
  imageURL,
  className = "h-9 w-9",
}: Props) {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageURL ? (
          <Image
            src={imageURL}
            alt={name || ""}
            width={36}
            height={36}
            className="object-cover rounded-full"
            // quality={100}
          />
        ) : (
          <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wider text-white">
            {initials || "U"}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}

export default UserAvatar;
