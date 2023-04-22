import { useAppSelector } from "./useReduce";

const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export default useAuth;
