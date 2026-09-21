export const TryError = (message, status = 500) => {
    const err = new Error(message)
    err.status = status
    return err
}

export const CatchError = (err, res, prodMessage = "Internal server error") => {
    if (err instanceof Error) {
        const message = process.env.NODE_ENV === "dev" ? err.message : prodMessage
        const status = err.status || 500
        res.status(status).json({ message })
    }
}
