import React from 'react';
import Terminal from 'react-console-emulator';
import axios from 'axios';

const CLI = props => {
    const terminal = React.createRef();

    const commands = {
        jokes: {
            description: 'shows random number of jokes',
            usage: 'jokes <number>',
            fn: function (arg) {
                const sendReq = async () => {
                    const ter = terminal.current;
                    try {
                        const response = await axios.get("http://api.icndb.com/jokes/random/" + arg);
                        ter.pushToStdout(response.data.value.map(el => el.joke + "\n"));
                    }
                    catch (err) {
                        ter.pushToStdout(err.message);
                    }
                }
                sendReq();
                return `${"wait.."}`
            }
        }
    }

    return (
        <Terminal
            style={{ width: '70%', height: '60%' }}
            ref={terminal}
            commands={commands}
            welcomeMessage={'Welcome to the React terminal!'}
            promptLabel={'me@React:~$'}
        />
    );
}

export default CLI;