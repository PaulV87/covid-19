import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import sizes from '../styles/sizes';
import CountUp from 'react-countup';

const useStyles = makeStyles({
  root: {
    padding: '10px 0',
    width: '100%',
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',    
    [sizes.up("lg")]: {
    },
    [sizes.up("sm")]: {
      flexDirection: 'row',
    },
    [sizes.up("xs")]: {  
      padding: '20px 0',
      width: '100%',   
      flexDirection: 'column',      
    },
  }, 
  card: {
    minHeight: '10vh',
    padding: '0.5em',
    width: '100%',
    margin: '1em 0.5em',
    [sizes.up("sm")]: {
      margin: 0,
      marginBottom: '10px',
    },
  },
  infected: {
    backgroundColor: '#ade4ea',
  },
  deaths: {
    backgroundColor: '#fecbbf'
  },
  recovered: {
    backgroundColor: '#9ecb87',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  cardTitle: {
    fontSize: '2rem',
    color: '#162030'
  },
  cardNumber: {
    fontSize: '2.5rem',
    color: '#162030',
  }

});

function Header(props) {
  const classes = useStyles();
  const { globalData: {confirmed, recovered, deaths, lastUpdate } } = props;
  return (
    <div className={classes.root}>
          <Card className={`${classes.card} ${classes.infected}`} variant="outlined">
            <CardContent className={classes.cardContainer}>
              <Typography className={classes.cardTitle}>
                Confirmed
              </Typography>
              <Typography className={classes.cardNumber}>
                <CountUp end={confirmed} duration={3}/>               
              </Typography>
            </CardContent>
          </Card>             
        
        <Card className={`${classes.card} ${classes.recovered}`} variant="outlined">
            <CardContent className={classes.cardContainer}>
              <Typography className={classes.cardTitle}>
                Recovered
              </Typography>
              <Typography className={classes.cardNumber}>
                <CountUp end={recovered} duration={3}/>      
              </Typography>
            </CardContent>
          </Card>
       
          <Card className={`${classes.card} ${classes.deaths}`} variant="outlined">
            <CardContent className={classes.cardContainer}>
              <Typography className={classes.cardTitle}>
                Deaths
              </Typography>
              <Typography className={classes.cardNumber}>
                <CountUp end={deaths} duration={3}/>      
              </Typography>
            </CardContent>
          </Card>
    </div>
  )
}

export default Header
