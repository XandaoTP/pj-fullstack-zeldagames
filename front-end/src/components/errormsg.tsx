export type ErrorMsgProps = {
    message: string;
}

export function ErrorMsg({message}: ErrorMsgProps) {
    return <span className="text-red-300">{message}</span>

}