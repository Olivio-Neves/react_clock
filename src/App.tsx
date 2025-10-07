import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);
  return `Clock-${value}`;
}

interface AppState {
  hasClock: boolean;
  clockName: string;
  time: string;
}

export class App extends React.Component<{}, AppState> {
  private timeIntervalId?: number;
  private nameIntervalId?: number;

  state: AppState = {
    hasClock: true,
    clockName: 'Clock-0',
    time: new Date().toUTCString().slice(-12, -4),
  };

  componentDidMount() {
    this.timeIntervalId = window.setInterval(() => {
      if (this.state.hasClock) {
        const now = new Date();
        const currentTime = now.toUTCString().slice(-12, -4);

        this.setState({ time: currentTime });
        // eslint-disable-next-line no-console
        console.log(currentTime);
      }
    }, 1000);

    this.nameIntervalId = window.setInterval(() => {
      if (this.state.hasClock) {
        const oldName = this.state.clockName;
        const newName = getRandomName();

        this.setState({ clockName: newName }, () => {
          // eslint-disable-next-line no-console
          console.warn(`Renamed from ${oldName} to ${newName}`);
        });
      }
    }, 3300);

    document.addEventListener('click', this.showClock);
    document.addEventListener('contextmenu', this.hideClock);
  }

  componentWillUnmount() {
    if (this.timeIntervalId !== undefined) {
      window.clearInterval(this.timeIntervalId);
    }

    if (this.nameIntervalId !== undefined) {
      window.clearInterval(this.nameIntervalId);
    }

    document.removeEventListener('click', this.showClock);
    document.removeEventListener('contextmenu', this.hideClock);
  }

  showClock = (): void => {
    this.setState({ hasClock: true });
  };

  hideClock = (event: MouseEvent): void => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  render() {
    const { hasClock, clockName, time } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>
        {hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>
            {' time is '}
            <span className="Clock__time">{time}</span>
          </div>
        )}
      </div>
    );
  }
}
