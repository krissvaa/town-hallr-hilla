import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {Link, LoaderFunctionArgs, useLoaderData, useNavigate} from "react-router-dom";
import {TopicEndpoint} from "Frontend/generated/endpoints.js";
import {LoaderData} from "Frontend/routes.js";
import {FaAngleLeft} from "react-icons/all.js";


export async function topicDetailsLoader({params}: LoaderFunctionArgs) {
    const {topicId} = params;
    return await TopicEndpoint.getTopicById(Number(topicId))
}

export default function TopicDetailsView() {
    const navigate = useNavigate();

    const topic = useLoaderData() as LoaderData<typeof topicDetailsLoader>;


    return topic && (
        <>
            <VerticalLayout className="main flex p-m gap-m">
                <Link
                    to={'..'}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                    className='la-align-center'
                >
                    <FaAngleLeft/>
                    <span>Go Back</span>
                </Link>
                <h2 className="topic-content-title">Topics for Town Hall meeting</h2>
                <HorizontalLayout className="topic-content">
                    <h4>{topic.title}</h4>
                    {topic.comments && topic.comments.map((comment) =>
                        comment &&
                        <VerticalLayout>
                            <p>{comment.id}</p>
                            <p>{comment.commenter?.name}</p>
                            <p>{comment.content}</p>
                        </VerticalLayout>
                    )}
                </HorizontalLayout>
            </VerticalLayout>
        </>
    );
}
