import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import TopicForm from "Frontend/views/topic/TopicForm.js";
import TopicLayout from "Frontend/views/topic/TopicLayout.js";

export default function TopicMainView() {

    return (
        <>
            <section className="flex p-m gap-m items-end">
                <HorizontalLayout title="Topics for Town Hall meeting">
                    <TopicLayout/>
                    <TopicForm/>
                </HorizontalLayout>
            </section>
        </>
    );
}
