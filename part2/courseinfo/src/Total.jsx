const Total = ({parts}) => {
	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)

	return (
		<>
			<h3>Total of {totalExercises} exercises</h3>
		</>
	);
};

export default Total;