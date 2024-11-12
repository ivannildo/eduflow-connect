import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const LessonList = () => {
  const { user } = useAuth();
  const isTeacherOrAdmin = user?.role === "admin" || user?.role === "teacher";
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 10;

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      // Simulated API call - replace with actual API
      return Array.from({ length: 50 }, (_, index) => ({
        id: String(index + 1),
        title: `Aula ${index + 1}`,
        description: `Descrição da aula ${index + 1}`,
        url: "https://www.youtube.com/watch?v=your-video-id",
        order: index + 1,
        maxPlays: 3,
      }));
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = lessons?.slice(indexOfFirstLesson, indexOfLastLesson);
  const totalPages = lessons ? Math.ceil(lessons.length / lessonsPerPage) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {currentLessons?.map((lesson) => (
          <Card key={lesson.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{lesson.title}</CardTitle>
              {isTeacherOrAdmin && (
                <Button variant="outline" asChild>
                  <Link to={`/lessons/${lesson.id}/edit`} className="flex items-center gap-2">
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Link>
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{lesson.description}</p>
              <VideoPlayer video={lesson} />
              <CommentSection lessonId={lesson.id} />
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default LessonList;