import { useContext } from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { UserContext } from "../context/userContext";
import { PageTitle } from "../components/PageTitle/PageTitle";

export const Login = () => {
  const { userToken } = useContext(UserContext);
  return (
    <>
      <SectionWrapper>
        <PageTitle pageTitle="HomeLands: Login" />
        {userToken ? <Dashboard /> : <LoginForm />}
      </SectionWrapper>
    </>
  );
};
