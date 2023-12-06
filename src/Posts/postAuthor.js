import {useSelector} from "react-redux"
import { selectAllUsers } from "../Home/Users/usersSlice"

const PostAuthor = ({userId}) => {
    const users = useSelector(selectAllUsers)

    const author = users.find(user => user._id == userId);
    return <span>by {author ? author.first_name + " " + author.last_name : "Anonymous"}</span>
}

export default PostAuthor;