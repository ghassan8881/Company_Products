"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRCodeComponent() {
  const [qrUrl, setQrUrl] = useState("");
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(
    "🚀 ~ QRCodeComponent ~ process.env.NEXT_PUBLIC_BASE_URL:",
    process.env.NEXT_PUBLIC_BASE_URL
  );

  useEffect(() => {
    QRCode.toDataURL(url)
      .then((dataUrl) => setQrUrl(dataUrl))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        مسح QR Code للوصول للمنتجات
      </h2>
      {qrUrl ? (
        <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
      ) : (
        <p>جارٍ توليد QR Code...</p>
      )}
      <p className="mt-2 text-gray-500 text-sm">{url}</p>
    </div>
  );
}
