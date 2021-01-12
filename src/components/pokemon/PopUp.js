import React, { useContext, useState } from "react";
import PokemonContext from "../../contexts/PokemonsContext";

function PopUp(props) {
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);

  const [isError, setIsError] = useState(false);

  const pokemons = useContext(PokemonContext);

  function handleSubmit() {
    const data = {
      name: props.name,
      nickname: value,
    };
    let errCheck = false;
    pokemons.forEach((i) => {
      if (i.nickname === data.nickname) {
        errCheck = true;
      }
    });

    if (errCheck) {
      setIsError(true);
      return;
    }

    pokemons.push(data);
    localStorage.setItem("pokemons", JSON.stringify(pokemons));

    props.toggle();
  }

  function handleClose() {
    props.toggle();
  }

  const errorMsg = (
    <div className="text-red-500 text-xs mt-2">
      there is a pokemon with same nickname, please change!
    </div>
  );

  let content = "";

  if (props.name === "01") {
    content = (
      <div className="bg-white w-11/12 rounded">
        <div className="font-medium p-4 border-b border-gray-800">
          You caught a nothing
        </div>
        <div className="text-right p-4">
          <button
            className="py-2 px-4 bg-gray-800 rounded text-white hover:bg-opacity-80"
            onClick={() => handleClose()}
          >
            Close
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="bg-white w-11/12 rounded">
        <div className="font-medium p-4 border-b border-gray-800">
          You caught a {props.name.toUpperCase()}
        </div>
        <div className="p-4">
          <label htmlFor="nickname">Give it a nickname*</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="focus:border-gray-900 focus:outline-none block w-full p-2 border border-gray-300 rounded"
            placeholder="Little Poke"
            value={value}
            onChange={handleChange}
          />
          <div className="text-gray-500 text-xs">
            *empty nickname will set to pokemon's name
          </div>
          {isError ? errorMsg : ""}
        </div>
        <div className="text-right p-4">
          <button
            className="py-2 px-4 bg-gray-800 rounded text-white hover:bg-opacity-80"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      {content}
    </div>
  );
}

export default PopUp;
