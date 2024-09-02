import dynamic from "next/dynamic";
import LoadingLoginPage from "@/app/auth/login/loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Issue Tracker - Login",
  description: "Login to your account",
};
const LoginForm = dynamic(() => import("@/app/auth/_components/LoginForm"), {
  ssr: false,
  loading: () => <LoadingLoginPage />,
});
const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
