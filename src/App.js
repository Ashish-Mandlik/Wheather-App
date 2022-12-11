
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const currentDates = new Date();
  const today=currentDates.getUTCDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month=months[currentDates.getMonth()];
  let year=currentDates.getFullYear()
  let currentDate = `${today} - ${month} - ${year}`
  let currentTime=new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
  

  const [searchValue,setSearchValue]=useState("pune")
  const [info,setInfo]=useState({})
  
  const getWeatherInfo= async()=>{
    try {

      let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3cc0bf6fa2bb4ac57c57a286b32e61b6`
      let res= await fetch(url)
      let data= await res.json()
      const {temp ,humidity,pressure}=data.main
      const{main:weatherMood}=data.weather[0]
      const {name}=data
      const {speed}=data.wind
      const {country ,sunset}=data.sys
      // console.log(temp)
      const myWeatherInfo ={
        temp ,humidity,pressure,weatherMood,name,speed,country ,sunset
      }
      setInfo(myWeatherInfo)


    } catch (error) {
        console.log(error)
    }
  }
  
  useEffect(()=>{
    getWeatherInfo();
  },[])

  let sec=info.sunset
  let date=new Date(sec *1000)
  let timeStr=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  
  return (

    <div className="container">
      
      <div className='search-conatainer'>
        
        <input type="text" className="serach-box "  placeholder='    Enter City Name...' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} />
        <button type="button" className='btn bn5' onClick={getWeatherInfo}>
          <span><i className="fa-solid fa-magnifying-glass"></i></span>
        </button>
      </div>


      <div className='heading'>
        <p>Forecast</p>
      </div>


      
      <div className='forecast-box'>
        <div className='left-box'>
          <div className='flex-1'>
            <p> <i className="fa-solid fa-location-dot ">&nbsp; &nbsp;{info.name},&nbsp;{info.country}</i></p>  
          </div>
          <div className='flex-2'>
            <p className=''>{info.temp}&deg;</p>
          </div>   
        </div>
        <div className='middle-box'>
          <div className='flex-3'>
            <p>{info.weatherMood}</p>
          </div>
          <div className='flex-4'>
            <p>
              {/* <i className="fa-solid fa-cloud"></i> */}
            </p>
          </div>
        </div>
        <div className='right-box'>
          <div className='flex-5'>
            <p>{currentDate}</p>
          </div>
          <div className='flex-6'>
            <p>{currentTime}</p>
          </div>  
        </div>
      </div>


      <div className='prop'>
        <div className='heading-1'><span className='op'>Sunset</span></div>
        <div className='heading-1'><span className='op'>Humidity</span></div>
        <div className='heading-1'><span className='op'>Pressure</span></div>
        <div className='heading-1'><span className='op'>Speed</span></div>
      </div>

      <div className='feature'>
        
        
        <div className='one'>
          <div className='text-1'>
            <p> {timeStr}<br />  </p>
          </div>
          <div className='logo-1'>
            <p><i className="fa-regular fa-sun"></i></p>
          </div>  
        </div>

        <div className='two'>
          <div className='text-1'>
            <p>{info.humidity} </p>
          </div>
          <div className='logo-1'>
            <p><i className="fa-solid fa-water"></i></p>
          </div>  
        </div>

        <div className='three'>
          <div className='text-1'>
            <p> {info.pressure} </p>
          </div>
          <div className='logo-1'>
            <p><i className="fa-solid fa-cloud-rain"></i></p>
          </div>  
        </div>

        <div className='four'>
          <div className='text-1'>
            <p>{info.speed} <br/></p>
          </div>
          <div className='logo-1'>
            <p><i className="fa-solid fa-wind"></i></p>
          </div>  
        </div>
        
      </div>
      
      
    </div>
  );
}

export default App;
