import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Article } from '../../data/articles';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group bg-white rounded-3xl overflow-hidden border border-[#E9DFE3] shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect fill="%23EEF3EC" width="400" height="200"/%3E%3Ctext x="200" y="100" font-family="sans-serif" font-size="14" fill="%23B9CBB7" text-anchor="middle" dominant-baseline="middle"%3EHealth Resource%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block px-3 py-1 bg-[#EEF3EC] text-[#70405B] text-xs font-sans font-medium rounded-full">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[#756A73] text-xs font-sans">
            <Clock size={11} />
            {article.readingTime}
          </span>
        </div>

        <h3 className="font-serif text-[1.1rem] text-[#442B3B] mb-3 leading-snug line-clamp-2 flex-1">
          {article.title}
        </h3>
        <p className="text-[#756A73] text-sm leading-relaxed line-clamp-3 mb-5">
          {article.excerpt}
        </p>

        <Link
          to={`/resources/${article.slug}`}
          aria-label={`Read article: ${article.title}`}
          className="inline-flex items-center gap-2 text-[#70405B] text-sm font-sans font-medium hover:gap-3 transition-all duration-200 group/link"
        >
          Read Article
          <ArrowRight
            size={15}
            className="group-hover/link:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.article>
  );
}
