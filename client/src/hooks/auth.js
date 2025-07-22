import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  const userData = auth?.userData || null;
  const token = auth?.token || null;

  console.log("User Data:", userData, token);

  return { userData, token };
};


export default useAuth;