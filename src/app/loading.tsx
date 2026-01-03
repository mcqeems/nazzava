import EarthLoader from '@/components/EarthLoader';

function loading() {
  return (
    <div className="bg-background flex items-center justify-center w-full h-dvh">
      <EarthLoader />
    </div>
  );
}

export default loading;
