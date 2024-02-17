export default function isAnyObjectValueTruthy(
	obj: Record<string, unknown>,
): boolean {
	return Object.values(obj).some((objValue) => Boolean(objValue));
}
