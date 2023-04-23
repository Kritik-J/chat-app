import { useAppSelector } from "./useReduce";

const useChat = () => {
  return useAppSelector((state) => state.chat);
};

export default useChat;
