import { Button, Checkbox, Paper, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';

const CountryButton = ({country}) => {
   const [isChecked, setIsChecked] = useState(country.checked);  
 
    const handleSelect = () => {    
      country.checked = !country.checked;
      setIsChecked(prevIsChecked => !prevIsChecked);         
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