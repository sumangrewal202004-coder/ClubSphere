import { useState } from 'react';
import api from '../api/axios';

export default function ApplyModal({ club, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // 🔥 Reset modal properly
  const handleClose = () => {
    setFile(null);
    setError('');
    setSuccess(false);
    onClose();
  };

  const handleApply = async () => {
    if (!file) return setError('Please select your CV (PDF)');
    if (file.type !== 'application/pdf') return setError('Only PDF files are accepted');

    // ✅ File size validation (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return setError('File size must be less than 2MB');
    }

    // 🚫 Prevent duplicate clicks
    if (loading) return;

    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('clubId', club.id);

    try {
      await api.post('/applications', formData); // ✅ correct (no headers)

      setSuccess(true);

      // 🔥 Auto close after success
      setTimeout(() => {
        handleClose();
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to apply');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-7 shadow-xl">

        {success ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Application Submitted!
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Your CV is being evaluated by AI. You'll get a notification soon.
            </p>

            <button
              onClick={handleClose}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Apply to {club.name}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  Upload your CV for AI screening
                </p>
              </div>

              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Requirements */}
            {club.requirements && (
              <div className="bg-indigo-50 rounded-lg p-4 mb-5">
                <p className="text-xs font-semibold text-indigo-700 mb-1">
                  Club Requirements
                </p>
                <p className="text-xs text-indigo-600">
                  {club.requirements}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* File Upload */}
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                file
                  ? 'border-indigo-400 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => document.getElementById('cv-input').click()}
            >
              <input
                id="cv-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {file ? (
                <>
                  <p className="text-sm font-medium text-indigo-600">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click to change
                  </p>
                </>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 text-gray-300 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>

                  <p className="text-sm text-gray-500">
                    Click to upload your CV
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PDF only • Max 2MB
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleApply}
                disabled={loading || !file}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}