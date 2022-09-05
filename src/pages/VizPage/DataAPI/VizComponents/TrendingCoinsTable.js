// import React from 'react';
// import TableGenerator from '../ComponentHelpers/TableGenerator'

// export default function TrendingCoinsTable({CoinsData}) {

//     return (
//     <div>
//         <TableGenerator DataObject = {CoinsData} title = {'Trending Coins'}/>
//     </div>
//     )
// }

import { Table, Image } from "@mantine/core";
import React from "react";

export default function TrendingCoinsTable({CoinsData}) {

    return (
    <div>
        <Table verticalSpacing='xs' highlightOnHover>
        <thead>
          <tr>
            <th colSpan="2">Trending Coins</th>
          </tr>
          <tr>
            <th>Logo</th>
            <th>Symbol</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {CoinsData.map((item, index) => (
            <tr key={index}>
              {/* <td > {item.Logo} </td> */}
              <td>
                <Image radius="md"
                width={25}
                height={25}
                src={item.Logo}
                alt="Logo"
                />
              </td>
              <td> {item.Symbol} </td>
              <td> {item.Name} </td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
    )
}