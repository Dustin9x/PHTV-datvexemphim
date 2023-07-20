import React, { useState } from 'react'
import './MovieHover.css'
import { Button, Modal  } from 'antd';

export default function MovieHover(props) {


    const [modal2Open, setModal2Open] = useState(false);
    const { phim } = props;
    return (
        <div className="container_foto">
            <div className="ver_mas text-center">
                <span id="click" className="lnr lnr-eye" />
                <a href={`/detail/${phim.maPhim}`} className='btn btn-danger text-white'>Đặt vé</a>
                {/* <a href={`${phim.trailer}`} className='btn btn-danger text-white'>Trailer</a> */}
                
                <button className='btn btn-danger text-white ml-2' onClick={() => setModal2Open(true)}>Trailer</button>
                <Modal
                    title={`${phim.tenPhim}`}
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                    bodyStyle={{height:500,padding:0,margin:'0 -16px -12px',borderRadius:8}}
                    width={800}
                    footer={null}
                    destroyOnClose={true}
                >
                    <iframe width="100%" height="100%" src={`${phim.trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </Modal>
            </div>
            <article className="text-left w-full">
                <h2>{phim.tenPhim}</h2>
                <h4>{phim.moTa}</h4>
            </article>
            <img src={phim.hinhAnh} alt={phim.tenPhim} className='w-full object-cover'/>
        </div>


    )
}

