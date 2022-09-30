import { Form, useActionData, useCatch, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { EquipmentActionData } from "~/models/equipment.server";
import { createEquipment } from "~/models/equipment.server";
import CatchView from "~/features/errorhandling/CatchView";
import invariant from "tiny-invariant";
import * as React from "react";
import EquipmentView from "~/features/equipment/EquipmentView";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") || "";
  const muscle = formData.get("muscle") || "";
  const testEquipment = formData.get("test") || "false";

  invariant(typeof name === "string", "Name must be a string");
  invariant(typeof muscle === "string", "Type must be a string");
  invariant(typeof testEquipment === "string", "Test must be a string");

  const errors = await createEquipment({ name, muscle, test: testEquipment === "true" });
  const hasErrors = !!errors && Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  return redirect("application/equipments");
};

export default function NewEquipment() {
  const errors = useActionData<EquipmentActionData>();
  const transition = useTransition();

  return (
    <div className="grid gap-6 mb-6 bg-gray-300 md:grid-cols-2 px-4">
      <Form method="post" className="py-2">
        <fieldset
          disabled={transition.state === "submitting"}
        >
          <EquipmentView errors={errors} />
          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300 focus:border-2 my-2 px-2"
            >
              {transition.state === "submitting" ? "Speichere..." : "Gerät anlegen"}
            </button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}

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