import React, { useState, useEffect } from 'react';
import { IconButton, Input, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const TableImageUploader = ({ PreviewTableEdit, setSelectedTableFiles, selectedTableFiles, imageCountTable, setPreviewTableEdit }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const handleFileChange = (e) => {
    if (selectedTableFiles?.length > imageCountTable) {
      alert(`only ${imageCountTable} Images is allowed`)
    } else {
      const files = e.target.files;
      console.log(files);
      const newSelectedFiles = Array.from(files).slice(0, imageCountTable);
      setSelectedTableFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newSelectedFiles]);
      const newPreviewUrls = newSelectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...newPreviewUrls]);
    }
  };

  useEffect(() => {
    if (typeof PreviewTableEdit === "string") {
      setPreviewUrls([PreviewTableEdit])
    }
    else {
      setPreviewUrls([...PreviewTableEdit])
    }

  }, [PreviewTableEdit]);


  const handleRemoveImage = (index) => {
    const newPreviewUrls = [...previewUrls];
    const selectedFilesUrls = [...selectedTableFiles];
    selectedFilesUrls.splice(index, 1);
    PreviewTableEdit?.length > 0 && setPreviewTableEdit(selectedFilesUrls);
    setSelectedTableFiles(selectedFilesUrls);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };


  return (
    <Box>
      <Grid >
        <Grid item xs={2} sm={4} md={4}>
          <Paper elevation={3} style={{ padding: '20px', margin: 5, width: '100%', textAlign: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file-table"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file-table">
              <IconButton color="primary" component="span">
                <CloudUploadIcon fontSize="large" />
              </IconButton>
            </label>
            <div style={{ marginTop: '10px', display: "none" }}>
              <Input type="file" onChange={handleFileChange} />
            </div>
            {/* <div style={{ marginTop: '20px' }}>
                            <Button variant="contained" color="primary" onClick={handleUpload}>
                                Upload
                            </Button>
                        </div> */}
          </Paper>

        </Grid>
        {previewUrls.map((url, index) => (
          <Grid style={{ position: 'relative' }} item xs={2} sm={4} md={4} key={index}>
            <img loading="lazy" src={url} alt={`Preview ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '80px', margin: 5, }} />
            <span
              role="button"
              tabIndex={0}
              style={{
                position: 'absolute',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: '30px',
                right: '10px',
                background: '#000',
                color: '#fff',
                borderRadius: '50%',
                padding: '2px',
                height: "17px",
                width: "17px",
                cursor: 'pointer',
              }}
              onClick={() => handleRemoveImage(index)}
              onKeyDown={(e) => e.key === 'Enter' && handleRemoveImage(index)}
            >
              X
            </span>
          </Grid>
        ))}
      </Grid>
    </Box>

  );
};

export default TableImageUploader;