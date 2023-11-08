
export default function ({
    children,
    notConnected
}) {
    const isConnected = true; // TODO

    if (isConnected) return children;
    return notConnected;
}