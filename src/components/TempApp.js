import React, {useEffect, useState} from "react";
import "./css/style.css";


const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};


////startt::::---------

const Tempapp = () => {

    const [city, setCity] = useState(null);
    const[search, setSearch] = useState("Delhi");
    const [time,setTime] = useState(new Date());

    useEffect( () => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=49202f9cad5df6fe7c9df64f9839044a`
            const response = await fetch(url);
          
           const resJson = await response.json();
        //    console.log(resJson);
        setCity(resJson.main);

        }
        
        fetchApi();
        setInterval(()=>setTime(new Date()),1000)

    },[search] )
    return(
        <>
           <div className="box">
                <div className="inputData">
                    <input
                    type="search"
                    value = {search}
                    className="inputField" 
                      onChange= { (event) => { setSearch(event.target.value) }                    
                     }/>
                </div>
      
{!city ? (
    <p> Data NOT Found!</p>
)  : (
    <div>
    <div className="info">
    <h2 className="location">
    
    <i class="fa fa-location-arrow fa-fade fa-xs" aria-hidden="true"></i> {search}  
    {/* <i class="fa fa-globe fa-fade fa-xs" aria-hidden="true"></i>   {search}           */}
    {/* <i class="fa fa-map-marker fa-fade fa-xs" aria-hidden="true"></i> {search} */}
    {/* <i className="fa-solid fa-street-view fa-fade fa-xs" ></i> {search} */}
    </h2>
    <h1 className="temp">
    {city.temp} °C
    </h1>
    <h3 className="tempmin_max"> Min : {city.temp_min} °Cel | Max : {city.temp_max} °Cel

    </h3>
 
</div>

<div className="wave -one">  </div>
<div className="wave -two">  </div>
<div className="wave -three">  </div>

</div>
  
)}
      <div>
      <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time"><br />
                <p>{time.toLocaleTimeString()}</p>
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              </div>
      </div>
           </div>
           
        </>
    )
}


export default Tempapp;
 