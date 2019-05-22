export default class allowCorsClass {
  static allowCors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }
}
