import React, { useState } from 'react';

const faqs = [
  {
    question: "How do I register a new student?",
    answer: "Only admins can register a student by filling in their details via the admin dashboard.",
  },
  {
    question: "Can a student change their password?",
    answer: "Yes, after logging in, students can update their password in the account settings.",
  },
  {
    question: "How can students submit complaints?",
    answer: "Students can submit grievances or complaints from their dashboard after logging in.",
  },
  {
    question: "Is online fee payment available?",
    answer: "Currently, fee history is visible. Online payment may be added in the future.",
  },
  {
    question: "Who can manage room allotments?",
    answer: "Only admins have access to add/remove rooms and assign them to students.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-10 ">
        We Have <span className="bg-gradient-to-r from-blue-500 via-teal-400 to-[#2489D3] text-transparent bg-clip-text">Answers</span>
      </h2>
      <div className="space-y-4 text-[#2489D3]">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <span className="text-xl">{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
