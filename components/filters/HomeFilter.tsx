"use client";
import { useQueryState } from "nuqs";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommended", value: "recommended" },
  { name: "Most Upvoted", value: "most_upvoted" },
];

function HomeFilter() {
  const [filterParams, setFilterParams] = useQueryState("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    if (filter === active) {
      setActive("");
      setFilterParams(null);
    } else {
      setActive(filter);
      setFilterParams(filter);
    }
  };
  

  return (
    <div className="mt-10 hiddern flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <>
          {filter.name && (
            <Button
              onClick={() => handleTypeClick(filter.value)}
              className={
                (cn(`background-light800_dark400 text-dark-100
              rounded-lg px-6 py-3 capitalize shadow-none`),
                active === filter.value
                  ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
                  : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300")
              }
              key={filter.value}
            >
              {filter.name}
            </Button>
          )}
        </>
      ))}
    </div>
  );
}

export default HomeFilter;
