// lib/rateLimiter.ts
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Configure your rate limiter
const rateLimiter = new RateLimiterMemory({
    // Each IP will make 10 requests per minute
  points: 10, // Number of points
  duration: 60, // Per second
});

// Middleware function to be used in API routes
export const rateLimiterMiddleware = async (req: any, res: any, next: any) => {
  try {
     // Consume a point for the IP address making the request
    await rateLimiter.consume(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    next(); // If rate limit is not exceeded, proceed to the API handler
  } catch (rejRes) {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  }
};
