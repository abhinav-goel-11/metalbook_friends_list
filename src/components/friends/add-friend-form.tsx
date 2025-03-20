import { addFriendFormSchema, AddFriendFormT } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { addFriend } from "@/lib/features/friends/friendsSlice";

export default function AddFriendForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFriendFormT>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: AddFriendFormT) => {
    dispatch(addFriend(data.name));
    reset();
  };
  return (
    <div className="border border-solid border-gray-200 p-4 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl">Add New Friend</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-2"
      >
        <div className="flex-1">
          <Input placeholder="Friend's name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <Button type="submit">Add Friend</Button>
      </form>
    </div>
  );
}
