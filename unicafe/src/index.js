import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

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
            <table>
                <tbody>
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
                        value={props.keskiarvo}
                    />
                    <Statistic
                        text="positiivisia"
                        value={props.positiivisia + '%'}
                    />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}:</td>
            <td>{props.value}</td>
        </tr>
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

    lisaaArvo = (arvo, key) => {
        return () => {
            this.setState({ [key]: arvo })
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
                        handleClick={this.lisaaArvo(this.state.hyva + 1, 'hyva')}
                        text="Hyvä"
                    />
                    <Button
                        handleClick={this.lisaaArvo(this.state.neutraali + 1, 'neutraali')}
                        text="Neutraali"
                    />
                    <Button
                        handleClick={this.lisaaArvo(this.state.huono + 1, 'huono')}
                        text="Huono"
                    />
                    <h1>Statistiikka</h1>
                    <Statistics
                        tulokset={this.state}
                        keskiarvo={keskiarvo()}
                        positiivisia={positiivisia()}
                    />
                </div>
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)
