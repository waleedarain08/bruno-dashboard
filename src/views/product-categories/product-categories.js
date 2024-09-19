import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { InfinitySpin } from 'react-loader-spinner';
import Modal from '@mui/material/Modal';
import { Button , Input, IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
import RichTextEditor from 'components/RichTextEditor';
import { storage } from "./../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


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
  const [KG, setKG] = React.useState('0');
  //const [size, setSize] = React.useState('');
  const [Categoryes, setCategoryes] = React.useState('');
  const [Weight, setWeight] = React.useState('');
  const [Unit, setUnit] = React.useState('');
  const [Details, setDetails] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Featured, setFeatured] = React.useState(false);
  const [Visible, setVisible] = React.useState(true);
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState('');
  const [Condition, setCondition] = React.useState(null);
  const [PreviewEdit, setPreviewEdit] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  //const [selectedSizeFile, setSelectedSizeFile] = React.useState('');
  const [SelectedId, setSelectedId] = React.useState(null);
  const [fields, setFields] = React.useState([{ name: '', price: 0, stock:0, weight:0, unit:'' , image:'' }]);
  const [fields2, setFields2] = React.useState([{ name: '', aggregate: 0 }]);
  const [LifeStage, setLifeStage] = React.useState('Adult');
  const [ContentNo, setContentNo] = React.useState(0);



  const InitialState = () => {
    setNameRecipe('');
    setKG(0);
    setWeight(0);
    setDetails('');
    setDescription('');
    setFeatured(false);
    setVisible('');
    setSelectedFiles([]);
    setPreviewEdit([]);
    setSelectedId(null);
    setLifeStage('');
    setFields2([{ name: '', aggregate: 0 }]);
    setContentNo(0);

  };

  const onAddRecipeBtn = () => {
    setCondition('Add');
    InitialState();
    setOpen(true);
  };

  const handleSizeFileUpload = (image) => {
    // e.preventDefault();
    return new Promise((resolve, reject) => {
        // ref(storage, `images/${image?.name}`).put(image)
        const storageRef = ref(storage, `files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100
                );
                console.log(progress)
            },
            (error) => {
                console.log(error);
                reject({ message: "Error", data: error })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve({ message: "Uploaded", data: url })
                });
            }
        );

    })
  }

  const handleFileChange = (index,value) => {
   
      const file = value[0];
      //console.log(file);
      //const viewUrl = URL.createObjectURL(file);
      const updatedFields = [...fields];
      updatedFields[index].image = file;
      setFields(updatedFields);
      console.log(updatedFields);
        
  };

  const handleSelectChange2 = (index, value) => {
    const updatedFields2 = [...fields2];
    updatedFields2[index].name = value;
    setFields2(updatedFields2);
  };
  const handleNumberChange2 = (index, value) => {
    const updatedFields2 = [...fields2];
    updatedFields2[index].aggregate = parseFloat(value);
    setFields2(updatedFields2);
  };
  const handleRemoveField2 = (index) => {
    const updatedFields2 = [...fields2];
    updatedFields2.splice(index, 1);
    setFields2(updatedFields2);
  };

  const handleAddField2 = () => {
    setFields2([...fields2, { name: '', aggregate: 0 }]);
  };

  const handleSelectChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].name = value;
    setFields(updatedFields);
    //setSize(value);
  };
  const handleNumberChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].price = parseFloat(value);
    setFields(updatedFields);
    // if(updatedFields[index].name==="Standard"){
    //   setKG(value);
    // }
  };

  const handleStockChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].stock = parseInt(value);
    setFields(updatedFields);
  };

  const handleSkuChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].sku = value;
    setFields(updatedFields);
  };

  const handleWeightChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].weight = parseInt(value);
    setFields(updatedFields);
    // if(updatedFields[index].name==="Standard"){
    //   setWeight(value);
    // }
  };

  const handleUnitChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].unit = value;
    setFields(updatedFields);
    // if(updatedFields[index].name==="Standard"){
    //   setUnit(value);
    // }
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };
  const handleAddField = () => {
    setFields([...fields, { name: '', price: 0, stock:0, weight:0 , unit:'', image:'' }]);
  };

  //console.log(location?.state, 'location?.state');

  const handleClose = () => setOpen(false);
  const [rows, setrows] = React.useState([]);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const ingData = useSelector((state) => state.IngredientsReducer.data);
  const allData = useSelector((state) => state.CategoryReducer.data);
  console.log(ingData);
  const filterProdcuts = useSelector((state) => state.RecipeReducer.data);
  const newRows = filterProdcuts?.recipe?.filter((i) => i?.category !== '' && i?.category === location?.state);
  const isLoading = useSelector((state) => state.RecipeReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllRecipes(Userdata?.clientToken,true));
    dispatch(GetAllCategories(Userdata?.clientToken));
  }, []);

  React.useEffect(() => {
    if (value !== '') {
      const filteredData = newRows?.filter((item) => {
        return item?.name?.toLowerCase()?.includes(value?.toLowerCase()) || item?._id?.toLowerCase()?.includes(value?.toLowerCase());
      });
      setrows(filteredData);
    } else {
      setrows(newRows);
    }
  }, [filterProdcuts, value]);

  const allcategories = allData?.map((i) => {
    return {
      _id: i?._id,
      name: i?.name
    };
  });

  const IngredientArr = ingData?.map((i) => {
    return {
      _id: i?._id,
      name: i?.name,
      aggregate: i?.ingredientReference
    };
  });

  //console.log(IngredientArr);

  const onSuccess = () => {
    dispatch(GetAllRecipes(Userdata?.clientToken,true));
    InitialState();
    handleClose();
  };

  const onSave = async () => {
    console.log(KG,Weight,Unit); // dont remove this console

    let NewValues = fields2?.map((i) => {
      return {
        name: i?.name,
        aggregate: i?.aggregate
      };
    });

    console.log(NewValues);
   
    if (
      NameRecipe !== '' &&
      Description !== '' &&
      //KG != 0 &&
      Details != '' &&
      (fields.length === 0 || fields.some((field) => field.name !== '' && field.price > 0))
    ) {
      
      setError('');
      setLoading(true);

      await Promise.all(fields?.map(async (i) => {
        if(typeof i.image !="string"){
          const res = await handleSizeFileUpload(i.image);
          //console.log(res.data);
          i.image = res.data;
        }
        return i;
      }));
     // console.log(fields);

      //return;

      if (Condition === 'Add') {
        const newPath = await Promise.all(selectedFiles?.map(async (i) => await ImageUpload(i)));
        let newdata = {
          name: NameRecipe,
          isFeatured: Featured,
          isVisible: Visible,
          description: Description,
          details: Details,
          pricePerKG: fields[0].price,
          media: newPath,
          category: Categoryes,
          weight:fields[0].weight,
          unit: fields[0].unit,
          productImage: fields[0].image,
          recipeNo: '',
          ingredientsComposition: '',
          sizes: fields,
          price1: 0,
          price2: 0,
          price3: 0,
          price4: 0,
          price5: 0,
          price6: 0,
          ingredient : NewValues.length>0?NewValues:[],
          caloriesContentNo : parseInt(ContentNo),
          lifeStage : LifeStage
        };
        //console.log(newdata, 'newdata');
        dispatch(AddRecipe(newdata, Userdata?.clientToken, setLoading, onSuccess));
      } else {
        if (selectedFiles?.length > 0) {
          const newPath = await Promise.all(selectedFiles?.map(async (i) => await ImageUpload(i)));
          let newdata = {
            name: NameRecipe,
            isFeatured: Featured,
            isVisible: Visible,
            description: Description,
            details: Details,
            pricePerKG: fields[0].price,
            media: newPath,
            weight:fields[0].weight,
            unit: fields[0].unit,
            productImage: fields[0].image,
            category: Categoryes,
            recipeNo: '',
            ingredientsComposition: '',
            sizes: fields,
            price1: 0,
            price2: 0,
            price3: 0,
            price4: 0,
            price5: 0,
            price6: 0,
            ingredient : NewValues.length>0?NewValues:[],
            caloriesContentNo : parseInt(ContentNo),
            lifeStage : LifeStage
          };
          dispatch(EditRecipe(SelectedId, newdata, Userdata?.clientToken, setLoading, onSuccess));
        } else {
          
          let newdata = {
            name: NameRecipe,
            isFeatured: Featured,
            isVisible: Visible,
            description: Description,
            details: Details,
            pricePerKG: fields[0].price,
            media: PreviewEdit,
            weight:fields[0].weight,
            unit: fields[0].unit,
            productImage: fields[0].image,
            category: Categoryes,
            recipeNo: '',
            ingredientsComposition: '',
            sizes: fields,
            price1: 0,
            price2: 0,
            price3: 0,
            price4: 0,
            price5: 0,
            price6: 0,
            ingredient : NewValues.length>0?NewValues:[],
            caloriesContentNo : parseInt(ContentNo),
            lifeStage : LifeStage
          };
          dispatch(EditRecipe(SelectedId, newdata, Userdata?.clientToken, setLoading, onSuccess));
        }
      }
    } else {
      setError('Please fill all fields');
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

  // let SizesData = [
  //   {
  //     name:'Standard'
  //   },
  //   {
  //     name: 'XS'
  //   },
  //   {
  //     name: 'S'
  //   },
  //   {
  //     name: 'M'
  //   },
  //   {
  //     name: 'L'
  //   },
  //   {
  //     name: 'XL'
  //   },
  //   {
  //     name: '2XL'
  //   },
  //   {
  //     name: '3XL'
  //   }
  // ];

  const EditValues = (data) => {
    console.log(data, 'data');
    setCondition('Edit');
    setWeight(data?.weight);
    setUnit(data?.unit);
    setSelectedId(data?._id);
    setNameRecipe(data?.name);
    setKG(data?.pricePerKG);
    setDetails(data?.details);
    setDescription(data?.description);
    setFeatured(data?.isFeatured);
    setVisible(data?.isVisible);
    setPreviewEdit(data?.media);
    setCategoryes(data?.category);
    setFields(data?.sizes);
    setLifeStage(data?.lifeStage);
    setContentNo(data?.caloriesContentNo);
    setFields2(data?.ingredient);



    // console.log(data, "data")
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
            {Condition} Product
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }} sx={{ width: '100%' }}>
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
          

          {Categoryes === "Standard Recipes" && 
            <>
           <Box sx={{ width: '100%', position: 'relative' }}>
           {fields2.map((field, index) => (
             <Box key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
               {fields2?.length > 1 && (
                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: -20, cursor: 'pointer' }}>
                   <DeleteIcon variant="contained" color="secondary" onClick={() => handleRemoveField2(index)} />{' '}
                 </div>
               )}
               <FormControl sx={{ width: '80%' }}>
                 <InputLabel>Ingredient</InputLabel>
                 <Select value={field?.name} onChange={(e) => handleSelectChange2(index, e.target.value)}>
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
                 onChange={(e) => handleNumberChange2(index, e.target.value)}
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
             <AddCircleIcon variant="contained" color="primary" onClick={handleAddField2} />
           </div>
         </Box>

          
  <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>

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
    <FormControl sx={{ width: '100%', marginTop: 0.7 }}>
      <InputLabel>LifeStage</InputLabel>
      <Select value={LifeStage} onChange={(e) => setLifeStage(e.target.value)}>
        <MenuItem key={1} value="Adult">
          {' '}
          Adult
        </MenuItem>
        <MenuItem key={2} value="Puppy">
          Puppy{' '}
        </MenuItem>
        {/* <MenuItem key={3} value="Senior">
          {' '}
          Senior
        </MenuItem> */}
      </Select>
    </FormControl>
  </Box>
  
  </>
         
          }
          <Box sx={{ width: '100%', position: 'relative' }}>
            <Typography style={{fontWeight:500, margin:'10px'}}>Product Options:</Typography>
            {fields.map((field, index) => (
              <Box key={index} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }} sx={{ width: '100%' }}>
                {fields?.length > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: -20, cursor: 'pointer' }}>
                    <DeleteIcon variant="contained" color="secondary" onClick={() => handleRemoveField(index)} />{' '}
                  </div>
                )}
                {/* <FormControl sx={{ width: '50%' }}>
                
                  <InputLabel>Option Description</InputLabel>
                  <Select value={field?.name} onChange={(e) => handleSelectChange(index, e.target.value)}>
                    {SizesData?.map((i, index) => {
                      return (
                        <MenuItem key={index} value={i?.name}>
                          {i?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}
                <TextField
                  style={{ marginLeft: 5 }}
                  sx={{ width: '40%' }}
                  label="SKU"
                  type="text"
                  value={field?.sku}
                  onChange={(e) => handleSkuChange(index, e.target.value)}
                />
                <TextField
                  style={{ marginLeft: 5 }}
                  sx={{ width: '40%' }}
                  label="Option Description"
                  type="text"
                  value={field?.name}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                />
                <TextField
                  style={{ marginLeft: 5 }}
                  sx={{ width: '40%' }}
                  label="Price"
                  type="number"
                  step="2"
                  value={field?.price}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                />
                 <TextField
                  style={{ marginLeft: 5 }}
                  sx={{ width: '40%' }}
                  label="Stock"
                  type="number"
                  value={field?.stock}
                  onChange={(e) => handleStockChange(index, e.target.value)}
                />
                <TextField
                  style={{ marginLeft: 5 }}
                  sx={{ width: '40%' }}
                  label="Weight"
                  type="number"
                  value={field?.weight}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                />
                <TextField
                  style={{ marginLeft: 5 }}
                  sx={{ width: '40%' }}
                  label="Unit"
                  type="text"
                  value={field?.unit}
                  onChange={(e) => handleUnitChange(index, e.target.value)}
                />
                {field?.image!=""?
                 <img
                 alt={field?.image}
                 width={50}
                 height={50}
                 style={{marginLeft: 5, witdth:"50px",borderRadius:"8px"}}
                 src={typeof field?.image=="string"?field?.image:URL.createObjectURL(field?.image)}
                 >
                 </img>:
                 <Paper elevation={3} style={{  marginLeft: 5, width: '50px', textAlign: 'center' }}>
                  <label htmlFor="sizeImage">
                      <IconButton color="primary" component="span">
                        <CloudUploadIcon fontSize="large" />
                      </IconButton>
                  </label>
                               <Input id="sizeImage" type="file" style={{display:"none"}} onChange={(e)=>handleFileChange(index,e.target.files)} />
                  </Paper>
                }
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
                top: 44
              }}
            >
              <AddCircleIcon variant="contained" color="primary" onClick={handleAddField} />
            </div>
          </Box>
          {/* <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={Weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              id="outlined-basic"
              label="Weight (non-mandatory)"
              variant="outlined"
            />
          </Box> */}

          {/* <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
            <TextField
              value={KG}
              hidden={true}
              onChange={(e) => setKG(e.target.value)}
              style={{ margin: 5 }}
              sx={{ width: '100%' }}
              type={'number'}
              step="any"
              id="outlined-basic"
              label="Standard Price (for without size products)"
              variant="outlined"
            />
          </Box> */}
          {/* <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
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
          </Box> */}
          <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 10 ,alignItems:"flex-start", flexDirection:"column" }} sx={{ width: '100%' }}>
          <Typography style={{fontWeight:500,padding:'8px'}}>Product Description:</Typography>

            {/* <TextField
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginTop: 5 }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            /> */}
            <div style={{  maxHeight: 500, overflowY: 'scroll', width:'630px' }}>
                    <RichTextEditor 
                    value={Description}               
                    onChange={(value) => setDescription(value)}
                    />
             </div>
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
            control={<Switch checked={Visible} onChange={() => setVisible(!Visible)} />}
            label="Visible"
          />
          <ImageUploader
            imageCount={5}
            PreviewEdit={PreviewEdit}
            setPreviewEdit={setPreviewEdit}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
          />
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
              <div
                style={{
                  border: '1px solid #D78809',
                  width: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: 50,
                  margin: 5,
                  padding: 2
                }}
              >
                <ArrowBackIcon onClick={() => navigate(-1)} style={{ color: '#D78809' }} />
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
          <h2 style={{ textAlign: 'center' }}>{location?.state}</h2>
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
