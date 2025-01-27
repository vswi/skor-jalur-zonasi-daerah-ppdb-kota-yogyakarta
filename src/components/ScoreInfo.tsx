interface ScoreInfoProps {
  totalScore: number;
}

const ScoreInfo = ({ totalScore }: ScoreInfoProps) => {
  return (
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
  );
};

export default ScoreInfo;