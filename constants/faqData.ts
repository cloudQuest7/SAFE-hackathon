export interface FAQItem {
  id: string;
  tag: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-01",
    tag: "GENERAL",
    question: "What is the SAFE India Hackathon?",
    answer:
      "SAFE India is a hardware and software hackathon focused on developing engineering solutions for India's Armed Forces. It brings together students and young engineers to solve real defense challenges — bridging the gap between civilian innovation and national security needs.",
  },
  {
    id: "faq-02",
    tag: "ELIGIBILITY",
    question: "Who can participate?",
    answer:
      "College students from any discipline and recent graduates with less than 2 years of work experience can participate. Teams of 2–5 members are allowed. We look for passion, creativity, and a drive to solve problems that matter.",
  },
  {
    id: "faq-03",
    tag: "ELIGIBILITY",
    question: "Is this hackathon only for engineering students?",
    answer:
      "Absolutely not. While engineering students are encouraged, we welcome participants from all backgrounds — design, management, sciences, and beyond. Design thinking, problem-solving, and creativity are equally valuable on the battlefield of innovation.",
  },
  {
    id: "faq-04",
    tag: "REGISTRATION",
    question: "Is there a registration fee?",
    answer:
      "Registration details including fee structure will be announced soon. Stay tuned to our official channels and social media handles for the latest updates. Early bird registrations may have special benefits.",
  },
  {
    id: "faq-05",
    tag: "TEAMS",
    question: "Can I participate individually?",
    answer:
      "We strongly encourage team participation (2–5 members) as defense challenges are best tackled collaboratively. However, individual entries may be considered on a case-by-case basis. Reach out to the organizers to confirm eligibility.",
  },
  {
    id: "faq-06",
    tag: "TEAMS",
    question: "Can I be part of multiple teams?",
    answer:
      "Negative. Each participant can only be part of one team. This ensures fair competition and full commitment to your squad's mission. Choose your team wisely — you're in it for the long haul.",
  },
];