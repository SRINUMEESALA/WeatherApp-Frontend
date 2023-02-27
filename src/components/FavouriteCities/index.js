import "./index.css"
import TextField from '@mui/material/TextField';
import { useState } from "react";
import FavouriteCitiesCard from "../FavouriteCitiesCard";
import { v4 as uuidv4 } from "uuid"

const FavouriteCities = () => {
    const [input, setInput] = useState("")
    const [cities, setCities] = useState([])
    console.log(cities)
    return (
        <div className="h-100 p-3 favCon bg-white rounded">
            <div className="d-flex justify-content-center ">
                <TextField id="standard-basic" label="Enter Your Fav City" variant="standard" className="mr-3" value={input} onChange={(event) => setInput(event.target.value)} />
                <button className="btn btn-primary float-right align-self-end" onClick={() => {
                    setCities([...cities, input])
                    setInput("")
                }}>Add City</button>
            </div>
            <ul className="list-unstyled pt-4">
                {cities.map(city => <FavouriteCitiesCard city={city} key={uuidv4()} />)}
            </ul>
        </div>
    )
}

export default FavouriteCities