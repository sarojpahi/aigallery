import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Carousel, FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: [],
    variation: "",
  });
  const [load, setLoad] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://aigallery.onrender.com/generateImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        setForm({
          ...form,
          photo: data.data,
          variation: "",
        });
        setCurrent(data.data[0].b64_json);
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://aigallery.onrender.com/generateImage/postImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name,
              prompt: form.prompt,
              photo: form.variation || current,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };
  const handleVariation = async () => {
    try {
      setLoad(true);
      const response = await fetch(
        "https://aigallery.onrender.com/generateImage/variation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ photo: current }),
        }
      );
      const data = await response.json();
      setForm({ ...form, variation: data.data[0].b64_json });
    } catch (err) {
      alert(err);
    } finally {
      setLoad(false);
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div className="mt-[-24px]">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="mt-6 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex w-full ">
            <div className="w-full">
              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />
            </div>
            <div className="flex items-end p-1 ml-2">
              <button
                type="button"
                onClick={generateImage}
                className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-3 items-center relative min-h-[40vh]">
            {form.photo.length !== 0 ? (
              <Carousel
                data={form.photo}
                current={current}
                setCurrent={setCurrent}
              />
            ) : (
              ""
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}

            {current ? (
              <div className="my-5 relative  lg:translate-x-[35%]">
                <button
                  type="button"
                  onClick={handleVariation}
                  className=" text-white bg-black font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {load ? "Generating..." : "Variation"}
                </button>
              </div>
            ) : (
              ""
            )}
            {form.variation ? (
              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 lg:w-full flex justify-center items-center">
                <img
                  src={`data:image/jpeg;base64,${form.variation}`}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              ""
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <p className="my-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
