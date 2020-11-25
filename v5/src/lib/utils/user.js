import Cookie from './cookie';

/**
 * User相关方法
 * @namespace User
 * @name User
 * @static
 */
const User = {};
User.get = function () {
  /**
   * 判断当前用户是否登录
   * @name User.isLogin
   * @property isLogin
   *
   * @return {Boolean} 用户登录状态
   */
  this.isLogin = Cookie.get('UniqueKey') !== null;
  /**
   * 当前登录用户ID
   * @name User.user_id
   * @property user_id
   *
   * @return {Boolean} 当前登录用户ID
   */
  this.user_id = Cookie.get('UniqueKey');
  this.userId = Cookie.get('UniqueKey');
  /**
   * 用户是否登录过猎聘
   * @name User.is_lp_user
   * @property is_lp_user
   *
   * @return {Boolean} 用户是否登录过猎聘
   */
  this.is_lp_user = Cookie.get('is_lp_user');
  this.isLPUser = Cookie.get('is_lp_user');
  /**
   * 当前登录用户姓名
   * @name User.user_name
   * @property user_name
   *
   * @return {Boolean} 当前登录用户姓名
   */
  this.user_name = Cookie.get('user_name');
  this.userName = Cookie.get('user_name');
  /**
   * 当前登录用户类型
   * @name User.user_kind
   * @property user_kind
   *
   * @return {Boolean} 当前登录用户类型
   */
  this.user_kind = Cookie.get('user_kind');
  this.userKind = Cookie.get('user_kind');
  /**
   * 当前登录用户头像
   * @name User.user_photo
   * @property user_photo
   *
   * @return {Boolean} 当前登录用户头像
   */
  this.user_photo = Cookie.get('user_photo') || '55557f3b28ee44a8919620ce01a.gif';
  this.userPhoto = Cookie.get('user_photo') || '55557f3b28ee44a8919620ce01a.gif';
  /**
   * 用户Socket
   * @name User.socket
   * @property socket
   *
   * @return {socket} socket
   */
  this.socket = null;

  this.needLogin = (url) => {
    if (!this.isLogin) {
      window.location.href = `/login/?url=${encodeURIComponent(url || window.location.href)}`;
      return false;
    }
    return true;
  };
};
User.get(); // 初始化User

export default User;
