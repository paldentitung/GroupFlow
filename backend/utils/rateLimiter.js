import rateLimit from "express-rate-limit";

// Generic limiter factory
export const createLimiter = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
  });

// Auth - strict, since these are brute-force targets
export const loginLimiter = createLimiter(
  15, // 15 minute window
  10, // 10 attempts
  "Too many login attempts. Please try again after 15 minutes.",
);

export const registerLimiter = createLimiter(
  60, // 1 hour window
  5,
  "Too many accounts created. Please try again after an hour.",
);

export const verifyEmailLimiter = createLimiter(
  15,
  5, // tighter — this gates an email-send, don't let it be a spam vector
  "Too many verification attempts. Please try again after 15 minutes.",
);

export const changePasswordLimiter = createLimiter(
  60, // sensitive action, hourly window not 1-minute
  3,
  "Too many password change attempts. Please try again later.",
);

export const resetPasswordLimiter = createLimiter(
  60,
  3,
  "Too many password reset requests. Please try again later.",
);

export const changeAvatarLimiter = createLimiter(
  15,
  5,
  "Too many avatar changes. Please try again later.",
);

// App usage - generous, just anti-abuse
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
