import "./index.css"
import TextField from '@mui/material/TextField';
import { useMemo, useState } from "react";
import FavouriteCitiesCard from "../FavouriteCitiesCard";
import { v4 as uuidv4 } from "uuid"



const FavouriteCities = () => {
    const [input, setInput] = useState("")
    const [cities, setCities] = useState([])


    const renderCitiesList = () => (
        <ul className="list-unstyled pt-4">
            {cities.map(city => <FavouriteCitiesCard city={city} key={uuidv4()} />)}
        </ul>
    )

    const renderCitiesListMemo = useMemo(() => renderCitiesList(), [cities])

    const renderEmptyView = () => (
        <div className="text-secondary d-flex justify-content-center align-items-center h-75">
            <h1 className="h4">No Fav's Yet?</h1>
        </div>
    )

    return (
        <div className="h-100 p-3 favCon bg-white rounded">
            <div className="d-flex justify-content-center ">
                <TextField id="standard-basic" label="Enter Your Fav City" variant="standard" className="mr-3" value={input} onChange={(event) => setInput(event.target.value)} />
                <button className="btn btn-primary float-right align-self-end" onClick={() => {
                    setCities([input, ...cities])
                    setInput("")
                }}>Add City</button>
            </div>
            {cities.length === 0 ? renderEmptyView() : renderCitiesListMemo}
        </div>
    )
}

export default FavouriteCities