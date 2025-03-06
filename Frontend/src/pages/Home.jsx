import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SideBar from '../components/SideBar';
import Cookies from 'js-cookie';
import Notes from '../components/Notes';
import Navbar from '../components/Navbar';
import { delet, get, post, put } from '../services/ApiEndPoint';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [modalId, setModalId] = useState('');
  const [actionType, setActionType] = useState(''); // To track edit or delete
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  // Function to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleNoteSubmit = async () => {
    try {
      const request = await post('/notes/create', { title });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefresh(!refresh);
        setCloseModal(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  const handleUpdate = async () => {
    try {
      const request = await put(`/notes/update/${modalId}`, { title: updateTitle });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefresh(!refresh);
        setCloseModal(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  const handleDelete = async () => {
    try {
      const request = await delet(`/notes/delete/${modalId}`);
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefresh(!refresh);
        setCloseModal(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const request = await get('/notes/getnotes');
        const response = request.data;
        setNotes(response.Notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, [refresh]);

  return (
    <>
      {/* Modals */}
      <Modal
        Modaltitle="Write Notes"
        value={title}
        handleChange={(e) => setTitle(e.target.value)}
        handleNoteSubmit={handleNoteSubmit}
        HandleClose={closeModal}
      />

      {/* Show EditModal only if actionType is 'edit' */}
      {actionType === 'edit' && (
        <EditModal
          open={modalId !== ''}
          modalTitle="Update Notes"
          handleChange={(e) => setUpdateTitle(e.target.value)}
          handleNoteSubmit={handleUpdate}
          value={updateTitle}
          handleClose={() => setModalId('')}
        />
      )}

      {/* Show DeleteModal only if actionType is 'delete' */}
      {actionType === 'delete' && (
        <DeleteModal
          open={modalId !== ''}
          handleClose={() => setModalId('')}
          handleNotesDelete={handleDelete}
        />
      )}

      <Grid container minHeight="100vh">
        {/* Sidebar */}
        <Grid item xs={12} sm={3} md={2} sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <SideBar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} sm={9} md={10} sx={{ padding: 3 }}>
          <Navbar />
          <Box mt={3} mx={5}>
            {notes.length > 0 ? (
              <Typography variant="h4" fontWeight="bold">
                NOTES
              </Typography>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <Typography variant="h3" fontWeight="bold">
                  No Notes Found
                </Typography>
              </Box>
            )}
          </Box>

          {/* Notes Section */}
          <Grid container spacing={3} mt={2} mx={5}>
            {notes.map((elem, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Notes
                  title={elem.title}
                  date={formatDate(elem.updatedAt)}
                  handleUpdate={() => {
                    setActionType('edit');
                    setModalId(elem._id);
                  }}
                  handleDelete={() => {
                    setActionType('delete');
                    setModalId(elem._id);
                  }}
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
