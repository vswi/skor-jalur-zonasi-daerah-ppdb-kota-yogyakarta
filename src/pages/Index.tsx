import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    
    // Formula: (I6*0.4)+(G6*0.6)+D8
    // where I6 is averageSum, G6 is aspdSum, and D8 is additionalScore
    const total = (averageSum * 0.4) + (aspdSum * 0.6) + additionalScore;
    setTotalScore(parseFloat(total.toFixed(2)));
  };

  useEffect(() => {
    calculateTotal();
  }, [grades, additionalScore]);

  const handleGradeChange = (
    subjectIndex: number,
    gradeType: string,
    value: string
  ) => {
    const newGrades = [...grades];
    const numValue = value === "" ? 0 : parseFloat(value);

    if (gradeType === "aspd") {
      newGrades[subjectIndex].aspdScore = numValue;
    } else {
      const [className, semKey] = gradeType.split("-");
      const classKey = `class${className}` as keyof GradeData["grades"];
      const semesterKey = `sem${semKey}` as keyof GradeData["grades"]["class4"];
      
      // @ts-ignore - We know these keys exist
      newGrades[subjectIndex].grades[classKey][semesterKey] = numValue;
    }

    setGrades(newGrades);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Kalkulator Skor PPDB Sleman
        </h1>
        
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="bg-blue-800 text-white px-4 py-3">Mata Pelajaran</th>
                <th className="bg-yellow-500 text-white px-4 py-2" colSpan={2}>Nilai Kelas 4</th>
                <th className="bg-cyan-500 text-white px-4 py-2" colSpan={2}>Nilai Kelas 5</th>
                <th className="bg-blue-600 text-white px-4 py-2">Nilai Kelas 6</th>
                <th className="bg-gray-700 text-white px-4 py-2">Nilai ASPD</th>
                <th className="bg-blue-900 text-white px-4 py-2">Jumlah Nilai</th>
                <th className="bg-blue-900 text-white px-4 py-2">Rata-Rata Nilai</th>
              </tr>
              <tr>
                <th className="px-4 py-2"></th>
                <th className="bg-yellow-400 text-white px-4 py-2">SMT 1</th>
                <th className="bg-yellow-400 text-white px-4 py-2">SMT 2</th>
                <th className="bg-cyan-400 text-white px-4 py-2">SMT 1</th>
                <th className="bg-cyan-400 text-white px-4 py-2">SMT 2</th>
                <th className="bg-blue-500 text-white px-4 py-2">SMT 1</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grades.map((subject, index) => (
                <tr key={subject.subject}>
                  <td className="px-4 py-2 font-medium">{subject.subject}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.grades.class4.sem1}
                      onChange={(e) => handleGradeChange(index, "4-1", e.target.value)}
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.grades.class4.sem2}
                      onChange={(e) => handleGradeChange(index, "4-2", e.target.value)}
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.grades.class5.sem1}
                      onChange={(e) => handleGradeChange(index, "5-1", e.target.value)}
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.grades.class5.sem2}
                      onChange={(e) => handleGradeChange(index, "5-2", e.target.value)}
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.grades.class6.sem1}
                      onChange={(e) => handleGradeChange(index, "6-1", e.target.value)}
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subject.aspdScore}
                      onChange={(e) => handleGradeChange(index, "aspd", e.target.value)}
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {calculateSubjectSum(subject)}
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {calculateSubjectAverage(subject)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="px-4 py-2 text-right font-bold">
                  Total:
                </td>
                <td className="px-4 py-2 font-bold">
                  {grades.reduce((acc, curr) => acc + curr.aspdScore, 0).toFixed(2)}
                </td>
                <td className="px-4 py-2 font-bold">
                  {grades
                    .reduce((acc, curr) => acc + parseFloat(calculateSubjectSum(curr).toString()), 0)
                    .toFixed(2)}
                </td>
                <td className="px-4 py-2 font-bold">
                  {grades
                    .reduce(
                      (acc, curr) => acc + parseFloat(calculateSubjectAverage(curr)),
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-4 border-t">
            <div className="flex items-center gap-4 mb-4">
              <label className="font-medium">
                Tambahan Nilai Prestasi (jika ada):
              </label>
              <input
                type="number"
                value={additionalScore}
                onChange={(e) => setAdditionalScore(parseFloat(e.target.value) || 0)}
                className="w-32 p-2 border rounded"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold">SKOR TOTAL PPDB:</span>
              <span className="text-2xl font-bold text-blue-600">
                {totalScore.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;