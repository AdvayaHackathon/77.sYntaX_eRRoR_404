'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  title: string;
  content: string;
  date: string;
  image?: string; // Optional image field
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    let imageUrl = '';
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const newPost: BlogPost = {
      title,
      content,
      date: new Date().toLocaleDateString(),
      image: imageUrl,
    };

    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
    setImageFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-culture-900">Community Blogs</h1>

        <section className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-culture-800">Share Your Cultural Experience</h2>
            
            <input
              type="text"
              placeholder="Title of your blog"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-md"
              required
            />

            <textarea
              placeholder="Write about the place, event, or tradition you experienced..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full mb-4 px-4 py-2 border rounded-md"
              required
            />

<div className="mb-4">
  <label
    htmlFor="image-upload"
    className="inline-block cursor-pointer bg-culture-700 hover:bg-culture-800 text-white px-6 py-2 rounded-md transition font-medium shadow-sm hover:shadow-md"
  >
    📷 Upload Image
  </label>
  <input
    id="image-upload"
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
      }
    }}
    className="hidden"
  />
</div>


            <button
              type="submit"
              className="bg-culture-700 hover:bg-culture-800 text-white px-6 py-2 rounded-md transition"
            >
              Post Blog
            </button>
          </form>
        </section>

        <section className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Blog visual"
                    className="w-full h-auto rounded-md mb-4"
                  />
                )}
                <h3 className="text-2xl font-semibold text-festival-700 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No blog posts yet. Be the first to share your experience!</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
