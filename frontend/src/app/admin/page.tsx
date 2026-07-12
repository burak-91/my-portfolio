'use client'
import { useEffect, useState, useCallback } from 'react';
import api from '@/utils/axios';
import type { Project } from '@/sections/Projects';

interface ProjectForm {
  company: string;
  year: string;
  title: string;
  link: string;
  image: string;
  results: string; // her satır bir madde
}

const emptyForm: ProjectForm = {
  company: '',
  year: '',
  title: '',
  link: '',
  image: '',
  results: '',
};

const toPayload = (form: ProjectForm) => ({
  company: form.company.trim(),
  year: form.year.trim(),
  title: form.title.trim(),
  link: form.link.trim(),
  image: form.image.trim(),
  results: form.results
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((title) => ({ title })),
});

const inputClass =
  'w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-300/50 transition-colors';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const authHeaders = useCallback(
    () => ({ headers: { 'X-Admin-Key': adminKey } }),
    [adminKey]
  );

  const loadProjects = useCallback(async () => {
    try {
      const { data } = await api.get<Project[]>('/projects');
      setProjects(data);
    } catch {
      setMessage({ type: 'err', text: 'Projeler yüklenemedi — backend çalışıyor mu?' });
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('adminKey');
    if (stored) {
      setAdminKey(stored);
      setKeySaved(true);
    }
    loadProjects();
  }, [loadProjects]);

  const saveKey = () => {
    sessionStorage.setItem('adminKey', adminKey);
    setKeySaved(true);
    setMessage({ type: 'ok', text: 'Anahtar kaydedildi (bu sekmede geçerli).' });
  };

  const handleError = (err: unknown, fallback: string) => {
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status === 401) {
      setMessage({ type: 'err', text: 'Geçersiz admin anahtarı (401).' });
    } else {
      setMessage({ type: 'err', text: fallback });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId === null) {
        await api.post('/projects', toPayload(form), authHeaders());
        setMessage({ type: 'ok', text: 'Proje eklendi.' });
      } else {
        await api.put(`/projects/${editingId}`, toPayload(form), authHeaders());
        setMessage({ type: 'ok', text: 'Proje güncellendi.' });
      }
      setForm(emptyForm);
      setEditingId(null);
      loadProjects();
    } catch (err) {
      handleError(err, 'Kaydetme başarısız oldu.');
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      company: project.company ?? '',
      year: project.year ?? '',
      title: project.title ?? '',
      link: project.link ?? '',
      image: project.image ?? '',
      results: (project.results ?? []).map((r) => r.title).join('\n'),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (project: Project) => {
    if (!window.confirm(`"${project.title}" silinsin mi?`)) return;
    try {
      await api.delete(`/projects/${project.id}`, authHeaders());
      setMessage({ type: 'ok', text: 'Proje silindi.' });
      if (editingId === project.id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      loadProjects();
    } catch (err) {
      handleError(err, 'Silme başarısız oldu.');
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-3xl">
        <h1 className="font-serif text-3xl bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
          Portfolio Admin
        </h1>
        <p className="text-white/50 mt-2 text-sm">
          Projeleri buradan ekleyip düzenleyebilirsin. Yazma işlemleri admin anahtarı ister.
        </p>

        {/* Admin anahtarı */}
        <div className="mt-8 flex gap-3">
          <input
            type="password"
            placeholder="Admin anahtarı"
            value={adminKey}
            onChange={(e) => {
              setAdminKey(e.target.value);
              setKeySaved(false);
            }}
            className={inputClass}
          />
          <button
            onClick={saveKey}
            className="bg-white text-gray-900 px-6 rounded-xl font-semibold whitespace-nowrap disabled:opacity-50"
            disabled={!adminKey || keySaved}
          >
            {keySaved ? 'Kayıtlı ✓' : 'Kaydet'}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              message.type === 'ok' ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Proje formu */}
        <form
          onSubmit={submit}
          className="mt-8 space-y-4 border border-white/10 rounded-2xl p-6 bg-gray-800/20"
        >
          <h2 className="font-semibold text-lg">
            {editingId === null ? 'Yeni Proje' : `Projeyi Düzenle (#${editingId})`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Etiket (örn. Personal Project, Demo Project)"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className={inputClass}
              required
            />
            <input
              placeholder="Yıl (örn. 2026)"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              className={inputClass}
              required
            />
          </div>
          <input
            placeholder="Başlık"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className={inputClass}
            required
          />
          <input
            placeholder="Link (https://...)"
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            className={inputClass}
            required
          />
          <input
            placeholder="Görsel yolu (örn. /images/projects/site.png)"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            className={inputClass}
            required
          />
          <textarea
            placeholder={'Öne çıkanlar — her satıra bir madde\nÖrn: Next.js 14 + TypeScript frontend'}
            value={form.results}
            onChange={(e) => setForm((f) => ({ ...f, results: e.target.value }))}
            className={`${inputClass} min-h-[100px]`}
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 px-6 py-3 rounded-xl font-semibold"
            >
              {editingId === null ? 'Ekle' : 'Güncelle'}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="border border-white/15 px-6 py-3 rounded-xl"
              >
                Vazgeç
              </button>
            )}
          </div>
        </form>

        {/* Proje listesi */}
        <div className="mt-10 space-y-4">
          <h2 className="font-semibold text-lg">Mevcut Projeler ({projects.length})</h2>
          {projects.length === 0 && (
            <p className="text-white/40 text-sm">Henüz proje yok.</p>
          )}
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4 bg-gray-800/20"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">
                  {project.company} &bull; {project.year}
                </div>
                <div className="font-semibold mt-1">{project.title}</div>
                <ul className="text-sm text-white/50 mt-2 list-disc list-inside">
                  {(project.results ?? []).map((r) => (
                    <li key={r.title}>{r.title}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => startEdit(project)}
                  className="border border-white/15 px-4 py-2 rounded-xl text-sm hover:bg-white/5"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => remove(project)}
                  className="border border-red-400/30 text-red-400 px-4 py-2 rounded-xl text-sm hover:bg-red-400/10"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
