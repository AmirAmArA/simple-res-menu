import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SideMenu from "@/components/ui/admin/SideMenu";
import SignOut from "@/components/ui/SignOut";

const AdminDashboard = async ({ children, params, searchParams }: any) => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //       redirect('/api/auth/signin?callbackUrl=/client')
  //   }
  // })

  const session = await getServerSession(options);
  // console.log("====================================");
  // console.log(searchParams);
  // console.log(session);
  // console.log("====================================");
  if (!session) {
    redirect("/api/auth/login?callbackUrl=/admin/dashboard");
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
