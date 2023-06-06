import {TextField} from "@hilla/react-components/TextField";
import {Select, SelectItem} from "@hilla/react-components/Select";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {useEffect, useState} from "react";
import Category from "Frontend/generated/com/example/application/data/entity/Category.js";
import {TopicEndpoint} from "Frontend/generated/endpoints.js";
import {FaSearch} from "react-icons/all.js";

export default function TopicFilterBar() {

    const [topicSearch, setTopicSearch] = useState('');
    const [category, setCategory] = useState('');

    const [categories, setCategories] = useState(Array<SelectItem>());

    useEffect(() => {
        (async () => {
            const categories = await TopicEndpoint.getCategories();
            setCategories(mapCategorySelectItems(categories));
        })();

        return () => {
        };
    }, []);

    const mapCategorySelectItems = (categories: Category[]) => {
        return categories.map((cat) => {
            const selectItem: SelectItem = {};
            const catName = Category[cat];
            selectItem.label = catName.charAt(0).toUpperCase() + catName.slice(1).toLowerCase();
            selectItem.value = cat;
            return selectItem;
        });
    };

    return (
        <HorizontalLayout className="w-full">

            <TextField name="Topic search"
                       title="Topic search"
                       placeholder="Search topics..."
                       value={topicSearch}
                       className="w-full mr-s"
            >
                {/* @ts-ignore*/}
                <FaSearch slot='suffix'/>
            </TextField>
            <Select name="category"
                    title="Category"
                    placeholder="Category"
                    items={categories}
                    value={category}/>
        </HorizontalLayout>
    )
}