"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "nextjs-toploader/app";
import { getAdminCookies } from "@/app/getCookie";

const EpisodeSchema = Yup.object().shape({
  episodeNumber: Yup.number().required("Episode number is required"),
  season: Yup.number().required("Season number is required"),
  url: Yup.string().url("Must be a valid URL").required("URL is required"),
});

export default function Main({ id }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const GET = async () => {
    const cookie = await getAdminCookies();
    if (cookie) {
      setShow(true);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    GET();
  }, []);

  if (!show) return <div></div>;

  const clearMessage = () => {
    setTimeout(() => setMessage(""), 2000);
  };

  // ✅ Function to delete an episode
  const handleDelete = async (episodeNumber, season) => {
    if (!confirm(`Are you sure you want to delete Episode ${episodeNumber} of Season ${season}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/deleteepisode?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeNumber, season }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Episode deleted successfully!");
      } else {
        setMessage(`❌ Error: ${data.message || "Failed to delete episode"}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
    clearMessage();
  };


const handleBulkUpload = async (season, urlsText, startFrom = 0) => {
  const urls = urlsText.split("\n").map((u) => u.trim()).filter(Boolean);

  for (let i = 0; i < urls.length; i++) {
    const episodeNumber = startFrom + i + 1; // offset by current episode
    const url = urls[i];

    try {
      const res = await fetch(`/api/admin/pushepisode?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seriesId: id, episodeNumber, season, url }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Uploaded Episode ${episodeNumber}`);
      } else {
        setMessage(`❌ Error uploading Ep ${episodeNumber}: ${data.message || "Failed"}`);
      }
    } catch (err) {
      setMessage(`❌ Error uploading Ep ${episodeNumber}: ${err.message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 500)); // prevent flooding
  }
  clearMessage();
};


  return (
    <div className="max-w-md mx-auto p-6 text-black my-5 bg-white shadow-md rounded-lg">
      <div
        className="top-7 text-white z-50 left-7 text-4xl cursor-pointer absolute"
        onClick={() => router.back()}
      >
        <IoArrowBack />
      </div>
      <h1 className="text-2xl font-bold mb-4">Add / Delete Episode</h1>

      {/* --- Single Episode Form --- */}
      <Formik
        initialValues={{
          seriesId: id,
          episodeNumber: "",
          season: 1,
          url: "",
        }}
        validationSchema={EpisodeSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await fetch(`/api/admin/pushepisode?id=${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.ok) {
              setMessage("✅ Episode added successfully!");
              resetForm();
            } else {
              setMessage(`❌ Error: ${data.message || "Failed to add episode"}`);
            }
          } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
          }
          clearMessage();
        }}
      >
        {({ values }) => (
          <Form className="space-y-4 mb-8">
            {/* Episode Number */}
            <div>
              <label className="block font-semibold">Episode Number</label>
              <Field
                name="episodeNumber"
                type="number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="episodeNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Season */}
            <div>
              <label className="block font-semibold">Season</label>
              <Field
                name="season"
                type="number"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="season"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block font-semibold">Episode URL</label>
              <Field name="url" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="url"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit + Delete */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-green-600 text-white rounded font-bold"
              >
                Add Episode
              </button>
              <button
                type="button"
                className="flex-1 py-2 bg-red-600 text-white rounded font-bold"
                onClick={() => handleDelete(values.episodeNumber, values.season)}
              >
                Delete Episode
              </button>
            </div>
          </Form>
        )}
      </Formik>

   {/* --- Bulk Upload Form --- */}
<div className="border-t pt-6">
  <h2 className="text-xl font-bold mb-3">Bulk Upload Episodes</h2>
  <Formik
    initialValues={{
      season: 1,
      currentEpisode: "",
      urls: "",
    }}
    onSubmit={async (values, { resetForm, setFieldError }) => {
      if (!values.currentEpisode || isNaN(values.currentEpisode)) {
        setFieldError("currentEpisode", "❌ Please enter the current episode number.");
        return;
      }

      const urls = values.urls
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);

      // 🔎 Find duplicates
      const seen = new Set();
      const duplicates = urls.filter((url) => {
        if (seen.has(url)) return true;
        seen.add(url);
        return false;
      });

      if (duplicates.length > 0) {
        setFieldError("urls", "❌ Duplicate links found. Please remove them before uploading.");
        return;
      }

      const startFrom = parseInt(values.currentEpisode, 10);
      await handleBulkUpload(values.season, values.urls, startFrom);
      resetForm();
    }}
  >
    {({ values, handleChange, errors }) => {
      const urls = values.urls
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);

      // 🔎 Duplicate detection
      const seen = new Set();
      const duplicates = new Set();
      urls.forEach((url) => {
        if (seen.has(url)) duplicates.add(url);
        else seen.add(url);
      });

      const startFrom = parseInt(values.currentEpisode, 10) || 0;

      return (
        <Form className="space-y-4">
          {/* Season */}
          <div>
            <label className="block font-semibold">Season</label>
            <Field
              name="season"
              type="number"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Current Episode */}
          <div>
            <label className="block font-semibold">Current Episode</label>
            <Field
              name="currentEpisode"
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Enter current episode..."
            />
            {errors.currentEpisode && (
              <p className="text-red-600 font-semibold mt-1">{errors.currentEpisode}</p>
            )}
            <p className="text-sm text-gray-500">
              Example: if current episode is 4, first pasted link becomes Episode 5.
            </p>
          </div>

          {/* URLs List */}
          <div>
            <label className="block font-semibold">Episode URLs (one per line)</label>
            <textarea
              name="urls"
              value={values.urls}
              onChange={handleChange}
              className="w-full border p-2 rounded h-40 font-mono"
              placeholder="Paste links here, one per line..."
            />
            {errors.urls && (
              <p className="text-red-600 font-semibold mt-1">{errors.urls}</p>
            )}
          </div>

          {/* Preview */}
          {urls.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold mb-2">Preview</h3>
              <ul className="space-y-1">
                {urls.map((url, idx) => {
                  const epNumber = startFrom + idx + 1;
                  const isDuplicate = duplicates.has(url);
                  return (
                    <li
                      key={idx}
                      className={`text-sm break-all p-1 rounded ${
                        isDuplicate ? "bg-red-100 text-red-600" : "bg-gray-100"
                      }`}
                    >
                      <span className="font-bold">Episode {epNumber}:</span> {url}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-2 rounded font-bold ${
              duplicates.size > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
            disabled={duplicates.size > 0}
          >
            Upload Episodes
          </button>
        </Form>
      );
    }}
  </Formik>
</div>

      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
  );
}
