import { DollarSign, User } from "lucide-react";
import { useAuth } from "../../context/useAuth";

const GigCard = ({ gig, onBidClick, onViewBids }) => {
  const { user } = useAuth();
  const isOwner = user?._id === gig.ownerid;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900">{gig.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            gig.status === "open"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {gig.status === "open"
            ? "Open"
            : `Assigned to ${gig?.hired?.name === user?.name ? "You" : gig?.hired?.name || "Unknown"}`}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{gig.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          <DollarSign className="w-5 h-5" />
          <span>${gig.budget}</span>
        </div>
        {gig.status === "open" &&
          (isOwner ? (
            <button
              onClick={() => onViewBids(gig._id)}
              className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Bids
            </button>
          ) : (
            <button
              onClick={() => onBidClick(gig)}
              className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
            >
              Place Bid
            </button>
          ))}
      </div>
    </div>
  );
};

export default GigCard;
