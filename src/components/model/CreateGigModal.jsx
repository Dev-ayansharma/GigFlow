"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { api } from "../../services/api";

const CreateGigModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.budget) return;

    setLoading(true);
    try {
      await api.createGig(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating gig:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-[fadeIn_0.25s_ease]">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Post a New Gig
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Build a React website"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              placeholder="Describe your gig..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
            />
          </div>

          {/* BUDGET */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Budget ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Post Gig"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGigModal;