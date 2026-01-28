import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
        <Card title="Man T-shirt" price="100" />
        <Card title="Man Shirt" price="300" />
        <Card title="Woman Skirt" price="200" />
      </section>
      <Footer />
    </>
  );
};
export default App;