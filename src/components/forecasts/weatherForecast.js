import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import "./weatherForecast.css"

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WeatherForecast = ({ data }) => {
    const dayinAWeek = new Date().getDay();
    // slice() is used to start the forcast for the next day till today
   const forecastDays =  weekDays.slice(dayinAWeek, weekDays.length).concat(weekDays.slice(0 , dayinAWeek));
    return (
        <>
            <label className="title">Daily Forecasts</label>
            {/* Accordian is a box which is used for hiding and showing the details when clicked on that */}
            <Accordion allowZeroExpanded>
                {/* Here {data.list.splice(0, 7)} is used for showing the forecast for 7 days  */}
                {/* Here map() is the method that is used to iterate on an array, more technically it invokes the provided callback function for every element of an array. */}
                {data.list.splice(0, 7).map((item, index) => (
                    // Here AccordionItem is the parent of childs AccordionItemHeading and AccordionItemPanel
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    {/* This data are copied from currentWeather.js in which instead of data.weather[0].icon}.png is written as item.weather[0].icon}.png */}
                                    <img src={`icons/${item.weather[0].icon}.png`} alt="weather" className="icon-small"/>
                                    <label className="day">{forecastDays[index]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}&deg;C / {Math.round(item.main.temp_max)}&deg;C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure:</label>
                                    <label>{item.main.pressure} hpa</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity:</label>
                                    <label>{item.main.humidity} %</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds:</label>
                                    <label>{item.clouds.all} %</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind Speed:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea Level:</label>
                                    <label>{item.main.sea_level} m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels Like:</label>
                                    <label>{Math.round(item.main.feels_like)} &deg;C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default WeatherForecast;