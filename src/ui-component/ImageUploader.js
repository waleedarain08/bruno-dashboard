import React, { useState, useEffect } from 'react';
import { IconButton, Input, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const ImageUploader = ({ PreviewEdit, setSelectedFile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (PreviewEdit !== null) {
      setPreviewUrl(PreviewEdit)
    }
  }, [PreviewEdit]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Generate a preview URL for the selected image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  // const handleUpload = () => {
  //     if (selectedFiles.length > 0) {
  //         console.log('Uploading files:', selectedFiles);
  //         // Yahan pe aap files ko upload karne ka logic dal sakte hain
  //     } else {
  //         console.log('No files selected');
  //     }
  // };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
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
            <div style={{ marginTop: '10px', display: 'none' }}>
              <Input type="file" onChange={handleFileChange} />
            </div>
            {/* <div style={{ marginTop: '20px' }}>
                            <Button variant="contained" color="primary" onClick={handleUpload}>
                                Upload
                            </Button>
                        </div> */}
          </Paper>
        </Grid>
        {previewUrl !== null && (
          <Grid style={{ position: 'relative' }} item xs={2} sm={4} md={4}>
            <img src={previewUrl} alt={`Preview`} style={{ maxWidth: '100%', maxHeight: '80px', margin: 5 }} />
            <span
              role="button"
              tabIndex={0}
              style={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: '30px',
                right: '10px',
                background: '#000',
                color: '#fff',
                borderRadius: '50%',
                padding: '2px',
                height: '17px',
                width: '17px',
                cursor: 'pointer'
              }}
              onClick={() => handleRemoveImage()}
              onKeyDown={(e) => e.key === 'Enter' && handleRemoveImage()}
            >
              X
            </span>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ImageUploader;
