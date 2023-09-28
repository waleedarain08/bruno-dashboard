import React, { useState, useEffect } from 'react';
import { IconButton, Input, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const ImageUploader = ({ PreviewEdit, setSelectedFiles, selectedFiles, imageCount, setPreviewEdit }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const handleFileChange = (e) => {
    if (selectedFiles?.length == imageCount) {
      alert(`only ${imageCount} Images is allowed`)
    } else {
      const files = e.target.files;
      const newSelectedFiles = Array.from(files).slice(0, imageCount);
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newSelectedFiles]);
      const newPreviewUrls = newSelectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...newPreviewUrls]);
    }
  };

  useEffect(() => {
    if (typeof PreviewEdit === "string") {
      setPreviewUrls([PreviewEdit])
    }
    else {
      setPreviewUrls([...PreviewEdit])
    }

  }, [PreviewEdit]);


  const handleRemoveImage = (index) => {
    const newPreviewUrls = [...previewUrls];
    const selectedFilesUrls = [...selectedFiles];
    selectedFilesUrls.splice(index, 1);
    PreviewEdit?.length > 0 && setPreviewEdit(selectedFilesUrls);
    setSelectedFiles(selectedFilesUrls);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };


  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4}>

          <Paper elevation={3} style={{ padding: '20px', margin: 5, width: '100%', textAlign: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
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

export default ImageUploader;