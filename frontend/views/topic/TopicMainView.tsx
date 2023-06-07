import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import TopicForm from "Frontend/views/topic/TopicForm.js";
import TopicLayout from "Frontend/views/topic/TopicLayout.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {TopicEndpoint} from "Frontend/generated/endpoints.js";
import {useEffect, useMemo, useState} from "react";
import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";


export default function TopicMainView() {
    const [topicFilter, setTopicFilter] = useState('');
    const [topics, setTopics] = useState(Array<TopicListItem>());

    useEffect(() => {
        async function callTopics() {
            const fetchedTopics = await TopicEndpoint.getTopics();
            setTopics(fetchedTopics);
        }

        callTopics();
        const interval = setInterval(() => callTopics(), 5000);

        return () => {
            clearInterval(interval);
        };
    }, [topicFilter]);

    const filteredTopics = useMemo(() => {
        return topics.filter((topic, index, array) => {
                return !topicFilter || topic.title?.includes(topicFilter)
            }
        );
    }, [topics, topicFilter])

    return (
        <>
            <VerticalLayout className="main flex p-m gap-m items-end">
                <h2 className="topic-content-title">Topics for Town Hall meeting</h2>
                <HorizontalLayout className="topic-content">
                    <TopicLayout topics={filteredTopics} topicFilter={topicFilter}/>
                    <TopicForm topics={topics} setTopics={setTopics}/>
                </HorizontalLayout>
            </VerticalLayout>
        </>
    );
}
