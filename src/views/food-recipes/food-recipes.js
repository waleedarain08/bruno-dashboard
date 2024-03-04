import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { InfinitySpin } from 'react-loader-spinner';
import Modal from '@mui/material/Modal';
import { Button, Checkbox } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import RecipeReviewCard from 'ui-component/cards/Recipe';
import { AddRecipe, EditRecipe, GetAllRecipes } from 'store/recipe/recipeAction';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import { TextareaAutosize } from '@mui/base';
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
import SearchFeild from 'components/searchFeild';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '90vh', // Set the maximum height with a viewport-relative unit (vh)
  overflowY: 'auto', // Enable vertical scrolling if content overflows
  overflowX: 'hidden',
  bgcolor: 'background.paper',
  border: '2px solid #D78809',
  boxShadow: 24,
  p: 4
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 12px 12px;
    color:#121926;
    background: ${theme.palette.mode === 'dark' ? '#D78809' : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? '#bfc0c2' : '#bfc0c2'};
    &:hover {
      border:1px solid  #121926;
    };
    &:focus {
      border: 2px solid  #D78809;
    }
    // firefox
    &:focus-visible {
      outline: 0;
      border-color: #D78809;
    }
    &::placeholder {
      color: #8A93A1;
    }
  `
);

const FoodRecipes = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [NameRecipe, setNameRecipe] = React.useState('');
  const [RecipeNo, setRecipeNo] = React.useState(0);
  const [Nnutrition, setNnutrition] = React.useState('');
  const [LifeStage, setLifeStage] = React.useState('Adult');
  const [KG, setKG] = React.useState('');
  const [ContentNo, setContentNo] = React.useState(0);
  const [PriceOne, setPriceOne] = React.useState(0);
  const [PriceTwo, setPriceTwo] = React.useState(0);
  const [PriceThree, setPriceThree] = React.useState(0);
  const [PriceFour, setPriceFour] = React.useState(0);
  const [PriceFive, setPriceFive] = React.useState(0);
  const [PriceSix, setPriceSix] = React.useState(0);
  const [Instructions, setInstructions] = React.useState('');
  const [Details, setDetails] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Featured, setFeatured] = React.useState(false);
  const [isComboRecipe, setisComboRecipe] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState('');
  const [Condition, setCondition] = React.useState(null);
  const [PreviewEdit, setPreviewEdit] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [PreviewTableEdit, setPreviewTableEdit] = React.useState(null);
  const [selectedTableFiles, setSelectedTableFiles] = React.useState([]);
  const [IngredientsComposition, setIngredientsComposition] = React.useState('');
  const [standaloneSize, setstandaloneSize] = React.useState('');
  const [SelectedId, setSelectedId] = React.useState(null);
  const [isStandard, setisStandard] = React.useState(false);
  const [fields, setFields] = React.useState([{ name: '', aggregate: 0 }]);
  const [rows, setrows] = React.useState([]);

  const handleSelectChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].name = value;
    setFields(updatedFields);
  };

  const InitialState = () => {
    setNameRecipe('');
    setRecipeNo(0);
    setPriceOne(0);
    setPriceTwo(0);
    setPriceThree(0);
    setPriceFour(0);
    setPriceFive(0);
    setPriceSix(0);
    setNnutrition('');
    setLifeStage('');
    setKG('');
    setIngredientsComposition("");
    setContentNo(0);
    setInstructions('');
    setDetails('');
    setDescription('');
    setFeatured(false);
    setSelectedFiles([]);
    setSelectedTableFiles([]);
    setPreviewEdit([]);
    setPreviewTableEdit([]);
    setSelectedId(null);
    setstandaloneSize("")
    setFields([{ name: '', aggregate: 0 }]);
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

  const onAddRecipeBtn = () => {
    setCondition('Add');
    InitialState();
    setOpen(true);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', aggregate: 0 }]);
  };

  const handleClose = () => setOpen(false);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.IngredientsReducer.data);
  const filterProdcuts = useSelector((state) => state.RecipeReducer.data);
  const Newrows = filterProdcuts?.recipe?.filter((i) => i?.category === '');

  React.useEffect(() => {
    if (value !== "") {
      const filteredData = Newrows?.filter(item => {
        return item?.name?.toLowerCase()?.includes(value?.toLowerCase());
      });
      setrows(filteredData);
    }
    else {
      setrows(Newrows);
    }
  }, [filterProdcuts, value]);

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

  const onSuccess = () => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
    InitialState();
    handleClose();
    setisStandard(false);
  };

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
      IngredientsComposition != "" &&
      LifeStage != '' &&
      standaloneSize != ""
    ) {
      setError('');
      setLoading(true);
      if (Condition === 'Add') {
        let NewValues = fields?.map((i) => {
          return {
            name: i?.name,
            aggregate: i?.aggregate
          };
        });
        try {
          const newPath = await Promise.all(selectedFiles?.map(async (i) => await ImageUpload(i)));
          const table_Images = await Promise.all(selectedTableFiles?.map(async (i) => await ImageUpload(i)));
          let newdata = {
            category: "",
            name: NameRecipe,
            isFeatured: Featured,
            isComboRecipe: isComboRecipe,
            ingredient: NewValues,
            description: Description,
            details: Details,
            instructions: Instructions,
            nutrition: Nnutrition,
            pricePerKG: parseInt(KG),
            media: newPath,
            tableImage: table_Images,
            recipeNo: RecipeNo,
            lifeStage: LifeStage,
            ingredientsComposition: IngredientsComposition,
            caloriesContentNo: parseInt(ContentNo),
            price1: PriceOne,
            price2: PriceTwo,
            price3: PriceThree,
            price4: PriceFour,
            price5: PriceFive,
            price6: PriceSix,
            standaloneSize: standaloneSize
          };
          dispatch(AddRecipe(newdata, Userdata?.clientToken, setLoading, onSuccess, isStandard, callAgain));
          // Now you can use newdata with the updated media property.
        } catch (error) {
          console.error('Error uploading images:', error);
        }
      } else {
        if (selectedFiles?.length > 0 || selectedTableFiles?.length > 0) {
          let NewValues = fields?.map((i) => {
            return {
              name: i?.name,
              aggregate: i?.aggregate
            };
          });
          const newPath = await Promise.all(selectedFiles?.map(async (i) => await ImageUpload(i)));
          const table_Images = await Promise.all(selectedTableFiles?.map(async (i) => await ImageUpload(i)));
          let newdata = {
            category: "",
            name: NameRecipe,
            isFeatured: Featured,
            isComboRecipe: isComboRecipe,
            ingredient: NewValues,
            description: Description,
            details: Details,
            instructions: Instructions,
            nutrition: Nnutrition,
            pricePerKG: parseInt(KG),
            media: newPath,
            tableImage: table_Images,
            recipeNo: RecipeNo,
            lifeStage: LifeStage,
            ingredientsComposition: IngredientsComposition,
            caloriesContentNo: parseInt(ContentNo),
            price1: PriceOne,
            price2: PriceTwo,
            price3: PriceThree,
            price4: PriceFour,
            price5: PriceFive,
            price6: PriceSix,
            standaloneSize: standaloneSize
          };
          dispatch(EditRecipe(SelectedId, newdata, Userdata?.clientToken, setLoading, onSuccess));
        } else {
          let NewValues = fields?.map((i) => {
            return {
              name: i?.name,
              aggregate: i?.aggregate
            };
          });
          let newdata = {
            category: "",
            name: NameRecipe,
            isFeatured: Featured,
            isComboRecipe: isComboRecipe,
            ingredient: NewValues,
            description: Description,
            details: Details,
            instructions: Instructions,
            nutrition: Nnutrition,
            pricePerKG: parseInt(KG),
            media: PreviewEdit,
            tableImage: PreviewTableEdit,
            recipeNo: RecipeNo,
            lifeStage: LifeStage,
            ingredientsComposition: IngredientsComposition,
            caloriesContentNo: parseInt(ContentNo),
            price1: PriceOne,
            price2: PriceTwo,
            price3: PriceThree,
            price4: PriceFour,
            price5: PriceFive,
            price6: PriceSix,
          };
          dispatch(EditRecipe(SelectedId, newdata, Userdata?.clientToken, setLoading, onSuccess));
        }
      }
    } else {
      setError('All Field is Required');
    }
  };

  const ImageUpload = async (data) => {
    try {
      let news = await handleUpload(data);
      return news.data;
    } catch (error) {
      return error;
    }
  };

  const callAgain = (newdata) => {
    dispatch(AddRecipe(newdata, Userdata?.clientToken, setLoading, onSuccess, false, emptyCheck));
  };
  let emptyCheck = () => { }

  const EditValues = (data) => {
    setCondition('Edit');
    setSelectedId(data?._id);
    setNameRecipe(data?.name);
    setRecipeNo(data?.recipeNo);
    setNnutrition(data?.nutrition);
    setLifeStage(data?.lifeStage);
    setKG(data?.pricePerKG);
    setContentNo(data?.caloriesContentNo);
    setInstructions(data?.instructions);
    setDetails(data?.details);
    setDescription(data?.description);
    setFeatured(data?.isFeatured);
    setisComboRecipe(data?.isComboRecipe)
    setPreviewEdit(data?.media);
    setPreviewTableEdit(data?.tableImage);
    setFields(data?.ingredient);
    setIngredientsComposition(data?.ingredientsComposition);
    setPriceOne(data?.price1);
    setPriceTwo(data?.price2);
    setPriceThree(data?.price3);
    setPriceFour(data?.price4);
    setPriceFive(data?.price5);
    setPriceSix(data?.price6);
    setstandaloneSize(data?.standaloneSize)

  };


  return (
    <Box sx={{ width: '100%' }}>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
            {Condition} Recipe
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
              value={KG}
              onChange={(e) => setKG(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Standalone Price"
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
              value={PriceOne}
              onChange={(e) => setPriceOne(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Price 1 (0-200g)"
              variant="outlined"
            />
            <TextField
              value={PriceTwo}
              onChange={(e) => setPriceTwo(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Price 2 (201-400g)"
              variant="outlined"
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={PriceThree}
              onChange={(e) => setPriceThree(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Price 3 (401-600g)"
              variant="outlined"
            />
            <TextField
              value={PriceFour}
              onChange={(e) => setPriceFour(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Price 4 (600-800g)"
              variant="outlined"
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={PriceFive}
              onChange={(e) => setPriceFive(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Price 5 (801-1000g)"
              variant="outlined"
            />
            <TextField
              value={PriceSix}
              onChange={(e) => setPriceSix(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Price 6 (1001g onwords)"
              variant="outlined"
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={standaloneSize}
              onChange={(e) => setstandaloneSize(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              placeholder="Standalone Size(e.g. 400 grams / 1 Liter/ 1 Can / etc...)"
              variant="outlined"
            />

          </Box>



          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <FormControl sx={{ width: '100%', marginTop: 0.7 }}>
              <InputLabel>LifeStage</InputLabel>
              <Select value={LifeStage} onChange={(e) => setLifeStage(e.target.value)}>
                <MenuItem key={1} value="Adult">
                  {' '}
                  Adult
                </MenuItem>
                <MenuItem key={2} value="Pet">
                  Pet{' '}
                </MenuItem>
                <MenuItem key={3} value="Senior">
                  {' '}
                  Senior
                </MenuItem>
              </Select>
            </FormControl>
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
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <StyledTextarea
              value={IngredientsComposition}
              onChange={(e) => setIngredientsComposition(e.target.value)}
              style={{ width: '105%', height: 50, marginTop: 7 }}
              maxRows={5}
              aria-label="maximum height"
              placeholder="Ingredients Composition"
              defaultValue=""
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <StyledTextarea
              value={Details}
              onChange={(e) => setDetails(e.target.value)}
              style={{ width: '105%', height: 50, marginTop: 7 }}
              maxRows={5}
              aria-label="maximum height"
              placeholder="Details"
              defaultValue=""
            />
            {/* <TextField
              value={Details}
              onChange={(e) => setDetails(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Details"
              variant="outlined"
            /> */}
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <StyledTextarea
              value={Nnutrition}
              onChange={(e) => setNnutrition(e.target.value)}
              style={{ width: '105%', height: 50, marginTop: 7 }}
              maxRows={5}
              aria-label="maximum height"
              placeholder="Guaranteed Analysis  (Enter comma separated values)"
              defaultValue=""
            />
            {/* <TextField
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Guaranteed Analysis  (Enter comma separated values)"
              variant="outlined"
            /> */}
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <StyledTextarea
              value={Instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={{ width: '105%', height: 50, marginTop: 7 }}
              maxRows={5}
              aria-label="maximum height"
              placeholder="Feeding Directions"
              defaultValue=""
            />
            {/* <TextField
              value={Instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Instructions"
              variant="outlined"
            /> */}
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
            <StyledTextarea
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '105%', height: 50, marginTop: 7 }}
              maxRows={5}
              aria-label="maximum height"
              placeholder="Nutritional Adequacy"
              defaultValue=""
            />
            {/* <TextField
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginTop: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            /> */}
            {/* <StyledTextarea sx={{ width: '100%' }} maxRows={5} aria-label="maximum height" placeholder="Description" defaultValue="" /> */}
          </Box>
          <FormControlLabel
            style={{ marginLeft: 7 }}
            required
            control={<Switch checked={Featured} onChange={() => setFeatured(!Featured)} />}
            label="Featured"
          />
          <FormControlLabel
            style={{ marginLeft: 7 }}
            required
            control={<Switch checked={isComboRecipe} onChange={() => setisComboRecipe(!isComboRecipe)} />}
            label="Combo Recipe"
          />
          <FormControlLabel
            control={
              <Checkbox checked={isStandard} onChange={() => setisStandard(!isStandard)} name="standard_Recipe" />
            }
            label="Standalone Recipe"
          />
          <Box style={{ display: 'flex', justifyContent: 'space-between', }} sx={{ width: '100%' }}>
            <div>
              <p>Recipe Images : </p>
              <ImageUploader imageCount={5} PreviewEdit={PreviewEdit} setPreviewEdit={setPreviewEdit} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            </div>
            <div>
              <p>Table Images : </p>
              <ImageUploader imageCount={1} PreviewEdit={PreviewTableEdit} setPreviewEdit={setPreviewTableEdit} selectedFiles={selectedTableFiles} setSelectedFiles={setSelectedTableFiles} />
            </div>
          </Box>
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
            <SearchFeild setValue={setValue} value={value} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <AnimateButton>
                <Button
                  onClick={() => onAddRecipeBtn()}
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
            </div>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {rows?.map((i, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <RecipeReviewCard data={i} key={index} setOpen={setOpen} EditValues={EditValues} />
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
