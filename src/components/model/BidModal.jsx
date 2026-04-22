"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { api } from "../../services/api";

const BidModal = ({ gig, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    message: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.message || !formData.price) return;

    setLoading(true);
    try {
      await api.submitBid(formData, gig._id);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting bid:", error);
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
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Place Your Bid
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* GIG INFO */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
          <p className="text-xs text-gray-500 mb-1">Bidding on</p>
          <p className="font-medium text-gray-800 line-clamp-2">
            {gig.title}
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* MESSAGE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Your Proposal
            </label>
            <textarea
              placeholder="Explain why you're the best fit..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Your Price ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 300"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
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
              "Submit Bid"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;