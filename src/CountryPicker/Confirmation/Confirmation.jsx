import { Button, Grid, Paper, Typography, ListItemText, Box } from '@mui/material'
import React from 'react';

const ConfirmationList = ({countries, setShowConfirmation, setSearchQuery}) => {

  const EmptyList = () => (
    <div>
      <Typography variant='h5' align="center" margin={2} >Whoops! It seems like your country list is empty!</Typography> 
      <Typography variant='h6' align="center" margin={2} >Please go back and choose some countries</Typography>
    </div>        
  );

  const PopulatedList = () => (
    <Grid >
      <Typography variant='h5' align="center" marginBottom={2} >{`You have chosen ${numberOfCountries} countries.`}</Typography>     
      <Grid container>
        {countries.map((country) => {          
          if (country.checked) return (
            <Grid item key={country.alpha3Code} xs={12} sm={12} md={6} lg={3} xl={2} >                
              <ListItemText>{country.name}</ListItemText>                                                        
            </Grid> 
            );
        })}
      </Grid>
    </Grid>
  );
  
  const areChecked = countries.map((country) => {return country.checked});

  const isAnyTrue = !areChecked.every(checked => !checked);   

  const numberOfCountries = areChecked.filter(Boolean).length;

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="top" style={{ minHeight: '100vh' }} >   
      <Paper elevation={12} style={{ padding: '20px', borderRadius: '15px' , width: ' 60vw'}} >  
      <Typography variant='h4' align="center" marginBottom={2} >List of the selected countries:</Typography>    
      
        <Grid container marginBottom={4} spacing={4} >
            <Grid container item xs justifyContent="center" >
              <Button fullWidth onClick={() => {setShowConfirmation(false); setSearchQuery("")}} variant="contained" color="secondary" >Go back to country picker</Button>
            </Grid>
            <Grid container item xs justifyContent="center" >
              <Button fullWidth onClick={() => alert(`Thank You! You have chosen ${numberOfCountries} countries.`)} variant="contained" disabled={!isAnyTrue} >Confirm</Button>
            </Grid>                    
        </Grid>     

      {!isAnyTrue ? <EmptyList /> : <PopulatedList/> }     
        
      </Paper>
    </Grid>   
  )
}

export default ConfirmationList;