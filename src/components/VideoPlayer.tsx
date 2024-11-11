import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Video, Progress as VideoProgress } from "@/types";

interface VideoPlayerProps {
  video: Video;
  onComplete?: () => void;
  progress?: VideoProgress;
  onProgressUpdate?: (progress: number) => void;
}

const VideoPlayer = ({ video, onComplete, progress, onProgressUpdate }: VideoPlayerProps) => {
  const [currentProgress, setCurrentProgress] = useState(progress?.progress || 0);
  const { toast } = useToast();

  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === "playerStateChange") {
      const newProgress = Math.floor((event.data.currentTime / event.data.duration) * 100);
      setCurrentProgress(newProgress);
      onProgressUpdate?.(newProgress);

      if (newProgress >= 95 && !progress?.completed) {
        onComplete?.();
        toast({
          title: "Vídeo concluído!",
          description: "Você já pode avançar para a próxima aula.",
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  };

  return (
    <div className="space-y-4">
      <div className="video-wrapper">
        <iframe
          src={getEmbedUrl(video.url)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        />
      </div>
      <Progress value={currentProgress} className="w-full" />
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Progresso: {currentProgress}%</span>
        {video.maxPlays && (
          <span>Reproduções restantes: {video.maxPlays - (progress?.playCount || 0)}</span>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;