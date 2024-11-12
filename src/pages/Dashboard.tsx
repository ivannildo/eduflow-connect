import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Video, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total de Alunos",
      value: "150",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total de Professores",
      value: "12",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Total de Aulas",
      value: "45",
      icon: Video,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/lessons/new">Nova Aula</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/lessons">Gerenciar Aulas</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;