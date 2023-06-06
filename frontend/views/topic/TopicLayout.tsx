import TopicItem from "Frontend/views/topic/TopicItem.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import TopicFilterBar from "Frontend/components/topic/TopicFilterBar.js";
import {useLoaderData} from "react-router-dom";
import {LoaderData} from "Frontend/routes.js";
import {topicsLoader} from "Frontend/views/topic/TopicMainView.js";


export default function TopicLayout() {
    const {topics} = useLoaderData() as LoaderData<typeof topicsLoader>

    return (
        <>
            <VerticalLayout className="topic-layout flex p-m gap-m items-end">
                <TopicFilterBar/>
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
