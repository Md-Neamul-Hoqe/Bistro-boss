import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-4xl">
        Hi! {user?.displayName ? user.displayName : null} Welcome Back
      </h2>
    </div>
  );
};

export default UserHome;
