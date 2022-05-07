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
                setCountries([...data].map((object) => ({ checked: false, ...object })));   //Get the countries and add "checked" property to each                                  
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
        if (regions.toString() !== continents.toString()) {
           setRegions(continents);
        } else {
            setRegions([]);            
        }
    }    

    const selectAllSubRegions = () => {
        if (subRegions.toString() !== subContinents.toString()) {
            setSubRegions(subContinents);
         } else {
             setSubRegions([]);            
         }        
    }

      const initContinents = countries.map(country => country.region);
      const continents = [...new Set(initContinents)];   //Get Unique Continents for the drop-down menu
      
      const initSubContinents = countries.map(country => country.subregion);
      const subContinents = [...new Set(initSubContinents)];  //Get Unique Subcontinents for the drop-down menu

   
     
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
      
      const handleClearChecked = () => {
          countries.map((country) => {
              country.checked = false;
          })
      };

      const handleCheckSelected = () => {
        countries.filter(subRegionFilter).filter(regionFilter).filter(searchFilter).map((country) => {
            country.checked = true;
        })
      };

    useEffect(() => {            
        fetchCountries();        
      }, []);  
    
    if (loading) {
        return (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="top" style={{ minHeight: '100vh' }} >
            <Paper elevation={12} style={{ padding: '20px', borderRadius: '15px', width: '50vw', display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size="5em" />
            </Paper>
            </Grid>
        );
    }  
    
 
  return (   
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="top" style={{ minHeight: '100vh' }} >   
        <Paper elevation={12} style={{ padding: '20px', borderRadius: '15px' , width: '60vw'}} >  
        <Typography variant='h4' align="center" marginBottom={2} >Country Picker</Typography>           
            <TextField fullWidth id="outlined-search" label="Search a country..." type="search" onChange={(e) => {setSearchQuery(e.target.value)}}/>        

            <Grid container   justifyContent="center" alignItems="center" spacing={4} columns={4} paddingTop={2} marginBottom={4}>
                <Grid item> 
                    <InputLabel id="region">Region</InputLabel>
                    <Select fullWidth labelId="region" onChange={handleRegion} value="" input={<OutlinedInput multiple label="All Regions" />}>
                        {continents.map((continent) => 
                        <MenuItem key={continent} value={continent}>                     
                            <ListItemText primary={continent} />   
                            <Checkbox checked={regions.includes(continent)} />                 
                        </MenuItem>               
                        )}                
                    </Select>
                </Grid>
                <Grid item>
                    <Button onClick={selectAllRegions} variant="contained" >Select all regions</Button>
                </Grid>
                <Grid item>
                    <InputLabel>Subregion</InputLabel>
                    <Select fullWidth onChange={handleSubRegion} value="" input={<OutlinedInput multiple label="All Subregions" />}>
                        {subContinents.map((subContinent) => 
                        <MenuItem key={subContinent} value={subContinent}>                     
                            <ListItemText primary={subContinent} />   
                            <Checkbox checked={subRegions.includes(subContinent)} />                 
                        </MenuItem>               
                        )}                
                    </Select>
                </Grid>
                <Grid item>
                    <Button onClick={selectAllSubRegions} variant="contained">Select all subregions</Button>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" columns={2} marginBottom={4}>
                <Button onClick={handleCheckSelected} variant="contained" >Check all the selected countries</Button>
                <Button onClick={handleClearChecked}  variant="contained" >Clear selected countries</Button>
            </Grid>
                
            <Grid container >
            {countries
            .filter(regionFilter)
            .filter(subRegionFilter)
            .filter(searchFilter)
            .map((country) => {        
                return( 
                    <Grid item key={country.alpha3Code} xs={12} sm={12} md={6} lg={4}  >
                        <CountryButton country={country} setCountries={setCountries} />                                          
                    </Grid>
                );          
            })}
            </Grid>
                              
        </Paper>  
    </Grid>   
  )
}

export default CountryPicker;