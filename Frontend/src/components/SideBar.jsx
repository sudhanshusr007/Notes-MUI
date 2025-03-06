import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Box, Typography, IconButton } from '@mui/material';
import Modal from './Modal';

export default function SideBar() {
  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        sx={{ mt: 4, mx: 4 }}
      >
        <Typography variant="h4" fontWeight="bold">
          NoteHub
        </Typography>
        
        {/* Floating Add Button */}
        <IconButton
          color="primary"
          sx={{
            mt: 5,
            width: 50,
            height: 50,
            backgroundColor: '#1976d2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:hover': { backgroundColor: '#333' },
          }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <FaPlus size={30} className="text-white" />
        </IconButton>
      </Box>
    </>
  );
}
