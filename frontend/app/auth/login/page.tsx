import dynamic from "next/dynamic";
import LoadingLoginPage from "@/app/auth/login/loading";
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
