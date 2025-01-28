import { useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import { GradeData } from "@/types/grades";

const Calculator = () => {
  const [subjects, setSubjects] = useState<GradeData[]>([
    {
      subject: "Bahasa Indonesia",
      grades: {
        class4: { sem1: 0, sem2: 0 },
        class5: { sem1: 0, sem2: 0 },
        class6: { sem1: 0 },
      },
      aspdScore: 0,
    },
    {
      subject: "Matematika",
      grades: {
        class4: { sem1: 0, sem2: 0 },
        class5: { sem1: 0, sem2: 0 },
        class6: { sem1: 0 },
      },
      aspdScore: 0,
    },
    {
      subject: "IPA",
      grades: {
        class4: { sem1: 0, sem2: 0 },
        class5: { sem1: 0, sem2: 0 },
        class6: { sem1: 0 },
      },
      aspdScore: 0,
    },
  ]);

  const handleGradeChange = (subjectIndex: number, field: string, value: string) => {
    const newValue = value === "" ? "0" : value;
    const numericValue = parseInt(newValue);
    
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) return;

    const newSubjects = [...subjects];
    const subject = { ...newSubjects[subjectIndex] };

    if (field === "aspd") {
      subject.aspdScore = numericValue;
    } else {
      const [grade, semester] = field.split("-");
      const gradeKey = `class${grade}` as keyof typeof subject.grades;
      const semKey = `sem${semester}` as keyof (typeof subject.grades)[typeof gradeKey];
      
      subject.grades[gradeKey][semKey] = numericValue;
    }

    newSubjects[subjectIndex] = subject;
    setSubjects(newSubjects);
  };

  const calculateSubjectSum = (subject: GradeData): number => {
    const grades = subject.grades;
    return (
      grades.class4.sem1 +
      grades.class4.sem2 +
      grades.class5.sem1 +
      grades.class5.sem2 +
      grades.class6.sem1
    );
  };

  const calculateSubjectAverage = (subject: GradeData): string => {
    const sum = calculateSubjectSum(subject);
    return (sum / 5).toFixed(2);
  };

  const calculateTotalScore = (): string => {
    let totalSum = 0;
    let totalAspdSum = 0;

    subjects.forEach((subject) => {
      totalSum += calculateSubjectSum(subject);
      totalAspdSum += subject.aspdScore;
    });

    const averageRapor = totalSum / (5 * subjects.length);
    const averageAspd = totalAspdSum / subjects.length;
    const finalScore = (averageRapor * 0.7) + (averageAspd * 0.3);

    return finalScore.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Kalkulator Simulasi Skor PPDB SMP Negeri Sleman
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.subject}
              subject={subject}
              index={index}
              onGradeChange={handleGradeChange}
              calculateSubjectSum={calculateSubjectSum}
              calculateSubjectAverage={calculateSubjectAverage}
            />
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-center mb-2">Skor Akhir</h2>
          <p className="text-3xl font-bold text-center text-blue-600">
            {calculateTotalScore()}
          </p>
          <p className="text-sm text-gray-500 text-center mt-2">
            (70% Rata-rata Rapor + 30% Rata-rata ASPD)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;