import React, { Fragment } from 'react'
import LoadingLogo from './LoadingLogo'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingReducer } from './../../redux/reducers/LoadingReducer';

export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer);
    const dispatch = useDispatch();
    return (<Fragment>
        {isLoading ? <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            // backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
        }}>
            <div style={{ zoom: '0.6' }}><LoadingLogo /></div>
        </div> : ''}

    </Fragment>

    )
}
