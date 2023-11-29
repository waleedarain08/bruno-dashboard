import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#D78809",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const CookingSheet = () => {
    const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ width: '100%' }}>
                {/* <AnimateButton>
          <Button
             onClick={() => navigate('/cooking-sheet/ingredients-portioning-sheet')}
            style={{ margin: '12px' }}
            variant="contained"
            color="primary"
            sx={{ boxShadow: 'none' }}
          >
            Ingredients Portioning Sheet
          </Button>
        </AnimateButton> */}
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/cooking-sheet/ingredients-quantity-sheet')}
                        style={{ margin: '12px' }}
                        variant="contained"
                        color="primary"
                        sx={{ boxShadow: 'none' }}
                    >
                        Ingredients Quantity Sheet
                    </Button>
                </AnimateButton>
            </Box>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Ingredient Ref</StyledTableCell>
                        <StyledTableCell align="left">Ingredient Description</StyledTableCell>
                        <StyledTableCell align="left">Cooking Volume (grams)</StyledTableCell>
                        <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.calories}</StyledTableCell>
                            <StyledTableCell align="left">{row.fat}</StyledTableCell>
                            <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="left">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CookingSheet;
