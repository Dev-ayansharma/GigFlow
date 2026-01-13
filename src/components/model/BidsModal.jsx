import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { api } from "../../services/api";
import { useCallback } from "react";

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
    const confirmHire = window.confirm(
      "Are you sure you want to hire this freelancer? This action cannot be undone.",
    );

    if (!confirmHire) return;

    setHiringBidId(bidId); // Show loading state on specific bid

    try {
      const response = await api.hireBid(bidId);

      if (response.success) {
        // Show success message
        alert(
          response.freelancerNotified
            ? "✅ Freelancer hired successfully! They have been notified in real-time."
            : "✅ Freelancer hired successfully! They will be notified when they come online.",
        );

        // Call success callback to refresh gigs
        onHireSuccess();
        onClose();
      } else {
        alert(
          "❌ Failed to hire freelancer: " +
            (response.message || "Unknown error"),
        );
      }
    } catch (error) {
      console.error("Error hiring:", error);
      alert(
        "❌ An error occurred while hiring the freelancer. Please try again.",
      );
    } finally {
      setHiringBidId(null);
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "hired":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-100 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bids Received</h2>

        {loading ? (
          <p className="text-center py-8 text-gray-500">Loading bids...</p>
        ) : bids.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No bids yet</p>
        ) : (
          <div className="space-y-4">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {bid.freelancerid.name || "Unknown"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(bid.status)}
                      <span className="text-sm text-gray-600 capitalize">
                        {bid.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      ${bid.price}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{bid.message}</p>
                {bid.status === "pending" && (
                  <button
                    onClick={() => handleHire(bid._id)}
                    disabled={hiringBidId !== null} //
                    className={`w-full px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                      hiringBidId === bid._id
                        ? "bg-green-400 text-white cursor-wait"
                        : hiringBidId !== null
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {hiringBidId === bid._id ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Hiring...
                      </span>
                    ) : (
                      "Hire This Freelancer"
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          disabled={hiringBidId !== null}
          className="w-full mt-4 px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BidsModal;
