import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  console.log(expand);
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function RecipeReviewCard({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(data, 'data');

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, margin: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data?.name}
        subheader={`#${data?.recipeNo}`}
      />
      <CardMedia component="img" height="194" image={data?.media} alt="image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          PricePerKG : {data?.pricePerKG}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {data?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography color="text.secondary">Details</Typography>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography style={{ fontWeight: 'bold' }}>Ingredient:</Typography>
          {data?.ingredient?.map((i, index) => {
            return (
              <>
                <Typography style={{ padding: 4 }} key={index}>
                  {i?.name} - {i?.aggregate}% - {i?.aggregate*10} grams
                </Typography>
              </>
            );
          })}
          <Typography style={{ fontWeight: 'bold', marginTop: 16 }} paragraph>
            LifeStage : {data?.lifeStage}
          </Typography>
          <Typography style={{ fontWeight: 'bold', marginTop: 16 }} paragraph>
            Nutrition : {data?.nutrition}
          </Typography>
          <Typography style={{ fontWeight: 'bold', marginTop: 16 }} paragraph>
            Instructions : {data?.instructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
