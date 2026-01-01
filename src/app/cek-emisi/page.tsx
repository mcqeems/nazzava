import CekEmisi from "./CekEmisi";
export const metadata = {
  title: 'Cek Emisi - Nazzava', 
  description: 'Hitung dan pantau jejak karbon kamu dengan alat cek emisi interaktif dari Nazzava untuk gaya hidup ramah lingkungan.',
}

export default function page() {
  return <div>
    <CekEmisi />
  </div>;
}
