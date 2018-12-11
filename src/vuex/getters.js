export const currentUser = state => state.currentUser;
export const isLogin = state => state.isLogin;
export const gTicket = state => state.gTicket;
export const getPermission = (state) => (key) => {
  let keys = state.permissionKeys;
  for(const curKey of keys){
    if(curKey === key){
      return true;
      break
    }
  }
  return false
}
export const keepAlive = state => state.keepAlivePage.toString() || ' ';
