'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

const faqs = [
  { question: "What is an eSIM?", answer: "An eSIM is an embedded SIM card that allows you to activate a mobile plan without a physical SIM card." },
  { question: "How does SimWindy eSIM work?", answer: "Just scan the QR code provided after purchase, and your eSIM will be instantly activated on your phone. Compatible with iPhone & Android." },
  { question: "Which phones support eSIM?", answer: "Supported devices include iPhone XR+, Samsung Galaxy S20+, Google Pixel 4+, and other eSIM-compatible Android phones." },
  { question: "How long does it take to activate the eSIM?", answer: "Activation is instant. Scan the QR code → Ready to use." },
  { question: "Will I get good network coverage abroad?", answer: "Yes. eSIM connects to local Tier‑1 mobile operators. Examples: USA → AT&T / T-Mobile, UAE → Etisalat / Du, Singapore → Singtel." },
  { question: "Can I reuse the eSIM?", answer: "No. Each eSIM is one-time activation only." },
  { question: "Can I top-up my eSIM?", answer: "Yes, some data packs are rechargeable depending on the plan." },
  { question: "Can I use eSIM for data only or voice too?", answer: "Most eSIMs are for data only. Voice/SMS depend on plan & country." },
  { question: "Is it safe to use eSIM abroad?", answer: "Yes. eSIM is secure and encrypted." },
  { question: "How do I check remaining data?", answer: "Use the SimWindy app or dashboard link sent after activation." }

];

export const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12  mx-auto  py-6 pb-8">


      <div>
        <h2 className="text-lg font-semibold text-black">Frequently Asked Questions</h2>
        <p className="text-xs text-gray-500">
          Here you'll find answers to the most frequently asked questions. Our FAQ section covers activation steps, supported devices, network coverage, and plan details.
          If you need further assistance, feel free to contact our support team via chat, email, or phone.
          For detailed instructions, visit our <a href="/help-center" className="text-(--dark-teal) underline">Help Center</a> or check out our <a href="/tutorials" className="text-(--dark-teal) underline">Quick Start Tutorials</a>.
          We’re here to ensure your eSIM experience is smooth and hassle-free.
        </p>
      </div>


      {/* FAQ Section */}
      <div className="mx-auto  grid grid-cols-1 gap-6 md:gap-3 mt-4">


        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className={`border-b px-3  border-gray-200  ${openIndex === index && 'bg-white'}`}>
              <button
                onClick={() => toggle(index)}
                className="text-[13px] md:text-sm w-full   text-left py-2 flex justify-between items-center"
              >
                {faq.question}

                <span>{openIndex === index ? '−' : '+'}</span>

              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 pb-6 text-[11px] md:text-xs ">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
