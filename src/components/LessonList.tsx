import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const LessonList = () => {
  const { user } = useAuth();
  const isTeacherOrAdmin = user?.role === "admin" || user?.role === "teacher";

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      // Simulated API call - replace with actual API
      return [
        {
          id: "1",
          title: "Introdução ao Curso",
          description: "Aprenda os conceitos básicos",
          url: "https://www.youtube.com/watch?v=your-video-id",
          order: 1,
        },
      ];
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {lessons?.map((lesson) => (
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
  );
};

export default LessonList;