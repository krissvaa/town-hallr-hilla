import TopicItem from "Frontend/views/topic/TopicItem.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import TopicFilterBar from "Frontend/components/topic/TopicFilterBar.js";
import {useLoaderData} from "react-router-dom";
import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";
import {topicsLoader} from "Frontend/views/topic/TopicMainView.js";
import {LoaderData} from "Frontend/routes.js";


type TopicLoaderData = {
    topics: Array<TopicListItem>;
};

export default function TopicLayout() {
    // const [topics, setTopics] = useState(Array<TopicListItem>());


    const {topics} = useLoaderData() as LoaderData<typeof topicsLoader>


    // useEffect(() => {
    //     (async () => {
    //         setTopics(await TopicEndpoint.getTopics());
    //     })();
    //
    //     return () => {
    //     };
    // }, []);

    return (
        <>
            <VerticalLayout className="topic-layout flex p-m gap-m items-end">
                <TopicFilterBar/>
                {topics.length ? topics.map((topic) =>
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
