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
  });

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

  return (
    <div className="max-w-md mx-auto p-6 text-black my-5 bg-white shadow-md rounded-lg">
      <div
        className=" top-7 text-white z-50 left-7 text-4xl cursor-pointer absolute"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack />
      </div>
      <h1 className="text-2xl font-bold mb-4">Add / Delete Episode</h1>

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
          <Form className="space-y-4">
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
                onClick={() =>
                  handleDelete(values.episodeNumber, values.season)
                }
              >
                Delete Episode
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
  );
}
