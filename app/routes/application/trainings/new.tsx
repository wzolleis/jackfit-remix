import { Form, useActionData, useCatch, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import CatchView from "~/features/errorhandling/CatchView";
import invariant from "tiny-invariant";
import * as React from "react";
import { createTraining, TrainingActionData } from "~/models/training.server";
import TrainingView from "~/features/training/TrainingView";
import messages from "~/features/i18n/messages";
import dateUtils from "~/dateUtils";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const executedAt = formData.get("executedAt") || dateUtils.format(new Date());
  const userId = await requireUserId(request);

  invariant(typeof executedAt === "string", "ExecutedAt must be a string");
  invariant(typeof userId === "string", "UserId must be a string");
  invariant(!!userId, "UserId muss gesetzt sein");

  const errors = await createTraining({ userId, executedAt: dateUtils.parse(executedAt) || dateUtils.now() });
  const hasErrors = !!errors && Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  return redirect("application/trainings");
};

export default function NewTraining() {
  const errors = useActionData<TrainingActionData>();
  const transition = useTransition();

  return (
    <div className="grid gap-6 mb-6 bg-gray-300 md:grid-cols-2 px-4">
      <Form method="post" className="py-2">
        <fieldset
          disabled={transition.state === "submitting"}
        >
          <TrainingView errors={errors} />
          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300 focus:border-2 my-2 px-2"
            >
              {transition.state === "submitting" ? messages.training.new.submitting : messages.training.new.submit}
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
  const caught = useCatch();
  const { status, statusText } = caught;

  return (
    <CatchView statusText={statusText} status={status} caught={caught}
               description={"Training kann nicht angelegt werden"} />
  );
};