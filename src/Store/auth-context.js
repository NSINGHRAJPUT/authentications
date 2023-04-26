import React,{ useState } from "react"

const AuthContext = React.createContext({
    token:'',
    isLogged: false,
    logIn:(token)=>{},
    logOut:()=>{}
})

export const AuthContextProvider = (props) =>{
    const preToken = localStorage.getItem('token')
    const [token, setToken] = useState(preToken)
    const isLogged = !!token;

    const loggedOut = () =>{
        localStorage.removeItem('token')
        setToken(null)
    }

    const loggedIn = (token) =>{
        setToken(token)
        localStorage.setItem('token',token)
        
        setTimeout(loggedOut,50000)
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