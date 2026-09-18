"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  FolderTree,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import type { HubNode, NodeType } from "@/lib/hub";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const emptyForm = {
  id: "",
  parent_id: "",
  type: "folder" as NodeType,
  title: "",
  title_ar: "",
  department: "",
  batch_year: "",
  year_number: "",
  semester_number: "",
  url: "",
  icon: "📁",
  sort_order: "0",
  active: true,
};

type FormState = typeof emptyForm;
type Stat = {
  node_id: string;
  clicks: number;
  last_clicked: string | null;
  node: HubNode | null;
};

const typeLabels: Record<NodeType, string> = {
  department: "قسم",
  archive: "لائحة / أرشيف",
  folder: "فولدر",
  batch: "دفعة",
  year: "سنة دراسية",
  term: "ترم",
  link: "رابط",
  button: "زر",
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [nodes, setNodes] = useState<HubNode[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [tab, setTab] = useState<"content" | "stats">("content");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem("mec_admin_token") || "");
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setLoginError("Supabase غير مُعدّ بعد. أضف متغيرات البيئة الخاصة به في Vercel.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error_description || data.msg || "بيانات الدخول غير صحيحة");
      sessionStorage.setItem("mec_admin_token", data.access_token);
      setToken(data.access_token);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "فشل تسجيل الدخول");
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("mec_admin_token");
    setToken("");
    setNodes([]);
    setStats([]);
  }

  async function loadNodes(currentToken = token) {
    if (!currentToken) return;
    const response = await fetch("/api/admin/nodes", {
      headers: { Authorization: `Bearer ${currentToken}` },
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "تعذر تحميل المحتوى");
    setNodes(data);
  }

  async function loadStats(currentToken = token) {
    if (!currentToken) return;
    const response = await fetch("/api/admin/stats", {
      headers: { Authorization: `Bearer ${currentToken}` },
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "تعذر تحميل الإحصائيات");
    setStats(data);
  }

  useEffect(() => {
    if (!token) return;
    loadNodes().catch((error) => setMessage(error.message));
    loadStats().catch((error) => setMessage(error.message));
  }, [token]);

  const parents = useMemo(
    () => nodes.filter((node) => !["link", "button"].includes(node.type) && node.active),
    [nodes],
  );

  const showBatch = ["batch", "archive", "folder", "year", "term"].includes(form.type);
  const showYear = ["year", "term"].includes(form.type);
  const showSemester = form.type === "term";
  const showUrl = ["term", "link", "button"].includes(form.type);

  function changeType(type: NodeType) {
    setForm((current) => ({
      ...current,
      type,
      batch_year: ["batch", "archive", "folder", "year", "term"].includes(type) ? current.batch_year : "",
      year_number: ["year", "term"].includes(type) ? current.year_number : "",
      semester_number: type === "term" ? current.semester_number : "",
      url: ["term", "link", "button"].includes(type) ? current.url : "",
      icon: type === "year" ? "📚" : type === "term" ? "🔗" : type === "link" || type === "button" ? "🔗" : current.icon || "📁",
    }));
  }

  function editNode(node: HubNode) {
    setForm({
      id: node.id,
      parent_id: node.parent_id || "",
      type: node.type,
      title: node.title,
      title_ar: node.title_ar || "",
      department: node.department || "",
      batch_year: node.batch_year?.toString() || "",
      year_number: node.year_number?.toString() || "",
      semester_number: node.semester_number?.toString() || "",
      url: node.url || "",
      icon: node.icon || "📁",
      sort_order: node.sort_order.toString(),
      active: node.active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm({ ...emptyForm });
  }

  async function saveNode(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const method = form.id ? "PATCH" : "POST";
      const response = await fetch("/api/admin/nodes", {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, id: form.id || undefined }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "تعذر الحفظ");
      setMessage(form.id ? "تم تعديل العنصر بنجاح" : "تمت إضافة العنصر بنجاح");
      resetForm();
      await loadNodes();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "حدث خطأ");
    } finally {
      setBusy(false);
    }
  }

  async function deleteNode(id: string) {
    if (!confirm("حذف هذا العنصر؟ لو له عناصر بداخله سيتم حذفها أيضًا.")) return;
    const response = await fetch("/api/admin/nodes", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "تعذر الحذف");
      return;
    }
    setMessage("تم الحذف");
    if (form.id === id) resetForm();
    await loadNodes();
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-paper px-5 py-10" dir="rtl">
        <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-7 shadow-xl">
          <div className="mb-7 text-center">
            <div className="mb-3 text-4xl">🔐</div>
            <h1 className="font-display text-2xl font-extrabold">MEC Hub Admin</h1>
            <p className="mt-2 text-sm text-muted">لوحة إدارة المحتوى الخاصة بك</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="البريد الإلكتروني" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-accent" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="كلمة المرور" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-accent" />
            {loginError && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{loginError}</p>}
            <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 font-bold text-white disabled:opacity-50">
              <LogIn className="h-4 w-4" />{busy ? "جاري الدخول..." : "دخول لوحة الإدارة"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper px-4 py-5 sm:px-6" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm">
          <div>
            <h1 className="font-display text-xl font-extrabold">MEC Hub Admin</h1>
            <p className="text-xs text-muted">إدارة الروابط والفولدرات والدفعات والأزرار من الموبايل</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setTab("content"); void loadNodes(); }} className={`rounded-xl px-3 py-2 text-sm ${tab === "content" ? "bg-ink text-white" : "border border-line"}`}><FolderTree className="ml-1 inline h-4 w-4" />المحتوى</button>
            <button onClick={() => { setTab("stats"); void loadStats(); }} className={`rounded-xl px-3 py-2 text-sm ${tab === "stats" ? "bg-ink text-white" : "border border-line"}`}><BarChart3 className="ml-1 inline h-4 w-4" />الإحصائيات</button>
            <button onClick={logout} className="rounded-xl border border-line px-3 py-2 text-sm"><LogOut className="ml-1 inline h-4 w-4" />خروج</button>
          </div>
        </header>

        {message && <div className="mb-4 rounded-xl border border-accent/30 bg-orange-50 p-3 text-sm text-ink">{message}</div>}

        {tab === "content" ? (
          <div className="grid gap-5 lg:grid-cols-[390px_1fr]">
            <form onSubmit={saveNode} className="h-fit space-y-3 rounded-2xl border border-line bg-white p-5 shadow-sm lg:sticky lg:top-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold">{form.id ? "تعديل عنصر" : "إضافة عنصر"}</h2>
                {form.id ? <button type="button" onClick={resetForm} className="text-xs text-muted">إلغاء التعديل</button> : null}
              </div>

              <label className="block text-xs font-semibold text-muted">نوع العنصر</label>
              <select value={form.type} onChange={(e) => changeType(e.target.value as NodeType)} className="w-full rounded-xl border border-line px-3 py-3">
                {Object.entries(typeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>

              <input value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value, title: e.target.value || form.title })} placeholder="العنوان الظاهر بالعربي" className="w-full rounded-xl border border-line px-3 py-3" required />
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="عنوان داخلي / إنجليزي (اختياري)" className="w-full rounded-xl border border-line px-3 py-3" />

              <label className="block text-xs font-semibold text-muted">المكان الذي سيظهر بداخله</label>
              <select value={form.parent_id} onChange={(e) => setForm({ ...form, parent_id: e.target.value })} className="w-full rounded-xl border border-line px-3 py-3">
                <option value="">بدون أب (المستوى الرئيسي)</option>
                {parents.filter((p) => p.id !== form.id).map((p) => <option key={p.id} value={p.id}>{p.title_ar || p.title}{p.batch_year ? ` — ${p.batch_year}` : ""}</option>)}
              </select>

              {showBatch && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted">الدفعة — مثل 2025</label>
                  <input value={form.batch_year} onChange={(e) => setForm({ ...form, batch_year: e.target.value })} placeholder="2025" inputMode="numeric" className="w-full rounded-xl border border-line px-3 py-3" />
                </div>
              )}

              {showYear && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted">السنة الدراسية — من 1 إلى 4 فقط</label>
                  <select value={form.year_number} onChange={(e) => setForm({ ...form, year_number: e.target.value })} className="w-full rounded-xl border border-line px-3 py-3">
                    <option value="">اختيار السنة</option>
                    <option value="1">الفرقة الأولى</option>
                    <option value="2">الفرقة الثانية</option>
                    <option value="3">الفرقة الثالثة</option>
                    <option value="4">الفرقة الرابعة</option>
                  </select>
                </div>
              )}

              {showSemester && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted">رقم الترم</label>
                  <input value={form.semester_number} onChange={(e) => setForm({ ...form, semester_number: e.target.value })} placeholder="1 أو 2 أو 3..." inputMode="numeric" className="w-full rounded-xl border border-line px-3 py-3" />
                </div>
              )}

              {showUrl && (
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="رابط Google Drive / الرابط" type="url" className="w-full rounded-xl border border-line px-3 py-3" required />
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted">الأيقونة</label>
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="📁" className="w-full rounded-xl border border-line px-3 py-3" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted">الترتيب</label>
                  <input value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} inputMode="numeric" className="w-full rounded-xl border border-line px-3 py-3" />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> ظاهر للطلاب</label>
              <p className="rounded-xl bg-paper-2 p-3 text-xs leading-6 text-muted">
                💡 لو أضفت <b>فولدر</b> أو <b>لائحة قديمة</b> اترك السنة والترم فارغين. ولو أضفت <b>ترم ثالث</b> اختَر نوع «ترم» ورقم 3؛ النظام يسمح بأي رقم ترم ≥ 1.
              </p>
              <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-bold text-white disabled:opacity-50">
                {form.id ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{form.id ? "حفظ التعديلات" : "إضافة العنصر"}
              </button>
            </form>

            <section className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between"><h2 className="font-display font-bold">كل المحتوى</h2><span className="text-xs text-muted">{nodes.length} عنصر</span></div>
              <div className="space-y-2">
                {nodes.map((node) => (
                  <div key={node.id} className={`rounded-xl border p-3 ${node.active ? "border-line" : "border-dashed border-gray-300 opacity-60"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold">{node.icon} {node.title_ar || node.title}</div>
                        <div className="mt-1 text-xs text-muted">{typeLabels[node.type]} {node.department ? `• ${node.department}` : ""} {node.batch_year ? `• دفعة ${node.batch_year}` : ""} {node.year_number ? `• سنة ${node.year_number}` : ""} {node.semester_number ? `• ترم ${node.semester_number}` : ""}</div>
                        {node.url && <div className="mt-1 truncate text-[11px] text-accent">{node.url}</div>}
                        {!node.active && <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted"><EyeOff className="h-3 w-3" /> مخفي</div>}
                      </div>
                      <div className="flex shrink-0 gap-1">
                        {node.url && <a href={node.url} target="_blank" rel="noreferrer" className="rounded-lg border border-line p-2" title="فتح الرابط"><ExternalLink className="h-4 w-4" /></a>}
                        <button onClick={() => editNode(node)} className="rounded-lg border border-line p-2" title="تعديل"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => deleteNode(node.id)} className="rounded-lg border border-red-200 p-2 text-red-600" title="حذف"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <section className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h2 className="mb-5 font-display text-lg font-bold">📊 أكثر الروابط فتحًا</h2>
            <div className="space-y-3">
              {stats.length ? stats.map((row) => (
                <div key={row.node_id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4">
                  <div>
                    <div className="font-semibold">{row.node?.title_ar || row.node?.title || "رابط"}</div>
                    <div className="mt-1 text-xs text-muted">{row.node?.department === "production" ? "إنتاج" : row.node?.department === "power" ? "قوى" : ""}{row.node?.batch_year ? ` • دفعة ${row.node.batch_year}` : ""}{row.node?.year_number ? ` • الفرقة ${row.node.year_number}` : ""}{row.node?.semester_number ? ` • الترم ${row.node.semester_number}` : ""}</div>
                    {row.last_clicked && <div className="mt-1 text-[11px] text-muted">آخر فتح: {new Date(row.last_clicked).toLocaleString("ar-EG")}</div>}
                  </div>
                  <div className="text-left"><div className="text-2xl font-extrabold text-accent">{row.clicks}</div><div className="text-[11px] text-muted">فتحة</div></div>
                </div>
              )) : <p className="text-center text-muted">لا توجد ضغطات مسجلة بعد.</p>}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
