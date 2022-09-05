// import React from 'react';
// import TableGenerator from '../ComponentHelpers/TableGenerator'

// export default function TopCoinsTable({CoinsData}) {

//     return (
//     <div>
//         <TableGenerator DataObject = {CoinsData} title = {'Top Coins'}/>
//     </div>
//     )
// }

import { Table, Image } from "@mantine/core";
import React from "react";

export default function TopCoinsTable({CoinsData}) {

    return (
    <div>
        <Table verticalSpacing='xs' fontSize="xs" horizontalSpacing="xs" highlightOnHover>
        <thead>
          <tr>
            <th colSpan="2">Top Coins</th>
          </tr>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Market Cap (Billions USD)</th>
            <th>Price (USD)</th>
            <th>Past 24 hrs</th>
          </tr>
        </thead>
        <tbody>
          {CoinsData.map((item, index) => (
            <tr key={index}>
              <td > {item.Rank} </td>
              <td>
                <Image radius="md"
                width={25}
                height={25}
                src={item.Logo}
                alt="Logo"
                />
              </td>
              <td> {item.Name} </td>
              <td> {item.MarketCap_Billions_USD} </td>
              <td> {item.Price_USD} </td>
              <td style={{ color: item.color_change }}> {item.ChangePercent24h} </td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
    )
}