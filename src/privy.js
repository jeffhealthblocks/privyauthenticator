import { usePrivy, useLogin, getAccessToken, useLogout } from '@privy-io/react-auth';
import { useState } from 'react'

export function PrivyAuthDemo() {

    const [tokenValue, setTokenValue] = useState('TOKEN NOT SET');

    return (
        <p>
            <h1>Privy Auth Demo</h1>

            <p>Token: <textarea value={tokenValue}></textarea></p>
            <p>
                <LoginButton setTokenValue={setTokenValue} />
            </p>
            <p>
                <LogoutButton setTokenValue={setTokenValue} />
            </p>
        </p>
    );
}
function LoginButton(props) {
    const { login } = useLogin({
        onComplete: async (user, isNewUser, wasAlreadyAuthenticated, loginMethod, linkedAccount) => {
            console.log(user, isNewUser, wasAlreadyAuthenticated, loginMethod, linkedAccount);
            // Any logic you'd like to execute if the user is/becomes authenticated while this
            // component is mounted
            const accessToken = await getAccessToken();
            props.setTokenValue(accessToken);
        },
        onError: (error) => {
            console.log(error);
            // Any logic you'd like to execute after a user exits the login flow or there is an error
        },
    });


    const { ready, authenticated } = usePrivy();
    // Disable login when Privy is not ready or the user is already authenticated
    const disableLogin = !ready || (ready && authenticated);

    return (
        <p>
            <button disabled={disableLogin} onClick={login}>
                Log in
            </button>
        </p>

    );
}

function LogoutButton(props) {
    const { ready, authenticated } = usePrivy();

    const { logout } = useLogout({
        onSuccess: () => {
            console.log('User logged out');
            props.setTokenValue("LOGGED OUT");
            // Any logic you'd like to execute after a user successfully logs out
        },
    });

    // Disable logout when Privy is not ready or the user is not authenticated
    const disableLogout = !ready || (ready && !authenticated);

    return (
        <p>
            <button disabled={disableLogout} onClick={logout}>
                Log out
            </button>
        </p>
    );
}


