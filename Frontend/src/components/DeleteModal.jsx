import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function DeleteModal({ open, handleClose, handleNotesDelete }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Delete Notes
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete these records?
        </Typography>
        <Typography variant="body2" color="error">
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleNotesDelete}
          variant="contained"
          color="error"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
