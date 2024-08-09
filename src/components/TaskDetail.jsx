import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const TaskDetail = ({ task, onAddComment }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [_task, setTask] = useState(task);
  const [newComment, setNewComment] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comments = [..._task.comments, newComment];
      setTask({ ..._task, comments });
      onAddComment({ ..._task, comments });
      setNewComment("");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        {_task.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {_task.description}
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="task detail tabs"
      >
        <Tab label="Details" />
        <Tab label="Comments" />
        <Tab label="Activity Log" />
      </Tabs>

      <Box mt={2}>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6">Details</Typography>
            {/* Include more task details like due date, priority, etc. */}
          </Box>
        )}

        {activeTab === 1 && (
          <Box >
            <Typography variant="h6">Comments</Typography>
            <List sx={{ maxHeight: 200, overflowY: "auto" }}>
              {_task?.comments?.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={comment?.split(' ')[0]}
                      secondary={comment?.split(' ')[1]}
                    />
                  </ListItem>
                  {index < _task.comments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={newComment?.split(' ')[0]}
              onChange={(e) => setNewComment(`${e.target.value} ${new Date().toLocaleDateString()}`)}
              margin="normal"
            />
            <Button variant="contained" onClick={handleAddComment}>
              Add Comment
            </Button>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6">Activity Log</Typography>
            <List>
              {task?.activityLog?.map((log, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={log.action}
                    secondary={new Date(log.date).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskDetail;
