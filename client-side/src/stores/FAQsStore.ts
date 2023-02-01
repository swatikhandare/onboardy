import { create } from 'zustand'
import { createFAQ, deleteFAQ, fetchFAQs, updateFAQ } from '../APIs/faqsApi'
import FAQ from '../models/FAQ'

interface FAQState {
  FAQs: FAQ[]
  getFAQs: () => void
  addFAQ: (tag: FAQ) => void
  editFAQ: (updatedFAQ: FAQ) => void
  removeFAQ: (id: string) => void
}

const useFAQsStore = create<FAQState>((set, get) => ({
  FAQs: [],
  getFAQs: async () => {
    const FAQs = await fetchFAQs();
    set({ FAQs })
  },
  addFAQ: async (faq) => {
    await createFAQ(faq);
    get().getFAQs();
  },
  editFAQ: async (updatedFAQ) => {
    await updateFAQ(updatedFAQ);
    get().getFAQs();

  },
  removeFAQ: async (id) => {
    await deleteFAQ(id);
    get().getFAQs();
  },
}))

export default useFAQsStore