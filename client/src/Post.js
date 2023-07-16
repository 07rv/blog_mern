import { formatISO9075 } from "date-fns";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/post/${_id}`}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {author.firstname} {author.lastname}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {formatISO9075(new Date(createdAt))}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {summary.substring(0, 200)}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={`${process.env.REACT_APP_SERVER_URI}/${cover}`}
            alt={`post`}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default Post;
