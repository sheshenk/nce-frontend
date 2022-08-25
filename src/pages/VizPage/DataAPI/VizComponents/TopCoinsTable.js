import React from 'react';
import TableGenerator from '../ComponentHelpers/TableGenerator'

export default function TopCoinsTable({CoinsData}) {

    return (
    <div>
        <TableGenerator DataObject = {CoinsData} title = {'Top Coins'}/>
    </div>
    )
}
