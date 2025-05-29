import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='color-red-200'>
      Supplements-Client
      <button className='bg-blue-500 text-white p-2 rounded m-2 cursor-pointer'>Click</button>
    </div>
  )
}

export default App
