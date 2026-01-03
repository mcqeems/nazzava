import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Fact from '@/components/tree/Fact'
import Home from '@/components/tree/Home'
import Impact from '@/components/tree/Impact'
import Solution from '@/components/tree/Solution'
import Threat from '@/components/tree/Threat'
export const metadata = {
  title: 'Pohon - Nazzava', 
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
