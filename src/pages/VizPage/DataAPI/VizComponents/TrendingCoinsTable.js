import React from 'react';
import TableGenerator from '../ComponentHelpers/TableGenerator'

export default function TrendingCoinsTable({CoinsData}) {

    return (
    <div>
        <TableGenerator DataObject = {CoinsData} title = {'Trending Coins'}/>
    </div>
    )
}
