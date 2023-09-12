import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { InfinitySpin } from 'react-loader-spinner';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import RecipeReviewCard from 'ui-component/cards/Recipe';
import { GetAllRecipes } from 'store/recipe/recipeAction';
// import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
// import { TextareaAutosize } from '@mui/base';
import ImageUploader from 'ui-component/ImageUploader';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { GetAllIngredient } from 'store/ingredients/ingredientsAction';
import { handleUpload } from 'utils/helperFunction';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: '2px solid #D78809',
  boxShadow: 24,
  p: 4
};

const FoodRecipes = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClose = () => setOpen(false);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.IngredientsReducer.data);
  const rows = useSelector((state) => state.RecipeReducer.data);
  const isLoading = useSelector((state) => state.RecipeReducer.isLoading);
  console.log(selectedFiles, 'rows');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
    dispatch(GetAllIngredient(Userdata?.clientToken));
  }, []);

  const IngredientArr = allData?.map((i) => {
    return {
      _id: i?._id,
      name: i?.name,
      aggregate: i?.ingredientReference
    };
  })

  const onSave = () => {
    selectedFiles?.map(async (i) => {
      await handleUpload(i).then((res) => {
        return console.log(res, "res");
      }).catch((err) => console.log(err))
      return newimg;
    })

  }
  return (
    <Box sx={{ width: '100%' }}>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
            Add Recipe
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7, paddingBottom: 6 }} sx={{ width: '100%' }}>
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} id="outlined-basic" label="Name" variant="outlined" />
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} id="outlined-basic" label="Recipe No" variant="outlined" />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} id="outlined-basic" label="Nutrition" variant="outlined" />
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} id="outlined-basic" label="Life Stage" variant="outlined" />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} type={"number"} id="outlined-basic" label="Price Per KG" variant="outlined" />
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} type={"number"} id="outlined-basic" label="Calories Content No" variant="outlined" />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} id="outlined-basic" label="Instructions" variant="outlined" />
            <TextField style={{ margin: 5, }} sx={{ width: '100%' }} id="outlined-basic" label="Details" variant="outlined" />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ingredient</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Ingredient"
                onChange={handleChange}
              >
                {IngredientArr?.map((i, index) => {
                  return <MenuItem key={index} value={i?._id}>{i?.name}</MenuItem>
                })}

                {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
            <TextField style={{ marginTop: 5, }} sx={{ width: '100%' }} id="outlined-basic" label="Description" variant="outlined" />
            {/* <StyledTextarea sx={{ width: '100%' }} maxRows={5} aria-label="maximum height" placeholder="Description" defaultValue="" /> */}
          </Box>
          <FormControlLabel style={{ marginLeft: 7 }} required control={<Switch />} label="Featured" />
          <ImageUploader setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />
          <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
            <AnimateButton>
              <Button
                style={{ margin: 4 }}
                disableElevation
                size="large"
                type="submit"
                // disabled={isLoadingSave}
                variant="contained"
                color="secondary"
                onClick={() => onSave()}
              >
                {isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}>
                  <InfinitySpin width="50" height="20" color="#fff" />
                </div> : "Save"}
              </Button>
            </AnimateButton>
          </Box>
        </Box>
      </Modal>
      {isLoading ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <InfinitySpin width="200" color="#D78809" />
          </div>
        </Paper>
      ) : (
        <Paper style={{ paddingBottom: 4 }} sx={{ width: '100%', mb: 2 }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ width: '100%' }}>
            <AnimateButton>
              <Button onClick={() => setOpen(true)} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                Add Recipe
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button
                onClick={() => navigate('/ingredients')}
                style={{ margin: '12px' }}
                variant="contained"
                color="primary"
                sx={{ boxShadow: 'none' }}
              >
                View & Add Ingredients
              </Button>
            </AnimateButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {rows?.map((i, index) => {
                return <Grid item xs={2} sm={4} md={4} key={index}>
                  <RecipeReviewCard data={i} key={index} />
                </Grid>
              })}
            </Grid>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FoodRecipes;
