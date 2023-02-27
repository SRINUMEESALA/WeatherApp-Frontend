import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import "./index.css"
import { useEffect, useState } from 'react';
import Weather from '../Weather';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '16ch',
            '&:focus': {
                width: '22ch',
            },
        },
    },
}));

export const apiStatusConstants = {
    initial: "initial",
    loading: "loading",
    success: "Successful",
    failed: "failed"
}

const Home = () => {
    const [searchInput, setSearchInput] = useState("Delhi")
    const [isSearching, setIsSearching] = useState(false)
    const [getWeatherApiStatus, setGetWeatherApiStatus] = useState(apiStatusConstants.initial)
    const [weatherData, setWeatherData] = useState({ current: {}, location: {}, forecast: {} })
    const [isDeg, setIsDeg] = useState(true)
    console.log(getWeatherApiStatus)

    const getWeatherReport = async () => {
        const url = `https://weatherapp-dk7n.onrender.com/weather?city=${searchInput}&type=${isDeg ? "C" : "F"}`
        // const url = `http://localhost:4000/weather?city=${searchInput}&type=${isDeg ? "C" : "F"}`
        setGetWeatherApiStatus(apiStatusConstants.loading)
        try {
            const response = await fetch(url)
            if (response.ok) {
                const result = await response.json()
                setWeatherData(result[0])
                setGetWeatherApiStatus(apiStatusConstants.success)
                setIsSearching(false)
                setSearchInput("")
            } else {
                setGetWeatherApiStatus(apiStatusConstants.failed)
                setIsSearching(false)
            }

        } catch (err) {
            console.log(err)
            setGetWeatherApiStatus(apiStatusConstants.failed)
            setIsSearching(false)
        }
    }

    useEffect(() => {
        getWeatherReport()
    }, [isDeg])

    const onClickSearchButton = (event) => {
        setIsSearching(true)
        getWeatherReport()
    }

    const renderWeatherHeader = () => {
        const { date, shortday } = weatherData.current
        const dateNew = new Date(date)
        return (
            <div className="headerCon d-flex justify-content-between align-items-start">
                <div className="logoCon">
                    <h1 className="text-warning h2 weatherHeading">Weather</h1>
                    <p className="lightTextColor text-center">{`${shortday} ${dateNew.getDate()}.${dateNew.getMonth() + 1}.${dateNew.getFullYear()}`}</p>
                </div>
                <div className="searchCon d-flex align-items-start">
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={isDeg} onClick={() => setIsDeg(!isDeg)} />} label={isDeg ? "C" : "F"} />
                    </FormGroup>
                    <Search onChange={(event) => setSearchInput(event.target.value)} value={searchInput} >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Delhi"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {isSearching ?
                        (<LoadingButton
                            endIcon={<SendIcon />}
                            loading={true}
                            loadingPosition="end"
                            variant="contained"
                            className='border text-secondary ml-2'
                        >
                            <span>Searching..</span>
                        </LoadingButton>) :
                        (<Button variant="contained" onClick={onClickSearchButton} className="ml-2">Search</Button>)}

                </div>
            </div>
        )
    }
    const renderSuccessView = () => (
        <Weather weatherData={weatherData} isDeg={isDeg} />
    )

    const renderFailureView = () => (
        <div className='d-flex justify-content-center align-items-center failureCon'>
            <div className='text-center col-6 bg-white rounded p-3'>
                <img alt='' className='w-75 mb-3' src='https://img.freepik.com/premium-vector/computer-repair-illustration_1284-64458.jpg?w=826' />
                <h1 className='text-secondary h4 mb-3'>Due to heavy traffic, API requests to Server failing.Kindly click on Retry button or Refresh the page.</h1>
                <small className='text-secondary'>Try checking the spelling of city name you entered.</small><br></br>
                <Button variant="outlined" className='mt-3' onClick={getWeatherReport}>Retry</Button>
            </div>
        </div>
    )

    const renderLoadingView = () => (
        <div className=''>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )

    const renderUi = () => {
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
        <div className="homeCon d-flex justify-content-center p-3 text-white">
            <div className="contentCon">
                {renderWeatherHeader()}
                {renderUi()}
            </div>
        </div>
    )
}

export default Home