import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, logout } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {getGreeting()}, {user?.name}!
          </h1>
          <Button variant="outline" onClick={logout}>
            Sair
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Bem-vindo à Plataforma</h2>
          <p className="text-gray-600">
            Esta é a primeira versão da nossa plataforma de ensino. Em breve, você terá acesso a todos os recursos!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;