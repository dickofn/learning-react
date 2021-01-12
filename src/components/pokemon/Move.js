function Move(props) {
  const data = props.data;

  console.log(data);

  const abilities = data.abilities.map((i) => {
    const abilityName = (
      i.ability.name.charAt(0).toUpperCase() + i.ability.name.slice(1)
    )
      .split("-")
      .join(" ");
    return <div key={i.ability.name}>{abilityName}</div>;
  });

  const moves = data.moves.map((i) => {
    const moveName = (
      i.move.name.charAt(0).toUpperCase() + i.move.name.slice(1)
    )
      .split("-")
      .join(" ");
    return <div key={i.move.name}>{moveName}</div>;
  });

  return (
    <div className="p-4">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-medium align-baseline">Abilities</td>
            <td className="pb-3">{abilities}</td>
          </tr>
          <tr>
            <td className="font-medium align-baseline">Moves</td>
            <td>{moves}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Move;
