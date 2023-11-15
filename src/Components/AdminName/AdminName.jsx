import React from "react";

const AdminName = () => {
  // Mengambil nama dari localStorage
  const userName = localStorage.getItem("user_name");

  // Mengatur clipPath untuk setengah jajar genjang dari kiri
  const customClipPath = "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)";

  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("id-ID", options);

  return (
    <div className="w-full border shadow-md relative overflow-hidden flex mx-auto rounded-md bg-shite-600">
      <div className="w-9/12 bg-white-600 text-gray-600 p-3 justify-start font-semibold">
        {/* Menampilkan nama dari localStorage */}
        <h1 className="text-lg">Hallo, {userName} ! ! !</h1>
      </div>
      <div
        className="w-3/12 bg-gray-600 text-white p-3 relative justify-end font-semibold"
        style={{ clipPath: customClipPath }}
      >
        {/* Menampilkan tanggal diformat di pojok kanan */}
        <p className="text-lg text-right">{formattedDate}</p>
      </div>
    </div>
  );
};

export default AdminName;
