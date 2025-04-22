import { useState } from 'react'
import axios from 'axios'
import Searchbar from './components/Searchbar'
import Weathercard from './components/Weathercard'

function App() {
  const [count, setCount] = useState(0)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const API_KEY = import.meta.env.VITE_API_KEY

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try{
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`
      const response = await axios.get(url)
      console.log(response.data)
      setWeather(response.data)
    } catch(err){
      if(err.response && err.response.status == 404){
        setError('City Not Found. Please Try Again Later !')
      }
      else{
        setError('Please Try Again Later !')
      }
      setWeather(null)
    } finally{
      setLoading(false)
    }
  }

  return (
   <div className='min-h-screen flex flex-col items-center justify-center  bg-blue-100'>
    <div className='bg-black/90 text-white rounded-lg shadow-lg p-8 max-w-md w-full'>
    <h1 className='text-3xl font-bold text-center mb-6'>Weather App</h1>
    <Searchbar fetchWeather = {fetchWeather} />
    {loading && <p className='text-center mt-4'>Loading ...</p>}
    {weather && <Weathercard weather = 
    {weather} />}
    {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
    </div>

   </div>
  )
}

export default App
