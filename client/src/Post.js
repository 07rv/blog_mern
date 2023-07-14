const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <a href="/">
          <img
            src={`https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29zbW9zfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60`}
            alt=""
          />
        </a>
      </div>
      <div className="texts">
        <a href={`/`}>
          <h2>{`Cosmos`}</h2>
        </a>
        <p className="info">
          <a href={`/`} className="author">{`Rohit`}</a>
          <time>{`2023-01-06 16:45`}</time>
        </p>
        <p className="summary">
          {`Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, when an unknown 
          printer took a galley of type and scrambled it to make a 
          type specimen book. It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining 
          essentially unchanged. `}
        </p>
      </div>
    </div>
  );
};

export default Post;
