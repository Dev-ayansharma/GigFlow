"use client";

import { DollarSign} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const GigCard = ({ gig, onBidClick, onViewBids }) => {
  const { user } = useAuth();
  const isOwner = user?._id === gig.ownerid;

  const handledelete = async() =>{
    const res = await api.gigdelete(gig._id)
    if(res.success){
    toast.success(res.message)
  }else{
    toast.error(res.message || "not deleted yet")}
  }



  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">

      {/* TOP */}
      <div>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
            {gig.title}
          </h3>

          {/* STATUS */}
          <span
            className={`ml-2 px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
              gig.status === "open"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {gig.status === "open"
              ? "Open"
              : `Assigned ${
                  gig?.hired?.name === user?.name
                    ? "to you"
                    : gig?.hired?.name
                    ? `to ${gig.hired.name}`
                    : ""
                }`}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {gig.description}
        </p>
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between mt-4">

        {/* BUDGET */}
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold text-sm">
          <DollarSign className="w-4 h-4" />
          {gig.budget}
        </div>

        {/* ACTION */}
        {gig.status === "open" &&
          (isOwner ? (
          <>  <button
              onClick={() => onViewBids(gig._id)}
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              View Bids
            </button>

                        <button
              onClick={handledelete}
              className="px-4 py-2 text-sm font-medium bg-red-900 text-white rounded-lg hover:bg-red-800 transition"
            >
              Delete Bids
            </button> </>

          ) : (
            <button
              onClick={() => onBidClick(gig)}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Place Bid
            </button>
          ))}
      </div>
    </div>
  );
};

export default GigCard;
