import React, { useState } from 'react'
import SearchForm from './SearchForm'
import SearchHistory from './SearchHistory'
import { Container, Typography } from '@mui/material'

function App() {
  const [searchHistory, setSearchHistory] = useState([])
  const [weatherData, setWeatherData] = useState({})
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const addToHistory = historyEntry => {
    setSearchHistory([historyEntry, ...searchHistory])
  }

  const removeFromHistory = index => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index)
    setSearchHistory(updatedHistory)
  }

  return (
    <main>
      <Container sx={{ my: 6 }}>
        <Typography
          variant='h1'
          fontSize={36}
          fontWeight='bold'
          align='center'
          gutterBottom
        >
          Today's Weather
        </Typography>
        <SearchForm
          addToHistory={addToHistory}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          city={city}
          setCity={setCity}
          country={country}
          setCountry={setCountry}
          error={error}
          setError={setError}
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
        />
        <Typography variant='h5' align='center' gutterBottom sx={{ mt: 4 }}>
          Search History
        </Typography>
        {searchHistory.length > 0 ? (
          <SearchHistory
            history={searchHistory}
            removeFromHistory={removeFromHistory}
            setWeatherData={setWeatherData}
            setCity={setCity}
            setCountry={setCountry}
            setError={setError}
          />
        ) : (
          <Typography variant='body1' align='center' color='text.secondary'>
            No Record
          </Typography>
        )}
      </Container>
    </main>
  )
}

export default App
