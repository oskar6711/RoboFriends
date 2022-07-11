import React, { Component } from 'react'
import CardList from '../Components/CardList'
import SearchBox from '../Components/SearchBox'
import './App.css'
import Scroll from '../Components/Scroll'

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}))
    }
    
    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })

    }

    render () {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        if (!this.state.robots.length) {
            return <h1>Loading</h1>
        } 
        return (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
          )
    }
}

export default App