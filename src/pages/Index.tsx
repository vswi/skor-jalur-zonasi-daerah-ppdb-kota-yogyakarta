import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gunakan kalkulator kami untuk mensimulasikan skor PPDB SMP Negeri Sleman Anda.
        </p>
        <Link to="/kalkulator-simulasi-skor-ppdb-smp-negeri-sleman">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Calculator className="mr-2 h-4 w-4" />
            Buka Kalkulator Simulasi
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;