import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SearchProvider } from "@/hooks/useSearch";
import LoginPage from "@/pages/LoginPage";
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const PostItemPage = lazy(() => import("@/pages/PostItemPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ItemDetailPage = lazy(() => import("@/pages/ItemDetailPage"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));

const PageLoader = () => (
  <div className="flex items-center justify-center h-48">
    <LoadingSpinner size="lg" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 2 },
  },
});

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
    </Layout>
  ),
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <CategoriesPage />
      </Suspense>
    </Layout>
  ),
});

const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <PostItemPage />
      </Suspense>
    </Layout>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ProfilePage />
      </Suspense>
    </Layout>
  ),
});

const itemDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/item/$id",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <ItemDetailPage />
      </Suspense>
    </Layout>
  ),
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <MessagesPage />
      </Suspense>
    </Layout>
  ),
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <Navigate to="/" />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  categoriesRoute,
  postRoute,
  profileRoute,
  itemDetailRoute,
  messagesRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
