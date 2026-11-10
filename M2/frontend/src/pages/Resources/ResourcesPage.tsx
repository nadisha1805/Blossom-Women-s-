import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionHeading from '../../components/ui/SectionHeading';
import ArticleCard from '../../components/articles/ArticleCard';
import CTASection from '../../components/ui/CTASection';
import articles from '../../data/articles';

const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered =
    selectedCategory === 'All'
      ? articles.filter((a) => a.visible)
      : articles.filter((a) => a.visible && a.category === selectedCategory);

  return (
    <div>
      {/* Hero */}
      <section aria-labelledby="resources-hero-heading" className="bg-[#EEF3EC] py-20">
        <div className="section-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#70405B] mb-5"
          >
            Health Education
          </motion.p>
          <motion.h1
            id="resources-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-hero text-[#442B3B] text-balance leading-tight mb-6 max-w-3xl mx-auto"
          >
            Health Resources & Educational Reading
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[#756A73] text-lg leading-relaxed max-w-2xl mx-auto mb-4"
          >
            General health information to help you understand your wellbeing. This content is educational only and not a substitute for professional medical advice.
          </motion.p>
        </div>
      </section>

      {/* Articles Section */}
      <section aria-labelledby="articles-section-heading" className="bg-white py-20">
        <div className="section-container">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center" role="group" aria-label="Filter articles by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-5 py-2.5 rounded-xl text-sm font-sans font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#70405B] text-white shadow-soft'
                    : 'bg-[#FAF5EF] text-[#756A73] hover:bg-[#F7E7EC] hover:text-[#70405B] border border-[#E9DFE3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <SectionHeading
            id="articles-section-heading"
            eyebrow="Educational Content"
            title="Helpful Health Reading"
            subtitle="Thoughtfully written articles to support your understanding of women's health topics."
            align="left"
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#756A73]">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        id="resources-cta"
        eyebrow="Your Questions Matter"
        title="Have a Health Concern? Speak With a Specialist"
        subtitle="Our team of women's health specialists is here to listen and provide the expert guidance you need."
        variant="plum"
      />
    </div>
  );
}
