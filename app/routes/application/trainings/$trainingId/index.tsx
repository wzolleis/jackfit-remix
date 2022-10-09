import { json, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getExercises } from "~/models/excercise.server";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { Exercise } from "@prisma/client";
import messages from "~/features/i18n/messages";

type LoaderData = {
  exercises: Awaited<ReturnType<typeof getExercises>>
}

// export const loader: LoaderFunction = async ({ params: { trainingId } }) => {
//   invariant(trainingId, "Expected params.trainingId");
//   return redirect(`/application/trainings/${trainingId}/exercises`)
// };


export const loader: LoaderFunction = async ({ params: { trainingId } }) => {
  invariant(trainingId, "Expected params.trainingId");
  return json<LoaderData>({ exercises: await getExercises(trainingId) });
};

type ExerciseListProps = {
  exercises: Exercise[]
}

const ExcerciseList = ({ exercises }: ExerciseListProps) => {
  return (
    <div className="mb-2 p-2 bg-gray-300 overflow-auto">
      <ul className="mb-2">
        {exercises.map((exercise) => {
            const isActive = false; //equipment.id === activeEquipment;
            const bgStyle = isActive ? "bg-gray-400 text-white" : "";
            return (
              <li key={exercise.id} className={"hover:bg-gray-400 hover:text-white " + bgStyle}>
                <Link to={`exercises/${exercise.id}`}
                      className={isActive ? "font-bold" : "font-medium"}>
                  {`Hier fehlt der Name für ${exercise.id}`}
                </Link>
              </li>
            );
          }
        )}
      </ul>
      <Link to="exercises/new"
            className="py-2 hover:bg-gray-100 rounded border-gray-300">
        <i className="fa-solid fa-square-plus" />
        <span className="m-2">{messages.exercises.new}</span>
      </Link>
    </div>
  );
};

const TrainingIndex = () => {
  const { trainingId } = useParams();

  const { exercises } = useLoaderData<LoaderData>();

  return (
    <div>
      <ExcerciseList exercises={exercises} />
      <Outlet />
    </div>
  );
};

export default TrainingIndex;