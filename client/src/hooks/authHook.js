import {useState, useCallback, useEffect} from "react";
const storage = "local";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [nickname, setNickname] = useState(null);
    const login = useCallback((jwtToken, userId, nickname) => {
        setToken(jwtToken);
        setId(userId);
        setNickname(nickname);
        localStorage.setItem(storage, JSON.stringify({userId:userId, token:jwtToken, nickname}))
    }, [token, id, nickname]);

    const logout = useCallback(() => {
        setToken(null);
        setId(null);
        setNickname(null);
        localStorage.removeItem(storage);
        fetch('/oauth/logout');
    })

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem(storage));
        if (data && data.token){
            login(data.token, data.userId, data.nickname)
        }
    }, [])

    return {token, id, nickname, login, logout}
}