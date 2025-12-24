import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Absolutely love my ZIZI piece. It's the kind of detail that makes the whole room feel special.",
    author: "Emily Harper",
    image: "/collector-dior-eloise.jpeg"
  },
  {
    quote: "We weren't expecting something this unique. It's become a conversation starter.",
    author: "The Marshalls",
    image: "/collector-fendi-vittoria.jpeg"
  },
  {
    quote: "Clean, bold, and beautifully made. Feels like something from a gallery.",
    author: "Daniel Reid",
    image: "/collector-lv-aurele.jpeg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="h-full w-full bg-cream relative overflow-hidden flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-20 md:pt-24 pb-8 flex flex-col min-h-0">
        <h2 className="text-sm font-sans font-bold tracking-[0.3em] uppercase text-gray-400 text-center mb-8 md:mb-12 flex-shrink-0">
          Collector Notes
        </h2>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center min-h-0">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-full justify-center group"
            >
              {/* Supporting image - increased height and centered crop */}
              <div className="mb-6 overflow-hidden rounded-sm flex-shrink-0">
                <img
                  src={item.image}
                  alt="ZIZI sculpture in home interior"
                  className="w-full h-48 md:h-56 object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="mb-4 md:mb-6 overflow-hidden">
                <span className="text-4xl md:text-5xl text-gray-200 font-serif leading-none block">"</span>
                <p className="text-lg md:text-xl text-gray-800 font-serif leading-tight -mt-2 group-hover:text-black transition-colors line-clamp-4">
                  {item.quote}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-auto flex-shrink-0">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;