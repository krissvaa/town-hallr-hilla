import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";
import {useState} from "react";
import {TfiAngleDoubleUp} from "react-icons/all.js";


type TopicItemProps = { topic: TopicListItem }

export default function UpVoteComponent({topic}: TopicItemProps) {
    const [active, setActive] = useState(false)

    const changeState = () => {
        setActive(!active)
        active ? topic.upvoteCount-- : topic.upvoteCount++;

    };

    const className = `up-vote ${active && 'active'}`

    return (
        <>
            <div className={className} onClick={() => changeState()}>
                <TfiAngleDoubleUp/>
                <span>{topic?.upvoteCount}</span>
            </div>
        </>
    )
}