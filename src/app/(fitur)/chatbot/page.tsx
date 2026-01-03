import Chatbot from "./Chatbot";
export const metadata = {
  title: 'Chatbot - Nazzava', 
  description: 'Berinteraksi dengan chatbot AI Nazzava untuk mendapatkan tips, informasi, dan saran tentang pengurangan jejak karbon dan gaya hidup ramah lingkungan.',
}
export default function page() {
  return(
    <div>
      <Chatbot/>
    </div>
  )
}