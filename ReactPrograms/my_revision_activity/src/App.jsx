import { useState } from 'react'
<<<<<<< HEAD
//import Inventory from './components/Inventory';
import './App.css'

{/*function App() {
  const [count, setCount] = useState(0)

  return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-200">
      <Inventory />
    </div>
  );
}
export default App*/}

import EmployeeList from "./components/EmployeeList";
function App(){
  return (
    <div className='min-h-screen flex justify-center items-center bg-pink-100'>
  <EmployeeList/>
  </div>
  );
}
export default App
=======
import './App.css'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import Mainpart from './components/Mainpart'
import Category from './components/Category'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Mainpart />
      <Category/>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        <Card title="men polo crew neck T-shirt" price="299 " image="/Images/Tshirt.jpg"/>
        <Card title="Men fit polo Shirt" price="429" image="/Images/Shirt.jpg"/>
        <Card title="Women Short Skirt" price= "599" image ="/Images/Skirt.jpg"/>
      </section>
      <Footer />
    </>
  );
};
export default App;
>>>>>>> 40ed0b5a65c6fd433add663478fa587c70d24dbd
