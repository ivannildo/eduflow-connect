import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhotoUrl?: string;
  content: string;
  createdAt: string;
}

const CommentSection = ({ lessonId }: { lessonId: string }) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", lessonId],
    queryFn: async () => {
      // Simulated API call - replace with actual API
      return [
        {
          id: "1",
          userId: "1",
          userName: "João Silva",
          content: "Excelente aula!",
          createdAt: new Date().toISOString(),
        },
      ];
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      // Simulated API call - replace with actual API
      return {
        id: Date.now().toString(),
        userId: user?.id || "",
        userName: user?.name || "",
        userPhotoUrl: user?.photoUrl,
        content,
        createdAt: new Date().toISOString(),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lessonId] });
      setNewComment("");
      toast({
        title: "Comentário adicionado",
        description: "Seu comentário foi publicado com sucesso.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  if (isLoading) {
    return <div>Carregando comentários...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comentários</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Adicione um comentário..."
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Publicar Comentário
        </Button>
      </form>

      <div className="space-y-4 mt-6">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.userPhotoUrl} />
              <AvatarFallback>
                {comment.userName.split(" ").map((n) => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;