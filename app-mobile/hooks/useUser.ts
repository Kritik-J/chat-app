import { useAppSelector } from "./useReduce";

const useUser = () => {
  return useAppSelector((state) => state.user);
};

export default useUser;
