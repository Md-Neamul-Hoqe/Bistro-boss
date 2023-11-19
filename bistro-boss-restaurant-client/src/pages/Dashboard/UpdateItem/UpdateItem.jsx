import { useForm } from "react-hook-form";
import SectionHeading from "../../../components/SectionHeading";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosHook from "../../../Hooks/useAxiosHook";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
const image_upload_key = import.meta.env.VITE_image_upload_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const UpdateItem = () => {
  const { _id, name, price, category, recipe, image } = useLoaderData();
  const axios = useAxiosPublic();
  const axiosSecure = useAxiosHook();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name,
      price,
      category,
      recipe,
      image,
    },
  });
  const onSubmit = async (submittedData) => {
    console.log(submittedData);

    console.log(submittedData?.image);

    const imageFile = { image: submittedData?.image[0] };

    /* Todo: need to justify the image already have on the host or not */
    const { data } = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("image uploaded: ", data?.data?.display_url);
    console.log(data);

    if (data?.success) {
      /* todo: need update image / updated data */
      const updatedItem = {
        name: submittedData?.name,
        price: submittedData?.price,
        recipe: submittedData?.recipe,
        image: data?.data?.display_url,
      };

      const { data: menuAdded } = await axiosSecure.patch(
        `/menu/${_id}`,
        updatedItem
      );

      console.log(menuAdded);
      if (menuAdded?.modifiedCount) {
        reset();

        Swal.fire({
          icon: "success",
          title: `Menu Item Updated Successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionHeading
        heading={`Update: ${name}`}
        subHeading="What's modified?"
      />
      <div className="bg-[#F3F3F3] p-12">
        {/* TODO: create reusable component of this form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="text-xl font-semibold capitalize text-gray-900">
                Recipe name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              {...register("name", { required: true, defaultValue: name })}
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-xl font-semibold capitalize text-gray-900">
                  Category <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                {...register("category", {
                  required: true,
                  defaultValue: category,
                })}
                className="select select-bordered w-full">
                <option value="" disabled>
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-xl font-semibold capitalize text-gray-900">
                  Price <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                {...register("price", { required: true, defaultValue: price })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-xl font-semibold capitalize text-gray-900">
                Recipe Details <span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              {...register("recipe", { required: true, defaultValue: recipe })}
              className="textarea textarea-bordered h-24"
              placeholder="Details"></textarea>
          </div>
          <div>
            <input
              {...register("image", { defaultValue: image })}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-block bg-gradient-to-r from-[#835D23] to-[#B58130] text-white max-w-xs mx-auto">
              Update Recipe Details <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
