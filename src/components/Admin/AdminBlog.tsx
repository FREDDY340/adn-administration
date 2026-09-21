import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPost } from '../../types';
import { BookOpen, Plus, Trash2, Edit2, Check, X, Clock, Tag } from '../IconHelper';

export const AdminBlog: React.FC = () => {
  const { blogPosts, saveBlogPost, deleteBlogPost } = useData();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 min de lecture');
  const [tagsStr, setTagsStr] = useState('');
  const [published, setPublished] = useState(true);

  const handleStartEdit = (p: BlogPost) => {
    setEditingPost(p);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setExcerpt(p.excerpt);
    setContent(p.content);
    setReadTime(p.readTime);
    setTagsStr(p.tags.join(', '));
    setPublished(p.published);
  };

  const handleStartCreate = () => {
    const newP: BlogPost = {
      id: `post-${Date.now()}`,
      slug: 'nouvel-article',
      title: 'Nouvel article / Guide pratique',
      category: 'Droit des Étrangers',
      excerpt: 'Bref résumé de l’actualité ou du conseil...',
      content: 'Contenu complet de votre analyse juridique ou guide d’accompagnement...',
      author: 'Équipe Juridique ADN Conseils',
      readTime: '4 min de lecture',
      tags: ['Conseil', 'Préfecture', 'Formalités'],
      publishedAt: new Date().toISOString(),
      published: true
    };
    handleStartEdit(newP);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !editingPost) return;

    const tags = tagsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const updated: BlogPost = {
      ...editingPost,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: category.trim() || 'Général',
      excerpt: excerpt.trim(),
      content: content.trim(),
      readTime: readTime.trim(),
      tags,
      published
    };

    saveBlogPost(updated);
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Articles & Guides Pratiques</h3>
          <p className="text-xs text-slate-500">
            Publiez des conseils juridiques, décryptez les réformes et informez vos clients.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Rédiger un article</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-[10px]">
                  {post.category}
                </span>
                <span className={post.published ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                  {post.published ? 'Publié' : 'Brouillon'}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-[11px] text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString('fr-FR')}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(post)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteBlogPost(post.id)}
                  className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-white">Éditeur d’Article / Guide</h3>
              <button
                onClick={() => setEditingPost(null)}
                className="text-slate-400 hover:text-white p-1.5"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Titre de l’article * :</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Catégorie :</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Temps de lecture estimé :</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Tags (séparés par des virgules) :</label>
                  <input
                    type="text"
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    placeholder="ANEF, Titre de séjour, Préfecture"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Chapeau / Résumé (Excerpt) :</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Corps de l’article :</label>
                <textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="post-published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <label htmlFor="post-published" className="font-bold text-slate-900 cursor-pointer">
                  Article public et visible sur le site
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md"
                >
                  Enregistrer l’article
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
