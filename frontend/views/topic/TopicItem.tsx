import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import UpVoteComponent from "Frontend/components/topic/UpVoteComponent.js";
import CommentIndicator from "Frontend/components/topic/CommentIndicator.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import Badge from "Frontend/views/common/Badge.js";
import Status from "Frontend/generated/com/example/application/data/entity/Status.js"

type TopicItemProps = { topic: TopicListItem }


export default function TopicItem({topic}: TopicItemProps) {

    let badgeType;
    switch (topic.status) {
        case Status.ASSIGNED :
            badgeType = "info" as const;
            break;
        case Status.ANSWERED :
            badgeType = "success" as const;
            break;
    }

    return (
        <>
            <HorizontalLayout className="topic-item flex p-m gap-m items-end">
                <UpVoteComponent topic={topic}/>
                <VerticalLayout className="topic-item__content w-full">
                    <HorizontalLayout>
                        <Badge type={badgeType}>{topic.status}</Badge>
                        <a className="m-auto ml-s" href={'/topic/' + topic.id || '-1'}>{topic.title}</a>
                    </HorizontalLayout>
                    <span className="topic-item-description">{topic.description}</span>
                </VerticalLayout>
                <CommentIndicator topic={topic}/>
            </HorizontalLayout>
        </>
    );
}
