import * as React from "react";
import type { EquipmentActionData } from "~/models/equipment.server";
import { SerializableEquipment } from "~/models/equipment.server";

type EquipmentViewProps = {
  defaultValues?: SerializableEquipment
  errors?: EquipmentActionData
}

const EquipmentView = ({ errors, defaultValues }: EquipmentViewProps) => {
  return (
    <>
      <div>
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          value="true"
          id="test"
          name="test"
          defaultChecked={defaultValues?.test}
        />
        <label>Testgerät</label>
      </div>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <input type="text"
               id="name"
               name="name"
               required
               autoFocus
               placeholder="Gerätename, z.B. Chest Press, ..."
               className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:border-2"
               defaultValue={defaultValues?.name}
        />
        {errors?.name ? (
          <em className="text-red-600">{errors.name}</em>
        ) : null}
      </div>
      <div>
        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">
          Type
        </label>
        <input type="text"
               id="muscle"
               name="muscle"
               required
               placeholder="Muskelgruppe, z.B. Chest, Shoulder,..."
               className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:border-2"
               defaultValue={defaultValues?.muscle}
        />
        {errors?.muscle ? (
          <em className="text-red-600">{errors.muscle}</em>
        ) : null}
      </div>
    </>
  );
};

export default EquipmentView;