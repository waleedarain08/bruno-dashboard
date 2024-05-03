import React from 'react';
import { Modal, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';

const ReportModal = ({ open, onClose, location, SelectRow }) => {
  const isLoadingLocation = useSelector((state) => state.OrderReducer.isLoadingLocation);
  console.log(SelectRow, 'SelectRow');

  return (
    <Modal open={open} onClose={onClose} className="modalContainer">
      <Box className="modalContent">
        {isLoadingLocation ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <InfinitySpin width="120" color="#D78809" />
          </div>
        ) : (
          <>
            <h2 style={{ textDecoration: 'underline' }}>Order Invoice</h2>
            <div className="modalInnerView">
              <h2 className="modalTitle">Order No :</h2>
              <h3 className="modalTitlee"> {SelectRow?._id.substr(SelectRow?._id?.length - 5)}</h3>
            </div>
            <div className="modalInnerView">
              <h2 className="modalTitle">Order Total :</h2>
              <h3 className="modalTitlee"> {SelectRow?.totalAmount} AED</h3>
            </div>
            <div className="modalInnerView">
              <h2 className="modalTitle">Order Sub Total :</h2>
              <h3 className="modalTitlee"> {SelectRow?.cartTotal} AED</h3>
            </div>
            <div className="modalInnerView">
              <h2 className="modalTitle">Delivery Date :</h2>
              <h3 className="modalTitlee"> {SelectRow?.deliveryDate}</h3>
            </div>
            <div className="modalInnerView">
              <h2 className="modalTitle">Address :</h2>
              <h3 className="modalTitlee">{location?.address}</h3>
            </div>
          </>
        )}

        {/* <div className="mapContainer">
                    <iframe
                        title="Location Map"
                        width="600"
                        height="450"
                        frameBorder="0"
                        style={{ border: 0, width: '100%' }}
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.address}`}
                        allowFullScreen
                    ></iframe>
                </div> */}
      </Box>
    </Modal>
  );
};

export default ReportModal;
