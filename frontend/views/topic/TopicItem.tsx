import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import UpVoteComponent from "Frontend/views/topic/UpVoteComponent.js";
import CommentIndicator from "Frontend/views/topic/CommentIndicator.js";

type TopicItemProps = { topic: TopicListItem }


export default function TopicItem({topic}: TopicItemProps) {

    return (
        <>
            <HorizontalLayout className="topic-item flex p-m gap-m items-end">
                <UpVoteComponent topic={topic}/>
                <p>{topic.status}</p>
                <p>{topic.title}</p>
                <span className="topic-item-description">{topic.description}</span>
                <CommentIndicator topic={topic}/>
            </HorizontalLayout>
        </>
    );
}
