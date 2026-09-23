import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, Clock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ResponseDashboard({ onBackToLetter }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    try {
      const res = await fetch(`${apiUrl}/response`, {
        headers: { 'Accept': 'application/json' },
      });
      const json = await res.json();
      if (json && json.success) {
        setData(json.data);
      } else {
        setData(null);
      }
    } catch (err) {
      console.warn('API error:', err);
      setError('Could not connect to backend server. Ensure Laravel API is running on localhost:8000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 relative z-10"
    >
      <div className="w-full max-w-lg bg-white/90 border border-pink-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-200/40 backdrop-blur-md relative">
        
        {/* Navigation back */}
        <button
          onClick={onBackToLetter}
          className="flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-800 font-medium mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Letter Scene</span>
        </button>

        {/* Title */}
        <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h1 className="text-xl font-bold text-pink-950 font-bengali">
              Response Dashboard (/response)
            </h1>
          </div>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors cursor-pointer"
            title="Refresh Database Status"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Content State */}
        {loading ? (
          <div className="py-12 text-center text-pink-600 font-medium text-sm flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-rose-500" />
            <span>Fetching live database status...</span>
          </div>
        ) : error ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">API Connection Notice</p>
              <p>{error}</p>
            </div>
          </div>
        ) : null}

        {data ? (
          <div className="space-y-4">
            {/* Status Badge */}
            <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-pink-600 font-medium uppercase tracking-wider">Recipient Name</p>
                <p className="text-lg font-bold text-pink-900 font-bengali">{data.recipient_name || 'special ফুল'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-pink-600 font-medium uppercase tracking-wider">Status</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${data.response_status === 'accepted' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="capitalize">{data.response_status || 'pending'}</span>
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-pink-100 text-left">
                <p className="text-xs text-pink-500 font-medium">No Click Count</p>
                <p className="text-2xl font-bold text-pink-900 mt-1">{data.no_click_count ?? 0}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-pink-100 text-left">
                <p className="text-xs text-pink-500 font-medium">Recorded ID</p>
                <p className="text-2xl font-bold text-pink-900 mt-1">#{data.id || 1}</p>
              </div>
            </div>

            {/* Timestamp */}
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>
                Last Interaction: {data.created_at ? new Date(data.created_at).toLocaleString() : 'Just now'}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-pink-600/80 text-sm">
            <Heart className="w-10 h-10 text-pink-300 mx-auto mb-2 opacity-50" />
            <p className="font-semibold text-pink-900">No Response Recorded Yet</p>
            <p className="text-xs mt-1">Waiting for special ফুল to open the letter & respond!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
