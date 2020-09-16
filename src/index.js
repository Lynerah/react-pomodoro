import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

	state = {
		breakCount: 5,
		workCount: 25,
		clockCount: 25 * 60,
		currentTimer:"Session",
		isPlaying : false, 
	}

	constructor(props){
		super(props);
		this.loop= undefined;
	}

	componentWillUnmount() {
		clearInterval(this.loop);
	}

	

	handlePlayPause = () => {
		const {isPlaying} = this.state;

		if(isPlaying){
			clearInterval(this.loop);
			this.setState({
				isPlaying: false
			});
		}else{
			this.setState({
				isPlaying: true
			});

			this.loop = setInterval(() => {
				const {clockCount, currentTimer, breakCount, workCount} = this.state;

				if(clockCount === 0) {
					this.setState({
						currentTimer: (currentTimer === 'Session') ? 'Break' : 'Session', 
						clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (workCount * 60)
					})
				}else{
				this.setState({
					clockCount: clockCount - 1
				});

			}

			}, 1000);

		}
		
	}

	handleReset = () => {
		this.setState({
			breakCount: 5,
			workCount: 25,
			clockCount: 25 * 60,
			currentTimer:"Session",
			isPlaying : false,
		})

		clearInterval(this.loop);
	}

	



	timeConvert = (count) => {
		const minutes = Math.floor(count / 60);
		let seconds = count % 60;

		seconds = seconds < 10 ? ('0'+seconds) : seconds;

		return `${minutes}:${seconds}`;
	}

	handleBreakDecrease = () => {
		const {breakCount} = this.state;

		if(breakCount > 1){
			this.setState({
			breakCount: breakCount - 1 
			});
		}
		
	}

	handleBreakIncrease = () => {
		const {breakCount} = this.state;

		if(breakCount < 60){
			this.setState({
				breakCount: breakCount + 1 
			});
		}
	}

	handleWorkDecrease = () => {
		const {workCount} = this.state;

		if(workCount > 1){
			this.setState({
			workCount: workCount - 1 
			});
		}
		
	}

	handleWorkIncrease = () => {
		const {workCount} = this.state;

		if(workCount < 60){
			this.setState({
				workCount: workCount + 1 
			});
		}
	}
	

	render(){
		const {breakCount, workCount, clockCount,currentTimer,isPlaying} = 
		this.state;

		const breakProps = {
			title: "Break Time",
			count: breakCount,
			handleDecrease: this.handleBreakDecrease,
			handleIncrease: this.handleBreakIncrease,
		}

		const workProps = {
			title: "Work Time",
			count: workCount,
			handleDecrease: this.handleWorkDecrease,
			handleIncrease: this.handleWorkIncrease,
		}

		return (
			<div>
				<div className="flex">
					<SetTimer {...breakProps}/>
					<SetTimer {...workProps}/>
				</div>
				<div className="clock-container">
					<h1>{currentTimer}</h1>
					<span>{this.timeConvert(clockCount)}</span>
					<div className="flex">
						<button onClick={this.handlePlayPause}>
								<i className={`fas fa-${isPlaying ? 'pause': 'play'}`}/>
						</button>
						<button onClick={this.handleReset}>
							<i className="fas fa-sync"/>
						</button>
					</div>
				</div>
			</div>
			);

	}
}


const SetTimer = (props) => (
	<div className="timer-container">
		<h2>{props.title}</h2>
		<div className="flex buttonsAction">
			<button onClick={props.handleDecrease}>
				<i className="fas fa-minus"/>
			</button>
			<span>{props.count}</span>
			<button onClick={props.handleIncrease}>
				<i className="fas fa-plus"/>
			</button>

		</div>
	</div>
)

ReactDOM.render(<App/>, document.getElementById('root'));