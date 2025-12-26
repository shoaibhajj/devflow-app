import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import TagCard from "../cards/TagCard";

const hotQuestions = [
  {
    _id: "1",
    title: "How to create  a custom hook in React?",
  },
  {
    _id: "2",
    title: "What is the difference between let and var in JavaScript?",
  },
  {
    _id: "3",
    title: "How to optimize React application performance?",
  },
  { _id: "4", title: "What are closures in JavaScript?" },
  { _id: "5", title: "How to manage state in a React application?" },
];

const popularTags = [
  { _id: "1", name: "javascript", questions: 1200 },
  { _id: "2", name: "react", questions: 950 },
  { _id: "3", name: "nodejs", questions: 800 },
  { _id: "4", name: "python", questions: 700 },
  { _id: "5", name: "css", questions: 650 },
];
function RightSideBar() {
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-87.5 flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none  max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-7.5">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.QUESTION(_id)}
              className="flex cursor-pointer justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image
                src={"/icons/chevron-right.svg"}
                alt="arrow icon"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16 ">
        <h3 className="h3-bold text-dark200_light900 ">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={name}
              questions={questions}
              compact
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSideBar;
