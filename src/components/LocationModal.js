import React from 'react';
import { Modal, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';

const LocationModal = ({ open, onClose, location }) => {
    const isLoadingLocation = useSelector((state) => state.OrderReducer.isLoadingLocation);

    return (
        <Modal open={open} onClose={onClose} className="modalContainer">

            <Box className="modalContent">
                {isLoadingLocation ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <InfinitySpin  width="120" color="#D78809" />
                </div> : <>
                    <h2 style={{ textDecoration: "underline" }}>Location</h2>
                    <div className='modalInnerView'>
                        <h2 className="modalTitle">Address :</h2>
                        <h3 className="modalTitlee">{location.address}</h3>
                    </div>
                    <div className='modalInnerView'>
                        <h2 className="modalTitle">Street :</h2>
                        <h3 className="modalTitlee">{location.street}</h3>
                    </div>
                    <div className='modalInnerView'>
                        <h2 className="modalTitle">Floor :</h2>
                        <h3 className="modalTitlee">{location.floor}</h3>
                    </div>
                    <div className='modalInnerView'>
                        <h2 className="modalTitle">Label :</h2>
                        <h3 className="modalTitlee">{location.label}</h3>
                    </div>
                    <div className='modalInnerView'>
                        <h2 className="modalTitle">Flat/House # :</h2>
                        <h3 className="modalTitlee">{location.flatHouseNumber}</h3>
                    </div>
                    <div className='modalInnerView'>
                        <h2 className="modalTitle">Delivery Instruction :</h2>
                        <h3 className="modalTitlee">{location.deliveryInstruction}</h3>
                    </div></>}






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

export default LocationModal;