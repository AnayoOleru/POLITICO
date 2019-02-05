export default class verifyIsAdminClass {
  static verifyIsAdmin(req, res, next) {
    const { isAdmin } = req.user;
    if (!isAdmin) {
        console.log(isAdmin)
        return res.status(403).json({
          "status": 403,
          "message": "Access denied, You do not have the admin privileges to access this route",
        });
      }
      next();
    }
  }