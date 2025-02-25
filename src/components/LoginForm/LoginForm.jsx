import { useContext, useState } from "react";
import { loginForm } from "../../utils/Login";
import { Form } from "../Form/Form";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState();

    const {setUserData, setUserToken} = useContext(UserContext);

    const logIn=(data)=> {
        const body = new URLSearchParams();
        body.append('username', data.email);
        body.append('password', data.password);

        const fetchData = async () => {
            setIsLoading(true);

            const options = {
                method: 'POST',
                body: body,
            };

            try{
                const response = await fetch("https://api.mediehuset.net/token", options)

                if(!response.ok) {
                    throw new Error('Forkert brugernavn eller adgangskode');
                }

                const res = await response.json();

                if(res.access_token) {
                    setUserData(res);
                    setUserToken(res);
                    toast.success(`Du er nu logget ind, velkommen tilbage ${res.user?.firstname || ''}`)
                } else {
                    throw new Error('Forkert brugernavn eller email')
                }
            } catch (err) {
                toast.error(err.message || 'Der skete en fejl, prøv igen senere')
            } finally{
                setIsLoading(false)
            }
        }
        fetchData();
    }
    
  return (
    <div>
      <h3>Login</h3>
      <p>Indtast dit brugernavn og adgangskode for at logge ind</p>
      <Form formArray={loginForm} callback={logIn}>
        <button>Opret bruger</button>
      </Form>
    </div>
  );
};
