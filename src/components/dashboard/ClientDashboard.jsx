"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Briefcase } from "lucide-react";
import { api } from "../../services/api.js";
import Header from "./Header";
import GigCard from "./GigCard";
import BidModal from "../model/BidModal.jsx";

const ClientDashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGig, setSelectedGig] = useState(null);
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

        {/* HEADER SECTION */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Explore Gigs 🔍
          </h1>
          <p className="text-gray-500 mt-1">
            Find work that matches your skills
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search gigs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && gigs.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm inline-block">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No gigs found</p>
            </div>
          </div>
        )}

        {/* GIG GRID */}
        {!loading && gigs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
              >
                <GigCard
                  gig={gig}
                  onBidClick={setSelectedGig}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* BID MODAL */}
      {selectedGig && (
        <BidModal
          gig={selectedGig}
          onClose={() => setSelectedGig(null)}
          onSuccess={() => fetchGigs(searchQuery)}
        />
      )}
    </div>
  );
};

export default ClientDashboard;