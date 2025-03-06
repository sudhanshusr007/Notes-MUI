import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function EditModal({
  open,
  handleClose,
  modalTitle,
  handleChange,
  value,
  handleNoteSubmit,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#ffffff", // White Background
          borderRadius: "10px",
          padding: "16px",
        },
      }}
    >
      {/* Modal Title */}
      <DialogTitle
        sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}
      >
        {modalTitle}
      </DialogTitle>

      {/* Modal Body */}
      <DialogContent>
        <TextField
          label="Enter Notes"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={value}
          onChange={handleChange}
          autoFocus
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1976d2" }, // Blue Border
              "&:hover fieldset": { borderColor: "#1565c0" }, // Darker Blue Hover
              "&.Mui-focused fieldset": { borderColor: "#0d47a1" }, // Darkest Blue on Focus
            },
          }}
        />
      </DialogContent>

      {/* Modal Actions */}
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "#1976d2",
            borderColor: "#1976d2",
            "&:hover": { backgroundColor: "#e3f2fd", borderColor: "#1565c0" },
          }}
        >
          Close
        </Button>

        <Button
          onClick={handleNoteSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
