import { Request } from "express";

export class IpUtils {
    /**
     * Safely extracts the client IP address from the request.
     * It never returns undefined — always returns a valid string.
     */
    static getRequestIp(req: Request): string {
        try {
            // 1️⃣ Check for common proxy headers (e.g., Nginx, Cloudflare)
            let ip =
                (req.headers["x-forwarded-for"] as string) ||
                req.socket.remoteAddress ||
                req.ip ||
                "";

            // 2️⃣ If multiple IPs are present (e.g., "client, proxy1, proxy2"), use the first one
            if (ip.includes(",")) {
                ip = ip.split(",")[0].trim();
            }

            // 3️⃣ Strip IPv6-mapped IPv4 prefix (e.g., "::ffff:127.0.0.1" → "127.0.0.1")
            if (ip.startsWith("::ffff:")) {
                ip = ip.replace("::ffff:", "");
            }

            // 4️⃣ Normalize localhost IPv6 address
            if (ip === "::1") {
                ip = "127.0.0.1";
            }

            // 5️⃣ Provide a safe fallback if the IP is still empty
            return ip || "0.0.0.0";
        } catch {
            // Never throw — always return a valid IP string
            return "0.0.0.0";
        }
    }
}
