import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Batch_Order_By_id } from 'store/batch/batchTypeAction';

const BatchLable = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const BatchOrderByIdData = useSelector((state) => state.BatchReducer.BatchOrderByIdData);
    React.useEffect(() => {
        dispatch(Batch_Order_By_id(state?._id, Userdata?.clientToken));
    }, [state]);

    console.log(BatchOrderByIdData, "BatchOrderByIdData")
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell style={{ transform: 'rotate(-90deg)', textAlign: "center", width: 200 }} rowSpan={4}>Order No
                            Recipe Ref</TableCell>
                        <TableCell>Batch No. :</TableCell>
                        <TableCell>23/1123</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Prod Date:</TableCell>
                        <TableCell>19th Nov, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Expiry Date:</TableCell>
                        <TableCell>18th Dec, 2023</TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell>Net Weight:</TableCell>
                        <TableCell>26 grams</TableCell>
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
        </TableContainer>
    );
}

export default BatchLable;
