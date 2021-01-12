/** @jsxImportSource @emotion/react */
import { css, ClassNames } from "@emotion/react";
import {
  getContrastTextColorByType,
  getColorByType,
} from "../../helper/pokemon-helper";

function Summary(props) {
  const data = props.data;

  const types = data.types.map((i) => {
    const contrastTextStyle = css`
      color: ${getContrastTextColorByType(i.type.name)};
    `;

    const bgPokemonType = css`
      background-color: ${getColorByType(i.type.name)};
    `;

    return (
      <ClassNames key={i.type.name}>
        {({ css, cx }) => (
          <span
            className={"mr-1 last:mr-0 p-1 rounded bg-" + i.type.name}
            css={cx(css(contrastTextStyle), css(bgPokemonType))}
          >
            {i.type.name.charAt(0).toUpperCase() + i.type.name.slice(1)}
          </span>
        )}
      </ClassNames>
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
            <td className="font-medium align-baseline">Types</td>
            <td className="pb-3">{types}</td>
          </tr>
          <tr>
            <td className="font-medium align-baseline">Height</td>
            <td>{data.height / 10} m</td>
          </tr>
          <tr>
            <td className="font-medium align-baseline">Weight</td>
            <td className="pb-3">{data.weight / 10} kg</td>
          </tr>
          {stats}
        </tbody>
      </table>
    </div>
  );
}

export default Summary;
