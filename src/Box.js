import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  Box: {
    backgroundColor: "Blue",
    width: "150px",
    height: "100px"

  }
}
function Box(props) {
  const { classes, country, deaths, confirmed, recovered } = props
  return (
    <div className={classes.Box}>
      <h3>{country}</h3>
      <div>Infected:{confirmed}</div>
      <div>Recovered:{recovered}</div>
      <div>Deaths:{deaths}</div>
      
    </div>
  )
}

export default withStyles(styles)(Box);
