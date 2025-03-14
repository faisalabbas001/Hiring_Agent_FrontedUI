import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    { title: " Code Review? 🤔", content: "Code review is a systematic examination of computer source code. It is intended to find and fix mistakes overlooked in the initial development phase." },
    { title: "Benefits of Code 💡", content: "Code reviews help improve code quality, facilitate knowledge sharing among team members, and ensure adherence to coding standards." },
    { title: "Best Practices  🛠️", content: "Some best practices include reviewing small chunks of code, providing constructive feedback, and using automated tools to assist in the review process." },
    { title: "Common Mistakes ❌", content: "Common mistakes include focusing too much on style rather than functionality, and not providing actionable feedback." },
    { title: "Tools for Code  🖥️", content: "Popular tools include GitHub, GitLab, Bitbucket, and various IDE plugins that facilitate code review." },
    { title: " Feedback 🗣️", content: "Focus on the code, not the person. Be specific, and suggest improvements rather than just pointing out flaws." },
    { title: " Automation 🤖", content: "Automation can help catch common issues and enforce coding standards, allowing reviewers to focus on more complex problems." },
    { title: "Integrating Code  🔄", content: "Incorporate code reviews into your development process by making them a mandatory step before merging code." },
    { title: " Timely Reviews ⏰", content: "Timely reviews help maintain momentum in development and prevent bottlenecks in the workflow." },
    { title: "Positive Review 🌟", content: "Foster a culture where feedback is seen as a tool for growth, and encourage team members to participate actively." },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {accordionItems.map((item, index) => (
        <div key={index} className="border rounded-lg shadow-sm">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-medium focus:outline-none"
          >
            {item.title}
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {openIndex === index && (
            <div className="p-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-900">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
