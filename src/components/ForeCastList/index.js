import ForecastItem from "../ForecastItem"
import "./index.css"
import { v4 as uuidv4 } from "uuid"

const ForecastList = (props) => {
    const { forecast } = props
    return (
        <div className="forecastCon mt-5">
            <h1 className="h3 text-warning">Weekly Forecast</h1>
            <ul className="list-unstyled d-flex justify-content-between">
                {forecast.map(obj => <ForecastItem key={uuidv4()} eachCard={obj} />)}
            </ul>
        </div>
    )
}

export default ForecastList