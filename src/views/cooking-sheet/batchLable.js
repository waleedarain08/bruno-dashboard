import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Batch_Order_By_id } from 'store/batch/batchTypeAction';
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

    // let maxLength = Math.max(...FeedingData.map(innerArray => innerArray.length));
    // let rows = [];
    // for (let i = 0; i < maxLength; i++) {
    //     rows.push(i);
    // }

    console.log(FeedingData, "FeedingData")

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
            <TableContainer component={Paper}>
                {FeedingData?.map((t, firstindex) => {
                    let PuchesData = BatchOrderByIdData?.map((p) => p?.orderItems).flat(2);
                    return t?.map((i) => {
                        let allDay = PuchesData?.[firstindex]?.pet?.feedingRoutine > 1 ? i?.day + i?.day : i?.day;
                        let updatedPouches = i?.value / PuchesData?.[firstindex]?.pet?.feedingRoutine;
                        let newPouches = updatedPouches >= 400 && updatedPouches <= 800 ? updatedPouches / 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? updatedPouches / 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? updatedPouches / 4 : updatedPouches;
                        let numbers = updatedPouches >= 400 && updatedPouches <= 800 ? allDay * 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? allDay * 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? allDay * 4 : allDay;
                        let newArray = [];
                        for (let i = 0; i <= numbers; i++) {
                            newArray.push(i);
                        }
                        return newArray?.map((x, thiredIndex) => {
                            return <>
                                <Table key={thiredIndex}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ transform: 'rotate(-90deg)', textAlign: "center", width: 200 }} rowSpan={4}>Order No
                                                Recipe Ref</TableCell>
                                            <TableCell>Batch No. :</TableCell>
                                            <TableCell>{state?.batchNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Prod Date:</TableCell>
                                            <TableCell>{moment(state?.createdOnDate).format('DD MMM YYYY')}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Expiry Date:</TableCell>
                                            <TableCell>{formattedFutureDate}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Net Weight:</TableCell>
                                            <TableCell>{newPouches} grams</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </>
                        })

                    })

                })}

            </TableContainer>
        </>

    );
}

export default BatchLable;
