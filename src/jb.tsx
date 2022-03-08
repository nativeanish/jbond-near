import React, { useEffect, useState } from "react";
import * as sha from "sha256";
import * as near from "./utils/init";
import { AppCtx } from "./context";
const Jb = () => {
  const holder = React.useContext(AppCtx);
  const [account, setAccount] = useState<string | false>(false);
  const [error, setError] = useState<string | null>(null);
  const check = async () => {
    const token = await near.checkSign();
    if (token) {
      setAccount(token);
    }
  };
  const signin = async () => {
    await near.signin();
  };
  const signout = async () => {
    await near.sign_out();
    setAccount(false);
  };
  useEffect(() => {
    check().then().catch();
    make_state();
  }, [account]);
  const [task, setTask] = useState<Array<{
    e_msg: string;
    image: string;
    meta_data: string;
    account: Array<{ account: string; id: number }>;
  }> | null>(null);
  const make_state = () => {
    holder.states
      .then((e) => {
        setTask(e);
      })
      .catch((err) => console.log(err));
  };
  const checka = (inp: React.SyntheticEvent) => {
    inp.preventDefault();
    const target = inp.target as typeof inp.target & {
      word: { value: string };
      hash: { value: string };
    };
    if (sha(target.word.value) === target.hash.value){
       holder.dispatch({type:"solved", payload:sha(target.word.value)}); 
    } else {
      setError("This is the not the word");
      setTimeout(() => {
        setError(null); 
      }, 4000);
    }
  };
  return (
    <>
      {account ? (
        <>
          <h1>Hello {account}</h1>
          <button onClick={signout}>logout</button>
          <h1></h1>
          {task ? <img src={task[1]} height="300px" width="300px" /> : null}
          <h3>{task ? task[2] : null}</h3>
          {task ? (
            <b>
              <i>Guess the word for this picture and become james bond :)</i>
            </b>
          ) : null}
          {error ? <h1 style={{"color":"red"}}>{error}</h1>: null}
          {task ? (
            <>
              <br />
              <h1></h1>
              <form onSubmit={checka}>
                <input type="text" name="word" />
                <input type="hidden" disabled name="hash" value={task[0]} />
                <button type="submit">Check!</button>
              </form>{" "}
            </>
          ) : null}
          {task ? (
            <>
              <hr />
              <hr />
              <h2>
                The person who have solved this mystery are listed below
              </h2>{" "}
              <ol>
                {task[3].map((e) => (
                  <li key={e}>{e[0]}</li>
                ))}
              </ol>
            </>
          ) : null}
        </>
      ) : (
        <button onClick={signin}>lOGIN</button>
      )}
    </>
  );
};
export default Jb;
