export function asyncHandler(requestHandler) {
  return async function (req, res, next) {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      console.log("async", error);
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
}
