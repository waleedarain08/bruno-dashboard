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
import { AddRecipe, EditRecipe, GetAllRecipes } from 'store/recipe/recipeAction';
// import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
// import { TextareaAutosize } from '@mui/base';
import ImageUploader from 'ui-component/ImageUploader';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { handleUpload } from 'utils/helperFunction';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GetAllCategories } from 'store/categories/categoriesAction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '100vh', // Set the maximum height with a viewport-relative unit (vh)
  overflowY: 'auto', // Enable vertical scrolling if content overflows
  overflowX: 'hidden',
  bgcolor: 'background.paper',
  border: '2px solid #D78809',
  boxShadow: 24,
  p: 4
};

const ProductCategories = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [NameRecipe, setNameRecipe] = React.useState('');
  const [KG, setKG] = React.useState('');
  const [Categoryes, setCategoryes] = React.useState("");
  const [Details, setDetails] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Featured, setFeatured] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState('');
  const [Condition, setCondition] = React.useState(null);
  const [PreviewEdit, setPreviewEdit] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [SelectedId, setSelectedId] = React.useState(null);


  const InitialState = () => {
    setNameRecipe("");
    setKG("");
    setDetails("");
    setDescription("");
    setFeatured("");
    setSelectedFile(null);
    setPreviewEdit(null);
    setSelectedId(null)
  }

  const onAddRecipeBtn = () => {
    setCondition("Add");
    InitialState();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.CategoryReducer.data);
  const filterProdcuts = useSelector((state) => state.RecipeReducer.data);
  const rows = filterProdcuts?.recipe?.filter((i) => i?.category !== "")
  const isLoading = useSelector((state) => state.RecipeReducer.isLoading);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
    dispatch(GetAllCategories(Userdata?.clientToken));
  }, []);

  const allcategories = allData?.map((i) => {
    return {
      _id: i?._id,
      name: i?.name,
    };
  });

  const onSuccess = () => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
    InitialState();
    handleClose();
  };

  const onSave = async () => {
    if (
      NameRecipe !== '' &&
      Description !== '' &&
      KG != 0 &&
      Details != ''
    ) {
      setError('');
      setLoading(true);
      if (Condition === "Add") {
        const newPath = await ImageUpload(selectedFile);
        let newdata = {
          name: NameRecipe,
          isFeatured: Featured,
          description: Description,
          details: Details,
          pricePerKG: KG,
          media: newPath,
          category: Categoryes,
        };
        console.log(newdata, "newdata")
        dispatch(AddRecipe(newdata, Userdata?.clientToken, setLoading, onSuccess));
      }
      else {
        if (selectedFile !== null) {
          const newPath = await ImageUpload(selectedFile);
          let newdata = {
            name: NameRecipe,
            isFeatured: Featured,
            description: Description,
            details: Details,
            pricePerKG: KG,
            media: newPath,
            category: Categoryes,
          };
          dispatch(EditRecipe(SelectedId, newdata, Userdata?.clientToken, setLoading, onSuccess));
        }
        else {
          let newdata = {
            name: NameRecipe,
            isFeatured: Featured,
            description: Description,
            details: Details,
            pricePerKG: KG,
            media: PreviewEdit,
            category: Categoryes,
          };
          dispatch(EditRecipe(SelectedId, newdata, Userdata?.clientToken, setLoading, onSuccess));
        }
      }
    } else {
      setError('All Field is Required');
      // console.log(res?.data, 'res')
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


  const EditValues = (data) => {
    setCondition("Edit");
    setSelectedId(data?._id)
    setNameRecipe(data?.name)
    setKG(data?.pricePerKG)
    setDetails(data?.details);
    setDescription(data?.description);
    setFeatured(data?.isFeatured);
    setPreviewEdit(data?.media);
    setCategoryes(data?.category);
    // console.log(data, "data")
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
            {Condition} Product
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
              value={Details}
              onChange={(e) => setDetails(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Brand"
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
              label="Price"
              variant="outlined"
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel style={{ margin: 5 }}>Categories</InputLabel>
              <Select style={{ margin: 5 }} value={Categoryes} onChange={(e) => setCategoryes(e.target.value)}>
                {allcategories?.map((i, index) => {
                  return (
                    <MenuItem key={index} value={i?.name}>
                      {i?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

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
            control={<Switch value={Featured} onChange={() => setFeatured(!Featured)} />}
            label="Featured"
          />
          <ImageUploader PreviewEdit={PreviewEdit} setSelectedFile={setSelectedFile} />
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

                onClick={() => onAddRecipeBtn()}
                style={{ margin: '12px' }}
                variant="contained"
                color="primary"
                sx={{ boxShadow: 'none' }}
              >
                Add Product
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button
                onClick={() => navigate('/categories')}
                style={{ margin: '12px' }}
                variant="contained"
                color="primary"
                sx={{ boxShadow: 'none' }}
              >
                View & Add Category
              </Button>
            </AnimateButton>
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

export default ProductCategories;
