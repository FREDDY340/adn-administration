import React, { useState } from 'react';
import { Star } from './IconHelper';

export const TestimonialsSection: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);

  const testimonials = [
    {
      id: '1',
      text: "ADN Conseils m'a accompagné dans ma demande de titre de séjour. Professionnels, disponibles et à l'écoute.",
      author: '- A. K.',
      rating: 5
    },
    {
      id: '2',
      text: "Le dossier de naturalisation a été préparé avec sérieux. Je recommande vivement ADN Conseils.",
      author: '- M. D.',
      rating: 5
    },
    {
      id: '3',
      text: "Service rapide et efficace pour ma carte grise. Tout s'est très bien déroulé.",
      author: '- S. R.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials-section" className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title with red underline */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
            Ils nous font confiance
          </h2>
          <div className="w-9 h-[2.5px] bg-[#d32f2f] mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Red Quote symbol on left & Gold stars on right */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[#d32f2f] font-serif text-4xl leading-none select-none">
                    “
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {item.text}
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 mt-2">
                <span className="text-xs font-bold text-[#0c2340]">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots (1 red active, 3 grey) */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveDot(dot)}
              aria-label={`Témoignage page ${dot + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeDot === dot
                  ? 'w-5 bg-[#d32f2f]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
