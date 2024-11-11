import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import VideoManager from "@/components/VideoManager";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Video, Progress } from "@/types";
import Header from "@/components/Header";

const Index = () => {
  const { user } = useAuth();
  const [currentVideo, setCurrentVideo] = useState<Video>({
    id: "welcome",
    title: "Vídeo de Boas-vindas",
    description: "Assista ao vídeo de boas-vindas para começar sua jornada!",
    url: "https://www.youtube.com/watch?v=your-video-id",
    order: 0,
    isWelcomeVideo: true,
  });

  const [progress, setProgress] = useState<Progress>({
    userId: user?.id || "",
    videoId: currentVideo.id,
    progress: 0,
    completed: false,
    playCount: 0,
    lastPosition: 0,
  });

  const handleVideoComplete = () => {
    setProgress((prev) => ({
      ...prev,
      completed: true,
    }));
  };

  const handleProgressUpdate = (newProgress: number) => {
    setProgress((prev) => ({
      ...prev,
      progress: newProgress,
      lastPosition: newProgress,
    }));
  };

  const handleVideoUpdate = (updatedVideo: Video) => {
    setCurrentVideo(updatedVideo);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">{currentVideo.title}</h2>
            {(user?.role === "admin" || user?.role === "teacher") && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Gerenciar Vídeo</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Gerenciar Vídeo</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <VideoManager video={currentVideo} onUpdate={handleVideoUpdate} />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
          
          <p className="text-gray-600 mb-6">{currentVideo.description}</p>
          
          <VideoPlayer
            video={currentVideo}
            progress={progress}
            onComplete={handleVideoComplete}
            onProgressUpdate={handleProgressUpdate}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;