import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  },
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));
const APIDoc = () => {
  const [apiDocList, setAPIDocList] = useState([]);
  useEffect(() => {
    (async function getAPIDocList() {
      try {
        const res = await axios.get('/apidoc');
        setAPIDocList(res.data.apiDocList);
        console.log('[Get] /apidoc', res.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          API Document
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          The API Document is a collection of HTTPS endpoints
          to send and receive data from a JB Template.
        </Typography>
      </Container>
      <div>
        {apiDocList.map((apidoc) => (
          <div key={apidoc.name} style={{marginTop:'3rem'}}> 
            <Typography variant="h4" color="textPrimary" >
              {apidoc.name}
            </Typography>
            <Divider className={classes.divider} />
            <div style={{ display: 'flex', marginTop: '2rem' }}>
              <Typography variant="h5" color="textPrimary" style={{ marginRight: '2rem' }}>
                {apidoc.method}
              </Typography>
              <Typography variant="h5" color="textSecondary" >
                {apidoc.url}
              </Typography>
            </div>
            <Typography variant="h6" color="textSecondary" style={{ marginTop: '2rem' }}>
              Header
            </Typography>
            <Divider className={classes.divider} />
            {apidoc.header.map((header) => (
              <div key={header.key} >
                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ width: '30%' }}>
                    {header.key}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" style={{ width: '70%' }}>
                    {header.value}
                  </Typography>
                </div>
                <Divider className={classes.divider} />
              </div>
            ))}
            <Typography variant="h6" color="textSecondary" style={{ marginTop: '2rem' }} >
              Body
            </Typography>
            <Divider className={classes.divider} />
            {apidoc.body.map((body) => (
              <div key={body.name} >
                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ width: '30%' }}>
                    {body.name} ({body.type})
                  </Typography>
                  <Typography variant="h6" color="textSecondary" style={{ width: '70%' }}>
                    {body.description}
                  </Typography>
                </div>
                <Divider className={classes.divider} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default APIDoc;