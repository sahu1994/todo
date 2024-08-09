import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksRequest, deleteTask } from '../redux/actions';
import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Paper, Divider, CircularProgress, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskForm from './TaskForm';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isFormOpen, setFormOpen] = React.useState(false);

  useEffect(() => {
  if(user) dispatch(fetchTasksRequest(user?._id));
  }, [dispatch, user]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const openForm = (task = null) => {
    setSelectedTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setSelectedTask(null);
    setFormOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: 3 }}>
      <Typography variant="h4" gutterBottom color="#1a1a1a" textAlign="center">
        TODO List
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" variant="body1" textAlign="center">{error}</Typography>
      ) : tasks.length > 0 ? (
        <Paper elevation={6} sx={{ padding: 2, borderRadius: 2, maxWidth: 800, margin: 'auto' }}>
          <List>
            {tasks.map(task => (
              <React.Fragment key={task?._id}>
                <ListItem
                  sx={{
                    borderRadius: 2,
                    marginBottom: 2,
                    bgcolor: task?.completed ? '#d4edda' : '#f8d7da',
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: '#f1f1f1' }
                  }}
                >
                  <ListItemText
                    primary={task?.title}
                    secondary={task?.description}
                    sx={{ wordWrap: 'break-word' }}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Edit Task">
                      <IconButton edge="end" aria-label="edit" onClick={() => openForm(task)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Task">
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography textAlign="center" variant="body1">No tasks available. Start by adding your first task!</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => openForm()}
        sx={{ marginTop: 4, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Add New Task
      </Button>
      {isFormOpen && (
        <TaskForm openForm={isFormOpen} currentTask={selectedTask} onClose={closeForm} />
      )}
    </Box>
  );
};

export default TaskList;
