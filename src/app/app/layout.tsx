import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { MobileNav } from "@/components/app/mobile-nav";
import { requireUser } from "@/server/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const initials =
    (user.name ?? user.email)
      .split(/[\s@.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar plan={user.plan} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar initials={initials} name={user.name ?? user.email} email={user.email} />
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
