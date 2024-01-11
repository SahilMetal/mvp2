import ReactDOM from "react-dom/client";
import React from "react";
import { useState } from "react";

const App = () => {
    
    const [chosenTier, setChosenTier] = useState('');
    const [chosenQuery, setChosenQuery] = useState('');
    const [teamData, setTeamData] = useState([]);

    const searchRequest = () => {
        fetch('http://localhost:3000/teams', {
            method: "GET",
        })
            .then((data) => data.json())
            .then((teams) => {
                const result = [];
                for (let i  = 0; i < teams.length; i++) {
                    if (teams[i].title === chosenQuery) { //sudo search function
                        result.push(teams[i])
                    }
                }
                console.log(teams, 'teams')
                setTeamData(result)
            })
    };

    return (
        <div className='app'>
            <nav>
                <ul className='nav-bar'>
                    <h3>Team Database</h3>
                </ul>
            </nav>
            <p className='directions'>
                {' '}
                Search for teams using the following:
            </p>
            <div className='main'>
                <div className='type-selector'>
                    <ul>
                        <li>
                            <select
                                name='types'
                                id='types'
                                value={chosenTier}
                                onChange={(e) => setChosenTier(e.target.value)}
                            >
                                <option value={null}>Select a Tier</option>
                                <option value='Ubers'>Ubers</option>
                                <option value='OU'>OU</option>
                                <option value='UU'>UU</option>
                                <option value='RU'>RU</option>
                                <option value='NU'>NU</option>
                            </select>
                        </li>

                        <li>
                            <form>
                                <label>
                                    <input
                                        className='form'
                                        type='text'
                                        placeholder='Search: Tags, creators, or title'
                                        value={chosenQuery || ''}
                                        onChange={(e) => setChosenQuery(e.target.value)}
                                    />
                                </label>
                            </form>
                        </li>

                        <li>
                            <button onClick={searchRequest}>Search</button>
                        </li>
                    </ul>
                    <table style = {{ width: 300}}>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Tier</th>
                                <th>Creator</th>    
                                <th>Tags</th>
                                <th>Importable</th>
                            </tr>
                        </tbody>
                        {teamData.map((i) => {
                            return (
                                <tbody>
                                <tr>
                                    <td>{i.title}</td>
                                    <td>{i.tier}</td>
                                    <td>{i.creator}</td>
                                    <td>{i.tags}</td>
                                    <td>{i.importable}</td>
                                </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
                
            </div>
        </div>
    );
};
ReactDOM.createRoot(document.getElementById("app")).render(<App/>);