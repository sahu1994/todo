import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksRequest,
  deleteTask,
  updateTask,
} from "../redux/actions";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Chip,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Tooltip,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "./TaskForm";
import TaskDetail from "./TaskDetail";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [_tasks, setTasks] = useState(tasks);
  const { user } = useSelector((state) => state.auth);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isFormOpen, setFormOpen] = React.useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  useEffect(()=>{
    setTasks(tasks);
  },[tasks])

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user !== null){
      dispatch(fetchTasksRequest(user?._id));
    } 
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

  const handleAddComment = (taskId, _task) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        dispatch(updateTask({..._task }))
        return _task;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Box sx={{ minHeight: "100vh", padding: 3 }}>
      <Typography variant="h4" gutterBottom color="#1a1a1a" textAlign="center">
        TODO List
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" variant="body1" textAlign="center">
          {error}
        </Typography>
      ) : _tasks.length > 0 ? (
        <Paper
          elevation={6}
          sx={{ padding: 2, borderRadius: 2, maxWidth: 800, margin: "auto" }}
        >
          <List>
            {_tasks.map((task) => (
              <React.Fragment key={task?._id}>
                <ListItem key={task?._id}  onClick={()=>handleOpen(task)}
                  sx={{
                    borderRadius: 2,
                    marginBottom: 2,
                    mt: 2,
                    bgcolor: task?.completed ? "#d4edda" : "#f1f1f1",
                    transition: "background-color 0.3s",
                    "&:hover": { bgcolor: "#f1f1f1" },
                  }}
                >
                  <ListItemText
                    primary={task.title}
                    secondary={
                      <>
                        <span>{task.description}</span>
                        <span>
                          {` Due Date: ${new Date(
                            task.dueDate
                          ).toLocaleDateString()}`}
                        </span>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Edit Task">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => openForm(task)}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Task">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(task._id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <Chip
                  sx={{ mr: 1, mb: 2 }}
                  label={task.priority}
                  color={getPriorityColor(task.priority)}
                />
                {task.tags?.map((tag, index) => (
                  <Chip sx={{ mr: 1, mb: 2 }} key={index} label={tag} />
                ))}
                {_tasks.length !== 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography textAlign="center" variant="body1">
          No tasks available. Start by adding your first task!
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => openForm()}
        sx={{
          marginTop: 4,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Add New Task
      </Button>
      {isFormOpen && (
        <TaskForm
          openForm={isFormOpen}
          currentTask={selectedTask}
          onClose={closeForm}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="task-detail-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width:"calc(100% - 4)",
            minHeight: 400,
            bgcolor: "background.paper",
            alignItems: "center",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedTask && (
            <TaskDetail
              
              task={selectedTask}
              onAddComment={(_task) =>
                handleAddComment(selectedTask._id, _task)
              }
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "error";
    case "Medium":
      return "warning";
    case "Low":
      return "success";
    default:
      return "default";
  }
};

export default TaskList;
