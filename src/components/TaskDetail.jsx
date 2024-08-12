import React, { useState } from "react";
import {
  Grid,
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
      const comments = [
        ..._task.comments,
        { comment: newComment, date: new Date().toLocaleDateString() },
      ];
      setTask({ ..._task, comments });
      onAddComment({ ..._task, comments });
      setNewComment("");
    }
  };

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {_task.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {_task.description}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="task detail tabs"
        >
          <Tab label="Details" />
          <Tab label="Comments" />
        </Tabs>
      </Grid>

      {activeTab === 0 && (
        <Grid item xs={12}>
          <Typography variant="subtitle1">Details</Typography>
          <Typography variant="subtitle2">{`Priority: ${_task.priority}`}</Typography>
          <Typography variant="subtitle2">{`Tags:  ${_task.tags.join(
            ","
          )}`}</Typography>
          <Typography variant="subtitle2">
            Due Date:
            <span style={{ color: "red" }}>{` ${new Date(
              _task.dueDate
            ).toLocaleDateString()}`}</span>
          </Typography>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid item xs={12}>
          <Typography variant="subtitle1">Comments</Typography>
          <List sx={{ maxHeight: 200, overflowY: "auto" }}>
            {_task?.comments?.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={item.comment} secondary={item.date} />
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
            onChange={(e) => setNewComment(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default TaskDetail;
