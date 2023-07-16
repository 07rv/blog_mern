import Post from "../Post";
import { useEffect, useState } from "react";

import { Grid, CssBaseline, Container } from "@mui/material";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && (
        <>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
            <main>
              <Grid container spacing={4}>
                {posts.map((post) => (
                  <Post key={post._id} {...post} />
                ))}
              </Grid>
            </main>
          </Container>
        </>
      )}
    </>
  );
};

export default IndexPage;
