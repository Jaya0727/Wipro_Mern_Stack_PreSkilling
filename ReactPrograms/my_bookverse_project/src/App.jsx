import { useState } from 'react'
import Booklist from './components/Booklist'
import Bookcard from './components/Bookcard'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 text-center text-2xl font-bold">
        BookVerse 📚
      </header>

      <Booklist />
    </div>
  )
}
export default App;
