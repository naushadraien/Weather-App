import './currentWeather.css'

const CurrentWeather = ({data}) => {
    return (
        <div className='weather'>
            <div className="top">
                <div>
                    {/* here {data.city} is used for showing the weather data for the typed city  */}
                <p className='city'>{data.city}</p>
                {/* Here  weather[0] is weather array in which weather description is if it is sunny, cloudy or some what*/}
                <p className='weather-desc'>{data.weather[0].description}</p>
                </div>
                <img src={`icons/${data.weather[0].icon}.png`} alt="weather" className='weather-icon' />
            </div>
            <div className="bottom">
                {/* Math.round(data.main.temp) rounds the temperature if it is given in points */}
                <p className='temp'>{Math.round(data.main.temp)}&deg;C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className='parameter-label top'>Details:-</span>
                    </div>
                    <div className="parameter-row">
                        <span className='parameter-label'>Feels like</span>
                        <span className='parameter-value'>{Math.round(data.main.feels_like)}&deg;C</span>
                    </div>
                    <div className="parameter-row">
                        <span className='parameter-label'>Wind</span>
                        <span className='parameter-value'>{data.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className='parameter-label'>Humidity</span>
                        <span className='parameter-value'>{data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className='parameter-label'>Pressure</span>
                        {/* hPa. Hectopascal- A unit of pressure equal to a millibar (1 hPa = 1 mb) */}
                        <span className='parameter-value'>{data.main.pressure} hpa</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;