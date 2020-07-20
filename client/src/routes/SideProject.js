import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import materialImg from '../image/material-ui.png';
import jumpImg from '../image/jump.png';
import aiImg from '../image/ai.png';
import lunchBoxImg from '../image/lunch-box.png';
import javascriptImg from '../image/javascript.png';
import painterImg from '../image/painter.png';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  dialogFileName:{
    width: '30rem',
  },
  dialogUploadBtn:{
    width: '30rem',
    height: '20rem',
    marginTop: theme.spacing(2)
  },
  dialogActionBtn:{
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  imgPreview:{
    width: '30rem',
    height: 'auto'
  },
  imgPreviewContainer:{
    width: '30rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '20rem',
  },
  message:{
    marginTop: theme.spacing(1),
  },
}));
const imageSrcList = { materialImg, jumpImg, aiImg, lunchBoxImg, javascriptImg, painterImg}
const SideProject = () => {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    getProjectList();
  }, []);
  async function getProjectList () {
    try{
      const res = await axios.get('/project')
      setProjectList(res.data.projectList);
      console.log('[Get] /project', res.data.message);
    }catch(error){
      console.log(error);
    }
  }
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Side Projects
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          These are Jongbeom Lee's Side Projects.
        </Typography>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {projectList.map((project) => (
            <Grid item key={project.name} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {imageSrcList[project.imgSrc]}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.name}
                  </Typography>
                  <Typography>
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <a href={project.deployLink } style={{textDecoration: 'none'}} target="_blank">
                  <Button size="small" color="primary" >
                    Visit
                  </Button>
                  </a>
                  <a href={project.sourceLink } style={{textDecoration: 'none'}} target="_blank">
                  <Button size="small" color="primary">
                    Source
                  </Button>
                  </a>
                  <a href={project.blogLink } style={{textDecoration: 'none'}} target="_blank">
                  <Button size="small" color="primary">
                    Blog
                  </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default SideProject;