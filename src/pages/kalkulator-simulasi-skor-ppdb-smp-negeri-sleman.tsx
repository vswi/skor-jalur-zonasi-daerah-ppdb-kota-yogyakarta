import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Kalkulator PPDB SMP Negeri Sleman
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Halaman kalkulator dalam pengembangan.
        </p>
        <Link to="/">
          <Button variant="outline">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CalculatorPage;