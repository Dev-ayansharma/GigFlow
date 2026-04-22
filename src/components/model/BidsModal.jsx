"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, CheckCircle, XCircle, X } from "lucide-react";
import { api } from "../../services/api";

const BidsModal = ({ gigId, onClose, onHireSuccess }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiringBidId, setHiringBidId] = useState(null);

  const fetchBids = useCallback(async (gigId) => {
    setLoading(true);
    try {
      const res = await api.fetchBids(gigId);
      setBids(res?.data || []);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBids(gigId);
  }, [gigId, fetchBids]);

  const handleHire = async (bidId) => {
    setHiringBidId(bidId);

    try {
      const res = await api.hireBid(bidId);

      if (res.success) {
        onHireSuccess();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setHiringBidId(null);
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "hired":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          label: "Hired",
          color: "text-green-600 bg-green-50",
        };
      case "rejected":
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          label: "Rejected",
          color: "text-red-600 bg-red-50",
        };
      default:
        return {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          label: "Pending",
          color: "text-yellow-600 bg-yellow-50",
        };
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
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Bids Received
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto space-y-4">

          {/* LOADING */}
          {loading &&
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}

          {/* EMPTY */}
          {!loading && bids.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No bids yet
            </div>
          )}

          {/* BIDS */}
          {!loading &&
            bids.map((bid) => {
              const status = getStatus(bid.status);

              return (
                <div
                  key={bid._id}
                  className="border rounded-xl p-4 hover:shadow-md transition"
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between">

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {bid.freelancerid?.name || "Unknown"}
                      </h3>

                      <div
                        className={`flex items-center gap-1 text-xs px-2 py-1 mt-1 rounded-full w-fit ${status.color}`}
                      >
                        {status.icon}
                        {status.label}
                      </div>
                    </div>

                    <div className="text-lg font-bold text-blue-600">
                      ${bid.price}
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {bid.message}
                  </p>

                  {/* ACTION */}
                  {bid.status === "pending" && (
                    <button
                      onClick={() => handleHire(bid._id)}
                      disabled={hiringBidId !== null}
                      className={`mt-4 w-full py-2 rounded-lg font-medium transition flex items-center justify-center ${
                        hiringBidId === bid._id
                          ? "bg-green-500 text-white"
                          : hiringBidId !== null
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {hiringBidId === bid._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Hire Freelancer"
                      )}
                    </button>
                  )}
                </div>
              );
            })}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            disabled={hiringBidId !== null}
            className="w-full py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;