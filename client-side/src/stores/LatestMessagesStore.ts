import { create } from 'zustand'
import { createLatestMessage, fetchLatestMessages } from '../APIs/latestMessagesApi'
import LatestMessage from '../models/LatestMessage'

interface LatestMessageState {
  latestMessages: LatestMessage[]
  getLatestMessages: () => void
  addLatestMessage: (LatestMessage: LatestMessage) => void
}

const useLatestMessagesStore = create<LatestMessageState>((set, get) => ({
  latestMessages: [],
  getLatestMessages: async () => {
    const latestMessages = await fetchLatestMessages();
    set({ latestMessages })
  },
  addLatestMessage: async (latestMessage) => {
    await createLatestMessage(latestMessage);
    get().getLatestMessages();
  },
}))

export default useLatestMessagesStore