import React, { useEffect, useRef } from "react";



export default function SelectBus(props) {

  useEffect(() => {
  }, []);

  
  return (
    <div class="w-100 pa2" style={{backgroundColor: '#f8c300 !important'}}>
        <div class="w-100" style={{color: '#1867aa'}} id="Infos">
        </div>
      <form autocomplete="off" class=" w-100" action="/bus/schedule/">
        <div
          class="autocomplete  br3 cf w-100 flex flex-wrap justify-center"
        >
          <h4 class="tc-l tl f4 w-100 ttn" style={{color: '#1867aa'}}>
            Bus Ticket & Bus Schedule in whole Vietnam
          </h4>
          <div class="w-100 w-100-m w-30-l br3 mb0-m mb2 mr2-l relative flex">
            <div class="relative w-80 mr2">
              <i
                className="fas fa-map-marker-alt absolute"
                style={{left:'10px', top: '12px', color: '#f8c300 !important'}}
              ></i>
              <input
                id="inputFrom"
                type="text"
                class="mb1 br3 indent"
                style={{backgroundColor: 'white !important', height: '2.5em',borderRradius: '.5rem !important'}}
                placeholder="From"
              />
            </div>

            <div
            id="btn" onclick="changeValue()"
              class="w-20 br3 mb0-l mb2-m flex justify-center items-center bg-white dim pointer"
              style={{height: '2.5em',borderRadius: '.5rem !important'}}
            >
              <a class="f3" >
                <i
                  class="fas fa-exchange-alt"
                  style={{color: '#f8c300 !important'}}
                ></i>
              </a>
            </div>
            <input id="from" type="hidden" name="from" placeholder="Country" />
            <input
                id="nameFrom"
                type="hidden"
                placeholder="Country"
              />
          </div>

          <div class="w-100 w-100-m w-25-l br3 mb0-l mb2 mr2-l relative">
            <div class="relative">
              <i
                class="fas fa-map-marker-alt absolute"
                style={{left:'10px', top: '12px',color: '#f8c300 !important'}}
              ></i>
              <input
                id="inputTo"
                type="text"
                style={{backgroundColor: 'white !important', height: '2.5em',borderRadius: '.5rem !important'}}
                className="mb1 br3 w-100 dib indent"
                placeholder="To"
              />
              <input
                id="nameTo"
                type="hidden"
                placeholder="Country"
              />
            </div>
            <input id="to" type="hidden" name="to" placeholder="Country" />
          </div>

          <div class="w-100 w-100-m w-20-l br3 mb0-l mb2 mr2-l flex flex-row">
            <div class="relative w-60 w-100-l mr2">
              <i
                class="far fa-calendar-alt absolute"
                style={{left:'10px', top: '12px', color: '#f8c300 !important'}}
              ></i>
              <input
                id="datepicker"
                class="w-100 br3 pl3 mb0-l mb2 indent"
                name="departDate"
                readonly
              />
            </div>
            <div id="today"
              class="w-30 pointer br3 mb0-l mb2-m mr2 flex justify-center items-center bg-white dim dn-l"
              style={{height: '2.5em',borderRadius: '.5rem !important'}}
            >
              <a className="pointer" >Today</a>
            </div>
            <div id="tomorrow"
              class="w-30 pointer br3 mb0-l mb2-m flex justify-center items-center bg-white dim dn-l"
              style={{height: '2.5em',borderRadius: '.5rem !important'}}
            >
              <a class="pointer" >Tomorrow</a>
            </div>
          </div>

          <div class="w-100 w-100-m w-20-l br3 mb0-l mt0-l mt2 dim ">
            <button
              class="w-100 br3 pl3 mb0-l flex items-center"
              style={{backgroundColor: '#1867AA',borderColor: '#1867AA', color: '#fff', borderRadius: '5rem', padding: '8px 0'}}
              type="submit"
              value="Tìm Kiếm Vé"
            >
              <span class="pl2"><i class="fas fa-bus f3"></i></span>
              <span class="flex-auto">Search Buses</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}