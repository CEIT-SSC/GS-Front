import React, { useState, useEffect } from 'react';
import Terminal from 'react-console-emulator';
import axios from 'axios';

const CLI = props => {
    const terminal = React.createRef();
    const inputRef = React.createRef();
    const [file, setFile] = useState(null);

    const commands = {
        jokes: {
            description: 'shows random number of jokes',
            usage: 'jokes <number>',
            fn: function (arg) {
                const sendReq = async () => {
                    try {
                        const response = await axios.get("http://api.icndb.com/jokes/random/" + arg);
                        terminal.current.pushToStdout(response.data.value.map(el => el.joke + "\n"));
                    }
                    catch (err) {
                        terminal.current.pushToStdout(err.message);
                    }
                }
                sendReq();
                return `${"wait.."}`
            }
        },

        file: {
            description: 'uploads a file to the local server',
            usage: 'file',
            fn: function (arg) {
                setFile(null);
                inputRef.current.click();
            }
        }
    }

    useEffect(() => {
        if (file != null) {
            const data = new FormData()
            for (let el in file) {
                data.append('files', file[el]);
            }
            axios.post("http://localhost:5000/files", data, { // receive two parameter endpoint url ,form data 
            })
                .then(res => { // then print response status
                    console.log(res.status)
                    terminal.current.pushToStdout("success");
                })
                .catch(err => { console.log(err) })
        }
    }, [file])



    return (
        <>
            <input type="file" multiple
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={(event) => { setFile(event.target.files) }}
            />
            <Terminal
                style={{ width: '70%', height: '60%' }}
                ref={terminal}
                commands={commands}
                welcomeMessage={'Welcome to the React terminal!'}
                promptLabel={'me@React:~$'}
            />
        </>
    );
}

export default CLI;