// Error handling middleware
function errorHandler(err, req, res, next) {
    // Check if the response has already been sent
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
    let details = err.details || {};

    // Specific check for Zod validation errors or similar structure
    if (err.name === 'ZodError') {
        statusCode = 422; // Unprocessable Entity
        message = "Validation failed";
        details = err.errors.map(e => ({ field: e.path.join('.'), message: e.message }));
    }

    // Respond with JSON
    res.status(statusCode).json({
        error: {
            message,
            details
        }
    });
}

export default errorHandler;
