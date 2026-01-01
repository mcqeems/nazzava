import Solution from '@/components/home/Solution'
import Accordion from '@/components/home/Accordion'
import Article from '@/components/home/Article'
import Category from '@/components/home/Category'
import Graphic from '@/components/home/Graphic'
import Welcome from '@/components/home/Welcome'
import Navbar from '@/components/Navbar'
import Chatbot from '@/components/home/Chatbot'
import Game from '@/components/home/Game'
import Footer from '@/components/Footer'
export const metadata = {
  title: 'Nazzava - Beranda', 
  description: 'Nazzava membantu kamu mengurangi jejak karbon dengan tips, artikel, dan alat interaktif untuk gaya hidup rendah emisi.',
}

export default function page() {
  return (
    <div className='font-poppins'>
      <Navbar/>
      <Welcome/>
      <Accordion/>
      <Chatbot/>
      <Article/>
      <Category/>
      <Graphic/>
      <Game/>
      <Solution/>
      <Footer/>
    </div>
  )
}
