import {Form, useActionData, useTransition} from "@remix-run/react";
import {FormInput, FormLabel, FormSubmitButton} from "~/features/form/formComponents";
// import {ActionFunction, json, redirect} from "@remix-run/node";
// import {createEquipment} from "~/models/equipment.server";
// import {useUser} from "~/utils";

// export const action: ActionFunction = async ({request,}) => {
//     const user = useUser();
//     const formData = await request.formData();
//     const name = formData.get("name") || "";
//     const muscle_type = formData.get("type") || "";
//
//     const {errors, equipment} = await createEquipment({name, muscle_type, userId: user.id});
//
//     const hasErrors = Object.values(errors).some(
//         (errorMessage) => errorMessage
//     );
//     if (hasErrors) {
//         return json(errors);
//     }
//
//     return redirect(`/dashboard/equpment/${equipment.id}`);
// };

export default function NewEquipment() {
    const {errors, values} = useActionData();
    const transition = useTransition();

    return (
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Form method="post">
                <fieldset
                    disabled={transition.state === "submitting"}
                >
                    <div>
                        <FormLabel id="name" labelTxt="Name"/>
                        <FormInput type="text"
                                   id="name"
                                   required={true}
                                   placeholder="Chest Press..."
                                   defaultValue={values.name}
                                   style={{
                                       borderColor: errors.name
                                           ? "red"
                                           : ""
                                   }}
                        />
                        {errors.name ? (
                            <em className="text-red-600">{errors.slug}</em>
                        ) : null}
                    </div>
                    <div>
                        <div>
                            <FormLabel id="type" labelTxt="Type" />
                            <FormInput type="text"
                                       id="type"
                                       required={true}
                                       placeholder="Chest, Shoulder, Arms,..."
                                       defaultValue={values.type}
                                       style={{
                                           borderColor: errors.type
                                               ? "red"
                                               : ""
                                       }}
                            />
                            {errors.type ? (
                                <em className="text-red-600">{errors.type}</em>
                            ) : null}
                        </div>
                    </div>
                    <div className="text-right m-2">
                        <FormSubmitButton buttonTxt={transition.state === "submitting" ? "Speichere..." : "Gerät anlegen"}/>
                    </div>
                </fieldset>
            </Form>
        </div>
    );

}