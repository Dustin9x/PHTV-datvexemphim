import React from 'react'
import './LoadingLogo.css'

export default function LoadingLogo() {
    return (
        <div>
            <svg viewBox="0 0 3 2" width="192" height="128">
                <polygon fill="#2de0e0" points="0 2 0 0 2 0">
                    <animate
                        attributeName="points"
                        calcMode="spline"
                        dur="4s"
                        keySplines="
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1"
                        keyTimes="
        0;
        .1;
        .2;
        .3;
        .7;
        .8;
        1"
                        repeatCount="indefinite"
                        values="
        0 2 0 0 2 0;
        0 2 0 0 2 0;
        0 2 2 2 2 0;
        0 2 2 2 0 0;
        0 2 2 2 0 0;
        0 2 0 0 2 0;
        0 2 0 0 2 0" />
                </polygon>
                <polygon fill="#ff004f" points="1 2 1 0 3 0">
                    <animate
                        attributeName="points"
                        calcMode="spline"
                        dur="4s"
                        keySplines="
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1;
        .25 .1 .25 1"
                        keyTimes="
        0;
        .1;
        .3;
        .4;
        .5;
        .6;
        .7;
        .8;
        .9;
        1"
                        repeatCount="indefinite"
                        values="
        1 2 1 0 3 0;
        2 2 0 2 2 0;
        2 2 0 2 2 0;
        2 2 0 0 2 0;
        2 2 0 0 0 2;
        2 2 2 0 0 2;
        0 0 2 0 0 2;
        0 0 2 0 0 2;
        1 0 3 0 1 2;
        1 0 3 0 1 2" />
                </polygon>
            </svg>
        </div>
    )
}
