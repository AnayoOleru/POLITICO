export default class verifyIsAdminClass {
    static verifyIsAdmin(req, res, next) {
      const { isAdmin } = req.user;
      if (!isAdmin) {
        return res.status(403).json({
          "status": 403,
          "message": "Access denied, you don't have the required credentials to access this route",
        });
      }
      next();
    }
  }