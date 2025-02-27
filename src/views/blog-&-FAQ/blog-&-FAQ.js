import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import { TextareaAutosize } from '@mui/base';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Button, Checkbox } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';
import square from '../../assets/images/square.jpeg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import * as actionTypes from '../../store/blogs&faqs/blogs&faqsType';
import {
  Box,
  Typography
  // useMediaQuery
} from '@mui/material';
import Modal from '@mui/material/Modal';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

// import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AddBlogsNnews, DeleteBlogsNnews, EditBlogsNnews, GetAllBlogs_News } from 'store/blogs&faqs/blogs&faqsAction';
import ImageUploader from 'ui-component/ImageUploader';
import { handleUpload } from 'utils/helperFunction';
import RichTextEditor from 'components/RichTextEditor';
import HtmlViwser from 'components/htmlViwser';
import moment from 'moment/moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '100vh',
  width: '100%',
  maxWidth: '600px', // Set the maximum height with a viewport-relative unit (vh)
  overflowY: 'auto', // Enable vertical scrolling if content overflows
  overflowX: 'hidden',
  bgcolor: 'background.paper',
  border: '2px solid #D78809',
  boxShadow: 24,
  p: 4
};
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 12px 12px;
    color:#121926;
    background: ${theme.palette.mode === 'dark' ? '#D78809' : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? '#bfc0c2' : '#bfc0c2'};
    &:hover {
      border:1px solid  #121926;
    };
    &:focus {
      border: 2px solid  #D78809;
    }
    // firefox
    &:focus-visible {
      outline: 0;
      border-color: #D78809;
    }
    &::placeholder {
      color: #8A93A1;
    }
  `
);

const BlogFAQ = () => {
  // const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [title, settitle] = React.useState('');
  const [description, setdescription] = React.useState('');
  const [PreviewEdit, setPreviewEdit] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [Featured, setFeatured] = React.useState(false);
  const [order, setorder] = React.useState(0);
  const [Types, setTypes] = React.useState('');
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const rows = useSelector((state) => state.BlogsfaqsReducer.data);
  const isLoading = useSelector((state) => state.BlogsfaqsReducer.isLoading);
  const Loading = useSelector((state) => state.BlogsfaqsReducer.addLoading);
  const delLoading = useSelector((state) => state.BlogsfaqsReducer.deleteLoading);
  const [open, setOpen] = React.useState(false);
  const [typeforView, settypeforView] = React.useState('FAQ');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [Delete_Id, setDelete_Id] = React.useState(null);
  const [Process, setProcess] = React.useState('Add');
  const [Error, setError] = React.useState('');
  const [newDate, setDate] = React.useState(0);

  console.log(newDate);
  //console.log(rows, 'rows');
  const handleOpen = () => {
    setOpen(true);
    setProcess('Add');
    InitialState();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => setOpenDelete(!openDelete);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllBlogs_News(Userdata?.clientToken, typeforView));
  }, [typeforView]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event) => {
    setTypes(event.target.value);
  };

  const onSave = async () => {
    if (title !== '' && description !== '') {
      setError('');
      const newPath = selectedFiles?.length > 0 && (await Promise.all(selectedFiles?.map(async (i) => await ImageUpload(i))));
      let newdata = {
        title: title,
        isFeatured: Featured,
        description: description,
        type: Types,
        order: order,
        createdOnDate: parseInt(newDate),
        media:
          Types === 'FAQ' || Types === 'terms' || Types === 'privacy' || Types === 'agreement'
            ? []
            : selectedFiles?.length > 0
            ? [...PreviewEdit, ...newPath]
            : PreviewEdit?.length > 0
            ? PreviewEdit
            : setError('Please Select Image')
      };
      if (Process === 'Add') {
        dispatch({ type: actionTypes.isLoadingadd });
        dispatch(AddBlogsNnews(newdata, Userdata?.clientToken, onSuccess));
      } else {
        dispatch(EditBlogsNnews(Delete_Id, newdata, Userdata?.clientToken, onSuccess));
      }
    } else {
      setError('All Feilds Required');
    }
  };
  const ImageUpload = async (data) => {
    try {
      let news = await handleUpload(data);
      return news.data;
    } catch (error) {
      return error;
    }
  };

  const onSuccess = () => {
    dispatch(GetAllBlogs_News(Userdata?.clientToken, typeforView));
    InitialState();
    handleClose();
  };

  const onEditClick = (data) => {
    setDelete_Id(data?._id);
    setProcess('Edit');
    setPreviewEdit(data?.media);
    settitle(data?.title);
    setdescription(data?.description);
    setFeatured(data?.isFeatured);
    setTypes(data?.type);
    setorder(data?.order);
    setDate(moment(data?.createdOnDate).format("DD/MM/YYYY"));
    //setDate(data?.createdOnDate);
    setOpen(true);
    setError('');
  };
  const onDeleteClick = (id) => {
    setOpenDelete(true);
    setDelete_Id(id);
  };

  const InitialState = () => {
    settitle('');
    setorder(0);
    setdescription('');
    setFeatured(false);
    setSelectedFiles([]);
    setPreviewEdit([]);
    setTypes('');
    setError('');
    setOpenDelete(false);
    setDelete_Id(null);

    // setSelectedId(null);
  };
  const onDelete = () => {
    dispatch(DeleteBlogsNnews(Userdata?.clientToken, Delete_Id, onSuccess));
  };
  const handleChangeValue = (value) => {
    setdescription(value);
  };
  const isRepliedChange = (value, id) => {
    let newData = {
      isReplied: value
    };
    dispatch(EditBlogsNnews(id, newData, Userdata?.clientToken, onSuccess));
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <InfinitySpin width="200" color="#D78809" />
          </div>
        </Paper>
      ) : (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
                {Process} News,FAQs,Blogs,Greetings,Banners,Terms etc
              </Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7, paddingBottom: 6 }} sx={{ width: '100%' }}>
                <TextField
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  style={{ margin: 5 }}
                  sx={{ width: '100%' }}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                />
                <FormControl style={{ marginTop: 5 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    disabled={Delete_Id !== null ? true : false}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Types}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={'FAQ'}>FAQs</MenuItem>
                    <MenuItem value={'newsAndBlog'}>News</MenuItem>
                    <MenuItem value={'blogs'}>Blogs</MenuItem>
                    <MenuItem value={'greetings'}>Greetings</MenuItem>
                    <MenuItem value={'banners'}>Banners</MenuItem>
                    {/* <MenuItem value={'terms'}>Terms</MenuItem>
                    <MenuItem value={'privacy'}>Privacy</MenuItem>
                    <MenuItem value={'agreement'}>Agreement</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
              {
                (Types === 'blogs' || Types === 'newsAndBlog') && (
                  <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          disablePast={true}
                          type="date"
                          format='DD/MM/YYYY'
                          label={ newDate.length<=10 ? newDate : "Publish Date"}
                          //value={newDate}
                          sx={{ width: '100%' }}
                          onChange={(e) => setDate(moment(e).format('x'))}
                        />
                    </LocalizationProvider>
                    </Box>
                )
              }
              {Types === 'FAQ' ? (
                <>
                  <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
                    <TextField
                      value={order}
                      onChange={(e) => setorder(e.target.value)}
                      style={{ margin: 5 }}
                      type={'number'}
                      sx={{ width: '100%' }}
                      id="outlined-basic"
                      placeholder="Order"
                      variant="outlined"
                    />
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
                    <StyledTextarea
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      style={{ width: '100%', height: 50, marginTop: 7 }}
                      maxRows={5}
                      aria-label="maximum height"
                      placeholder="Description"
                      defaultValue=""
                    />
                  </Box>
                </>
              ) : (
                <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
                  <div style={{ marginLeft: 10, maxHeight: 500, overflowY: 'scroll', width: '100%' }}>
                    <RichTextEditor value={description} onChange={handleChangeValue} />
                  </div>
                </Box>
              )}
              {(Types !=='terms'  && Types !=='privacy'  && Types !=='agreement') &&
              <FormControlLabel
                style={{ marginLeft: 7 }}
                required
                control={<Switch checked={Featured} onChange={() => setFeatured(!Featured)} />}
                label="Featured"
              />}
              { (Types !== 'FAQ' && Types !=='terms'  && Types !=='privacy'  && Types !=='agreement') && (
                <ImageUploader
                  imageCount={5}
                  PreviewEdit={PreviewEdit}
                  setPreviewEdit={setPreviewEdit}
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                />
              )}
              {Error && (
                <Typography style={{ textAlign: 'center', color: 'red' }} variant="h4" component="h2">
                  {Error}
                </Typography>
              )}
              {(Types !=='terms'  && Types !=='privacy'  && Types !=='agreement') && (
              <Typography style={{ textAlign: 'left', color: 'orange' }} variant="h6" component="h6">
                * Featured will show at home screen of mobile app.
              </Typography>
            )}
              {(Types !=='terms'  && Types !=='privacy'  && Types !=='agreement') && (
              <Typography style={{ textAlign: 'left', color: 'orange' }} variant="h6" component="h6">
                * Banners should be of 1005 * 488 , and upload 1 banner at a time only.
              </Typography>
              )}
              <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
                <AnimateButton>
                  <Button
                    style={{ margin: 4 }}
                    disableElevation
                    size="large"
                    type="submit"
                    disabled={Loading}
                    variant="contained"
                    color="secondary"
                    onClick={() => onSave()}
                  >
                    {Loading ? (
                      <div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}
                      >
                        <InfinitySpin width="50" height="20" color="#fff" />
                      </div>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </AnimateButton>
              </Box>
            </Box>
          </Modal>
          <Modal
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #D78809',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete this News or FAQs
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  padding: 1
                }}
              >
                <AnimateButton>
                  <Button
                    onClick={handleCloseDelete}
                    style={{ margin: 4 }}
                    disableElevation
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button
                    style={{ margin: 4 }}
                    disableElevation
                    size="large"
                    type="submit"
                    disabled={delLoading}
                    variant="contained"
                    color="secondary"
                    onClick={() => onDelete()}
                  >
                    {delLoading ? (
                      <div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}
                      >
                        <InfinitySpin width="50" height="20" color="#fff" />
                      </div>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </AnimateButton>
              </Box>
            </Box>
          </Modal>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ width: '100%' }}>
            <AnimateButton>
              <Button
                onClick={() => handleOpen()}
                style={{ margin: '12px' }}
                variant="contained"
                color="primary"
                sx={{ boxShadow: 'none' }}
              >
                Add News,FAQs,Blogs,Greetings,Banners
              </Button>
            </AnimateButton>
            <FormControl style={{ marginTop: 5, width: 150, marginRight: 10 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeforView}
                label="Age"
                onChange={(e) => settypeforView(e.target.value)}
              >
                <MenuItem value={'FAQ'}>FAQs</MenuItem>
                <MenuItem value={'newsAndBlog'}>News</MenuItem>
                <MenuItem value={'feedback'}>Feedback</MenuItem>
                <MenuItem value={'greetings'}>Greetings</MenuItem>
                <MenuItem value={'blogs'}>Blogs</MenuItem>
                <MenuItem value={'banners'}>Banners</MenuItem>
                <MenuItem value={'terms'}>Terms</MenuItem>
                <MenuItem value={'privacy'}>Privacy</MenuItem>
                <MenuItem value={'agreement'}>Agreement</MenuItem>      
              </Select>
            </FormControl>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                {typeforView === 'FAQ' ? (
                  <TableCell align="left">Order</TableCell>
                ):(<TableCell align="left">ID</TableCell>)}
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  {typeforView === 'feedback' && (
                    <>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                    </>
                  )}

                  {typeforView !== 'FAQ' && <TableCell align="center">Media</TableCell>}
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Publish Date</TableCell>
                  <TableCell align="center">isFeature</TableCell>
                  {typeforView === 'feedback' && <TableCell align="center">Replied</TableCell>}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {typeforView !== 'FAQ'? row?._id.substr(row?._id.length - 4): row?.order}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.title.length > 36 ? <>{row?.title.substring(0, 36)}. . .</> : <>{row?.title}</>}
                    </TableCell>
                    <TableCell align="center">
                      {typeforView !== 'FAQ' ? (
                        <HtmlViwser htmlContent={row?.description} />
                      ) : row?.description.length > 70 ? (
                        <>{row?.description.substring(0, 70)}...</>
                      ) : (
                        <>{row?.description}</>
                      )}
                    </TableCell>
                    {typeforView === 'feedback' && (
                      <>
                        <TableCell align="center">{row?.user?.fullName}</TableCell>
                      </>
                    )}
                    {typeforView === 'feedback' && (
                      <>
                        <TableCell align="center">{row?.user?.email}</TableCell>
                      </>
                    )}
                    {typeforView !== 'FAQ' && (
                      <TableCell align="center">
                        {row?.media?.length > 0 ? (
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <AvatarGroup max={2}>
                              {row?.media?.map((i, index) => (
                                <Avatar key={index} alt="Remy Sharp" src={i} />
                              ))}
                            </AvatarGroup>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar key={index} alt="Remy Sharp" src={square} />
                          </div>
                        )}
                      </TableCell>
                    )}

                    <TableCell align="center">{row?.type}</TableCell>
                    <TableCell align="center">{moment(row?.createdOnDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{row?.isFeatured === true ? 'true' : 'false'}</TableCell>
                    {typeforView === 'feedback' && (
                      <>
                        <TableCell align="center">
                          <Checkbox onChange={() => isRepliedChange(true, row?._id)} checked={row?.isReplied} on name="isReplied" />
                        </TableCell>
                      </>
                    )}
                    <TableCell align="right">
                      <BorderColorIcon onClick={() => onEditClick(row)} style={{ marginRight: 2, cursor: 'pointer' }} />
                      <DeleteIcon onClick={() => onDeleteClick(row?._id)} style={{ marginLeft: 2, cursor: 'pointer' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default BlogFAQ;
