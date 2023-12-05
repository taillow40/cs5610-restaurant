import { useState, useEffect } from "react";
import * as api from "src/store/api";
import { Link } from "react-router-dom";
const PostAuthor = ({authorId}) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
      const findUserById = async () => {
        const user = await api.findUserById(authorId);
        setAuthor(user);
      };
      findUserById();
    }, []);

    
    return <span>
        by <Link 
        to={`/profile/${authorId}`}
        >
    {author ? author.first_name + " " + author.last_name : "Anonymous"}
    </Link>
    </span>
}

export default PostAuthor;