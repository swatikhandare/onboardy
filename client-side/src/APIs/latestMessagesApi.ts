import LatestMessage from "../models/LatestMessage";
import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";

const fetchLatestMessages = async (): Promise<LatestMessage[]> => {
  return getResourceFromLocalStorage<LatestMessage[]>("latestMessages");
}

const createLatestMessage = async (latestMessage: LatestMessage) => {
  const latestMessages = getResourceFromLocalStorage<LatestMessage[]>("latestMessages");
  setResourceAtLocalStorage<LatestMessage[]>("latestMessages", [latestMessage, ...latestMessages]);
}

export { fetchLatestMessages, createLatestMessage }
