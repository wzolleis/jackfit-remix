import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/node";
import { getTrainings, SerializableTraining } from "~/models/training.server";
import messages from "~/features/i18n/messages";
import { requireUserId } from "~/session.server";

type LoaderData = {
  trainings: Awaited<ReturnType<typeof getTrainings>>
}

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  return json<LoaderData>({
    trainings: await getTrainings(userId)
  });
};


type TrainingListProps = { trainings: SerializableTraining[], activeTraining?: string }
const TrainingList = ({ trainings, activeTraining }: TrainingListProps) => {

  return (
    <div className="mb-2 p-2 bg-gray-300 overflow-auto">
      <ul className="mb-2">
        {trainings.map((training) => {
            const isActive = training.id === activeTraining;
            const bgStyle = isActive ? "bg-gray-400 text-white" : "";
            return (
              <li key={training.id} className={"hover:bg-gray-400 hover:text-white " + bgStyle}>
                <Link to={training.id}
                      className={isActive ? "font-bold" : "font-medium"}>
                  <span>{`${messages.training.form.executedAt}: ${training.executedAt}`}</span>
                </Link>
              </li>
            );
          }
        )}
      </ul>
      <Link to="new"
            className="py-2 hover:bg-gray-100 rounded border-gray-300">
        <i className="fa-solid fa-square-plus" />
        <span className="m-2">{messages.trainings.new}</span>
      </Link>
    </div>
  );
};

const Trainings = () => {
  const { trainings } = useLoaderData<LoaderData>();
  const params = useParams();
  const trainingId = params.trainingId;

  return (
    <main className="flex:col w-full h-full">
      <TrainingList trainings={trainings} activeTraining={trainingId} />
      <Outlet />
    </main>
  );
};

export default Trainings;