import rateLimit from "express-rate-limit";

// Generic limiter factory
export const createLimiter = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: { success: false, message },
    standardHeaders: true, // Return rate limit info in RateLimit-* headers
    legacyHeaders: false,
  });

// Specific limiters
export const loginLimiter = createLimiter(
  1, // 15 minute window
  10, // 10 attempts
  "Too many login attempts. Please try again after 15 minutes.",
);

export const registerLimiter = createLimiter(
  1, // 1 hour window
  5, // 5 registrations
  "Too many accounts created. Please try again after an hour.",
);

export const verifyEmailLimiter = createLimiter(
  1,
  10,
  "Too many verification attempts. Please try again after 15 minutes.",
);

export const createProjectLimiter = createLimiter(
  60,
  20,
  "Too many projects created. Please slow down.",
);

export const createTaskLimiter = createLimiter(
  15,
  30,
  "Too many tasks created. Please slow down.",
);

export const commentLimiter = createLimiter(
  15,
  20,
  "Too many comments. Please slow down.",
);

export const inviteLimiter = createLimiter(
  60,
  10,
  "Too many invites sent. Please try again later.",
);
