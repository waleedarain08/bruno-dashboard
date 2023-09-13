import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { InfinitySpin } from 'react-loader-spinner';
import { Button } from '@mui/material';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteRecipe, GetAllRecipes } from 'store/recipe/recipeAction';

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

export default function RecipeReviewCard({ data, setOpen, EditValues }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const isLoadingDelete = useSelector((state) => state.RecipeReducer.isLoadingDelete);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDelete = () => setOpenDelete(!openDelete);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    EditValues(data)
    setOpen(true);
    handleClose();
    console.log('Edit clicked');
  };
  const handleDelete = () => {
    handleClose();
    setOpenDelete(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onDelete = () => {
    dispatch(DeleteRecipe(data?._id, Userdata?.clientToken, onSuccess));
  };
  const onSuccess = () => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
    handleClose();
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, margin: 2 }}>
      <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #D78809',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this {data?.name} recipe
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 1
            }}
          >
            <AnimateButton>
              <Button
                onClick={handleCloseDelete}
                style={{ margin: 4 }}
                disableElevation
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button
                style={{ margin: 4 }}
                disableElevation
                size="large"
                type="submit"
                // disabled={isLoadingDelete}
                variant="contained"
                color="secondary"
                onClick={() => onDelete()}
              >
                {isLoadingDelete ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}>
                    <InfinitySpin width="50" height="20" color="#fff" />
                  </div>
                ) : (
                  'Delete'
                )}
              </Button>
            </AnimateButton>
          </Box>
        </Box>
      </Modal>
      <CardHeader
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data?.name}
        subheader={`#${data?.recipeNo}`}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
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
                  {i?.name} - {i?.aggregate}% - {i?.aggregate * 10} grams
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
