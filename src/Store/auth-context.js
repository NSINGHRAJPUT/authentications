import React,{ useState } from "react"

const AuthContext = React.createContext({
    token:'',
    isLogged: false,
    logIn:(token)=>{},
    logOut:()=>{}
})

export const AuthContextProvider = (props) =>{
    const [token, setToken] = useState(null)
    const isLogged = !!token;

    const loggedIn = (token) =>{
        setToken(token)
        localStorage.setItem('token',token)
    }

    const loggedOut = () =>{
        localStorage.removeItem('token')
        setToken(null)
    }

    const contextValue = {
        token: token,
        isLogged:isLogged,
        logIn: loggedIn,
        logOut:loggedOut
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;