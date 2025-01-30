interface ScoreInfoProps {
  totalScore: number;
}

const ScoreInfo = ({ totalScore }: ScoreInfoProps) => {
  return (
    <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
      <p className="font-semibold mb-2">* SKOR TOTAL PPDB Kodya Yogyakarta adalah gabungan:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>(Total Nilai ASPD × 80%)</li>
        <li>(Total Rata-Rata Rapor × 20%)</li>
        <li>Nilai Prestasi (Jika Ada)</li>
      </ul>
      <p className="mt-2">
        Berdasarkan JUKNIS PPDB RTO SMP NEGERI KOTA YOGYAKARTA 2024-2025 di {" "}
        <a 
          href="https://drive.google.com/file/d/18fIYI5ccz6zbLJUYuo1tLlN7IRZ3JT-U/view?usp=sharing"
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