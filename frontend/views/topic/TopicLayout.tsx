import {useEffect, useState} from "react";
import {TopicEndpoint} from "Frontend/generated/endpoints.js";
import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";
import TopicItem from "Frontend/views/topic/TopicItem.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import TopicFilterBar from "Frontend/views/topic/TopicFilterBar.js";

export default function TopicLayout() {
    const [topics, setTopics] = useState(Array<TopicListItem>());

    useEffect(() => {
        (async () => {
            setTopics(await TopicEndpoint.getTopics());
        })();

        return () => {
        };
    }, []);

    return (
        <>
            <VerticalLayout className="topic-layout flex p-m gap-m items-end">
                <TopicFilterBar/>
                {topics.map((topic) =>
                    <TopicItem topic={topic} key={topic.id}/>
                )}
            </VerticalLayout>
        </>
    );
}
