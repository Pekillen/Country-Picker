import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, FormControl, ListItemText, Checkbox, Paper, CircularProgress, OutlinedInput, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import CountryButton from './CountryButton/CountryButton';    
import LoadingPaper from './LoadingPaper/LoadingPaper';
import Confirmation from './Confirmation/Confirmation';


const CountryPicker = () => {    

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState([true]);       
    const [searchQuery, setSearchQuery] = useState("");
    const [regions, setRegions] = useState([]);
    const [subRegions, setSubRegions] = useState([]);    
    const [regionButton, setRegionButton] = useState(true);
    const [subRegionButton, setSubRegionButton] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    

    const fetchCountries = async () => {
        fetch('https://restcountries.com/v2/all')
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
            })
            .then(data => {                
                setCountries([...data].map((object) => ({ checked: false, ...object })));                                
            })                                           
            .catch(error => {
                console.log(error.message);
            })            
            .finally(() => {                
                setLoading(false);                
            });          
        }     
      
        
    const handleRegion = (event) => {
        const eValue = event.target.value;

        if (!regions.includes(eValue)){
        setRegions([...regions, eValue]);
        } 
        else {
        const filteredRegions = regions.filter((region) => region !== eValue);
        setRegions(filteredRegions);
        }       
    }  

    const handleSubRegion = (event) => {
        const eValue = event.target.value;                

        if (!subRegions.includes(eValue)){
        setSubRegions([...subRegions, eValue]);
        } 
        else {
        const filteredSubRegions = subRegions.filter((subregion) => subregion !== eValue);
        setSubRegions(filteredSubRegions);
        }       
    }   

    const selectAllRegions = () => {
        if (regions.toString() === "" ) {  
            setRegions(continents);                                  
        }  else {
            setRegions([]);                      
        }
    }     
    
    const handleRegionButtonState = () => {
        if (regions.toString() === "") {                
            setRegionButton(true);        
        } else {           
            setRegionButton(false);
        }
    }

    const selectAllSubRegions = () => {     
        if (subRegions.toString() === "") {   
            setSubRegions(filteredSubContinents)
        } else {
            setSubRegions([]);        
            }        
        }

    const handleSubRegionButtonState = () => {  
            if (subRegions.toString() === "") {                
                setSubRegionButton(true);        
            } else {           
                setSubRegionButton(false);
            }
        }
        
         const searchFilter = (value) => {        
               if (searchQuery == "") {
                   return true
               } else if (value.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                   return true
               }       
         };
    
         const regionFilter = (value) => {        
           if (regions == "") {
               return true
           } else if (regions.join(" ").includes(value.region)) {
               return true
           }        
         };
    
         const subRegionFilter = (value) => {        
               if (subRegions == "") {
                   return true
               } else if (subRegions.join(" ").includes(value.subregion)) {                    
                   return true
               }        
         };       
         
        
      const initContinents = countries.map(country => country.region);
      const continents = [...new Set(initContinents)];           

      const filteredInitSubContinents = countries.filter(regionFilter).map(country => country.subregion); 
      const filteredSubContinents = [...new Set(filteredInitSubContinents)]; 

      
      const handleCheckSelected = () => {                 
          countries.filter(subRegionFilter).filter(regionFilter).filter(searchFilter).map((selectedCountry) => {
            setCountries((prevState) => {
                const newCountries = [...prevState]; 
                const countryToChange = newCountries.find((country) => country.alpha3Code === selectedCountry.alpha3Code) 
                countryToChange.checked = true;          
                return newCountries;  
              })                        
            })         
            
      };
        
      const handleClearSelected = () => {        
            countries.filter(subRegionFilter).filter(regionFilter).filter(searchFilter).map((selectedCountry) => {
                setCountries((prevState) => {
                    const newCountries = [...prevState]; 
                    const countryToChange = newCountries.find((country) => country.alpha3Code === selectedCountry.alpha3Code) 
                    countryToChange.checked = false;          
                    return newCountries;  
                  })            
            })                     
      };
        
      const handleClearAll = () => {             
            countries.map((selectedCountry) => {
                setCountries((prevState) => {
                    const newCountries = [...prevState]; 
                    const countryToChange = newCountries.find((country) => country.alpha3Code === selectedCountry.alpha3Code) 
                    countryToChange.checked = false;          
                    return newCountries;  
                  })            
            })                        
      };
        
        useEffect(() => {            
            fetchCountries();        
        }, []);   
        
        useEffect(() => {
        handleRegionButtonState();   
        handleSubRegionButtonState();    
        },[selectAllRegions, selectAllSubRegions])             


  if (!showConfirmation) return ( loading ? <LoadingPaper /> :
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="top" style={{ minHeight: '100vh' }} >   
            <Paper elevation={12} style={{ padding: '20px', borderRadius: '15px' , width: ' 60vw'}} >  
            <Typography variant='h4' align="center" marginBottom={2} >Country Picker</Typography>           
                <TextField fullWidth id="outlined-search" label="Search for a country..." type="search" onChange={(e) => {setSearchQuery(e.target.value)}}/>               

                <Grid container justifyContent="center" alignItems="center" spacing={2} paddingTop={3} paddingBottom={4}>
                    <Grid container item justifyContent="space-evenly" alignItems="center" sm={12} md={6} spacing={1} >
                        <Grid item> 
                            <FormControl sx={{width: 180}}>
                                <InputLabel id="region">Region</InputLabel>
                                    <Select fullWidth labelId="region" onChange={handleRegion} value="" input={<OutlinedInput multiple label="All Regions" />}>
                                        {continents.map((continent) => 
                                            <MenuItem key={continent} value={continent}>                     
                                                <ListItemText primary={continent} />   
                                                <Checkbox checked={regions.includes(continent)} />                 
                                            </MenuItem>               
                                        )}                
                                    </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button onClick={selectAllRegions} variant="contained" color={regionButton ? 'primary' : 'secondary'} >{regionButton ? 'Select all regions' : 'Deselect all regions'}</Button>
                        </Grid>
                    </Grid>
                    <Grid container item justifyContent="space-evenly" alignItems="center" sm={12} md={6} spacing={1}>
                        <Grid item>
                            <FormControl sx={{width: 180}} >
                                <InputLabel id="subregion">Subregion</InputLabel>
                                <Select fullWidth labelId="subregion" onChange={handleSubRegion} value="" input={<OutlinedInput multiple label="All Subregions" />}>
                                    {filteredSubContinents.map((subContinent) => 
                                        <MenuItem key={subContinent} value={subContinent}>                     
                                            <ListItemText primary={subContinent} />   
                                            <Checkbox checked={subRegions.includes(subContinent)} />                 
                                        </MenuItem>               
                                    )}                
                                </Select>
                            </FormControl>
                        </Grid> 
                        <Grid item>
                            <Button onClick={selectAllSubRegions} variant="contained" color={subRegionButton ? 'primary' : 'secondary'}>{subRegionButton ? 'Select all subregions' : 'Deselect all subregions'}</Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container marginBottom={4} spacing={4} >
                    <Grid container item xs justifyContent="center" >
                        <Button onClick={handleCheckSelected} variant="contained" >Check all filtered countries</Button>
                    </Grid>
                    <Grid container item xs justifyContent="center" >
                        <Button onClick={handleClearSelected}  variant="contained" color="secondary" >Uncheck all filtered countries</Button>
                    </Grid>
                    <Grid container item xs justifyContent="center" >
                        <Button onClick={handleClearAll}  variant="contained" color="secondary" >Clear all checked countries</Button>
                    </Grid>
                </Grid>

                <Grid container marginBottom={3} justifyContent="center" color="red">                    
                    <Button fullWidth onClick={() => setShowConfirmation(true)} variant="contained" size="large" >Confirm your choice</Button>
                </Grid>      
                    
                <Grid container >
                {countries
                .filter(regionFilter)
                .filter(subRegionFilter)
                .filter(searchFilter)
                .map((country) => {        
                    return( 
                        <Grid item key={country.alpha3Code} xs={12} sm={12} md={6} lg={4} xl={3} >
                            <CountryButton selectedCountry={country} setCountries={setCountries} />                                          
                        </Grid>
                    );          
                })}
                </Grid>                              
            </Paper>              
        </Grid>               
  );
  return (             
    <Confirmation countries={countries} setShowConfirmation={setShowConfirmation} setSearchQuery={setSearchQuery} />           
  )
}

export default CountryPicker;