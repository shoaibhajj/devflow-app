"use client";
import Image from "next/image";
import { useQueryState } from "nuqs";

interface Props {
  route?: string;
  imgSrc: string;
  placeholder: string;
  otherClacess?: string;
}

function LocalSearch({ route, imgSrc, placeholder, otherClacess }: Props) {
  const [searchQuery, setSearchQuery] = useQueryState("query", {
    // Send updates to the server maximum once every second
    shallow: false,
    throttleMs: 1000,
  });

  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center rounded-[10px] gap-4 px-4 ${otherClacess}`}
    >
      <Image
        src={imgSrc}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery || ""}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none "
      />
    </div>
  );
}

export default LocalSearch;
