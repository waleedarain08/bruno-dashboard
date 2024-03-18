import React from 'react';
import { exportToExcel } from 'react-json-to-excel';
import { Button } from '@mui/material';

const ExportCookingSheet = ({ data, filename }) => {
    // const samplejson1 = [
    //     { label: "C" },
    //     { label: "Java" },
    //     { label: "Go" },
    //     { label: "Javascript" },
    //     { label: "HTML" },
    //     { label: "CSS" },
    //     { label: "REACT" },
    //     { label: "JQUERY" }
    // ];
    return (
        // <JsonToExcel
        //     title="Download as Excel"
        //     data={samplejson1}
        //     fileName="sample-file"
        // />
        <Button onClick={() => exportToExcel(data, filename)} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
            Export
        </Button>
    );
}

export default ExportCookingSheet;
