import React, { useState } from "react";
import MainButton from "./MainButton";
import { useProjects } from "../hooks/useProjects.js";

const defaultForm = {
  name: "",
  description: "",
  startDate: "",
  dueDate: "",
};

const NewProjectForm = ({ onCancel }) => {
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({});
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const { handleCreateProject } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.name.trim()) {
        setErrors({
          name: "Project name is required",
        });
        return;
      }
      if (!form.description.trim()) {
        setErrors({
          description: "Project description is required",
        });
        return;
      }
      await handleCreateProject(form);
      onCancel();
    } catch (error) {
      setFormError(error?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 tracking-wide">
          Project name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          placeholder="e.g. Dashboard Redesign"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />

        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 tracking-wide">
          Description
        </label>
        <textarea
          rows={3}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 resize-none leading-relaxed"
          placeholder="Goals, scope, context…"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Start date", key: "startDate" },
          { label: "Due date", key: "dueDate" },
        ].map(({ label, key }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 tracking-wide">
              {label}
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 ">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Create project
        </button>
      </div>
    </form>
  );
};
export default NewProjectForm;
