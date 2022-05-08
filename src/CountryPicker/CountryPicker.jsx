import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Container, Typography, FormControl, ListItemText, Checkbox, Paper, CircularProgress, OutlinedInput, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import CountryButton from './CountryButton/CountryButton';

const CountryPicker = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState([true]);       
    const [searchQuery, setSearchQuery] = useState("");
    const [regions, setRegions] = useState([]);
    const [subRegions, setSubRegions] = useState([]);    

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

    const compareSelectedRegions = () => {
        if (regions.toString() !== continents.toString()) {
            return true;
         } else {
             return false;            
         }
    }

    const selectAllRegions = () => {
        if (compareSelectedRegions) {
           setRegions(continents);
        } else {
            setRegions([]);            
        }
    }    

    const compareSelectedSubRegions = () => {
        if (subRegions.toString() !== subContinents.toString()) {
            return true;
         } else {
             return false;            
         }
    }

    const selectAllSubRegions = () => {
        if (compareSelectedSubRegions) {
            setSubRegions(subContinents);
         } else {
             setSubRegions([]);            
         }        
    }

      const initContinents = countries.map(country => country.region);
      const continents = [...new Set(initContinents)];   
      
      const initSubContinents = countries.map(country => country.subregion);
      const subContinents = [...new Set(initSubContinents)];  

   
     
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
      
      
      const handleCheckSelected = () => {                 
          countries.filter(subRegionFilter).filter(regionFilter).filter(searchFilter).map((country) => {
              country.checked = true;            
            })         
            
      };
        
      const handleClearSelected = () => {        
            countries.filter(subRegionFilter).filter(regionFilter).filter(searchFilter).map((country) => {
              country.checked = false;            
            })                     
      };
        
      const handleClearAll = () => {             
            countries.map((country) => {
              country.checked = false;              
            })                          
      };

        
    useEffect(() => {            
        fetchCountries();        
      }, []);       
           
    
    if (loading) {
        return (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="top" style={{ minHeight: '100vh' }} >
            <Paper elevation={12} style={{ padding: '20px', borderRadius: '15px', width: '60vw', display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size="5em" />
            </Paper>
            </Grid>
        );
    }    

 
  return (   
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="top" style={{ minHeight: '100vh' }} >   
        <Paper elevation={12} style={{ padding: '20px', borderRadius: '15px' , width: ' 60vw'}} >  
        <Typography variant='h4' align="center" marginBottom={2} >Country Picker</Typography>           
            <TextField fullWidth id="outlined-search" label="Search for a country..." type="search" onChange={(e) => {setSearchQuery(e.target.value)}}/>               

            <Grid container   justifyContent="center" alignItems="center" spacing={2} paddingTop={2} marginBottom={4}>
                <Grid container item justifyContent="space-evenly" alignItems="center" sm={12} md={6} spacing={1} >
                    <Grid item> 
                        <FormControl sx={{minWidth: 140}}>
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
                        <Button onClick={selectAllRegions} variant="contained" >Select all regions</Button>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="space-evenly" alignItems="center" sm={12} md={6} spacing={1}>
                    <Grid item>
                        <FormControl sx={{minWidth: 140}} >
                            <InputLabel id="subregion">Subregion</InputLabel>
                            <Select fullWidth labelId="subregion" size="large" onChange={handleSubRegion} value="" input={<OutlinedInput multiple label="All Subregions" />}>
                                {subContinents.map((subContinent) => 
                                <MenuItem key={subContinent} value={subContinent}>                     
                                    <ListItemText primary={subContinent} />   
                                    <Checkbox checked={subRegions.includes(subContinent)} />                 
                                </MenuItem>               
                                )}                
                            </Select>
                        </FormControl>
                    </Grid> 
                    <Grid item>
                        <Button onClick={selectAllSubRegions} variant="contained" >Select all subregions</Button>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid container marginBottom={4} spacing={4} >
                <Grid container item xs justifyContent="center" >
                    <Button onClick={handleCheckSelected} variant="contained" >Check all selected countries</Button>
                </Grid>
                <Grid container item xs justifyContent="center" >
                    <Button onClick={handleClearSelected}  variant="contained" color="secondary" >Clear all selected countries</Button>
                </Grid>
                <Grid container item xs justifyContent="center" >
                    <Button onClick={handleClearAll}  variant="contained" color="secondary" >Clear all checked countries</Button>
                </Grid>
            </Grid>
                
            <Grid container >
            {countries
            .filter(regionFilter)
            .filter(subRegionFilter)
            .filter(searchFilter)
            .map((country) => {        
                return( 
                    <Grid item key={country.alpha3Code} xs={12} sm={12} md={6} lg={4}  >
                        <CountryButton country={country} />                                          
                    </Grid>
                );          
            })}
            </Grid>                              
        </Paper>  
    </Grid>      
  )
}

export default CountryPicker;