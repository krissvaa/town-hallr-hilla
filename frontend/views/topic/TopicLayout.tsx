import {useEffect, useState} from "react";
import {TopicEndpoint} from "Frontend/generated/endpoints.js";
import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";
import TopicItem from "Frontend/views/topic/TopicItem.js";

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
            <section className="flex p-m gap-m items-end">
                {topics.map((topic) =>
                    <TopicItem topic={topic}/>
                )}
            </section>
        </>
    );
}
