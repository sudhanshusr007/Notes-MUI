import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import Modal from './Modal';

export default function Notes({ title, date, handleUpdate, handleDelete }) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Modal />
      <Card sx={{ width: '18rem', backgroundColor: '#4ea5fc', borderRadius: 2, position: 'relative' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: 'white' }}>
            {title}
          </Typography>

          <div className="bottomContent">
            <div className="Date d-flex justify-content-between align-items-center">
              <Typography variant="body2" sx={{ color: 'white' }}>
                {date}
              </Typography>
              <div className="d-flex justify-content-center flex-column align-items-center position-relative">
                {show && (
                  <div className="Dropdown">
                    <IconButton onClick={handleUpdate} data-bs-toggle="modal" data-bs-target="#editModal">
                      <FaPen size={20} color="black" />
                    </IconButton>
                    <IconButton onClick={handleDelete} data-bs-toggle="modal" data-bs-target="#deleteModal">
                      <MdDelete size={25} color="red" />
                    </IconButton>
                  </div>
                )}
                <IconButton onClick={handleShow} size="large">
                  <HiDotsVertical size={25} color="white" />
                </IconButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
