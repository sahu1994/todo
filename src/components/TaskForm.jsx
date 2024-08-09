import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  MenuItem,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../redux/actions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const TaskForm = ({ currentTask, onClose, openForm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState(currentTask?.title || "");
  const [dueDate, setDueDate] = useState(dayjs(currentTask?.dueDate));
  const [description, setDescription] = useState(
    currentTask?.description || ""
  );
  const [priority, setPriority] = useState(currentTask?.priority);
  const [tags, setTags] = useState(currentTask?.tags);

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTask) {
      dispatch(
        updateTask({
          ...currentTask,
          priority,
          tags,
          dueDate,
          title,
          description,
          userId: user?._id,
        })
      );
    } else {
      dispatch(
        addTask({ title, description, priority, tags,dueDate, userId: user?._id })
      );
    }
    setTitle("");
    setDescription("");
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "#ffffff",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography
            id="task-form-title"
            variant="h6"
            component="h2"
            color="primary"
          >
            {currentTask ? "Edit Task" : "Add Task"}
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
        <Select
          sx={{ mt: 1 }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
          displayEmpty
          margin="normal"
        >
          <MenuItem value="">Select Priority</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
        <Box sx={{ mt: 1 }}>
          {tags && tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              sx={{ margin: 0.5 }}
            />
          ))}
          <TextField
            label="Add Tag"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTag(e.target.value);
                e.target.value = "";
                e.preventDefault();
              }
            }}
            fullWidth
            margin="normal"
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ mt: 2 }}
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button onClick={onClose} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskForm;
