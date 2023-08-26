import React from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Box,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function SearchForm({
  addToHistory,
  weatherData,
  setWeatherData,
  city,
  setCity,
  country,
  setCountry,
  error,
  setError,
  snackbarOpen,
  setSnackbarOpen
}) {
  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const fetchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      )
      .then(response => {
        setWeatherData(response.data)
        setCity(response.data.name)
        setCountry(response.data.sys.country)
        addToHistory({
          city: response.data.name,
          country: response.data.sys.country,
          timestamp: new Date()
        })
        setError(null)
        setSnackbarOpen(true)
      })
      .catch(error => {
        setError(error.response.data.message)
        setWeatherData({})
      })
  }

  const clearForm = () => {
    setCity('')
    setCountry('')
    setWeatherData({})
    setError(null)
  }

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, mt: 3, backgroundColor: '#E3F0DF', borderRadius: '1rem' }}
    >
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={4}>
          <TextField
            label='City'
            placeholder='e.g. London, Tokyo'
            variant='outlined'
            fullWidth
            size='small'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Country'
            placeholder='e.g. GB, JP'
            variant='outlined'
            fullWidth
            size='small'
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <Button variant='contained' onClick={fetchWeather} fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Button variant='outlined' onClick={clearForm} fullWidth>
            Clear
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography variant='body1' align='center' color='error' sx={{ mt: 3 }}>
          Not Found
        </Typography>
      )}
      {weatherData.main && (
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: '.25rem'
          }}
        >
          <Typography variant='body1' color='text.secondary'>
            {weatherData.name}, {weatherData.sys.country}
          </Typography>
          <Typography
            variant='h4'
            sx={{
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {weatherData.weather[0].main}{' '}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt='weather icon'
              style={{
                filter:
                  'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
              }}
            />
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{
              textTransform: 'capitalize'
            }}
          >
            Description:{' '}
            {weatherData.weather.map(w => w.description).join(', ')}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Temperature: {weatherData.main.temp_min}°C ~{' '}
            {weatherData.main.temp_max}°C
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Humidity: {weatherData.main.humidity}%
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {new Date(weatherData.dt * 1000).toLocaleString()}
          </Typography>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        action={
          <IconButton
            size='small'
            color='inherit'
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          Weather fetched and added to history!
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default SearchForm
