import "./index.css"

const ForecastItem = (props) => {
    const { eachCard } = props
    const { shortday, low, high, skytextday, date } = eachCard
    const dateObj = new Date(date)
    return (
        <li className="dayForecastConParentCon m-2 text-white">
            <div className="dayForecastCon p-2">
                <p className=" text-center">{`${shortday} ${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`}</p>
                <p className="text-center forecastSky">{skytextday}</p>
                <div className="d-flex justify-content-between">
                    <p className="pl-2">{high}<sup>o</sup></p>
                    <p className="pr-2">{low}<sup>o</sup></p>
                </div>
            </div>
        </li>
    )
}

export default ForecastItem