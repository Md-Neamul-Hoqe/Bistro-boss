import { useForm } from "react-hook-form";
import SectionHeading from "../../../components/SectionHeading";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosHook from "../../../Hooks/useAxiosHook";
import Swal from "sweetalert2";
const image_upload_key = import.meta.env.VITE_image_upload_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;

const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const axios = useAxiosPublic();
  const axiosSecure = useAxiosHook();

  
  const onSubmit = async (submittedData) => {
    console.log(submittedData);

    const imageFile = { image: submittedData?.image[0] };

    const { data } = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("image uploaded: ", data?.data?.display_url);
    console.log(data);

    if (data?.success) {
      const item = {
        name: submittedData?.name,
        price: submittedData?.price,
        recipe: submittedData?.recipe,
        image: data?.data?.display_url,
      };

      const { data: menuAdded } = await axiosSecure.post("/menu", item);

      console.log(menuAdded);
      if (menuAdded?.insertedId) {
        reset();
        
        Swal.fire({
          icon: "success",
          title: `Menu Item Added Successfully.`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  };

  // curl --location --request POST "expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

  return (
    <div>
      <SectionHeading heading="ADD AN ITEM" subHeading="What's new?" />
      <div className="bg-[#F3F3F3] p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="text-xl font-semibold capitalize text-gray-900">
                Recipe name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              {...register("name", { required: true })}
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
                {...register("category", { required: true })}
                className="select select-bordered w-full"
                defaultValue={""}>
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
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                step={0.001}
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
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Details"></textarea>
          </div>
          <div>
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
