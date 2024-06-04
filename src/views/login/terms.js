//import { Link } from 'react-router-dom';

// material-ui
//import { useTheme } from '@mui/material/styles';
//import {   Typography} from '@mui/material';
import { useEffect,useState } from 'react';
import { BASE_URL } from './../../helpers/apicalls/constants/constants';
import axios from 'axios';
import parse from 'html-react-parser';


// project imports
// import AuthWrapper1 from './AuthWrapper1';
// import AuthCardWrapper from './AuthCardWrapper';
// import AuthLogin from './AuthLogin';
// import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Terms = () => {

    const [data,setData] = useState("Loading...");
 
    useEffect(()=>{
        Get("auth/type/terms");
    },[])

    async function Get(path) {
        let url = BASE_URL + path;
        var config = {
          method: 'get',
          url: url,
          headers: 
             {
              Accept: 'application/json'
            }
        };
        let response = await axios(config);
       // console.log ( response.data.data[0].description );
        setData(response.data.data[0].description)
      }

  return (
    //   <Grid container direction="column" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <div style={{padding:"1%"}}>
           { parse(data) }
        </div>
    //   </Grid>
  );
};

export default Terms;
