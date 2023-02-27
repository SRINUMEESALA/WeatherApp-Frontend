import "./index.css"

const CurrentDayWeatherCard = (props) => {
    const { temperature, humidity, windspeed, skytext } = props.currentDayData
    const { location, isDeg } = props
    return (
        <div className=" border rounded shadow">
            <div className="currentWeatherCon d-flex flex-column justify-content-center">
                <div className="pl-4  detCon">
                    <h1 className="mb-3 h6">{location.name}</h1>
                    <div className="d-flex">
                        <h1 className="mb-3 h1">{temperature}</h1>
                        <p className="font-weight-bold degClass">o{isDeg ? "C" : "F"}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="text-secondary">Wind Speed </p>
                        <p className="font-weight-bold">{windspeed}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="text-secondary">Humidity </p>
                        <p className="font-weight-bold">{humidity}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-secondary">Sky</p>
                        <p className="font-weight-bold">{skytext}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CurrentDayWeatherCard