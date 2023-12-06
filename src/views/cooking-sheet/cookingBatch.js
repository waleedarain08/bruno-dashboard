import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const CookingBatch = () => {


    return (
        <>
            <Paper sx={{ width: '40%', marginBottom: 4 }}>
                <TableContainer >
                    <Table >
                        <TableBody>
                            <TableCell align="left">
                                Batch Ref.
                            </TableCell>
                            <TableCell align="left">
                                23/1123
                            </TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell align="left">
                                Production Date:
                            </TableCell>
                            <TableCell align="left">
                                19th Nov, 2023
                            </TableCell>
                        </TableBody>
                        <TableBody>
                            <TableCell align="left">
                                Expiry Date:
                            </TableCell>
                            <TableCell align="left">
                                18th Dev, 2023
                            </TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>


            <Paper sx={{ width: '100%' }}>
                <TableContainer >
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "800" }} align="center" colSpan={1}>
                                    Batch Cooking Ingredients:
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Ingredient Ref
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Ingredient Description
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Total Orders Volume (grams)
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Contingency Factor (%)
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Cooking Volume (grams)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell align="center">
                                    1
                                </TableCell>
                                <TableCell align="center">
                                    Beef
                                </TableCell>
                                <TableCell align="center">
                                    12500
                                </TableCell>
                                <TableCell align="center">
                                    25%
                                </TableCell>
                                <TableCell align="center">
                                    15,625
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>


            <Paper sx={{ width: '100%', marginTop: 4 }}>
                <TableContainer >
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "800" }} align="center" colSpan={2}>
                                    Orders Cooking Ingredients:
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: "800" }} align="center" colSpan={3}>
                                </TableCell>
                                <TableCell style={{ fontWeight: "800" }} align="center" colSpan={4}>
                                    Order 1
                                </TableCell>
                                <TableCell style={{ fontWeight: "800" }} align="center" colSpan={1}>
                                    Order 2
                                </TableCell>
                                <TableCell style={{ fontWeight: "800" }} align="center" colSpan={3}>
                                    Order 3
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Ingredient Ref
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Ingredient Description
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Cooking Volume (grams)
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Chicken
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Chicken
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Beef
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Combo Chicken/ Beef
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Beef
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Beef
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Chicken
                                </TableCell>
                                <TableCell style={{ backgroundColor: "#D78809" }} align="center">
                                    Lamb
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell align="center">
                                    1
                                </TableCell>
                                <TableCell align="center">
                                    Beef
                                </TableCell>
                                <TableCell align="center">
                                    12500
                                </TableCell>
                                <TableCell align="center">
                                    -
                                </TableCell>
                                <TableCell align="center">
                                    -
                                </TableCell>
                                <TableCell align="center">
                                    1388
                                </TableCell>
                                <TableCell align="center">
                                    14678
                                </TableCell>
                                <TableCell align="center">
                                    1245
                                </TableCell>
                                <TableCell align="center">
                                    -
                                </TableCell>
                                <TableCell align="center">
                                    48544
                                </TableCell>
                                <TableCell align="center">
                                    -
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper sx={{ width: '100%', marginTop: 10, borderTop: 1 }}>
                    <TableContainer >
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "800" }} align="center" colSpan={1}>
                                        Packaging Instructions:
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">
                                        Daily Feeding Routine:
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        3
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        2
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        2
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        2
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        3
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        2
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        2
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        1
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Daily Intake (grams):
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        230
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        558
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        625
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        431
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        249
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        280
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        782
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        1010
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Days :
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        4
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        13
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        7
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        10
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        30
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        10
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        8
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        12
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Daily Intake (grams):
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        440
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Days :
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        3
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Daily Intake (grams):
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        440
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Days :
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">
                                        3
                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                    <TableCell style={{ width: 97 }} align="center">

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Paper>

            <Paper sx={{ width: '100%', marginTop: 4 }}>
                <TableContainer >
                    <Table aria-label="sticky table">
                        <TableBody>
                            <TableRow >
                                <TableCell align="left">
                                    Portion / Pouch :
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    26
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    279
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    312
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    215
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    83
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    140
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    391
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    337
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">
                                    Total Pouches:
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    9
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    26
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    14
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    20
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    90
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    20
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    16
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    36
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">
                                    Portion / Pouch :
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    49
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">
                                    Total Pouches:
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    9
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Paper sx={{ width: '100%', marginTop: 4 }}>
                <TableContainer >
                    <Table aria-label="sticky table">
                        <TableBody>
                            <TableRow >
                                <TableCell align="left">
                                    No of Pouches per 1 serving:
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                                <TableCell style={{ width: 97 }} align="center">
                                    1
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>

    );
}

export default CookingBatch;
