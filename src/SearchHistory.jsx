import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Box
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

function SearchHistory({
  history,
  removeFromHistory,
  setWeatherData,
  setCity,
  setCountry,
  setError
}) {
  const [fetchingIndex, setFetchingIndex] = useState(null)
  const fetchWeather = (city, country) => {
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
        setError(null)
      })
      .catch(error => {
        console.error(error)
        setWeatherData({})
      })
  }

  const handleFetch = (city, country, index) => {
    setFetchingIndex(index)
    fetchWeather(city, country)
    setError(null)
  }

  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: '#E3F0DF', borderRadius: '1rem' }}
        elevation={3}
      >
        <Table>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell>
                  {entry.city}, {entry.country}
                </TableCell>
                <TableCell align='right'>
                  {entry.timestamp.toLocaleTimeString()}
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    size='small'
                    onClick={() =>
                      handleFetch(entry.city, entry.country, index)
                    }
                    disabled={fetchingIndex === index}
                  >
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() => removeFromHistory(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SearchHistory
