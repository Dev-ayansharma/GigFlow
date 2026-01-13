import { useState, useEffect, useCallback } from "react";
import { Search, Briefcase, Plus } from "lucide-react";
import { api } from "../../services/api.js";
import Header from "./Header";
import GigCard from "./GigCard";
import CreateGigModal from "../model/CreateGigModal.jsx";
import BidModal from "../model/BidModal.jsx";
import BidsModal from "../model/BidsModal.jsx";

const Dashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGigForBid, setSelectedGigForBid] = useState(null);
  const [selectedGigForBids, setSelectedGigForBids] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGigs = useCallback(async (query = "") => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.fetchGigs(query);

      setGigs(res?.data ?? []);
    } catch (err) {
      console.error("Error fetching gigs:", err);
      setError("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGigs(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchGigs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Available Gigs</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 cursor-pointer py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Post a Gig
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search gigs by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-500 py-10">Loading gigs...</p>
        )}

        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {!loading && !error && gigs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No gigs available</p>
          </div>
        )}

        {!loading && !error && gigs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <GigCard
                key={gig._id}
                gig={gig}
                onBidClick={setSelectedGigForBid}
                onViewBids={setSelectedGigForBids}
              />
            ))}
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateGigModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => fetchGigs(searchQuery)}
        />
      )}

      {selectedGigForBid && (
        <BidModal
          gig={selectedGigForBid}
          onClose={() => setSelectedGigForBid(null)}
          onSuccess={() => fetchGigs(searchQuery)}
        />
      )}

      {selectedGigForBids && (
        <BidsModal
          gigId={selectedGigForBids}
          onClose={() => setSelectedGigForBids(null)}
          onHireSuccess={() => fetchGigs(searchQuery)}
        />
      )}
    </div>
  );
};

export default Dashboard;
