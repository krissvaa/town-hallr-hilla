import {FormikErrors, useFormik} from "formik";
import {EndpointValidationError} from "@hilla/frontend";
import Topic from "Frontend/generated/com/example/application/data/entity/Topic.js";
import {TopicEndpoint} from "Frontend/generated/endpoints.js";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {TextArea} from "@hilla/react-components/TextArea";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Category from "Frontend/generated/com/example/application/data/entity/Category.js";
import {Select, SelectItem} from "@hilla/react-components/Select";
import TopicListItem from "Frontend/generated/com/example/application/data/dto/TopicListItem.js";

type TopicFormProps = {
    topics: Array<TopicListItem>,
    setTopics: Dispatch<SetStateAction<TopicListItem[]>>
}
export default function TopicForm({topics, setTopics}: TopicFormProps) {
    const [categories, setCategories] = useState(Array<Category>());

    useEffect(() => {
        (async () => {
            setCategories(await TopicEndpoint.getCategories());
        })();

        return () => {
        };
    }, []);

    const empty: Topic = {title: '', description: '', anonymous: false, version: 0};

    const formik = useFormik({
        initialValues: empty,
        onSubmit: async (value: Topic, {setSubmitting, setErrors}) => {
            try {
                console.log("starting to submit a topic")
                const newTopic = await TopicEndpoint.createTopic(value);
                setTopics([...topics, newTopic!])
                formik.resetForm();

                console.log("ending a submitition of a topic")
            } catch (e: unknown) {
                if (e instanceof EndpointValidationError) {
                    const errors: FormikErrors<Topic> = {}
                    for (const error of e.validationErrorData) {
                        if (typeof error.parameterName === 'string' && error.parameterName in empty) {
                            const key = error.parameterName as (string & keyof Topic);
                            errors[key] = error.message;
                        }
                    }
                    setErrors(errors);
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

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
        <>
            <VerticalLayout className="topic-form flex p-m gap-m items-end">
                <h2>Choose the topic</h2>
                <p>What should we discuss?</p>
                <Select items={mapCategorySelectItems(categories)}
                        name="category"
                        label="Category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.category}
                        invalid={!!formik.errors.category}/>
                <TextField
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.title}
                    invalid={!!formik.errors.title}
                    required={true}
                    minlength={3}
                />
                <TextArea
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.description}
                    invalid={!!formik.errors.description}
                    required={true}
                    minlength={10}
                />
                <Button
                    theme="primary"
                    disabled={formik.isSubmitting}
                    onClick={formik.submitForm}
                >Add</Button>
            </VerticalLayout>
        </>
    );
}
