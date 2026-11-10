import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Doctor } from '../../data/doctors';

interface DoctorCardProps {
  doctor: Doctor;
  index?: number;
}

export default function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group bg-white rounded-3xl overflow-hidden border border-[#E9DFE3] shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Photo */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-[#F7E7EC] to-[#DCD2EE]">
        <img
          src={doctor.image}
          alt={`Portrait photograph — ${doctor.specialty}`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23F7E7EC" width="400" height="300"/%3E%3Ccircle cx="200" cy="120" r="50" fill="%23EBC4CF"/%3E%3Cellipse cx="200" cy="240" rx="80" ry="50" fill="%23EBC4CF"/%3E%3C/svg%3E';
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6 -mt-2 flex flex-col flex-1">
        {/* Specialty badge */}
        <span className="inline-block px-3 py-1 bg-[#F7E7EC] text-[#70405B] text-xs font-sans font-medium rounded-full mb-3 self-start">
          {doctor.specialty}
        </span>

        <h3 className="font-serif text-[1.15rem] text-[#442B3B] mb-1 leading-snug">
          {doctor.title}
        </h3>
        <p className="text-[#756A73] text-xs font-sans mb-1">
          {doctor.name}
        </p>
        <p className="text-[#756A73]/70 text-xs font-sans italic mb-4">
          {doctor.qualifications}
        </p>

        <p className="text-[#756A73] text-sm leading-relaxed flex-1 line-clamp-3 mb-5">
          {doctor.biography}
        </p>

        <Link
          to={`/doctors/${doctor.slug}`}
          aria-label={`View profile for ${doctor.title}, ${doctor.specialty}`}
          className="inline-flex items-center gap-2 text-[#70405B] text-sm font-sans font-medium hover:gap-3 transition-all duration-200 group/link"
        >
          View Profile
          <ArrowRight
            size={15}
            className="group-hover/link:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.article>
  );
}
