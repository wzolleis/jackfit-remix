import {Form, useActionData, useCatch, useTransition} from "@remix-run/react";
import {FormInput, FormLabel, FormSubmitButton} from "~/features/form/formComponents";
import {ActionFunction, json, redirect} from "@remix-run/node";
import {ActionData, createEquipment} from "~/models/equipment.server";
import {useUser} from "~/utils";
import CatchView from "~/features/errorhandling/CatchView";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({request,}) => {
    const formData = await request.formData();
    const name = formData.get("name") || "";
    const muscle_type = formData.get("type") || "";
    const userId = formData.get("userId") || "";

    invariant(typeof name === "string", "Name must be a string");
    invariant(typeof muscle_type === "string", "Type must be a string");
    invariant(typeof userId === "string", "Userid must be a string");

    const errors = await createEquipment({name, muscle_type, userId});
    const hasErrors = !!errors && Object.values(errors).some((errorMessage) => errorMessage);
    if (hasErrors) {
        return json(errors);
    }

    return redirect("application/equipments");
};

export default function NewEquipment() {
    const user = useUser();
    const errors = useActionData<ActionData>();
    const transition = useTransition();

    return (
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Form method="post">
                <fieldset
                    disabled={transition.state === "submitting"}
                >
                    <input type="text" name="userId" value={user.id} disabled={true} hidden={true}/>
                    <div>
                        <FormLabel id="name" labelTxt="Name"/>
                        <FormInput type="text"
                                   id="name"
                                   required={true}
                                   placeholder="Chest Press..."
                                   style={{
                                       borderColor: errors?.name
                                           ? "red"
                                           : ""
                                   }}
                        />
                        {errors?.name ? (
                            <em className="text-red-600">{errors.name}</em>
                        ) : null}
                    </div>
                    <div>
                        <FormLabel id="type" labelTxt="Type"/>
                        <FormInput type="text"
                                   id="type"
                                   required={true}
                                   placeholder="Chest, Shoulder, Arms,..."
                                   style={{
                                       borderColor: errors?.type
                                           ? "red"
                                           : ""
                                   }}
                        />
                        {errors?.type ? (
                            <em className="text-red-600">{errors.type}</em>
                        ) : null}
                    </div>
                    <div className="text-right m-2">
                        <FormSubmitButton
                            buttonTxt={transition.state === "submitting" ? "Speichere..." : "Gerät anlegen"}/>
                    </div>
                </fieldset>
            </Form>
        </div>
    );
}

export const ErrorBoundary = ({error}: { error: Error }) => {
    return (
        <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
        </div>
    );
}

export const CatchBoundary = () => {
    const {status, statusText} = useCatch();

    return (
        <CatchView statusText={statusText} status={status}/>
    );
}