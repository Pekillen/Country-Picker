import React from 'react';
import { Grid, Paper, CircularProgress} from '@mui/material';

const LoadingPaper = () => {
  return (    
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="top" style={{ minHeight: '100vh' }} >
            <Paper elevation={12} style={{ padding: '20px', borderRadius: '15px', width: '60vw', display: "flex", justifyContent: "center" }}>
                <CircularProgress size="5em" />
            </Paper>
        </Grid>    
  )
}

export default LoadingPaper;