import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import sizes from './sizes';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
    backgroundColor: "blue",
    [sizes.down("lg")]:{
      backgroundColor: "red",
    },
    [sizes.down("md")]: {
      backgroundColor: "purple",
    },
    [sizes.down("xs")]: {
      backgroundColor: "green",
    }
  },  
};

function CoronaNavbar(props) {
  const { classes, data } = props;
 
  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography className={classes.box}>
          Confirmed
        </Typography>
        <Typography>
          {data.confirmed}
        </Typography>
      </CardContent>          
    </Card>
  )
}

export default withStyles(styles)(CoronaNavbar);