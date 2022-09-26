import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { ActionData, getEquipment, updateEquipment } from "~/models/equipment.server";
import invariant from "tiny-invariant";
import { Form, useActionData, useCatch, useLoaderData, useTransition } from "@remix-run/react";
import CatchView from "~/features/errorhandling/CatchView";
import { FormInput, FormLabel, FormSubmitButton } from "~/features/form/formComponents";
import * as React from "react";

type LoaderData = {
  equipment: Awaited<ReturnType<typeof getEquipment>>
}

export const action: ActionFunction = async ({ params: { equipmentId }, request }) => {
  const formData = await request.formData();
  const name = formData.get("name") || "";
  const muscle = formData.get("muscle") || "";
  const test = formData.get("test") || "false";

  invariant(typeof name === "string", "Name must be a string");
  invariant(typeof muscle === "string", "Type must be a string");
  invariant(!!equipmentId, "ID muss gesetzt sein");
  invariant(typeof test === "string", "test must be boolean");

  const errors = await updateEquipment(equipmentId, { name, muscle, test: test === "true" });
  const hasErrors = !!errors && Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    console.log(">>>>>>>>>>>", errors);
    return json(errors);
  }

  return redirect("application/equipments");
};


export const loader: LoaderFunction = async ({ params: { equipmentId } }) => {
  invariant(equipmentId, "Expected params.equipmentId");
  return json<LoaderData>({
    equipment: await getEquipment(equipmentId)
  });
};

const EquipmentDetails = () => {
  const { equipment } = useLoaderData<LoaderData>();
  const errors = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <Form method="post">
        <fieldset
          disabled={transition.state === "submitting"}
        >
          <div>
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value="true"
              id="test"
              name="test"
              defaultChecked={equipment.test}
            />
            <label>Testgerät</label>
          </div>
          <div>
            <FormLabel id="name" labelTxt="Name" />
            <FormInput type="text"
                       id="name"
                       name="name"
                       required={true}
                       autoFocus={true}
                       placeholder="Chest Press..."
                       defaultValue={equipment.name}
            />
            {errors?.name ? (
              <em className="text-red-600">{errors.name}</em>
            ) : null}
          </div>
          <div>
            <FormLabel id="type" labelTxt="Type" />
            <FormInput type="text"
                       id="muscle"
                       name="muscle"
                       required={true}
                       placeholder="Chest, Shoulder, Arms,..."
                       defaultValue={equipment.muscle}
            />
            {errors?.muscle ? (
              <em className="text-red-600">{errors.muscle}</em>
            ) : null}
          </div>
          <div className="text-right m-2">
            <FormSubmitButton
              buttonTxt={transition.state === "submitting" ? "Speichere..." : "Speichern"} />
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};

export const CatchBoundary = () => {
  const { status, statusText } = useCatch();

  return (
    <CatchView statusText={statusText} status={status} />
  );
};

export default EquipmentDetails;