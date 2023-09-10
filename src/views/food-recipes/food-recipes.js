import * as React from 'react';
import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InfinitySpin } from 'react-loader-spinner';
// import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import RecipeReviewCard from 'ui-component/cards/Recipe';
import { GetAllRecipes } from 'store/recipe/recipeAction';

const FoodRecipes = () => {
  const navigate = useNavigate();

  const Userdata = useSelector((state) => state.AuthReducer.data);
  const rows = useSelector((state) => state.RecipeReducer.data);
  const isLoading = useSelector((state) => state.RecipeReducer.isLoading);
  console.log(rows, 'rows');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllRecipes(Userdata?.clientToken));
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
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
              <Button style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
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
          {rows?.map((i, index) => {
            return <RecipeReviewCard data={i} key={index} />;
          })}
        </Paper>
      )}
    </Box>
  );
};

export default FoodRecipes;
