import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Fact from '@/components/dirt/Fact'
import Home from '@/components/dirt/Home'
import Impact from '@/components/dirt/Impact'
import Solution from '@/components/dirt/Solution'
import Threat from '@/components/dirt/Threat'
export const metadata = {
  title: 'Tanah - Nazzava', 
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
