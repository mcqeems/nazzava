import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Fact from '@/components/air/Fact'
import Home from '@/components/air/Home'
import Impact from '@/components/air/Impact'
import Solution from '@/components/air/Solution'
import Threat from '@/components/air/Threat'
export const metadata = {
  title: 'Udara - Nazzava', 
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
