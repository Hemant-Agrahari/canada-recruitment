import React, { useState} from 'react';

interface TableOfContentsProps {
  content: Array<{
    contentTitle: string;
  }>;
  conclusion?: {
    title: string;
  };
  hasFaq?: boolean;
}

/**
 * TableOfContents Component
 *
 * Purpose:
 * - Dynamically generates a Table of Contents (TOC) based on provided content headings.
 * - Allows users to smoothly scroll to specific sections on the page.
 * - Supports optional Conclusion and FAQ sections.
 * Props:
 * @param content   Array of section objects containing contentTitle (HTML string)
 * @param conclusion Optional conclusion section title
 * @param hasFaq    Boolean flag to include FAQ section in TOC
 */


const TableOfContents: React.FC<TableOfContentsProps> = ({ content, conclusion, hasFaq }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generate slug from title for anchor links
  const generateSlug = (title: string): string => {
    if (!title) return '';
    // Strip HTML tags
    const text = title.replace(/<[^>]*>/g, '');
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Scroll to section when clicked
  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const extractText = (html: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const tocItems = [];
  if (content && Array.isArray(content)) {
    content.forEach((item) => {
      if (item?.contentTitle) {
        tocItems.push({
          title: extractText(item.contentTitle),
          slug: generateSlug(item.contentTitle),
        });
      }
    });
  }

  if (conclusion?.title) {
    tocItems.push({
      title: extractText(conclusion.title),
      slug: generateSlug(conclusion.title),
    });
  }

  if (hasFaq) {
    tocItems.push({
      title: 'Frequently Asked Questions (FAQs)',
      slug: 'faqs',
    });
  }

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="table-of-contents-wrapper">
      <div 
        className={`table-of-contents-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <h3 className="toc-title">Table of Contents</h3>
        <div className="toc-toggle-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L10 12L16 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform={isOpen ? 'rotate(180 10 10)' : ''} />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="table-of-contents-content">
          <ul className="toc-list">
            {tocItems.map((item, index) => (
              <li key={index} className="toc-item">
                <button
                  className="toc-link"
                  onClick={() => {
                    scrollToSection(item.slug);
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TableOfContents;

