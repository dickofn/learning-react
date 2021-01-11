/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getContrastTextColorByType } from "../../helper/pokemon-helper";

function Summary(props) {
  const data = props.data;

  const types = data.types.map((i) => {
    const contrastTextStyle = css`
      color: ${getContrastTextColorByType(i.type.name)};
    `;

    return (
      <span
        key={i.type.name}
        className={"mr-1 last:mr-0 p-1 rounded bg-" + i.type.name}
        css={contrastTextStyle}
      >
        {i.type.name.charAt(0).toUpperCase() + i.type.name.slice(1)}
      </span>
    );
  });

  const stats = data.stats.map((i) => {
    const statName = (
      i.stat.name.charAt(0).toUpperCase() + i.stat.name.slice(1)
    )
      .split("-")
      .join(" ");
    return (
      <tr key={i.stat.name}>
        <td className="font-medium">{statName}</td>
        <td>{i.base_stat}</td>
      </tr>
    );
  });

  return (
    <div className="p-4">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-medium">Types</td>
            <td>{types}</td>
          </tr>
          <tr>
            <td className="font-medium pt-3">Height</td>
            <td className="pt-3">{data.height / 10} m</td>
          </tr>
          <tr>
            <td className="font-medium pb-3">Weight</td>
            <td className="pb-3">{data.weight} kg</td>
          </tr>
          {stats}
        </tbody>
      </table>
    </div>
  );
}

export default Summary;
