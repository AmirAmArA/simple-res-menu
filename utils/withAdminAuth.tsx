// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, ComponentType } from "react";
// import { useAuth } from "../context/AuthContext";
// import { ExtendedUser } from "../types/User";

// const withAdminAuth = (WrappedComponent: ComponentType) => {
//   const WithAdminAuth = (props: any) => {
//     const { user, loading } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//       if (!loading && !user) {
//         router.push("/");
//       }
//     }, [user, loading, router]);

//     if (loading) return <p>Loading...</p>;

//     return user ? <WrappedComponent {...props} /> : null;
//   };

//   WithAdminAuth.displayName = `WithAdminAuth(${
//     WrappedComponent.displayName || WrappedComponent.name || "Component"
//   })`;

//   return WithAdminAuth;
// };

// export default withAdminAuth;
