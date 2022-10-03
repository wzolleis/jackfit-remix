import * as React from "react";
import messages from "~/features/i18n/messages";
import { SerializableTraining, TrainingActionData } from "~/models/training.server";
import { User } from "@prisma/client";
import dateUtils from "~/dateUtils";

type TrainingViewProps = {
  defaultValues?: SerializableTraining
  errors?: TrainingActionData
  user: User
}

const TrainingView = ({ errors, defaultValues, user }: TrainingViewProps) => {
  return (
    <>
      <div>
        <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900">
          {messages.training.form.userName}
        </label>
        <input type="text"
               id="userName"
               name="userName"
               required
               disabled
               key={user.email}
               className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:border-blue-500 border-2"
               defaultValue={user.email}
        />
        {errors?.userId ? (
          <em className="text-red-600">{errors.userId}</em>
        ) : null}
      </div>

      <div>
        <label htmlFor="executedAt" className="block mb-2 text-sm font-medium text-gray-900">
          {messages.training.form.executedAt}
        </label>
        <input type="text"
               id="executedAt"
               name="executedAt"
               required
               autoFocus
               key={defaultValues?.executedAt}
               placeholder={messages.training.form.executedAtPlaceholder}
               className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:border-blue-500 border-2"
               defaultValue={defaultValues?.executedAt ?? dateUtils.format(new Date())}
        />
        {errors?.executedAt ? (
          <em className="text-red-600">{errors.executedAt}</em>
        ) : null}
      </div>
    </>
  );
};

export default TrainingView;