import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Form, useActionData, useCatch, useLoaderData, useTransition } from "@remix-run/react";
import CatchView from "~/features/errorhandling/CatchView";
import * as React from "react";
import { getTraining, TrainingActionData, updateTraining } from "~/models/training.server";
import TrainingView from "~/features/training/TrainingView";
import ErrorView from "~/features/errorhandling/ErrorView";
import { useUser } from "~/utils";
import { requireUserId } from "~/session.server";
import dateUtils from "~/dateUtils";

type LoaderData = {
  training: Awaited<ReturnType<typeof getTraining>>
}

export const action: ActionFunction = async ({ params: { trainingId }, request }) => {
  const formData = await request.formData();
  const executedAt = formData.get("executedAt") || dateUtils.format(new Date());
  const userId = await requireUserId(request);

  invariant(typeof executedAt === "string", "ExecutedAt must be a string");
  invariant(typeof userId === "string", "UserId must be a string");
  invariant(!!trainingId, "ID muss gesetzt sein");
  invariant(!!userId, "UserId muss gesetzt sein");

  const errors = await updateTraining(trainingId, { executedAt: dateUtils.parse(executedAt), userId: userId });
  const hasErrors = !!errors && Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  return redirect("application/trainings");
};


export const loader: LoaderFunction = async ({ params: { trainingId } }) => {
  invariant(trainingId, "Expected params.trainingId");
  return json<LoaderData>({
    training: await getTraining(trainingId)
  });
};

const TrainingDetails = () => {
  const { training } = useLoaderData<LoaderData>();
  const errors = useActionData<TrainingActionData>();
  const user = useUser();
  const transition = useTransition();
  return (
    <div className="grid gap-6 mb-6 bg-gray-300 md:grid-cols-2 px-4">
      <Form method="post" className="py-2">
        <fieldset
          disabled={transition.state === "submitting"}
        >
          <TrainingView errors={errors} defaultValues={training} user={user} />
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
  return <ErrorView error={error} />;
};

export const CatchBoundary = () => {
  const caught = useCatch();
  const { statusText, status } = caught;
  return (
    <CatchView statusText={statusText} status={status} caught={caught}
               description={"Training kann nicht geladen werden"} />
  );
};

export default TrainingDetails;