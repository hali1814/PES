import { login } from "./UserService";

const { children } = props;
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState({});

const onLogin = async (email, password) => {
    try {
        const res = await login(email, password);
        if (res.error == false) {
            const token = res.data.token;

            await AsyncStorage.setItem('token', token);
            setUser(user);
            setIsLoggedIn(true);
            return true;
        } else {
            setIsLoggedIn(false);
            return false;
        }
    } catch (e) {
        console.log('onLogin error', e);
    }
    return false;
}

return (
    <UserContext.Provider
     value={{isLoggedIn, onLogin, onRegister, user}}
    >
        {children}
   </UserContext.Provider>
)