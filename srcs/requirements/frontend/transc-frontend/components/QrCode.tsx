'use client'
import { useEffect, useState } from 'react';

interface Props {
    userId: string,
    blur: string,
}

const QRCodePage = ({userId, blur}: Props) => {
  const [qrCodeData, setQRCodeData] = useState('');
  
  useEffect(() => {
    fetchQRCodeData();
  }, []);

  const fetchQRCodeData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/2fa/generate?userId=${userId}`, {
        method: 'Post',
      });
      const qrCodeData = await response.json();
      setQRCodeData(qrCodeData);
    } catch (error) {
      console.error('Error fetching QR code data:', error);
    }
  };

  return (
    <div>
      {qrCodeData && <img className={`${blur}`} src={qrCodeData} alt="QR Code" />}
    </div>
  );
};

export default QRCodePage;