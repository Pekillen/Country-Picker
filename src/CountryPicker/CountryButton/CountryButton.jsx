import { Button, Checkbox, Paper, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';

const CountryButton = ({selectedCountry, setCountries}) => {   

    const handleSelect = () => {        
      setCountries((prevState) => {
        const newCountries = [...prevState]; 
        const countryToChange = newCountries.find((country) => country.alpha3Code === selectedCountry.alpha3Code) 
        countryToChange.checked = !countryToChange.checked;          
        return newCountries;  
      })          
    };
  
        
    
  return (
    <Paper elevation={selectedCountry.checked ? 24 : 3} style={{ margin: 2 }}> 
        <FormGroup onChange={handleSelect} >          
        <FormControlLabel control={<Checkbox checked={selectedCountry.checked} />} label={selectedCountry.name}></FormControlLabel>  
        </FormGroup>                 
    </Paper>
  )
}

export default CountryButton;