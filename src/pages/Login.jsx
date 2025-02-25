import { useContext } from "react"
import { Dashboard } from "../components/Dashboard/Dashboard"
import { LoginForm } from "../components/LoginForm/LoginForm"
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper"
import { UserContext } from "../context/userContext"

export const Login = () => {
  const {userToken} = useContext(UserContext);
  return (
    <>
    <SectionWrapper>
      {userToken ? (
        <Dashboard/>
      ): (
        <LoginForm/>
      )}
    </SectionWrapper>
    </>
  )
}