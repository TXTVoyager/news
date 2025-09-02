class SessionFunction {
  setAffiliate(ref) {
    localStorage.setItem("ref", ref);
  }
  getAffiliate() {
    return localStorage.getItem("ref");
  }
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  removeSessions() {
    localStorage.clear();
    window.location.href = "/";
  }
}
export const {
  setAffiliate,
  getAffiliate,
  setToken,
  getToken,
  removeSessions,
} = new SessionFunction();
