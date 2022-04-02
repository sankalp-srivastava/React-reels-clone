import React,{useState,useEffect} from 'react'
import { auth } from '../Firebase';
export const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [user,setuser] = useState();
    const[loading,setLoading] = useState(true);

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        return auth.signOut();
    }

    function forgotPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
      const  unsub = auth.onAuthStateChanged((user)=>{
          setuser(user);
          setLoading(false);
      })
      return ()=>{
          unsub();
      }
    }, [])
    
    const store={
        user,
        signup,
        login,
        logout,
        forgotPassword
    }
    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}