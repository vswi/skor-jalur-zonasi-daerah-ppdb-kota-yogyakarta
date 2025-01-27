import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DisqusComments from "@/components/DisqusComments";

interface GradeData {
  subject: string;
  grades: {
    class4: { sem1: number; sem2: number };
    class5: { sem1: number; sem2: number };
    class6: { sem1: number };
  };
  aspdScore: number;
}

const Index = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  
  const [grades, setGrades] = useState<GradeData[]>([
    {
      subject: "Bahasa Indonesia",
      grades: {
        class4: { sem1: 91, sem2: 95 },
        class5: { sem1: 90, sem2: 91 },
        class6: { sem1: 86 },
      },
      aspdScore: 88,
    },
    {
      subject: "IPAS",
      grades: {
        class4: { sem1: 95, sem2: 99 },
        class5: { sem1: 93, sem2: 93 },
        class6: { sem1: 98 },
      },
      aspdScore: 76.67,
    },
    {
      subject: "Matematika",
      grades: {
        class4: { sem1: 95, sem2: 91 },
        class5: { sem1: 91, sem2: 88 },
        class6: { sem1: 96 },
      },
      aspdScore: 88.57,
    },
  ]);

  const [additionalScore, setAdditionalScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);

  const handleGradeChange = (subjectIndex: number, field: string, value: string) => {
    const cleanedValue = value.replace(/^0+/, '');
    const numericValue = cleanedValue === '' ? 0 : parseFloat(cleanedValue);
    
    setGrades(prevGrades => {
      const newGrades = [...prevGrades];
      const subject = { ...newGrades[subjectIndex] };

      if (field === "aspd") {
        subject.aspdScore = numericValue;
      } else {
        const [classNum, semNum] = field.split("-");
        const classKey = `class${classNum}` as keyof typeof subject.grades;
        const semKey = `sem${semNum}` as keyof typeof subject.grades[typeof classKey];
        
        subject.grades = {
          ...subject.grades,
          [classKey]: {
            ...subject.grades[classKey],
            [semKey]: numericValue
          }
        };
      }

      newGrades[subjectIndex] = subject;
      return newGrades;
    });
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = '';
  };

  const resetAllGrades = () => {
    setGrades(prevGrades => 
      prevGrades.map(subject => ({
        ...subject,
        grades: {
          class4: { sem1: 0, sem2: 0 },
          class5: { sem1: 0, sem2: 0 },
          class6: { sem1: 0 }
        },
        aspdScore: 0
      }))
    );
    setAdditionalScore(0);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Halo, saya ingin bertanya tentang PPDB SMP Negeri Sleman");
    window.open(`https://wa.me/628112500028?text=${message}`, '_blank');
  };

  const calculateSubjectSum = (gradeData: GradeData) => {
    const values = [
      gradeData.grades.class4.sem1,
      gradeData.grades.class4.sem2,
      gradeData.grades.class5.sem1,
      gradeData.grades.class5.sem2,
      gradeData.grades.class6.sem1,
    ];
    return values.reduce((acc, curr) => acc + curr, 0);
  };

  const calculateSubjectAverage = (gradeData: GradeData) => {
    const sum = calculateSubjectSum(gradeData);
    return (sum / 5).toFixed(1);
  };

  const calculateTotal = () => {
    const averageSum = grades.reduce(
      (acc, curr) => acc + parseFloat(calculateSubjectAverage(curr)),
      0
    );
    const aspdSum = grades.reduce((acc, curr) => acc + curr.aspdScore, 0);
    
    const total = (averageSum * 0.4) + (aspdSum * 0.6) + additionalScore;
    setTotalScore(parseFloat(total.toFixed(2)));
  };

  useEffect(() => {
    calculateTotal();
  }, [grades, additionalScore]);

  const exportAsPDF = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ppdb-skor-calculation.pdf');
      });
    }
  };

  const exportAsImage = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ppdb-skor-calculation.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-7xl mx-auto" ref={tableRef}>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          Kalkulator Simulasi Skor PPDB SMP Negeri Sleman
        </h1>
        
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4">
          <h2 className="font-semibold text-blue-800 mb-2">Petunjuk Penggunaan:</h2>
          <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm sm:text-base">
            <li>Isikan nilai rapor untuk setiap mata pelajaran di setiap semester</li>
            <li>Masukkan nilai ASPD untuk setiap mata pelajaran</li>
            <li>Jika ada, tambahkan nilai prestasi pada kolom yang tersedia</li>
            <li>Skor total akan dihitung secara otomatis</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mb-4">
          <Button
            onClick={resetAllGrades}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Semua Nilai
          </Button>
          <Button
            onClick={openWhatsApp}
            variant="default"
            className="bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Tanya via WhatsApp
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4 p-4">
            {grades.map((subject, index) => (
              <div key={subject.subject} className="border p-4 rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold text-lg mb-3">{subject.subject}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium block">Kls 4 SMT 1</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subject.grades.class4.sem1}
                        onChange={(e) => handleGradeChange(index, "4-1", e.target.value)}
                        onFocus={handleInputFocus}
                        className="w-full p-1 border rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block">Kls 4 SMT 2</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subject.grades.class4.sem2}
                        onChange={(e) => handleGradeChange(index, "4-2", e.target.value)}
                        onFocus={handleInputFocus}
                        className="w-full p-1 border rounded text-center"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium block">Kls 5 SMT 1</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subject.grades.class5.sem1}
                        onChange={(e) => handleGradeChange(index, "5-1", e.target.value)}
                        onFocus={handleInputFocus}
                        className="w-full p-1 border rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block">Kls 5 SMT 2</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subject.grades.class5.sem2}
                        onChange={(e) => handleGradeChange(index, "5-2", e.target.value)}
                        onFocus={handleInputFocus}
                        className="w-full p-1 border rounded text-center"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium block">Kls 6 SMT 1</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subject.grades.class6.sem1}
                        onChange={(e) => handleGradeChange(index, "6-1", e.target.value)}
                        onFocus={handleInputFocus}
                        className="w-full p-1 border rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block">Nilai ASPD</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subject.aspdScore}
                        onChange={(e) => handleGradeChange(index, "aspd", e.target.value)}
                        onFocus={handleInputFocus}
                        className="w-full p-1 border rounded text-center"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3 grid grid-cols-2 gap-3 mt-2 bg-gray-50 p-2 rounded">
                    <div>
                      <label className="text-sm font-medium block">Jumlah Nilai Rapor</label>
                      <span className="font-medium block text-center">{calculateSubjectSum(subject)}</span>
                    </div>
                    <div>
                      <label className="text-sm font-medium block">Rata-Rata Nilai Rapor</label>
                      <span className="font-medium block text-center">{calculateSubjectAverage(subject)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="font-medium whitespace-nowrap">Tambahan Nilai Prestasi:</label>
              <input
                type="number"
                value={additionalScore}
                onChange={(e) => setAdditionalScore(parseFloat(e.target.value) || 0)}
                onMouseDown={() => setAdditionalScore(0)}
                onTouchStart={() => setAdditionalScore(0)}
                className="w-32 p-2 border rounded text-center"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-bold">SKOR TOTAL PPDB:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {totalScore.toFixed(2)}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">* SKOR TOTAL PPDB Sleman adalah gabungan:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>(Total Nilai ASPD × 60%)</li>
                  <li>(Total Rata-Rata Rapor × 40%)</li>
                  <li>Nilai Prestasi (Jika Ada)</li>
                </ul>
                <p className="mt-2">
                  Berdasarkan JUKNIS PPDB SMP NEGERI SLEMAN 2024-2025 di {" "}
                  <a 
                    href="https://smpn1prambanansleman.sch.id/wp-content/uploads/2024/05/Juknis-PPDB-SMP-2024-2025-Sleman.pdf"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Juknis PPDB SMP
                  </a>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={exportAsPDF}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Export sebagai PDF
                </Button>
                <Button
                  onClick={exportAsImage}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                >
                  Export sebagai Gambar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <DisqusComments />
        </div>
      </div>
    </div>
  );
};

export default Index;
