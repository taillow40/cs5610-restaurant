import { parseISO, formatDistanceToNow } from "date-fns";

const Time = ({timestamp}) => {
    
    let time = ''
    if (timestamp){
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        time = `${timePeriod} ago`
    }
    
    return(
        <span title="timestamp">
            &nbsp; <i>{time}</i>
        </span>
    )
};

export default Time;