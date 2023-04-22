import { useAppSelector } from "./useReduce";

const useMode = () => {
  const { mode } = useAppSelector((state) => state.ui);
  return mode;
};

export default useMode;
