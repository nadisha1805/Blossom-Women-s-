import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-1" role="list">
        <li>
          <Link
            to="/"
            aria-label="Home"
            className="text-[#756A73] hover:text-[#70405B] transition-colors duration-200"
          >
            <Home size={14} />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight size={13} className="text-[#C9859D]" aria-hidden="true" />
              {isLast || !item.to ? (
                <span
                  className={`text-sm font-sans ${
                    isLast ? 'text-[#442B3B] font-medium' : 'text-[#756A73]'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-sm font-sans text-[#756A73] hover:text-[#70405B] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
