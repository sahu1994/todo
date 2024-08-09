import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../redux/actions';

const TaskForm = ({ currentTask, onClose, openForm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [title, setTitle] = React.useState(currentTask?.title || '');
  const [description, setDescription] = React.useState(currentTask?.description || '');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTask) {
      dispatch(updateTask({ ...currentTask, title, description, userId: user.data.id }));
    } else {
      dispatch(addTask({ title, description, userId: user.data.id }));
    }
    setTitle('');
    setDescription('');
    if (onClose) onClose(); // Close form after submission
  };

  return (
    <Modal
      open={openForm}
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
