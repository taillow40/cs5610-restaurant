import { useState, useEffect } from "react";
import * as api from "src/store/api";
const PostAuthor = ({authorId}) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
      const findUserById = async () => {
        const user = await api.findUserById(authorId);
        setAuthor(user);
      };
      findUserById();
    }, []);

    
    return <span>by {author ? author.first_name + " " + author.last_name : "Anonymous"}</span>
}

export default PostAuthor;