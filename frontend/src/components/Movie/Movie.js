import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;

export default function Movie(props) {
    const {phim}=props;
  return (
    <Card 
        hoverable
        cover={<img alt={phim.tenPhim} src={phim.hinhAnh} style={{height:'500px'}}/>}
        style={{margin:'5px',height:'700px'}}
      >
        <Meta title={phim.tenPhim} description={phim.moTa} style={{height:'200px'}}/>
      </Card>
  )
}
