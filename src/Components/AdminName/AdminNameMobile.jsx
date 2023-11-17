import React from "react";

const AdminNameMobile = () => {
  // Mengambil nama dari localStorage
  const userName = localStorage.getItem("user_name");

  // Mengatur clipPath untuk setengah jajar genjang dari kiri
  const customClipPath = "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)";
  const truncatedName = userName && userName.length > 10 ? `${userName.substring(0, 9)}...` : userName;

  const currentDate = new Date();
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("id-ID", options);

  return (
    <div className="w-full border shadow-md relative overflow-hidden flex mx-auto rounded-md bg-shite-600">
      <div className="w-6/12 bg-white-600 text-gray-600 p-3 justify-start font-semibold">
        <h1 className="text-ms">Hallo, {truncatedName}</h1>
      </div>
      <div
        className="w-6/12 bg-gray-600 text-white p-3 relative tracking-wider justify-end font-semibold"
        style={{ clipPath: customClipPath }}
      >
        <p className=" text-md1 text-right">{formattedDate}</p>
      </div>
    </div>
  );
};

export default AdminNameMobile;
