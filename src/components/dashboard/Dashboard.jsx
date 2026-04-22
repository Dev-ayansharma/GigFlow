"use client";

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

  const fetchGigs = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const res = await api.fetchGigs(query);
    
      setGigs(res?.data.gigs ?? []);
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your gigs and track activity
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Post a Gig
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search gigs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && gigs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                No gigs yet
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Start by posting your first gig
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Gig
              </button>
            </div>
          </div>
        )}

        {/* GRID */}
        {!loading && gigs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="transform hover:-translate-y-1 transition duration-300"
              >
                <GigCard
                  gig={gig}
                  onBidClick={setSelectedGigForBid}
                  onViewBids={setSelectedGigForBids}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODALS */}
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