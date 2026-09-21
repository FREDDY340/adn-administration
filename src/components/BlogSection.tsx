import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BlogPost } from '../types';
import { Clock, ChevronRight, X, Tag } from './IconHelper';

export const BlogSection: React.FC = () => {
  const { blogPosts } = useData();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const publishedPosts = blogPosts.filter(p => p.published);
  const categories = ['all', ...Array.from(new Set(publishedPosts.map(p => p.category)))];

  const filteredPosts = publishedPosts.filter(
    p => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <section id="blog-section" className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with red underline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
            Actualités & Guides Pratiques
          </h2>
          <div className="w-9 h-[2.5px] bg-[#d32f2f] mx-auto mt-2.5 rounded-full"></div>
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            Retrouvez nos analyses détaillées sur l’actualité administrative, les pièces justificatives et les procédures officielles.
          </p>
        </div>

        {/* Category filter */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0c2340] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tous les articles' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-slate-100 text-[#0c2340] font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                    {post.category}
                  </span>
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0c2340] leading-snug group-hover:text-blue-900 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-bold text-[#1e40af] hover:text-blue-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  <span>Lire l’article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-[#0c2340] text-white p-5 sm:p-6 flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-2">
                <span className="bg-red-500/20 text-red-300 text-xs font-bold px-2.5 py-0.5 rounded border border-red-400/30 uppercase">
                  {selectedPost.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>Par {selectedPost.author}</span>
                  <span>•</span>
                  <span>{new Date(selectedPost.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                <strong>En résumé :</strong> {selectedPost.excerpt}
              </div>

              <div className="prose prose-slate max-w-none space-y-4 whitespace-pre-line text-slate-700">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-slate-400">ADN Conseils • Le Kremlin-Bicêtre</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-[#0c2340] hover:bg-slate-800 text-white font-bold text-xs"
              >
                Fermer le guide
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
