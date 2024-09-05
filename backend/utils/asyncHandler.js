/**
 * 
 * @param {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => Promise<any>} fn 
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => Promise<void>}
 */

module.exports = (fn) => async (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
