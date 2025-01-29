const Instructions = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
      <h2 className="font-semibold text-blue-800 mb-2">Petunjuk Penggunaan:</h2>
      <ol className="list-decimal list-inside text-blue-700 space-y-1">
        <li>Isikan nilai rapor untuk setiap mata pelajaran di setiap semester</li>
        <li>Masukkan nilai ASPD untuk setiap mata pelajaran</li>
        <li>Jika ada, tambahkan nilai prestasi pada kolom yang tersedia</li>
        <li>Skor Total PPDB Sleman akan dihitung secara otomatis</li>
      </ol>
    </div>
  );
};

export default Instructions;
