const Content = ({ parts }) => {
	console.log("content working");
	return (
		<>
			{parts.map((part) => (<li key={part.id}> {part.name} {part.exercises}</li>))}
		</>
	);
};

export default Content;