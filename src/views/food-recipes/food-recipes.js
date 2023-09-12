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
import { AddRecipe, GetAllRecipes } from 'store/recipe/recipeAction';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const [NameRecipe, setNameRecipe] = React.useState('');
  const [RecipeNo, setRecipeNo] = React.useState(0);
  const [Nnutrition, setNnutrition] = React.useState('');
  const [LifeStage, setLifeStage] = React.useState('');
  const [KG, setKG] = React.useState('');
  const [ContentNo, setContentNo] = React.useState(0);
  const [Instructions, setInstructions] = React.useState('');
  const [Details, setDetails] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Featured, setFeatured] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState([]);
  const [fields, setFields] = React.useState([{ name: '', aggregate: 0 }]);

  const handleSelectChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].name = value;
    setFields(updatedFields);
  };

  const handleNumberChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].aggregate = value;
    setFields(updatedFields);
  };
  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', aggregate: 0 }]);
  };

  const handleClose = () => setOpen(false);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.IngredientsReducer.data);
  const rows = useSelector((state) => state.RecipeReducer.data);
  const isLoading = useSelector((state) => state.RecipeReducer.isLoading);

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
  });

  const onSave = async () => {
    if (
      NameRecipe !== '' &&
      fields?.length > 0 &&
      Description !== '' &&
      KG != 0 &&
      RecipeNo != 0 &&
      Details != '' &&
      ContentNo != 0 &&
      Nnutrition != '' &&
      Instructions != '' &&
      LifeStage != ''
    ) {
      setError('');
      setLoading(true);
      await handleUpload(selectedFile)
        .then((res) => {
          let NewValues = fields?.map((i) => {
            return {
              name: i?.name,
              aggregate: parseInt(i?.aggregate)
            };
          });
          let newdata = {
            name: NameRecipe,
            isFeatured: Featured,
            ingredient: NewValues,
            description: Description,
            details: Details,
            instructions: Instructions,
            nutrition: Nnutrition,
            pricePerKG: KG,
            media: res?.data,
            recipeNo: RecipeNo,
            lifeStage: LifeStage,
            caloriesContentNo: ContentNo
          };
          dispatch(AddRecipe(newdata, Userdata?.clientToken, setLoading, onSuccess));
        })
        .catch(() => {
          setLoading(false);
          setError('Error Please Try Again');
        });
    } else {
      setError('All Field is Required');
      // console.log(res?.data, 'res')
    }
  };
  const onSuccess = () => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
    handleClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
            Add Recipe
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7, paddingBottom: 6 }} sx={{ width: '100%' }}>
            <TextField
              value={NameRecipe}
              onChange={(e) => setNameRecipe(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              value={RecipeNo}
              onChange={(e) => setRecipeNo(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Recipe No"
              variant="outlined"
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={Nnutrition}
              onChange={(e) => setNnutrition(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Nutrition"
              variant="outlined"
            />
            <TextField
              value={LifeStage}
              onChange={(e) => setLifeStage(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Life Stage"
              variant="outlined"
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={KG}
              onChange={(e) => setKG(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Price Per KG"
              variant="outlined"
            />
            <TextField
              value={ContentNo}
              onChange={(e) => setContentNo(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Calories Content No"
              variant="outlined"
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={Instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Instructions"
              variant="outlined"
            />
            <TextField
              value={Details}
              onChange={(e) => setDetails(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Details"
              variant="outlined"
            />
          </Box>
          <Box sx={{ width: '100%', position: 'relative' }}>
            {fields.map((field, index) => (
              <Box key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
                {fields?.length > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: -20, cursor: 'pointer' }}>
                    <DeleteIcon variant="contained" color="secondary" onClick={() => handleRemoveField(index)} />{' '}
                  </div>
                )}
                <FormControl sx={{ width: '80%' }}>
                  <InputLabel>Ingredient</InputLabel>
                  <Select value={field?.name} onChange={(e) => handleSelectChange(index, e.target.value)}>
                    {IngredientArr?.map((i, index) => {
                      return (
                        <MenuItem key={index} value={i?.name}>
                          {i?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  style={{ marginLeft: 10 }}
                  sx={{ width: '80%' }}
                  label="Aggregate"
                  type="number"
                  value={field?.aggregate}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                />
              </Box>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: -20,
                cursor: 'pointer',
                position: 'absolute',
                right: -11,
                top: 14
              }}
            >
              <AddCircleIcon variant="contained" color="primary" onClick={handleAddField} />
            </div>
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginTop: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            {/* <StyledTextarea sx={{ width: '100%' }} maxRows={5} aria-label="maximum height" placeholder="Description" defaultValue="" /> */}
          </Box>
          <FormControlLabel
            style={{ marginLeft: 7 }}
            required
            control={<Switch value={Featured} onChange={() => setFeatured((prev) => !prev)} />}
            label="Featured"
          />
          <ImageUploader setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
          {Error && (
            <Typography style={{ textAlign: 'center', color: 'red' }} variant="h4" component="h2">
              {Error}
            </Typography>
          )}
          <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
            <AnimateButton>
              <Button
                style={{ margin: 4 }}
                disableElevation
                size="large"
                type="submit"
                disabled={Loading}
                variant="contained"
                color="secondary"
                onClick={() => onSave()}
              >
                {Loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}>
                    <InfinitySpin width="50" height="20" color="#fff" />
                  </div>
                ) : (
                  'Save'
                )}
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
              <Button
                onClick={() => setOpen(true)}
                style={{ margin: '12px' }}
                variant="contained"
                color="primary"
                sx={{ boxShadow: 'none' }}
              >
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
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <RecipeReviewCard data={i} key={index} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FoodRecipes;
