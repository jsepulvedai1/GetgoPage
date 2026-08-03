'use client';

import { useEffect } from 'react';

export default function SharePage() {
  useEffect(() => {
    // Intentar redirigir automáticamente a la tienda de apps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Configuración de enlaces
    const appStoreUrl = 'https://apps.apple.com/app/id6748690795';
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.getgoapp.pasajero';
    const fallbackUrl = 'https://www.getgo.cl';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      // Es iOS
      window.location.href = appStoreUrl;
    } else if (/android/i.test(userAgent)) {
      // Es Android
      window.location.href = playStoreUrl;
    } else {
      // Es Desktop u otro
      window.location.href = fallbackUrl;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center" style={{ fontFamily: 'sans-serif' }}>
      <h1 className="text-2xl font-bold mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>Abriendo GetGo...</h1>
      <p style={{ color: '#666' }}>Si la aplicación no se abre automáticamente, serás redirigido a la tienda para descargarla.</p>
    </div>
  );
}
