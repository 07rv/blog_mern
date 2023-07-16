import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

import AddIcon from "@mui/icons-material/Add";

import {
  Card,
  Button,
  CardActions,
  CardContent,
  TextField,
  Grid,
  FormHelperText,
} from "@mui/material";

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [errorField, setErrorField] = useState({
    title: "",
    summary: "",
    content: "",
  });
  const [redirect, setRedirect] = useState(false);

  const checkAndSetValidationErrors = () => {
    var hasError = false;
    if (title === "") {
      setErrorField({ title: "Enter Title" });
      hasError = true;
    }
    if (summary === "") {
      setErrorField({ summary: "Enter Summary" });
      hasError = true;
    } else if (summary.length < 200) {
      setErrorField({ summary: "summary should contain 200 character" });
      hasError = true;
    }
    if (content === "") {
      setErrorField({ content: "Enter content" });

      hasError = true;
    }
    return hasError;
  };

  async function createNewPost(ev) {
    ev.preventDefault();
    if (!checkAndSetValidationErrors()) {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("file", files[0]);

      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/post`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Card sx={{ maxWidth: "70%", m: "auto", mt: 3, mb: 5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                autoFocus
                placeholder={"Title"}
                defaultValue={title}
                error={errorField && errorField.title !== ""}
                onChange={(ev) => {
                  setErrorField({ title: "" });
                  setTitle(ev.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="summary"
                required
                fullWidth
                id="summary"
                autoFocus
                multiline
                rows={5}
                placeholder={"Summary"}
                label={
                  summary !== "" && summary.length < 200
                    ? "summary should contain atleast 200 character"
                    : ""
                }
                defaultValue={summary}
                error={errorField && errorField.summary !== ""}
                onChange={(ev) => {
                  setErrorField({ summary: "" });
                  setSummary(ev.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="files"
                required
                fullWidth
                id="files"
                autoFocus
                type="file"
                placeholder={"File"}
                defaultValue={files}
                onChange={(ev) => setFiles(ev.target.files)}
              />
            </Grid>
            <Grid item xs={12}>
              <Editor value={content} onChange={setContent} />
              {errorField && errorField.content !== "" && (
                <FormHelperText
                  sx={{ ml: 3, color: "red", fontSize: "0.8rem" }}
                >
                  {errorField.content}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              fontSize: "1.2rem",
              m: "auto",
              mb: 2,
            }}
            onClick={createNewPost}
            endIcon={<AddIcon />}
          >
            Create Post
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Create;
