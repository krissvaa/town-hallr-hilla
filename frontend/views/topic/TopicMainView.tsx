import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import TopicForm from "Frontend/views/topic/TopicForm.js";
import TopicLayout from "Frontend/views/topic/TopicLayout.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";

export default function TopicMainView() {

    return (
        <>
            <VerticalLayout className="main flex p-m gap-m items-end">
                <h2 className="topic-content-title">Topics for Town Hall meeting</h2>
                <HorizontalLayout className="topic-content">
                    <TopicLayout/>
                    <TopicForm/>
                </HorizontalLayout>
            </VerticalLayout>
        </>
    );
}
