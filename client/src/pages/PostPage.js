import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

import {
  Card,
  Button,
  Typography,
  CardMedia,
  CardActions,
  CardContent,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";
  return (
    <>
      <Card sx={{ maxWidth: "70%", m: "auto", mt: 3, mb: 5 }}>
        <CardMedia
          sx={{ height: 350 }}
          image={`${process.env.REACT_APP_SERVER_URI}/${postInfo.cover}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {postInfo.title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {formatISO9075(new Date(postInfo.createdAt))}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {postInfo.author.firstname} {postInfo.author.lastname}
          </Typography>
          <Typography
            variant="subtitle1"
            paragraph
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </CardContent>
        <CardActions>
          {userInfo.id === postInfo.author._id && (
            <Button
              href={`/edit/${postInfo._id}`}
              endIcon={<EditIcon />}
              sx={{ textTransform: "none" }}
            >
              {"Edit this Post"}
            </Button>
          )}

          <Button endIcon={<ShareIcon />} sx={{ textTransform: "none" }}>
            {"Share"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PostPage;
