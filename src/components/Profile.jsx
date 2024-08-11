import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getInitials, getRandomColor } from "../utils/avatarUtils";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name,
        email: user?.email,
        photo: user?.photo,
        password: user?.password,
      });
    }
  }, [user]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardHeader
          title="Profile"
          titleTypographyProps={{ align: "center", variant: "h5" }}
          subheaderTypographyProps={{ align: "center" }}
          sx={{ bgcolor: "primary.main", color: "white" }}
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              src={user?.photo || ""}
              sx={{ backgroundColor: getRandomColor(), width: 80, height: 80, fontSize:30 }}
            >
              {getInitials(user?.name)}
            </Avatar>
          </div>
          <form>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              fullWidth
              disabled
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth 
              disabled
              sx={{ mt: 3 }}
            >
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
