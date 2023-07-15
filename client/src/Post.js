import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <a href="/">
          <img src={"http://localhost:4000/" + cover} alt="" />
        </a>
      </div>
      <div className="texts">
        <a href={`/`}>
          <h2>{title}</h2>
        </a>
        <p className="info">
          <a href={`/`} className="author">
            {author.username}
          </a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
