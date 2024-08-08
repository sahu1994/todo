import React from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TaskForm = ({ currentTask, onClose }) => {
  const [title, setTitle] = React.useState(currentTask?.title || '');
  const [description, setDescription] = React.useState(currentTask?.description || '');

  const handleSubmit = () => {
    // Handle form submission logic here
    onClose();
  };

  return (
    <Modal
      open={Boolean(currentTask)}
      onClose={onClose}
      aria-labelledby="task-form-title"
      aria-describedby="task-form-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: '#ffffff',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography id="task-form-title" variant="h6" component="h2" color="primary">
            {currentTask ? 'Edit Task' : 'Add Task'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          color="primary"
          focused
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
          color="primary"
          focused
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={onClose} sx={{ marginRight: 2 }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskForm;
