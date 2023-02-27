import "./index.css"
import { apiStatusConstants } from "../Home"
import { useEffect, useState } from "react"
import Skeleton from '@mui/material/Skeleton';
import RefreshIcon from '@mui/icons-material/Refresh';


const FavouriteCitiesCard = (props) => {
    const [getWeatherApiStatus, setGetWeatherApiStatus] = useState(apiStatusConstants.initial)
    const [weatherData, setWeatherData] = useState({ current: {}, location: {}, forecast: {} })
    console.log(props.city, getWeatherApiStatus)

    const getWeatherReport = async (city) => {
        const url = `https://weatherapp-dk7n.onrender.com/weather?city=${city}&type=C`
        // const url = `http://localhost:4000/weather?city=${searchInput}&type=${isDeg ? "C" : "F"}`
        setGetWeatherApiStatus(apiStatusConstants.loading)
        try {
            const response = await fetch(url)
            if (response.ok) {
                const result = await response.json()
                setWeatherData(result[0])
                setGetWeatherApiStatus(apiStatusConstants.success)
            } else {
                setGetWeatherApiStatus(apiStatusConstants.failed)
            }

        } catch (err) {
            console.log(err)
            setGetWeatherApiStatus(apiStatusConstants.failed)
        }
    }

    useEffect(() => {
        getWeatherReport(props.city)
    }, [])

    const renderSuccessView = () => {
        return (
            <li className="eachCityCard d-flex m-2 rounded p-2 justify-content-between align-items-center">
                <h1 className="text-secondary h5 m-0">{props.city}</h1>
                <h1 className=" h4 m-0">{weatherData.current.temperature}<sup>o</sup></h1>
            </li>
        )
    }

    const renderLoadingView = () => (
        <div className="m-2">
            <Skeleton variant="rounded" sx={{ width: "100%" }} height={40} />
        </div>
    )

    const renderFailureView = () => (
        <div className="m-2 p-2 d-flex justify-content-between align-items-center">
            <h1 className="text-secondary h5">Oops failed to Fetch!</h1>
            <button className="btn" type="button" onClick={() => getWeatherReport(props.city)}><RefreshIcon /></button>
        </div>
    )

    const renderUI = () => {
        switch (getWeatherApiStatus) {
            case apiStatusConstants.success:
                return renderSuccessView();
            case apiStatusConstants.failed:
                return renderFailureView();
            case apiStatusConstants.loading:
                return renderLoadingView();
            default:
                return <></>;
        }
    }

    return (
        <>
            {renderUI()}
        </>
    )
}

export default FavouriteCitiesCard