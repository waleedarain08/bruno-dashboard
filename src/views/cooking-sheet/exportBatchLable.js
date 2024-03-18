import React from 'react';
import { exportToExcel } from 'react-json-to-excel';
import { Button } from '@mui/material';
import moment from 'moment';

const ExportBatchLable = ({ data, state, filename, FeedingData }) => {
    const givenDate = moment(state?.createdOnDate);
    const futureDate = givenDate.add(30, 'days');
    const formattedFutureDate = futureDate.format('DD MMM YYYY');

    let newData = data?.map((t, firstindex) => {
        let PuchesData = data?.map((p) => p?.orderItems).flat(2);
        return FeedingData?.[firstindex]?.map?.((i) => {
            let allDay = PuchesData?.[firstindex]?.pet?.feedingRoutine > 1 ? i?.day + i?.day : i?.day;
            let updatedPouches = i?.value / PuchesData?.[firstindex]?.pet?.feedingRoutine;
            let newPouches = updatedPouches >= 400 && updatedPouches <= 800 ? updatedPouches / 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? updatedPouches / 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? updatedPouches / 4 : updatedPouches;
            let numbers = updatedPouches >= 400 && updatedPouches <= 800 ? allDay * 2 : updatedPouches >= 800 && updatedPouches <= 1200 ? allDay * 3 : updatedPouches >= 1200 && updatedPouches <= 1600 ? allDay * 4 : allDay;

            let newArray = [];
            for (let i = 0; i < numbers; i++) {
                newArray.push(i);
            }
            return newArray?.map(() => {
                return {
                    Order_No: t?._id.substr(t?._id?.length - 5),
                    Batch_No: state?.batchNumber,
                    Prod_Date: moment(state?.createdOnDate).format('DD MMM YYYY'),
                    Expiry_Date: formattedFutureDate,
                    Net_Weight: `${newPouches} grams`
                }
            })
        }).flat(); // Flattening the nested arrays
    }).flat(); // Flattening the outer array

    return (
       

        <Button onClick={() => exportToExcel(newData, filename)} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
            Export
        </Button>
    );
}

export default ExportBatchLable;
