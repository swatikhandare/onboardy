import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";
import FAQ from "../models/FAQ"

const fetchFAQs = async (): Promise<FAQ[]> => {
  return getResourceFromLocalStorage("faqs")
}

const createFAQ = async (faq: FAQ) => {
  const faqs = getResourceFromLocalStorage<FAQ[]>("faqs");
  setResourceAtLocalStorage<FAQ[]>("faqs", [faq, ...faqs])
}

const deleteFAQ = async (id: string) => {
  const faqs = getResourceFromLocalStorage<FAQ[]>("faqs");
  setResourceAtLocalStorage<FAQ[]>("faqs", [...faqs.filter((faq) => faq.id !== id)])
}

const updateFAQ = async (updatedFAQ: FAQ) => {
  const faqs = getResourceFromLocalStorage<FAQ[]>("faqs");
  const targetIndex = faqs.findIndex(faq => faq.id === updatedFAQ.id);
  const updatedFAQs = faqs.slice()
  updatedFAQs[targetIndex] = updatedFAQ;
  setResourceAtLocalStorage<FAQ[]>("faqs", updatedFAQs)
}

export { fetchFAQs, createFAQ, deleteFAQ, updateFAQ }
