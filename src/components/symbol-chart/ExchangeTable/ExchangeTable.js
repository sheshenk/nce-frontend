import { Table } from "@mantine/core";
import React, { Component } from "react";

export class ExchangeTable extends Component {
  // componentDidMount() {
  //   this.props.subscribeToNewOrderBook();
  // }
  render() {
    return (
      <Table verticalSpacing='xs' highlightOnHover>
        <thead>
          <tr>
            <th colSpan="2">{this.props.title}</th>
          </tr>
          <tr>
            <th>Amount ({this.props.currencyArray[0]})</th>
            <th>Price ({this.props.currencyArray[1]})</th>
            <th>Total ({this.props.currencyArray[1]})</th>
          </tr>
        </thead>
        <tbody>
          {this.props.arr && this.props.arr.map((item, index) => (
            <tr key={index}>
              <td > {Number(item[1]).toFixed(5).substring(0, 7)} </td>
              <td style={{ color: this.props.color }}> {item[0]} </td>
              <td>{(Number(item[1]) * Number(item[0])).toFixed(5).substring(0, 7)}</td>
            </tr>
          ))}
        </tbody>
      </Table>)
  }
}