const useAuth = () => {
    const logout = () => {
        localStorage.removeItem("accessToken");
        location.replace("/");
    };

    return {
        logout,
    };
};

export default useAuth;
