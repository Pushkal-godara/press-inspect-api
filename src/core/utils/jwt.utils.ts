export function extractJwtFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return null;
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return null;
    }

    return token;
}