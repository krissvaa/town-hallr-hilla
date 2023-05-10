type BadgeProps = {
    type?: 'info' | 'default' | 'error' | 'success',
    children?: React.ReactNode
}
export default function Badge({type = 'default', children}: BadgeProps) {

    return (
        <span className={`badge badge-${type}`}>
            {children}
        </span>
    )
}