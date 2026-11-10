import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ArticleCard from '../../components/articles/ArticleCard';
import CTASection from '../../components/ui/CTASection';
import articles from '../../data/articles';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug && a.visible);

  if (!article) {
    return (
      <div className="section-container py-24 text-center">
        <h1 className="font-serif text-3xl text-[#442B3B] mb-4">Article Not Found</h1>
        <p className="text-[#756A73] mb-8">This article is not available.</p>
        <Link to="/resources" className="inline-flex items-center gap-2 bg-[#70405B] text-white px-6 py-3 rounded-xl font-sans text-sm font-medium hover:bg-[#442B3B] transition-colors">
          Back to Health Resources
        </Link>
      </div>
    );
  }

  const related = articles.filter(
    (a) => article.relatedSlugs.includes(a.slug) && a.visible
  );

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#E9DFE3]">
        <div className="section-container">
          <Breadcrumbs
            items={[
              { label: 'Health Resources', to: '/resources' },
              { label: article.title.substring(0, 40) + '…' },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="h-56 lg:h-80 overflow-hidden relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#442B3B]/60 to-transparent" />
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-[#FAF5EF] py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Article */}
            <article className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block px-3 py-1 bg-[#EEF3EC] text-[#70405B] text-xs font-sans font-medium rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#756A73] text-xs font-sans">
                    <Clock size={11} aria-hidden="true" />
                    {article.readingTime}
                  </span>
                </div>

                <h1 className="font-serif text-3xl lg:text-4xl text-[#442B3B] mb-4 text-balance leading-tight">
                  {article.title}
                </h1>

                <p className="font-sans text-[#756A73] text-xs mb-8 italic">
                  Published: {article.publishedDate}
                </p>

                {/* Article Body */}
                <div
                  className="prose-content"
                  dangerouslySetInnerHTML={{ __html: article.body }}
                />

                {/* Disclaimer */}
                <div className="flex gap-3 bg-[#F7E7EC] border border-[#EBC4CF]/40 rounded-2xl p-5 mt-10">
                  <AlertTriangle size={18} className="text-[#70405B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-[#756A73] text-sm leading-relaxed">
                    <strong className="text-[#442B3B]">Medical Disclaimer:</strong> This article is for general educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Please consult a qualified healthcare professional for guidance tailored to your individual health circumstances.
                  </p>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#442B3B] rounded-3xl p-7 text-center">
                <h2 className="font-serif text-lg text-white mb-3">Have a Health Concern?</h2>
                <p className="text-white/70 text-sm mb-5">Speak with a women's health specialist who can provide guidance tailored to your situation.</p>
                <Link
                  to="/appointment"
                  id="article-appointment-cta"
                  className="block w-full bg-[#EBC4CF] hover:bg-white text-[#442B3B] font-sans font-medium py-3 rounded-xl transition-all duration-200 text-sm text-center"
                >
                  Request an Appointment
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E9DFE3]">
                <h2 className="font-sans font-semibold text-[#442B3B] text-sm mb-4">More Articles</h2>
                <ul className="space-y-3">
                  {articles
                    .filter((a) => a.visible && a.slug !== article.slug)
                    .slice(0, 4)
                    .map((a) => (
                      <li key={a.slug}>
                        <Link
                          to={`/resources/${a.slug}`}
                          className="flex items-start gap-2 text-[#756A73] hover:text-[#70405B] text-sm transition-colors duration-200 leading-snug py-1"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#EBC4CF] flex-shrink-0 mt-1.5" aria-hidden="true" />
                          {a.title.substring(0, 50)}…
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section aria-labelledby="related-articles-heading" className="bg-white py-16">
          <div className="section-container">
            <h2 id="related-articles-heading" className="font-serif text-2xl text-[#442B3B] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        id="article-cta"
        title="Speak With a Specialist About Your Health"
        subtitle="For advice tailored to your individual circumstances, request a consultation with one of our women's health specialists."
        variant="blush"
      />
    </div>
  );
}
