import { Button } from '@/components/ui/button';
import ButtonAuth from '@/components/ui/buttonAuth';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Navbar2';

function HomePage() {
  //<Sidebar />
  return (
    <div>
      <Navbar />
      <h1>Hola Mundo</h1>
      <ButtonAuth />
    </div>
  )
}

export default HomePage;