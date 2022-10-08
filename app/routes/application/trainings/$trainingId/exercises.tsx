import { json, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getExercises } from "~/models/excercise.server";
import { Outlet, useLoaderData } from "@remix-run/react";

type LoaderData = {
  exercises: Awaited<ReturnType<typeof getExercises>>
}

export const loader: LoaderFunction = async ({ params: { trainingId } }) => {
  invariant(trainingId, "Expected params.trainingId");
  return json<LoaderData>({ exercises: await getExercises(trainingId) });
};

const Exercises = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <span>Exercises !!!</span>
      <Outlet />
    </div>
  );
};

export default Exercises;