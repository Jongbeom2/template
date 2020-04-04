import React, {useState, useEffect} from 'react';
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
import ImageUploadDialog from '../components/dialog/ImageUpload';
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
const FreeImage = () => {
  const [openImageUploadDialog, setOpenImageUploadDialog] = useState(false);
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    getImageList();
  }, []);
  const getImageList = () =>{
    const imageList = [];
    axios.get('/file/img')
      .then(res => {
        if (res.data.result){
          res.data.imageList.forEach(image=>{
            imageList.push({
              name: image.name,
              email: image.email,
              src: "data:image/jpeg;base64," + image.data
            })
          });
          setImageList(imageList);
          console.log('[Get] /file/img', res.data.message);
        }
      })
      .catch(error=>{
        console.log(error);
      })
  };
  const handleClickOpenImageUploadDialog = () => {
    setOpenImageUploadDialog(true);
  };
  const handleClickCloseImageUploadDialog = () => {
    setOpenImageUploadDialog(false);
    getImageList();
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Free Image
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          These are free image collections. You can upload or download images.
          The size of image is limited to 1MB.
        </Typography>
        <div className={classes.buttons}>
          <Grid container spacing={2} justify="center">
            <Button variant="contained" color="primary" onClick={handleClickOpenImageUploadDialog}>
              Submit a photo
            </Button>
          </Grid>
        </div>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {imageList.map((image) => (
            <Grid item key={image.name} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {image.src}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {image.name}
                  </Typography>
                  <Typography>
                    {'Uploaded by ' + image.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {openImageUploadDialog
      ?<ImageUploadDialog handleClickCloseImageUploadDialog = {handleClickCloseImageUploadDialog}/>
      :null}
    </div>
  )
}

export default FreeImage;