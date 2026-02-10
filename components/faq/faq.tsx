"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
	id: string;
	q: string;
	a: React.ReactNode;
};

const defaultItems: FAQItem[] = [
	{
		id: "faq-1",
		q: "What is I-CELL and who can join?",
		a: (
			<p>
				I-CELL is a three-day interdisciplinary hackathon focused on hardware
				and software solutions. Students, professionals, and hobbyists are
				welcome — teams of up to 5 people may participate.
			</p>
		),
	},
	{
		id: "faq-2",
		q: "Do I need prior hardware experience?",
		a: (
			<p>
				No — we welcome all skill levels. Hardware and software tracks are
				available and mentors will be on-site to help with prototyping.
			</p>
		),
	},
	{
		id: "faq-3",
		q: "How do you judge projects?",
		a: (
			<p>
				Projects are evaluated on impact, technical execution, originality,
				and feasibility. See the `Prizes` section for category-specific
				criteria.
			</p>
		),
	},
	{
		id: "faq-4",
		q: "Can I register as an individual?",
		a: (
			<p>
				Yes — individuals can register and will be placed on a team during
				registration if they do not have a full team.
			</p>
		),
	},
  {
    id: "faq-5",
    q: "What should I bring?",
    a: (
      <p>
        Bring your laptop, any tools you might need, and your creativity.
        We provide power, WiFi, and mentorship. Meals and refreshments
        are complimentary for all participants.
      </p>
    ),
  },
  {
    id: "faq-6",
    q: "Is there a submission deadline?",
    a: (
      <p>
        All projects must be submitted by 17:00 on March 17th. Late
        submissions will not be accepted. Start early to avoid last-minute
        rush.
      </p>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FAQ({ items = defaultItems }: { items?: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section id="faq" className="w-full py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-white tracking-tighter mb-4">
            FAQ
          </h2>
          <p className="text-lg text-gray-400 mx-auto">
            Everything you need to know about I-CELL. Cant find what you are looking for?{" "}
            <a href="mailto:info@i-cell.hackathon" className="text-[#FFB800] hover:text-[#D42D1F] transition-colors">
              Get in touch
            </a>
            .
          </p>
        </motion.div>

        {/* FAQ Grid - Single column centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {items.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group"
              >
                <button
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-panel`}
                  onClick={() => toggle(item.id)}
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] p-0 rounded"
                >
                  <div className="flex gap-6 items-start">
                    {/* Number Badge with rotation animation */}
                    <div className="flex-shrink-0 pt-1">
                      <motion.div
                        animate={{
                          rotate: isOpen ? 90 : 0,
                          color: isOpen ? "#FFB800" : "#607744",
                        }}
                        transition={{ duration: 0.35 }}
                        className="text-4xl md:text-5xl font-black"
                      >
                        +
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.h3
                        animate={{
                          color: isOpen ? "#FFB800" : "#FFFFFF",
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-xl md:text-2xl font-bold tracking-wide leading-tight"
                      >
                        {item.q}
                      </motion.h3>
                    </div>
                  </div>

                  {/* Underline */}
                  <motion.div
                    className="h-[2px] bg-gradient-to-r from-[#B39C4D] to-[#607744] mt-4"
                    animate={{
                      scaleX: isOpen ? 1 : 0,
                      opacity: isOpen ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: "left" }}
                  />
                </button>

                {/* Answer Panel */}
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      id={`${item.id}-panel`}
                      key={`${item.id}-panel`}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-gray-300 ml-16 text-base leading-relaxed"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24 pt-12 border-t border-gray-800/40 text-center md:text-left"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <motion.a
            href="mailto:info@i-cell.hackathon"
            whileHover={{ x: 6 }}
            className="inline-flex items-center gap-2 text-[#FFB800] font-bold text-lg hover:text-[#D42D1F] transition-colors"
          >
            Contact the team
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
