"use client";
import { useState } from 'react';

export default function ProjectCreateForm() {
  const [form, setForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    overview: '',
    applications: '',
    usp: '',
    technology: '',
    sustainability: '',
    researchTopics: '',
    date: '',
    grants: '',
    universities: '',
    staff: '',
    partners: '',
    budget: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', form);
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      console.log('Sending POST request to /api/projects');
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
      console.log('Response status:', res.status);
      if (!res.ok) {
        const errorData = await res.text();
        console.error('API Error:', errorData);
        throw new Error(`Failed to add project: ${errorData}`);
      }
      const result = await res.json();
      console.log('Project created successfully:', result);
      setSuccess(true);
      setForm({
        slug: '', title: '', subtitle: '', description: '', overview: '', applications: '', usp: '', technology: '', sustainability: '', researchTopics: '', date: '', grants: '', universities: '', staff: '', partners: '', budget: '',
      });
      // Projeler sayfasına yönlendir
      setTimeout(() => {
        window.location.href = '/projects';
      }, 2000);
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Yeni Proje Ekle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="slug" value={form.slug} onChange={handleChange} required placeholder="slug (benzersiz)" className="border p-2 rounded" />
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Proje Adı" className="border p-2 rounded" />
        <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Alt Başlık" className="border p-2 rounded" />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Tarih" className="border p-2 rounded" />
        <input name="grants" value={form.grants} onChange={handleChange} placeholder="Grants & Funds" className="border p-2 rounded" />
        <input name="universities" value={form.universities} onChange={handleChange} placeholder="Üniversiteler" className="border p-2 rounded" />
        <input name="staff" value={form.staff} onChange={handleChange} placeholder="Akademik Kadro" className="border p-2 rounded" />
        <input name="partners" value={form.partners} onChange={handleChange} placeholder="Partnerler" className="border p-2 rounded" />
        <input name="budget" value={form.budget} onChange={handleChange} placeholder="Bütçe" className="border p-2 rounded" />
        <input name="researchTopics" value={form.researchTopics} onChange={handleChange} placeholder="Araştırma Konuları" className="border p-2 rounded" />
      </div>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Kısa Açıklama" className="border p-2 rounded w-full mt-4" />
      <textarea name="overview" value={form.overview} onChange={handleChange} placeholder="Overview" className="border p-2 rounded w-full mt-2" />
      <textarea name="applications" value={form.applications} onChange={handleChange} placeholder="Applications" className="border p-2 rounded w-full mt-2" />
      <textarea name="usp" value={form.usp} onChange={handleChange} placeholder="Unique Selling Points (virgülle ayırın)" className="border p-2 rounded w-full mt-2" />
      <textarea name="technology" value={form.technology} onChange={handleChange} placeholder="Technology" className="border p-2 rounded w-full mt-2" />
      <textarea name="sustainability" value={form.sustainability} onChange={handleChange} placeholder="Sustainability Focus" className="border p-2 rounded w-full mt-2" />
      <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded font-semibold" disabled={loading}>{loading ? 'Ekleniyor...' : 'Ekle'}</button>
      {success && <div className="text-green-600 mt-2">Proje başarıyla eklendi!</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
}
