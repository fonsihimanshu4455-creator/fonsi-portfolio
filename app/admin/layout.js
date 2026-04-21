export const metadata = {
  title: "Admin · FONSI",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-[color:var(--color-bg)]">{children}</div>;
}
