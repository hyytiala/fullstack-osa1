import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = (props) => {
    return (
        <div>
            <p>{props.text}: {props.value}</p>
        </div>
    )
}

const Statistics = (props) => {
    const summa = props.tulokset.hyva + props.tulokset.neutraali + props.tulokset.huono
    if (summa === 0) {
        return (
            <div>
                <p>Yhtään palutetta ei ole vielä annettu</p>
            </div>
        )
    }
    return (
        <div>
            <Statistic
                text="hyvä"
                value={props.tulokset.hyva}
            />
            <Statistic
                text="neutraali"
                value={props.tulokset.neutraali}
            />
            <Statistic
                text="huono"
                value={props.tulokset.huono}
            />
            <Statistic
                text="keskiarvo"
                value={props.tulokset.keskiarvo}
            />
            <Statistic
                text="positiivisia"
                value={props.tulokset.positiivisia}
            />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            keskiarvo: 0,
            positiivisia: 0
        }
    }

    keskiarvo = () => {
        const summa = this.state.hyva + this.state.neutraali + this.state.huono
        const huonot = this.state.huono * -1
        const keskiarvo = (this.state.hyva + huonot) / summa
        const prosentti = this.state.hyva / summa * 100
        var rounded1 = keskiarvo.toFixed(2)
        var rounded2 = prosentti.toFixed(1)
        this.setState({ keskiarvo: rounded1 })
        this.setState({ positiivisia: rounded2 })
    }

    hyva = (arvo) => {
        return () => {
            this.setState({ hyva: arvo })
            this.keskiarvo()
        }
    }

    neutraali = (arvo) => {
        return () => {
            this.setState({ neutraali: arvo })
            this.keskiarvo()
        }
    }

    huono = (arvo) => {
        return () => {
            this.setState({ huono: arvo })
            this.keskiarvo()
        }
    }



    render() {
        const summa = this.state.hyva + this.state.neutraali + this.state.huono
        const keskiarvo = () => {
            const huonot = this.state.huono * -1
            const keskiarvo = (this.state.hyva + huonot) / summa
            var rounded = keskiarvo.toFixed(2)
            return (
                rounded
            )
        }

        const positiivisia = () => {
            const prosentti = this.state.hyva / summa * 100
            var rounded = prosentti.toFixed(1)
            return (
                rounded
            )
        }

        return (
            <div>
                <div>
                    <h1>Anna palautetta</h1>
                    <Button
                        handleClick={this.hyva(this.state.hyva + 1)}
                        text="Hyvä"
                    />
                    <Button
                        handleClick={this.neutraali(this.state.neutraali + 1)}
                        text="Neutraali"
                    />
                    <Button
                        handleClick={this.huono(this.state.huono + 1)}
                        text="Huono"
                    />
                    <h1>Statistiikka</h1>
                    <Statistics
                        tulokset={this.state}
                    />
                    <p>keskiarvo: {keskiarvo()}</p>
                    <p>positiivisia: {positiivisia()}%</p>
                </div>
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)
