import "./progressCircle.css";

const Circle = ({ color, percentage, size, strokeWidth }) => {
	const radius = size / 2 - 10;
	const circle = 2 * Math.PI * radius - 20;
	const strokePercentage = ((100 - Math.round(percentage)) * circle) / 100;

	return (
		<circle
			r={radius}
			cx="50%"
			cy="50%"
			fill="transparent"
			stroke={strokePercentage !== circle ? color : ""}
			strokeWidth={strokeWidth}
			strokeDasharray={circle}
			strokeDashoffset={percentage ? strokePercentage : 0}
			strokeLinecap="round"
		/>
	);
};

const ProgressCircle = ({ percentage, isPlaying, image, size, color }) => {
	return (
		<div className="progress-circle">
			<svg width={size} height={size} className="progress-circle-svg">
				<g>
					<Circle strokeWidth={".4rem"} color="#3b4f73" size={size} />
					<Circle
						strokeWidth={".6rem"}
						color={color}
						percentage={percentage}
						size={size}
					/>
				</g>
				<defs>
					<clipPath id="myCircle">
						<circle
							cx="50%"
							cy="50%"
							r={size / 2 - 60}
							fill="#fff"
						/>
					</clipPath>
					<clipPath id="myInnerCircle">
						<circle
							cx="50%"
							cy="50%"
							r={size / 2 - 50}
							fill="#fff"
						/>
					</clipPath>
				</defs>
				<image
					className={isPlaying ? "vinyl-img active" : "vinyl-img"}
					x={50}
					y={50}
					width={2 * (size / 2) - 100}
					height={2 * (size / 2) - 100}
					href={image}
					clipPath="url(#myInnerCircle)"
				/>
			</svg>
		</div>
	);
};

export default ProgressCircle;
