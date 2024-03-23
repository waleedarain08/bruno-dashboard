import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Batch_Order_By_id } from 'store/batch/batchTypeAction';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SET_MENU } from 'store/actions';
import ExportBatchLable from './exportBatchLable';
// import { borderBottom } from '@mui/system';

const BatchLable = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const [FeedingData, setFeedingData] = React.useState([]);
    const BatchOrderByIdData = useSelector((state) => state.BatchReducer.BatchOrderByIdData);
    React.useEffect(() => {
        dispatch(Batch_Order_By_id(state?._id, Userdata?.clientToken));
    }, [state]);

    const onExport = () => {
        dispatch({ type: SET_MENU, opened: false });
        setTimeout(() => {
            window.print();
        }, 200);
    }

    React.useEffect(() => {
        if (BatchOrderByIdData?.length > 0) {
            let newarrr = BatchOrderByIdData?.map((w) => {
                return w?.orderItems
                    ?.map((z) => {
                        if (z?.planType === 'Transitional') {
                            let extractString = z?.pouchesDetail[0].split('|');
                            let newData = [];
                            extractString.forEach((segment) => {
                                let match = segment.match(/(\d+) pouches x (\d+\.\d+) grams/);
                                if (match) {
                                    newData.push({
                                        day: parseInt(match[1]),
                                        value: parseFloat(match[2])
                                    });
                                }
                            });
                            return newData;
                        } else {
                            return z?.totalWeight[0];
                        }
                    })
                    .flat(2);
            });
            setFeedingData(newarrr);
        }
    }, [BatchOrderByIdData]);

    const givenDate = moment(state?.createdOnDate);
    const futureDate = givenDate.add(30, 'days');
    const formattedFutureDate = futureDate.format('DD MMM YYYY');

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <AnimateButton >
                            <ExportBatchLable FeedingData={FeedingData} filename={"BatchLable"} data={BatchOrderByIdData} state={state} />
                        </AnimateButton>
                        <AnimateButton >

                            <Button onClick={() => onExport()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                                Print
                            </Button>
                        </AnimateButton>
                    </div>


                </div>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {BatchOrderByIdData?.map((t, firstindex) => {
                        let PuchesData = BatchOrderByIdData?.map((p) => p?.orderItems).flat(2);
                        return FeedingData?.[firstindex]?.map((i) => {
                            let allDay = PuchesData?.[firstindex]?.pet?.feedingRoutine > 1 ? i?.day + i?.day : i?.day;
                            let updatedPouches = i?.value / PuchesData?.[firstindex]?.pet?.feedingRoutine;
                            let newPouches = updatedPouches >= 400 && updatedPouches <= 800 ? updatedPouches / 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? updatedPouches / 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? updatedPouches / 4 : updatedPouches;
                            let numbers = updatedPouches >= 400 && updatedPouches <= 800 ? allDay * 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? allDay * 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? allDay * 4 : allDay;

                            let newArray = [];
                            for (let i = 0; i < numbers; i++) {
                                newArray.push(i);
                            }

                            return newArray?.map((x, thiredIndex) => {
                                return <Grid item xs={2} sm={4} md={4} key={thiredIndex} >
                                    <Card sx={{ width: 370, marginBottom: 3 }}>
                                        <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Typography style={{ marginTop: 30, textAlign: "center", height: 100, transform: 'rotate(-90deg)' }} variant="h5" component="div">
                                                Order No : {t?._id.substr(t?._id?.length - 5)}
                                                {/* <br></br>
                                                Recipe Ref : */}
                                            </Typography>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "70%", marginTop: -10 }}>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", borderBottom: "1px solid", height: 10, width: "100%", paddingBottom: 40 }} >
                                                    <p style={{ textAlign: "start", fontWeight: "700", width: "50%" }} color="text.secondary">
                                                        Batch No. :
                                                    </p>
                                                    <p style={{ textAlign: "end", fontWeight: "500", width: "50%" }} color="text.secondary">
                                                        {state?.batchNumber}
                                                    </p>

                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", borderBottom: "1px solid", height: 10, width: "100%", paddingBottom: 40 }}>
                                                    <p style={{ textAlign: "start", fontWeight: "700", width: "50%" }} color="text.secondary">
                                                        Prod Date:
                                                    </p>
                                                    <p style={{ textAlign: "end", fontWeight: "500", width: "50%" }} color="text.secondary">
                                                        {moment(state?.createdOnDate).format('DD MMM YYYY')}
                                                    </p>

                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", borderBottom: "1px solid", height: 10, width: "100%", paddingBottom: 40 }} >
                                                    <p style={{ textAlign: "start", fontWeight: "700", width: "50%" }} color="text.secondary">
                                                        Expiry Date:
                                                    </p>
                                                    <p style={{ textAlign: "end", fontWeight: "500", width: "50%" }} color="text.secondary">
                                                        {formattedFutureDate}
                                                    </p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", borderBottom: "1px solid", height: 10, width: "100%", paddingBottom: 40 }} >
                                                    <p style={{ textAlign: "start", fontWeight: "700", width: "50%" }} color="text.secondary">
                                                        Net Weight:
                                                    </p>
                                                    <p style={{ textAlign: "end", fontWeight: "500", width: "50%" }} color="text.secondary">
                                                        {newPouches} grams
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>

                                    </Card>
                                </Grid>
                            })

                        })

                    })}
                </Grid>
            </Box>

        </>

    );
}

export default BatchLable;
