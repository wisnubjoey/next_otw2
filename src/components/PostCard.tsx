interface Post {
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    userName: string
}

interface PostListProps {
    posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div>
            <h2>Recent Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>{post.createdAt}</p>
            <p>{post.updatedAt}</p>
            <p>{post.userName}</p>
          </li>
        ))}
      </ul>
        </div>
    )
}

export default PostList
