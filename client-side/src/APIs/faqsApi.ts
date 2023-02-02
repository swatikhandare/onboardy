import { getResourceFromLocalStorage, setResourceAtLocalStorage } from "./localStorageHelpers";
import FAQ from "../models/FAQ"

const fetchFAQs = async (): Promise<FAQ[]> => {
  const faqsRes = await fetch('http://localhost:4000/api/faqs') as any;
  return await faqsRes.json();
}

const createFAQ = async (faq: FAQ) => {
  await fetch('http://localhost:4000/api/faqs', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faq),
  })
  // const faqs = getResourceFromLocalStorage<FAQ[]>("faqs");
  // setResourceAtLocalStorage<FAQ[]>("faqs", [faq, ...faqs])
}

const deleteFAQ = async (_id: string) => {
  await fetch(`http://localhost:4000/api/faqs/${_id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  // const faqs = getResourceFromLocalStorage<FAQ[]>("faqs");
  // setResourceAtLocalStorage<FAQ[]>("faqs", [...faqs.filter((faq) => faq.id !== id)])
}

const updateFAQ = async (updatedFAQ: FAQ) => {
  console.log(updatedFAQ)
  await fetch(`http://localhost:4000/api/faqs/${updatedFAQ._id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFAQ),
  })
  // const faqs = getResourceFromLocalStorage<FAQ[]>("faqs");
  // const targetIndex = faqs.findIndex(faq => faq.id === updatedFAQ.id);
  // const updatedFAQs = faqs.slice()
  // updatedFAQs[targetIndex] = updatedFAQ;
  // setResourceAtLocalStorage<FAQ[]>("faqs", updatedFAQs)
}

export { fetchFAQs, createFAQ, deleteFAQ, updateFAQ }
