export interface GradeData {
  subject: string;
  grades: {
    class4: { sem1: number; sem2: number };
    class5: { sem1: number; sem2: number };
    class6: { sem1: number };
  };
  aspdScore: number;
}