'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import the heavy 3D component with no SSR and elegant fallback
const ThreeBackground = dynamic(
  () => import('./components/ThreeBackground'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-t border-white/70" />
          </div>
          <p className="text-[10px] tracking-[3px] text-white/40 font-mono">LOADING CINEMATIC LAYER</p>
        </div>
      </div>
    ),
  }
);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Architecture of Silence",
    excerpt: "In interfaces that breathe, negative space becomes the most powerful element. How cinematic pacing translates to digital experiences.",
    category: "Cinematic Design",
    date: "JUL 12, 2026",
    readTime: "14 min",
    content: "Great digital experiences often feel like great films — not because of flashy effects, but because of what they choose to withhold. Silence in code is the deliberate absence of motion, the pause before a transition, the breathing room between elements.\n\nWhen we design interfaces with cinematic sensibility, we stop decorating and start directing attention. Every pixel earns its place. Every animation has intention and duration.\n\nThe best interfaces don't just look expensive. They feel considered. They respect the user's time and cognitive load the same way a great director respects their audience's attention.",
  },
  {
    id: 2,
    title: "Why WebGL Finally Feels Premium",
    excerpt: "The web has crossed a threshold. What was once a technical curiosity is now capable of genuine emotional depth and quiet luxury.",
    category: "WebGL & 3D",
    date: "JUL 09, 2026",
    readTime: "11 min",
    content: "For years, 3D on the web felt like a gimmick — heavy, janky, or overly flashy. That era is ending. With modern GPUs, better tooling, and a new generation of developers who grew up with real-time engines, we can now create experiences that feel genuinely premium rather than merely novel.\n\nThe difference lies in restraint. The most powerful 3D interfaces right now are often the quietest. Subtle parallax. Thoughtful lighting. Materials that respond to the environment instead of screaming for attention.\n\nThis is the beginning of a new chapter where code doesn't just build interfaces — it sculpts atmosphere.",
  },
  {
    id: 3,
    title: "Designing for Emotional Depth",
    excerpt: "Surface-level beauty fades. Interfaces that create lasting emotional resonance follow a different set of principles.",
    category: "Design Philosophy",
    date: "JUL 05, 2026",
    readTime: "9 min",
    content: "Most design systems optimize for clarity and conversion. But the interfaces that stay with people — the ones they remember years later — optimize for something deeper: emotional texture.\n\nThis comes from micro-details most teams ignore: the weight of a shadow, the timing of a spring animation, the way text feels when it settles. These details are not decoration. They are the difference between a tool and an experience.\n\nWhen code carries soul, users don't just use the product. They feel something.",
  },
  {
    id: 4,
    title: "The Invisible Architecture",
    excerpt: "The best systems are felt, not seen. How thoughtful engineering creates the perception of effortless elegance.",
    category: "Engineering",
    date: "JUN 28, 2026",
    readTime: "13 min",
    content: "Users rarely notice the architecture behind a truly great interface. They simply feel that everything works exactly as it should. This invisibility is not an accident — it is the result of obsessive attention to the right details.\n\nPerformance, accessibility, state management, and rendering pipelines must all disappear into the background so the experience can shine. The most sophisticated work often looks the simplest.\n\nElegance in code is not about showing how clever you are. It is about making the complex feel inevitable.",
  },
  {
    id: 5,
    title: "Crafting Digital Soul",
    excerpt: "Beyond pixels and performance lies something rarer: interfaces that feel alive, intentional, and deeply human.",
    category: "Craft & Soul",
    date: "JUN 22, 2026",
    readTime: "16 min",
    content: "There is a quiet movement happening in digital design. A rejection of the generic, the templated, and the soulless. In its place, a return to craft — where every decision is made with care, and the final result carries the unmistakable mark of human intention.\n\nThis is not nostalgia. It is the next evolution. The web is mature enough now that we can move past proving what is possible and start focusing on what feels true.\n\nCode is not just logic. It is a medium. And like any great medium, it can carry soul when we allow it to.",
  },
];

