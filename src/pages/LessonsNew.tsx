import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import VideoManager from "@/components/VideoManager";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "@/types";

const LessonsNew = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      if (!id) return null;
      // Simulated API call - replace with actual API
      return {
        id: "1",
        title: "Aula Exemplo",
        description: "Descrição da aula",
        url: "https://www.youtube.com/watch?v=example",
        maxPlays: 3,
        order: 1,
      };
    },
    enabled: !!id,
  });

  const updateLesson = useMutation({
    mutationFn: async (video: Video) => {
      // Simulated API call - replace with actual API
      console.log("Updating lesson:", video);
      return video;
    },
    onSuccess: () => {
      toast({
        title: id ? "Aula atualizada" : "Aula criada",
        description: id ? "As alterações foram salvas com sucesso." : "A nova aula foi criada com sucesso.",
      });
      navigate("/lessons");
    },
  });

  const handleUpdate = (video: Video) => {
    updateLesson.mutate(video);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const defaultVideo: Video = {
    id: "",
    title: "",
    description: "",
    url: "",
    maxPlays: 3,
    order: 1,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{id ? "Editar Aula" : "Nova Aula"}</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoManager
              video={lesson || defaultVideo}
              onUpdate={handleUpdate}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LessonsNew;