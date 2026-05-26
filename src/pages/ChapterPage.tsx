import { useParams, Navigate } from "react-router-dom";
import { chapters } from "../data/chapters";
import ChapterLayout from "../components/chapter/ChapterLayout";

export default function ChapterPage() {
  const { slug } = useParams<{ slug: string }>();
  const chapter = chapters.find((c) => c.slug === slug);

  if (!chapter) return <Navigate to="/" replace />;

  return <ChapterLayout chapter={chapter} />;
}
