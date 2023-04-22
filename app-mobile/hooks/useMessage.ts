import { useAppSelector } from "./useReduce";

const useMessage = () => {
  return useAppSelector((state) => state.message);
};

export default useMessage;
