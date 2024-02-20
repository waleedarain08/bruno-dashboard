import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { InfinitySpin } from 'react-loader-spinner';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate, useLocation } from 'react-router-dom';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchFeild from 'components/searchFeild';

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
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [NameRecipe, setNameRecipe] = React.useState('');
  const [KG, setKG] = React.useState('');
  const [Categoryes, setCategoryes] = React.useState("");
  const [Details, setDetails] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Featured, setFeatured] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState('');
  const [Condition, setCondition] = React.useState(null);
  const [PreviewEdit, setPreviewEdit] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [SelectedId, setSelectedId] = React.useState(null);
  const [fields, setFields] = React.useState([{ name: '', price: null }]);


  const InitialState = () => {
    setNameRecipe("");
    setKG("");
    setDetails("");
    setDescription("");
    setFeatured("");
    setSelectedFiles([]);
    setPreviewEdit([]);
    setSelectedId(null)
  }

  const onAddRecipeBtn = () => {
    setCondition("Add");
    InitialState();
    setOpen(true);
  };

  const handleSelectChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].name = value;
    setFields(updatedFields);
  };
  const handleNumberChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].price = value;
    setFields(updatedFields);
  };
  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };
  const handleAddField = () => {
    setFields([...fields, { name: '', price: null }]);
  };

  const handleClose = () => setOpen(false);
  const [rows, setrows] = React.useState([])
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.CategoryReducer.data);
  const filterProdcuts = useSelector((state) => state.RecipeReducer.data);
  const newRows = filterProdcuts?.recipe?.filter((i) => i?.category !== "" && i?.category === location?.state);
  const isLoading = useSelector((state) => state.RecipeReducer.isLoading)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
    dispatch(GetAllCategories(Userdata?.clientToken));
  }, []);

  React.useEffect(() => {
    if (value !== "") {
      const filteredData = newRows?.filter(item => {
        return item?.name?.toLowerCase()?.includes(value?.toLowerCase()) || item?._id?.toLowerCase()?.includes(value?.toLowerCase());
      });
      setrows(filteredData);
    }
    else {
      setrows(newRows);
    }
  }, [filterProdcuts, value]);

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

  console.log(fields, "fields")

  const onSave = async () => {
    if (
      NameRecipe !== '' &&
      Description !== '' &&
      KG != 0 &&
      Details != '' &&
      (fields.length === 0 || fields.some(field => field.name !== '' && field.price > 0))
    ) {
      setError('');
      setLoading(true);
      if (Condition === "Add") {
        const newPath = await Promise.all(selectedFiles?.map(async (i) => await ImageUpload(i)));
        let newdata = {
          name: NameRecipe,
          isFeatured: Featured,
          description: Description,
          details: Details,
          pricePerKG: parseInt(KG),
          media: newPath,
          category: Categoryes,
          recipeNo: "",
          ingredientsComposition: "",
          sizes: fields,
          price1: 0,
          price2: 0,
          price3: 0,
          price4: 0,
          price5: 0,
          price6: 0,
        };
        console.log(newdata, "newdata")
        dispatch(AddRecipe(newdata, Userdata?.clientToken, setLoading, onSuccess));
      }
      else {
        if (selectedFiles?.length > 0) {
          const newPath = await Promise.all(selectedFiles?.map(async (i) => await ImageUpload(i)));
          let newdata = {
            name: NameRecipe,
            isFeatured: Featured,
            description: Description,
            details: Details,
            pricePerKG: parseInt(KG),
            media: newPath,
            category: Categoryes,
            recipeNo: "",
            ingredientsComposition: "",
            sizes: fields,
            price1: 0,
            price2: 0,
            price3: 0,
            price4: 0,
            price5: 0,
            price6: 0,
          };
          dispatch(EditRecipe(SelectedId, newdata, Userdata?.clientToken, setLoading, onSuccess));
        }
        else {
          let newdata = {
            name: NameRecipe,
            isFeatured: Featured,
            description: Description,
            details: Details,
            pricePerKG: parseInt(KG),
            media: PreviewEdit,
            category: Categoryes,
            recipeNo: "",
            ingredientsComposition: "",
            sizes: fields,
            price1: 0,
            price2: 0,
            price3: 0,
            price4: 0,
            price5: 0,
            price6: 0,
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

  let SizesData = [{
    name: "Small"
  },
  {
    name: "Medium"
  },
  {
    name: "Large"
  },
  {
    name: "Extra Large"
  }]


  const EditValues = (data) => {
    console.log(data, "data")
    setCondition("Edit");
    setSelectedId(data?._id)
    setNameRecipe(data?.name)
    setKG(data?.pricePerKG)
    setDetails(data?.details);
    setDescription(data?.description);
    setFeatured(data?.isFeatured);
    setPreviewEdit(data?.media);
    setCategoryes(data?.category);
    setFields(data?.sizes);
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
          <Box sx={{ width: '100%', position: 'relative' }}>
            {fields.map((field, index) => (
              <Box key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
                {fields?.length > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: -20, cursor: 'pointer' }}>
                    <DeleteIcon variant="contained" color="secondary" onClick={() => handleRemoveField(index)} />{' '}
                  </div>
                )}
                <FormControl sx={{ width: '80%' }}>
                  <InputLabel>Size</InputLabel>
                  <Select value={field?.name} onChange={(e) => handleSelectChange(index, e.target.value)}>
                    {SizesData?.map((i, index) => {
                      return <MenuItem key={index} value={i?.name}>
                        {i?.name}
                      </MenuItem>
                    })}
                  </Select>
                </FormControl>
                <TextField
                  style={{ marginLeft: 10 }}
                  sx={{ width: '80%' }}
                  label="Price"
                  type="number"
                  value={field?.price}
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
            control={<Switch checked={Featured} onChange={() => setFeatured(!Featured)} />}
            label="Featured"
          />
          <ImageUploader imageCount={5} PreviewEdit={PreviewEdit} setPreviewEdit={setPreviewEdit} setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />
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
            <div style={{ marginLeft: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ border: "1px solid #D78809", width: 30, display: "flex", justifyContent: "center", borderRadius: 50, margin: 5, padding: 2 }}>
                <ArrowBackIcon onClick={() => navigate(-1)} style={{ color: "#D78809" }} />
              </div>
              <SearchFeild setValue={setValue} value={value} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

export default ProductCategories;
