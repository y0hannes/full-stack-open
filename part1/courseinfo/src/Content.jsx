const Content = ({ parts }) => {
    const items = parts.map((part, index) => (<p key={index}> {part.name} {part.exercises}</p> ))
    return (
        <>
            {items}
        </>
    )
}

export default Content 