import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SideMenu from "@/components/ui/admin/SideMenu";
import SignOut from "@/components/ui/SignOut";

const AdminDashboard = async ({ children }: any) => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/auth/login?callbackUrl=/admin/dashboard");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SignOut />

      {/* Admin-specific content */}
      <SideMenu>{children}</SideMenu>
    </div>
  );
};

export default AdminDashboard;
