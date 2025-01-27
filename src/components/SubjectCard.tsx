import { GradeData } from "@/types/grades";

interface SubjectCardProps {
  subject: GradeData;
  index: number;
  onGradeChange: (subjectIndex: number, field: string, value: string) => void;
  calculateSubjectSum: (gradeData: GradeData) => number;
  calculateSubjectAverage: (gradeData: GradeData) => string;
}

const SubjectCard = ({
  subject,
  index,
  onGradeChange,
  calculateSubjectSum,
  calculateSubjectAverage,
}: SubjectCardProps) => {
  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = '';
  };

  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{subject.subject}</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Kls 4 SMT 1</label>
          <input
            type="number"
            min="0"
            max="100"
            value={subject.grades.class4.sem1}
            onChange={(e) => onGradeChange(index, "4-1", e.target.value)}
            onFocus={handleInputFocus}
            className="w-24 p-1 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Kls 4 SMT 2</label>
          <input
            type="number"
            min="0"
            max="100"
            value={subject.grades.class4.sem2}
            onChange={(e) => onGradeChange(index, "4-2", e.target.value)}
            onFocus={handleInputFocus}
            className="w-24 p-1 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Kls 5 SMT 1</label>
          <input
            type="number"
            min="0"
            max="100"
            value={subject.grades.class5.sem1}
            onChange={(e) => onGradeChange(index, "5-1", e.target.value)}
            onFocus={handleInputFocus}
            className="w-24 p-1 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Kls 5 SMT 2</label>
          <input
            type="number"
            min="0"
            max="100"
            value={subject.grades.class5.sem2}
            onChange={(e) => onGradeChange(index, "5-2", e.target.value)}
            onFocus={handleInputFocus}
            className="w-24 p-1 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Kls 6 SMT 1</label>
          <input
            type="number"
            min="0"
            max="100"
            value={subject.grades.class6.sem1}
            onChange={(e) => onGradeChange(index, "6-1", e.target.value)}
            onFocus={handleInputFocus}
            className="w-24 p-1 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Nilai ASPD</label>
          <input
            type="number"
            min="0"
            max="100"
            value={subject.aspdScore}
            onChange={(e) => onGradeChange(index, "aspd", e.target.value)}
            onFocus={handleInputFocus}
            className="w-24 p-1 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Jumlah Nilai Rapor</label>
          <span className="font-medium">{calculateSubjectSum(subject)}</span>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Rata-Rata Nilai Rapor</label>
          <span className="font-medium">{calculateSubjectAverage(subject)}</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;