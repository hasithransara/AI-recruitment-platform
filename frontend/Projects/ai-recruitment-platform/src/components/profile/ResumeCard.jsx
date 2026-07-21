import { useRef, useState } from "react";
import Card from "../common/Card";
import { uploadResume } from "../../services/profileService";

function ResumeCard({ profile, onResumeUploaded }) {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const apiBaseUrl = "https://localhost:7110";

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setMessage("");
    setError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    const maximumSize = 5 * 1024 * 1024;

    if (file.size > maximumSize) {
      setError("The resume must be smaller than 5 MB.");
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF resume first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setError("");

      const result = await uploadResume(selectedFile);

      setMessage(
        result.message ||
          "Resume uploaded and analyzed successfully."
      );

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await onResumeUploaded?.();
    } catch (err) {
  console.error("Resume upload error:", err);
  console.error("Backend response:", err.response?.data);

  const backendData = err.response?.data;

  setError(
    backendData?.message ||
      backendData?.Message ||
      backendData?.title ||
      `Resume upload failed. Status: ${
        err.response?.status || "Network error"
      }`
  );
} {
      setUploading(false);
    }
  };

  const handleDownload = () => {
    if (!profile.resumeUrl) {
      setError("No resume has been uploaded.");
      return;
    }

    window.open(
      `${apiBaseUrl}${profile.resumeUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const resumeFileName = profile.resumeUrl
    ? profile.resumeUrl.split("/").pop()
    : null;

  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold">
        Resume
      </h2>

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-medium">
              {resumeFileName || "No resume uploaded"}
            </p>

            {profile.resumeUrl && (
              <p className="mt-1 text-sm text-gray-500">
                Your resume is ready for job matching.
              </p>
            )}
          </div>

          {profile.resumeUrl && (
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
            >
              View Resume
            </button>
          )}
        </div>

        <div className="border-t pt-5">
          <label
            htmlFor="resume"
            className="mb-2 block font-medium"
          >
            Upload a new resume
          </label>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              ref={fileInputRef}
              id="resume"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="block w-full rounded-lg border border-gray-300 p-2"
            />

            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name}
            </p>
          )}

          {message && (
            <p className="mt-3 text-sm text-green-600">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ResumeCard;