import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";
import {FaComment} from "react-icons/all.js";

type CommentIndicatorProps = { topic: TopicListItem }
export default function CommentIndicator({topic}: CommentIndicatorProps) {
    return (
        <div className="comment-indicator">
            <FaComment/>
            <span>{topic.commentCount}</span>
        </div>
    )
}