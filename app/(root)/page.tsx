import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions: Question[] = [
  {
    _id: "1",
    title: "How to use Next.js with TypeScript?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Nextjs" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    },
    upvotes: 10,
    answers: 2,
    views: 50,
    createdAt: new Date("2025-11-27"),
  },
  {
    _id: "2",
    title: "How to learn React Query",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "React Query" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg",
    },
    upvotes: 12,
    answers: 20,
    views: 150,
    createdAt: new Date("2021-06-10T10:00:00Z"),
  },
];
interface ISearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: ISearchParams) {
  const { query = "", filter } = await searchParams;
  console.log("filter", filter);

  const filteredQuestions = questions.filter((question) =>
    query ? question.title.toLowerCase().includes(query.toLowerCase()) : true
  );

  //  in real app
  /**
   * cosnt filteredQuestions = axios.get('/api/questions', {
   * params: {
   *    query,
   *   filter
   *  }
   * })
   */

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between sm:items-center gap-4 ">
        <h1 className="h1-bold text-dark100_light900">All Questions </h1>
        <Button
          asChild
          className="primary-gradient min-h-11.5 px-4 py-3 text-light-900!"
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-12">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClacess="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex flex-col w-full gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}