export default function PremiumJournal() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'visible';
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* Fixed Cinematic 3D Background */}
      <ThreeBackground />

      {/* Subtle gradient overlay for better text contrast */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />

      {/* Elegant Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 h-20">
          <div className="flex items-center gap-3">
            <div className="w-px h-3.5 bg-white/40" />
            <div>
              <div className="font-semibold tracking-[-1.5px] text-xl">gmthecodeguy</div>
              <div className="text-[9px] text-white/50 -mt-1 tracking-[2px]">JOURNAL</div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <a href="#journal" className="hover:text-white/70 transition-colors tracking-wide">THE JOURNAL</a>
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-6 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-xs tracking-[1.5px]"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6 pt-16">
        <div className="max-w-5xl text-center">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-white/20 text-xs tracking-[3px] text-white/60">
            EST. 2026 — DIGITAL CRAFT
          </div>
          
          <h1 className="text-7xl md:text-[92px] leading-[0.92] font-semibold tracking-[-6.5px] mb-6">
            Thoughtful code.<br />Cinematic interfaces.
          </h1>
          
          <p className="max-w-md mx-auto text-xl text-white/70 tracking-[-0.2px]">
            A private journal on the intersection of design, engineering, and emotional depth in digital experiences.
          </p>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group flex items-center gap-3 text-sm tracking-[2px] border-b border-white/30 pb-1 hover:border-white transition-colors"
            >
              EXPLORE THE JOURNAL
              <span className="group-hover:translate-x-0.5 transition-transform">↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* Journal Section */}
      <div id="journal" className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs tracking-[3px] text-white/50 mb-1">CHAPTER I</div>
            <h2 className="text-5xl tracking-[-2.5px] font-semibold">The Journal</h2>
          </div>
          <div className="text-right text-sm text-white/50 hidden md:block">
            5 Reflections<br />on Digital Craft
          </div>
        </div>

        {/* Premium Glassmorphism Blog Cards */}
        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.6, ease: [0.21, 0.92, 0.2, 1] }}
              whileHover={{ y: -2 }}
              onClick={() => openPost(post)}
              className="group relative cursor-pointer rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-2xl p-9 md:p-11 transition-all hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3.5 py-px text-[10px] tracking-[1.5px] border border-white/20 rounded-full text-white/70">
                      {post.category}
                    </span>
                    <span className="text-white/40 text-xs tracking-widest">{post.date}</span>
                  </div>

                  <h3 className="text-4xl md:text-[42px] leading-none tracking-[-2.2px] font-semibold mb-4 pr-4 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-lg text-white/70 max-w-3xl tracking-[-0.1px]">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex-shrink-0 flex flex-col items-end justify-between self-end md:self-center gap-2 text-right">
                  <div className="text-xs text-white/40 tracking-widest font-mono">{post.readTime}</div>
                  <div className="text-xs text-white/60 group-hover:text-white/90 flex items-center gap-1 transition-colors">
                    READ ESSAY <span className="text-lg leading-none group-hover:translate-x-0.5 transition">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elegant closing note */}
        <div className="mt-20 text-center text-white/40 text-sm tracking-wide">
          More reflections coming soon. <span className="text-white/60">This is only the beginning.</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 text-center text-xs text-white/40 tracking-widest">
        © {new Date().getFullYear()} gmthecodeguy — All rights reserved.<br />
        Crafted with intention in Islamabad.
      </footer>

      {/* Premium Modal for Reading Full Essays */}
      <AnimatePresence>
        {selectedPost && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={closePost}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.985 }}
              transition={{ ease: [0.21, 0.92, 0.2, 1], duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 md:p-14 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={closePost}
                className="absolute top-8 right-8 text-white/40 hover:text-white text-2xl leading-none transition"
              >
                ×
              </button>

              <div className="text-xs tracking-[3px] text-white/50 mb-2">{selectedPost.category} — {selectedPost.date}</div>
              
              <h2 className="text-6xl tracking-[-3px] font-semibold leading-none mb-8 pr-10">
                {selectedPost.title}
              </h2>

              <div className="prose prose-invert max-w-none text-[17px] leading-relaxed text-white/90 tracking-[-0.1px] whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <div>{selectedPost.readTime} READ</div>
                <button onClick={closePost} className="hover:text-white transition">CLOSE ESSAY</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
