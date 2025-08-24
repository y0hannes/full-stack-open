const BlogForm = (props) => {
  const { title, author, url, setTitle, setAuthor, setUrl, createBlog } = props
  return (
    <div>
      <h2>create new </h2>

      <form onSubmit={createBlog}>
        <label>
          title
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label>
          author
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          url
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button
          type="submit"
          id="create-btn"
        >
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm