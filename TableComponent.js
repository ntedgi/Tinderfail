import React, { Component } from 'react'

import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native'
import Table from 'react-native-simple-table'
 
import DataFactory from './DataFactory'
 
const columns = [

  {
    title: 'Name',
    dataIndex: 'name',
    width: 140
  },
  {
    title: 'Score',
    dataIndex: 'score'
  }
];
 
class TableComponent extends Component {
  render() {
    let dataSource = DataFactory.generate().data;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Results</Text>
        <Table height={100} columnWidth={60} columns={columns} dataSource={dataSource} />
      </View>
    )
  }
}
 

export default TableComponent