import TopicItem from "Frontend/views/topic/TopicItem.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import TopicFilterBar from "Frontend/components/topic/TopicFilterBar.js";
import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";

type TopicLayoutProps = {
    topics: Array<TopicListItem>,
    topicFilter: string
}
export default function TopicLayout({topics, topicFilter}: TopicLayoutProps) {

    return (
        <>
            <VerticalLayout className="topic-layout flex p-m gap-m items-end">
                <TopicFilterBar value={topicFilter}/>
                {topics ? topics.map((topic) =>
                        <TopicItem topic={topic} key={topic.id}/>
                    )
                    :
                    // TODO
                    (
                        <p>Such Empty</p>
                    )}
            </VerticalLayout>
        </>
    );
}
