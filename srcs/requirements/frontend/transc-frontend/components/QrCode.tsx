'use client'
import { useEffect, useState } from 'react';

interface Props {
    userId: string,
}

const QRCodePage = ({userId}: Props) => {
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
      {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
    </div>
  );
};

export default QRCodePage;