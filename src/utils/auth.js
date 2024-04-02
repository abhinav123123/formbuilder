export const Auth = {
    isAuthenticated: () => {
      const token = sessionStorage.getItem("accessToken");
  
      return token?.length > 120;
    },
  };