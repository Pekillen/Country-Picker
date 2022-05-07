import { Button, Checkbox, Paper, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';

const CountryButton = ({country, setCountries}) => {
   const [isChecked, setIsChecked] = useState(country.checked);
 
    const handleSelect = () => {            //Make him rerender for godssake
          setIsChecked(prevIsChecked => !prevIsChecked);
          console.log(country.checked);
    };
  
        
    
  return (
    <Paper elevation={3} style={{ margin: 2 }}> 
        <FormGroup onChange={handleSelect}>          
        <FormControlLabel control={<Checkbox checked={isChecked} />} label={country.name}></FormControlLabel>  
        </FormGroup>                 
    </Paper>
  )
}

export default CountryButton;