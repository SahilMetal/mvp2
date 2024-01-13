import ReactDOM from "react-dom/client";
import React from "react";
import { useState } from "react";

const App = () => {
    
    const [chosenTier, setChosenTier] = useState('');
    const [chosenQuery, setChosenQuery] = useState('');
    const [chosenEntryTitle, setChosenEntryTitle] = useState('');
    const [chosenEntryTier, setChosenEntryTier] = useState('');
    const [chosenEntryCreator, setChosenEntryCreator] = useState('');
    const [chosenEntryTags, setChosenEntryTags] = useState([]);
    const [chosenEntryImport, setChosenEntryImport] = useState('');
    const [chosenDelete, setChosenDelete] = useState('');
    const [teamData, setTeamData] = useState([]);

    const searchRequest = () => {
        fetch('http://localhost:3000/teams', {
            method: "GET",
        })
            .then((data) => data.json())
            .then((teams) => {
                const result = [];
                for (let i  = 0; i < teams.length; i++) {
                    if (chosenTier === 'All') { 
                        result.push(teams[i])
                        console.log('psuhed all', result)
                    } else if (teams[i].title === chosenQuery || teams[i].tier === chosenTier || teams[i].tier === 'All') {
                        result.push(teams[i])
                        console.log('psuhed notmal')
                    }
                }
                console.log(result, 'teams')
                setTeamData(result)
            })
    };

    const postRequest = () => {
        fetch('http://localhost:3000/teams', {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: chosenEntryTitle,
                tier: chosenEntryTier,
                creator: chosenEntryCreator,
                tags: chosenEntryTags,
                importable: chosenEntryImport,
                //make multiple entry forms without copy paste?
            })
        })
        console.log('hello')
    };

    const deleteRequest = () => {
        fetch('http://localhost:3000/teams', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: chosenDelete })
        }).then(console.log('message deleted'))
    }

    
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
                                <option value='All'>Search All Tiers</option>
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
                                        placeholder='Search by title'
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
                    <table style = {{ width: 500}}>
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
                    <h4>Submit your teams to the database below:</h4>
                        <form>
                            <label>
                                <input
                                    className='form'
                                    type='text'
                                    placeholder='Enter title'
                                    value={chosenEntryTitle || ''}
                                    onChange={(e) => setChosenEntryTitle(e.target.value)}
                                />
                                <input
                                    className='form'
                                    type='text'
                                    placeholder='Enter tier'
                                    value={chosenEntryTier || ''}
                                    onChange={(e) => setChosenEntryTier(e.target.value)}
                                />
                                <input
                                    className='form'
                                    type='text'
                                    placeholder='Enter creator'
                                    value={chosenEntryCreator || ''}
                                    onChange={(e) => setChosenEntryCreator(e.target.value)}
                                />
                                <input
                                    className='form'
                                    type='text'
                                    placeholder='Enter tags: tag1, tag2, etc    '
                                    value={chosenEntryTags || []}
                                    onChange={(e) => setChosenEntryTags(e.target.value)}
                                />
                                <input
                                    className='form'
                                    type='text'
                                    placeholder='Enter pokepaste link'
                                    value={chosenEntryImport || ''}
                                    onChange={(e) => setChosenEntryImport(e.target.value)}
                                />
                            </label>
                        </form>
                        <button onClick={postRequest}>Submit</button>
                </div>
            </div>
            <h4>Delete a team from the database below:</h4>
            <form>
                <label>
                    <input
                        className='form'
                        type='text'
                        placeholder='Enter _id'
                        value={chosenDelete}
                        onChange={(e) => setChosenDelete(e.target.value)}
                    />
                </label>
            </form>
            <button onClick={deleteRequest}>Submit</button>
        </div>
    );
};
ReactDOM.createRoot(document.getElementById("app")).render(<App/>);