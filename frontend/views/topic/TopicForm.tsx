import {FormikErrors, useFormik} from "formik";
import {EndpointValidationError} from "@hilla/frontend";
import Topic from "Frontend/generated/com/example/application/data/entity/Topic.js";
import {TopicEndpoint} from "Frontend/generated/endpoints.js";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {TextArea} from "@hilla/react-components/TextArea";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";

export default function TopicForm() {
    // const [name, setName] = useState('');

    const empty: Topic = {title: '', description: '', anonymous: false, version: 0};

    const formik = useFormik({
        initialValues: empty,
        onSubmit: async (value: Topic, {setSubmitting, setErrors}) => {
            try {
                const saved = await TopicEndpoint.createTopic(value) ?? value;
                // setTopic([...topics, saved]);
                formik.resetForm();
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


    return (
        <>
            <VerticalLayout className="flex p-m gap-m items-end">
                <TextField
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.title}
                    invalid={!!formik.errors.title}
                />
                <TextArea
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.description}
                    invalid={!!formik.errors.description}
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
