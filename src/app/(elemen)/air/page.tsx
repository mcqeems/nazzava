import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Fact from '@/components/water/Fact'
import Home from '@/components/water/Home'
import Impact from '@/components/water/Impact'
import Solution from '@/components/water/Solution'
import Threat from '@/components/water/Threat'
export const metadata = {
  title: 'Air - Nazzava', 
  description: 'Nazzava membantu kamu mengurangi jejak karbon dengan tips, artikel, dan alat interaktif untuk gaya hidup rendah emisi.',
}
export default function page() {
  return (
    <div className='font-poppins'>
      <Navbar/>
      <Home/>
      <Fact/>
      <Threat/>
      <Impact/>
      <Solution/>
      <Footer/>
    </div>
  )
}
