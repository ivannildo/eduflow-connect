import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import LessonList from "@/components/LessonList";
import { useToast } from "@/components/ui/use-toast";

const Lessons = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isTeacherOrAdmin = user?.role === "admin" || user?.role === "teacher";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Aulas</h1>
          {isTeacherOrAdmin && (
            <Button asChild>
              <Link to="/lessons/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Aula
              </Link>
            </Button>
          )}
        </div>
        <LessonList />
      </main>
    </div>
  );
};

export default Lessons;