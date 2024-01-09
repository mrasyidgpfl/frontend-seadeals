const isJWTExpired = (token:any) => (token.exp * 1000 < Date.now());

export default isJWTExpired;
