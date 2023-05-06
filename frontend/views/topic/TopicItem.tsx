import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";

type TopicItemProps = { topic: TopicListItem }
export default function TopicItem({topic}: TopicItemProps) {

    return (
        <>
            <section className="flex p-m gap-m items-end">
                <p>{topic.title}</p>
            </section>
        </>
    );
}
