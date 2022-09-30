import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { EquipmentActionData } from "~/models/equipment.server";
import { getEquipment, updateEquipment } from "~/models/equipment.server";
import invariant from "tiny-invariant";
import { Form, useActionData, useCatch, useLoaderData, useTransition } from "@remix-run/react";
import CatchView from "~/features/errorhandling/CatchView";
import * as React from "react";
import EquipmentView from "~/features/equipment/EquipmentView";

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
  const errors = useActionData<EquipmentActionData>();
  const transition = useTransition();
  return (
    <div className="grid gap-6 mb-6 bg-gray-300 md:grid-cols-2 px-4">
      <Form method="post" className="py-2">
        <fieldset
          disabled={transition.state === "submitting"}
        >
          <EquipmentView errors={errors} defaultValues={equipment} />
          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300 focus:border-2 my-2 px-2"
            >
              {transition.state === "submitting" ? "Speichere..." : "Speichern"}
            </button>
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