const KEY = "vouchstone.session";

export function isSignedIn(): boolean {
  return sessionStorage.getItem(KEY) === "1";
}

export function signIn(): void {
  sessionStorage.setItem(KEY, "1");
}

export function signOut(): void {
  sessionStorage.removeItem(KEY);
}
