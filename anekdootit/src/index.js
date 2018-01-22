import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => {
    if (text) {
        return (
            <div>
                <p>{text}</p>
                <p>has {value} votes</p>
            </div>
        )
    }
    return (
        <div>
            Ei yhtään ääniä
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [],
            mostKey: -1,
            mostVote: 0
        }
    }

    getRandomInt(size) {
        return Math.floor(Math.random() * Math.floor(size));
    }

    seuraava = (size) => {
        var next = this.getRandomInt(size)
        return () => {
            this.setState({ selected: next })
        }
    }

    addVote = (key) => {
        return () => {
            this.setState({ votes: this.state.votes.concat(key) })
            const result = this.state.votes.filter(match => match === key)
            console.log('pituus ' + result.length)
            if (result.length + 1 > this.state.mostVote) {
                this.setState({ mostKey: key })
                this.setState({ mostVote: result.length })
            }
        }
    }

    render() {
        console.log(this.state.votes)
        const selected = this.state.selected
        const result = this.state.votes.filter(match => match === selected)
        console.log(this.props.anecdotes[-1])
        return (
            <div>
                <p>{this.props.anecdotes[selected]}</p>
                <p>has {result.length} votes</p>
                <Button
                    handleClick={this.seuraava(this.props.anecdotes.length)}
                    text="next anecdote"
                />
                <Button
                    handleClick={this.addVote(selected)}
                    text="vote"
                />
                <h1>Anectode with most votes:</h1>
                <Statistic
                    text={this.props.anecdotes[this.state.mostKey]}
                    value={this.state.mostVote + 1}
                />
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)