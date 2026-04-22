const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/app";

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    return res.json();
  },

  register: async (name, email, password, role) => {
    console.log("role",role)
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password, role }),
    });
    return res.json();
  },

  checkAuth: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: "include",
    });

    return res.json();
  },

  logout: async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },

  fetchGigs: async (searchQuery = "") => {
    const res = await fetch(`${API_BASE}/gigs/allgigs?title=${searchQuery}`, {
      credentials: "include",
    });  
    return res.json();
    
  },

  createGig: async (gigData) => {
    const res = await fetch(`${API_BASE}/gigs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(gigData),
    });
    return res.json();
  },

  submitBid: async (bidData, gigId) => {
    const res = await fetch(`${API_BASE}/bids/${gigId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(bidData),
    });

    return res.json();
  },

  fetchBids: async (gigId) => {
    const res = await fetch(`${API_BASE}/bids/${gigId}`, {
      credentials: "include",
    });
    return res.json();
  },

  hireBid: async (bidId) => {
    const res = await fetch(`${API_BASE}/bids/${bidId}/hire`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to hire freelancer");
    }

    return data;
  },
};
