import Link from "next/link";

import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
const questions = [
  {
    _id: "1",
    title: "How to use Next.js with TypeScript?",
    description:
      " I'm new to Next.js and want to know how to set it up with TypeScript.",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Nextjs" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 2,
    views: 50,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn React Query",
    description:
      "I want to manage server state in my React application. How can I get started with React Query?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "React Query" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 12,
    answers: 20,
    views: 150,
    createdAt: new Date(),
  },
];
interface ISearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: ISearchParams) {
  const { query = "",filter } = await searchParams;
  console.log("filter",filter);
  
  const filteredQuestions = questions.filter((question) =>
    query
      ? question.title.toLowerCase().includes(query.toLowerCase()) ||
        question.description.toLowerCase().includes(query.toLowerCase())
      : true
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
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
}
