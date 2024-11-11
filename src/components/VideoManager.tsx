import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Video } from "@/types";

interface VideoManagerProps {
  video: Video;
  onUpdate: (video: Video) => void;
}

const VideoManager = ({ video, onUpdate }: VideoManagerProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedVideo = {
      ...video,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      maxPlays: Number(formData.get("maxPlays")),
    };

    onUpdate(updatedVideo);
    toast({
      title: "Vídeo atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Título
        </label>
        <Input id="title" name="title" defaultValue={video.title} required />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descrição
        </label>
        <Input id="description" name="description" defaultValue={video.description} required />
      </div>
      
      <div>
        <label htmlFor="url" className="block text-sm font-medium mb-1">
          URL do YouTube
        </label>
        <Input id="url" name="url" defaultValue={video.url} required />
      </div>
      
      <div>
        <label htmlFor="maxPlays" className="block text-sm font-medium mb-1">
          Número máximo de reproduções
        </label>
        <Input
          id="maxPlays"
          name="maxPlays"
          type="number"
          defaultValue={video.maxPlays}
          min={0}
        />
      </div>
      
      <Button type="submit">Salvar alterações</Button>
    </form>
  );
};

export default VideoManager;