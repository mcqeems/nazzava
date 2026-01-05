import TrashScanner from './components/TrashScanner';

export const metadata = {
  title: 'Scan - Nazzava',
  description:
    'Periksa dan analisis sampahmu menggunakan Nazzava Trash Analyzer, temukan jenis sampah, rekomendasi dan deskripsi dari sampahmu!',
};

export default function Page() {
  return <TrashScanner />;
}
