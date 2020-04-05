import React from 'react';
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
const projectList = [{
    name: 'Material-UI Tutorial Project',
    description: 'Des1',
    imgSrc: materialImg,
    sourceLink: 'https://jongbeom-dev.tistory.com/category/React%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/Material-UI%20%EC%8B%A4%EC%8A%B5',
    deployLink: 'https://jongbeom-dev.tistory.com/category/React%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/Material-UI%20%EC%8B%A4%EC%8A%B5',
    blogLink: 'https://jongbeom-dev.tistory.com/category/React%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/Material-UI%20%EC%8B%A4%EC%8A%B5'
  },{
    name: 'Jump Game',
    description: 'Des2',
    imgSrc: jumpImg,
    sourceLink: 'https://gitlab.com/n113345/game-jump',
    deployLink: 'https://game-4a862.firebaseapp.com',
    blogLink: 'https://jongbeom-dev.tistory.com/category/React%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/%EA%B3%B5%EB%A3%A1%20%EC%A0%90%ED%94%84%20%EA%B2%8C%EC%9E%84'
  }
]
const SideProject = () => {
  const handleClickView = () => {
    
  };
  const handleClickSource = () => {
    
  };
  const handleClickBlog = () => {

  }
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Side Projects
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          These are Jongbeom Lee's Side Projects. Click [Source] buttons to check the source in gitlab
          or [Visit] button to visit deployed projects or [Blog] button to visit blog written in Korean.
        </Typography>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {projectList.map((project) => (
            <Grid item key={project.name} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {project.imgSrc}
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
                  <Button size="small" color="primary" onClick={handleClickView}>
                    Visit
                  </Button>
                  </a>
                  <a href={project.sourceLink } style={{textDecoration: 'none'}} target="_blank">
                  <Button size="small" color="primary" onClick={handleClickSource}>
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