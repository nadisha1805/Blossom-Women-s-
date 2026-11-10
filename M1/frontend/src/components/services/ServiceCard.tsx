import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group bg-white rounded-3xl overflow-hidden border border-[#E9DFE3] shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={service.image}
          alt={`${service.name} at Blossom Women's Health Clinic`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect fill="%23F7E7EC" width="400" height="200"/%3E%3Ctext x="200" y="100" font-family="sans-serif" font-size="14" fill="%23C9859D" text-anchor="middle" dominant-baseline="middle"%3EImage coming soon%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#442B3B]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-card-heading text-[#442B3B] mb-3 leading-snug">
          {service.name}
        </h3>
        <p className="text-[#756A73] text-sm leading-relaxed flex-1 mb-5">
          {service.shortDescription}
        </p>
        <Link
          to={`/services/${service.slug}`}
          aria-label={`Learn more about ${service.name}`}
          className="inline-flex items-center gap-2 text-[#70405B] text-sm font-sans font-medium hover:gap-3 transition-all duration-200 group/link"
        >
          Learn More
          <ArrowRight
            size={15}
            className="group-hover/link:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.article>
  );
}
