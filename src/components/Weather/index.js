import CurrentDayWeatherCard from "../CurrentDayWeatherCard"
import FavouriteCities from "../FavouriteCities"
import ForecastList from "../ForeCastList"
import "./index.css"


const Weather = (props) => {
    return (
        <>
            <div className='d-flex mt-3 justify-content-between'>
                <div className='col-5 p-0'>
                    <CurrentDayWeatherCard currentDayData={props.weatherData.current} location={props.weatherData.location} isDeg={props.isDeg} />
                </div>
                <div className='favCities col-5 p-0'>
                    <FavouriteCities />
                </div>
            </div>
            < ForecastList forecast={props.weatherData.forecast} />
        </>
    )
}

export default Weather