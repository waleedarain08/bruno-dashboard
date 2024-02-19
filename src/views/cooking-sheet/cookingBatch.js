import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';
import { InfinitySpin } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Batch_Ingredients, Batch_Order_By_id } from 'store/batch/batchTypeAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';

const CookingBatch = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const [AllKeys, setAllKeys] = React.useState([]);
    const [FeedingData, setFeedingData] = React.useState([]);
    const BatchIngredientsData = useSelector((state) => state.BatchReducer.BatchIngredientsData);
    const BatchOrderByIdData = useSelector((state) => state.BatchReducer.BatchOrderByIdData);
    const isLoadingBatchOrderById = useSelector((state) => state.BatchReducer.isLoadingBatchOrderById);

    // console.log(AllKeys, "AllKeys")

    React.useEffect(() => {
        dispatch(Batch_Ingredients(state?._id, Userdata?.clientToken));
        dispatch(Batch_Order_By_id(state?._id, Userdata?.clientToken));
    }, [state]);


    React.useEffect(() => {
        if (BatchIngredientsData?.length > 0 || BatchIngredientsData !== undefined) {
            const formattedData = Object.keys(BatchIngredientsData).map((key) => {
                const weight = BatchIngredientsData[key].weight;
                const contingencyFactor = BatchIngredientsData[key].ContingencyFactor;
                const percentage = parseFloat(contingencyFactor.replace('%', '')) / 100;
                const adjustedWeight = weight * (1 + percentage);

                return {
                    key: key,
                    weight: weight,
                    ContingencyFactor: contingencyFactor,
                    CookingVolume: adjustedWeight,
                    percentageObj: 1 + percentage
                };
            });
            setAllKeys(formattedData);
        }
    }, [BatchIngredientsData]);

    const sumWithInitial = AllKeys?.reduce((accumulator, currentValue) => accumulator + currentValue?.weight, 0);
    const sumWithadjustedWeight = AllKeys?.reduce((accumulator, currentValue) => accumulator + currentValue?.CookingVolume, 0);

    const givenDate = moment(state?.createdOnDate);
    const futureDate = givenDate.add(30, 'days');
    const formattedFutureDate = futureDate.format('DD MMM YYYY');

    let nameArr = BatchOrderByIdData?.map((i) => i?.orderItems?.map((u) => u?.recipes?.map((x) => x?.name)))
        .flat(2)
        .filter((name) => name !== undefined);

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

    let maxLength = Math.max(...FeedingData.map(innerArray => innerArray.length));
    let rows = [];
    for (let i = 0; i < maxLength; i++) {
        rows.push(i);
    }
    return (
        <>
            {isLoadingBatchOrderById ? (
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <InfinitySpin width="200" color="#D78809" />
                    </div>
                </Paper>
            ) : (
                <>
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
                        <AnimateButton>
                            <Button onClick={() => window.print()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                                Print
                            </Button>
                        </AnimateButton>
                    </div>

                    <Paper sx={{ width: '40%', marginBottom: 4 }}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableCell align="left">Batch Ref.</TableCell>
                                    <TableCell align="left">{state?.batchNumber}</TableCell>
                                </TableBody>
                                <TableBody>
                                    <TableCell align="left">Production Date:</TableCell>
                                    <TableCell align="left">{moment(state?.createdOnDate).format('DD MMM YYYY')}</TableCell>
                                </TableBody>
                                <TableBody>
                                    <TableCell align="left">Expiry Date:</TableCell>
                                    <TableCell align="left">{formattedFutureDate}</TableCell>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    <Paper>
                        <TableContainer>
                            <Table aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: '800' }} align="left" colSpan={1}>
                                            Batch Cooking Ingredients:
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                                            Ingredient Ref
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                                            Ingredient Description
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                                            Cooking Volume (grams)
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                                            Contingency Factor (%)
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                                            Total Orders Volume (grams)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {AllKeys?.map((i, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{i?.key}</TableCell>
                                                <TableCell align="center">{i?.weight?.toFixed(2)}</TableCell>
                                                <TableCell align="center">{i?.ContingencyFactor}</TableCell>
                                                <TableCell align="center">{i?.CookingVolume?.toFixed(2)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell style={{ fontWeight: '700' }} align="center">
                                            {sumWithInitial?.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell style={{ fontWeight: '700' }} align="center">
                                            {sumWithadjustedWeight?.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>


                    <Paper sx={{ marginTop: 4 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: '800' }} align="left" colSpan={2}>
                                            Orders Cooking Ingredients:
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ width: 250, fontWeight: '800' }} align="center"></TableCell>
                                        <TableCell style={{ width: 250, fontWeight: '800' }} align="center"></TableCell>
                                        <TableCell style={{ width: 250, fontWeight: '800' }} align="center"></TableCell>
                                        {BatchOrderByIdData?.map((i, index) => {
                                            return (
                                                <TableCell key={index} style={{ width: 250, fontWeight: '800' }} align="center">
                                                    Order {index + 1}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                                            Ingredient Ref
                                        </TableCell>
                                        <TableCell style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                                            Ingredient Description
                                        </TableCell>
                                        <TableCell style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                                            Cooking Volume (grams)
                                        </TableCell>
                                        {nameArr?.map((i, index) => (
                                            <TableCell key={index} style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                                                {i}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {AllKeys?.map((i, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell style={{ width: 250 }} align="center">{index + 1}</TableCell>
                                                <TableCell style={{ width: 250 }} align="center">{i?.key}</TableCell>
                                                <TableCell style={{ width: 250 }} align="center">{i?.CookingVolume?.toFixed(2)}</TableCell>
                                                {BatchOrderByIdData?.map((x, index) => {
                                                    let updatedData = Object.entries(x?.ingredientConsumption).map(([name, value]) => ({ name, value }));
                                                    let anOther = updatedData?.filter((u) => u?.name == i?.key);
                                                    const percentage = parseFloat(i?.ContingencyFactor?.replace('%', '')) / 100;
                                                    const adjustedWeight = anOther?.[0]?.value * (1 + percentage);


                                                    return (
                                                        <TableCell style={{ width: 250 }} key={index} align="center">
                                                            {anOther?.length > 0 ? adjustedWeight?.toFixed(2) : '--'}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        <TableCell style={{ width: 250 }} align="center"></TableCell>
                                        <TableCell style={{ width: 250 }} align="center"></TableCell>
                                        <TableCell style={{ width: 250, fontWeight: '700' }} align="center">
                                            {sumWithadjustedWeight?.toFixed(2)}
                                        </TableCell>

                                        {BatchOrderByIdData?.map((x, index) => {
                                            let updatedData = Object.entries(x?.ingredientConsumption).map(([name, value]) => ({ name, value }));
                                            let newS = updatedData?.map((u) => {
                                                const matchingItem = AllKeys.find((a) => u?.name === a.key);
                                                let matched = matchingItem !== undefined && matchingItem !== null && u?.value * (1 + parseFloat(matchingItem?.ContingencyFactor?.replace('%', '')) / 100);
                                                return { value: matched };
                                            })
                                            console.log({ newS }, "AllKeys")
                                            const newSum = newS?.reduce((accumulator, currentValue) => accumulator + currentValue?.value, 0);
                                            return (
                                                <TableCell style={{ width: 250, fontWeight: '700' }} key={index} align="center">
                                                    {newSum?.toFixed(2)}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    <Paper sx={{ width: '100%', marginTop: 5, borderTop: 1 }}>
                        <TableContainer>
                            <Table aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: '800' }} align="left">
                                            Packaging Instructions:
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ width: 250 }} align="left">Daily Feeding Routine:</TableCell>
                                        <TableCell style={{ width: 250 }} align="center"></TableCell>
                                        <TableCell style={{ width: 250 }} align="center"></TableCell>
                                        {BatchOrderByIdData?.map((u) => {
                                            return u?.orderItems?.map((y, index) => (
                                                <TableCell style={{ width: 250 }} key={index} align="center">
                                                    {y?.pet?.feedingRoutine}
                                                </TableCell>
                                            ));
                                        })}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    <Paper sx={{ width: '100%', marginTop: 5, }}>
                        <TableContainer>
                            <Table>
                                {rows?.map((p, firstindex) => {
                                    return (
                                        <TableBody key={firstindex}>
                                            <TableRow>
                                                <TableCell style={{ width: 250 }} align="left">Daily Intake (grams):</TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                {FeedingData?.map((x, secned) => {
                                                    return <TableCell style={{ width: 250 }} key={secned} align="center">
                                                        {FeedingData?.[secned]?.[firstindex]?.value}
                                                    </TableCell>
                                                })}
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ width: 250 }} align="left">Days:</TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                {FeedingData?.map((x, secned) => {
                                                    let plane = BatchOrderByIdData?.[secned]?.orderItems?.[0]?.planType;
                                                    let daysData = [3, 3, 3, 1];
                                                    return <TableCell style={{ width: 250 }} key={secned} align="center">
                                                        {plane == "Transitional" ? daysData?.[firstindex] : FeedingData?.[secned]?.[firstindex]?.day}
                                                    </TableCell>
                                                })}
                                            </TableRow>
                                        </TableBody>
                                    );
                                })}
                            </Table>
                        </TableContainer>
                    </Paper>


                    <Paper sx={{ width: '100%', marginTop: 4 }}>
                        <TableContainer>
                            <Table>
                                {rows?.map((x, firstindex) => {
                                    let PuchesData = BatchOrderByIdData?.map((p) => p?.orderItems).flat(2);
                                    return (
                                        <TableBody key={firstindex}>
                                            <TableRow>
                                                <TableCell style={{ width: 250 }} align="left">Portion / Pouch :</TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                {FeedingData?.map((x, secned) => {
                                                    let updatedPouches = FeedingData?.[secned]?.[firstindex]?.value / PuchesData?.[secned]?.pet?.feedingRoutine;
                                                    return <TableCell style={{ width: 250 }} key={secned} align="center">
                                                        {updatedPouches >= 400 && updatedPouches <= 800 ? updatedPouches / 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? updatedPouches / 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? updatedPouches / 4 : updatedPouches}
                                                    </TableCell>
                                                })}
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ width: 250 }} align="left">Total Pouches:</TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                <TableCell style={{ width: 250 }} align="center"></TableCell>
                                                {FeedingData?.map((x, secned) => {
                                                    let daysData = [3, 3, 3, 1];
                                                    let plane = BatchOrderByIdData?.[secned]?.orderItems?.[0]?.planType;
                                                    let allDay = PuchesData?.[secned]?.pet?.feedingRoutine <= 1 ? FeedingData?.[secned]?.[firstindex]?.day : plane == "Transitional" ? daysData?.[firstindex] + daysData?.[firstindex] : FeedingData?.[secned]?.[firstindex]?.day + FeedingData?.[secned]?.[firstindex]?.day;
                                                    let updatedPouches = FeedingData?.[secned]?.[firstindex]?.value / PuchesData?.[secned]?.pet?.feedingRoutine;
                                                    return <TableCell style={{ width: 250 }} key={secned} align="center">
                                                        {updatedPouches >= 400 && updatedPouches <= 800 ? allDay * 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? allDay * 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? allDay * 4 : allDay}

                                                    </TableCell>
                                                })}
                                            </TableRow>
                                        </TableBody>
                                    );
                                })}
                            </Table>
                        </TableContainer>
                    </Paper>
                    {/* <Paper sx={{ width: '100%', marginTop: 4 }}>
                        <TableContainer>
                            <Table aria-label="sticky table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ width: 250 }} align="left">No of Pouches per 1 serving:</TableCell>
                                        <TableCell style={{ width: 250 }} align="left"></TableCell>
                                        <TableCell style={{ width: 250 }} align="left"></TableCell>
                                        {BatchOrderByIdData?.map((x, firstindex) => {
                                            return (
                                                <TableCell style={{ width: 250 }} key={firstindex} align="center">
                                                    1
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper> */}
                </>
            )}
        </>
    );
};

export default CookingBatch;
