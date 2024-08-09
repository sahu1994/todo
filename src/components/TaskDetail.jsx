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
      const comments = [..._task.comments, `${newComment} ${new Date().toLocaleDateString()}`];
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
      </Tabs>

      <Box mt={2}>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Details
            </Typography>
            <Typography variant="subtitle2">{`<strong>Priority: </strong>${_task.priority}`}</Typography>
            <Typography variant="subtitle2">{`Tags:  ${_task.tags.join(
              ","
            )}`}</Typography>
            <Typography variant="subtitle2">{`Due Date:  ${_task.dueDate}`}</Typography>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="subtitle1">Comments</Typography>
            <List sx={{ maxHeight: 200, overflowY: "auto" }}>
              {_task?.comments?.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={comment?.split(" ")[0]}
                      secondary={comment?.split(" ")[1]}
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
              value={newComment}
              onChange={(e) =>
                setNewComment(
                  e.target.value
                )
              }
              margin="normal"
            />
            <Button variant="contained" onClick={handleAddComment}>
              Add Comment
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskDetail;
